package com.web.chatapplication;

import com.web.chatapplication.models.UserModel;
import com.web.chatapplication.repos.UserRepository;
import com.web.chatapplication.services.UserService;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import tools.jackson.databind.json.JsonMapper;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PasswordSecurityTest {
    @Mock UserRepository users;
    @InjectMocks UserService service;
    private static final String INPUT_PASSWORD = "ValidTestPass1!";

    private UserModel request() {
        UserModel user = new UserModel();
        user.setId("test-user");
        user.setUsername("tester");
        user.setName("Test");
        user.setSurname("User");
        user.setEmail("person@example.com");
        user.setPassword(INPUT_PASSWORD);
        return user;
    }

    @Test void registrationStoresBcryptHashAndLoginVerifiesIt() {
        UserModel user = request();
        assertEquals(HttpStatus.OK, service.createUser(user).getStatusCode());
        assertNotEquals(INPUT_PASSWORD, user.getPassword());
        assertTrue(new BCryptPasswordEncoder().matches(INPUT_PASSWORD, user.getPassword()));
        verify(users).insert(user);
        when(users.findAll()).thenReturn(List.of(user));
        assertEquals(HttpStatus.OK, service.loginUser(request()).getStatusCode());
        UserModel wrong = request();
        wrong.setPassword("WrongPassword1!");
        assertEquals(HttpStatus.BAD_REQUEST, service.loginUser(wrong).getStatusCode());
    }

    @Test void oldPlaintextCredentialsAreNotAcceptedAsHashes() {
        when(users.findAll()).thenReturn(List.of(request()));
        assertEquals(HttpStatus.BAD_REQUEST, service.loginUser(request()).getStatusCode());
        verify(users, never()).save(any());
    }

    @Test void passwordIsDeserializedButNeverSerialized() {
        JsonMapper mapper = JsonMapper.builder().build();
        String json = mapper.writeValueAsString(request());
        assertFalse(json.contains("password"));
        assertFalse(json.contains(INPUT_PASSWORD));
        UserModel input = mapper.readValue("{\"password\":\"test-input-only\"}", UserModel.class);
        assertEquals("test-input-only", input.getPassword());
    }

    @Test void profileEditRetainsHashUnlessNewPasswordIsSupplied() {
        UserModel existing = request();
        existing.setPassword(new BCryptPasswordEncoder(12).encode(INPUT_PASSWORD));
        when(users.findById("test-user")).thenReturn(Optional.of(existing));
        UserModel edit = request();
        edit.setPassword("");
        assertEquals(HttpStatus.OK, service.editUser(edit).getStatusCode());
        assertEquals(existing.getPassword(), edit.getPassword());
        UserModel changed = request();
        changed.setPassword("NewValidPass2!");
        assertEquals(HttpStatus.OK, service.editUser(changed).getStatusCode());
        assertTrue(new BCryptPasswordEncoder().matches("NewValidPass2!", changed.getPassword()));
        assertNotEquals(existing.getPassword(), changed.getPassword());
    }
}
