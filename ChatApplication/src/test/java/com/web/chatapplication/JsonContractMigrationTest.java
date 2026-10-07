package com.web.chatapplication;
import com.web.chatapplication.models.*;
import org.junit.jupiter.api.Test;
import tools.jackson.databind.json.JsonMapper;
import static org.junit.jupiter.api.Assertions.*;
class JsonContractMigrationTest {
    private final JsonMapper mapper = JsonMapper.builder().build();
    @Test void messageAndRoomRequestsKeepDefaultFieldsWhenOmitted() {
        MessageModel message = mapper.readValue("{\"text\":\"Hello\"}", MessageModel.class);
        assertEquals("Hello", message.getText());
        assertFalse(message.isSoftDeleted());
        ChatRoomModel room = mapper.readValue("{\"chatName\":\"Test group\"}", ChatRoomModel.class);
        assertEquals("oneToOne", room.getChatType());
        assertNotNull(room.getUsersId());
        assertNotNull(room.getMessagesId());
        assertFalse(room.isFavourite());
    }
}
