package com.web.chatapplication.controllers;

import com.web.chatapplication.models.ChatRoomModel;
import com.web.chatapplication.models.UserModel;
import com.web.chatapplication.repos.UserRepository;
import com.web.chatapplication.services.UserService;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserService userService;

    @GetMapping("/logged-user/{id}")
    public UserModel loggedInUser(@PathVariable String id) {
        return userService.logedInUser(id);
    }

    @PostMapping("/login")
    public ResponseEntity<UserModel> loginUser(@RequestBody UserModel userModel) {
        return userService.loginUser(userModel);
    }

    @PostMapping("/register")
    public ResponseEntity<UserModel> createAUserProfile(@RequestBody UserModel userModel) {
        return userService.createUser(userModel);
    }

    @PutMapping("/logout/{id}")
    public boolean logoutUser(@PathVariable String id) {
        return userService.logoutUser(id);
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<UserModel> editUser(@RequestBody UserModel userModel) {
        return userService.editUser(userModel);
    }

    @GetMapping("/list-all/{id}")
    public List<UserModel> listAllUsersAfterChatCreation(@PathVariable String id) {
        return userService.listAllUsersAfterChatCreation(id);
    }

    @GetMapping("/list-all-users/{id}")
    public List<UserModel> listAllUsers(@PathVariable String id) {
        return userService.listAllUsers(id);
    }

    @GetMapping("/list-chatting-users/{id}/current-user/{currentUserId}")
    public List<UserModel> listUserChattingWith(@PathVariable String id, @PathVariable String currentUserId) {
        return userService.chattingList(id, currentUserId);
    }

    @GetMapping("/list-chatting-users/{id}")
    public List<UserModel> getListUsersChattingWith(@PathVariable String id) {
        return userService.listChattingUsers(id);
    }

    @GetMapping("/get-chatting-user/{id}")
    public UserModel getUserChattingWith(@PathVariable String id) {
        return userService.getUserChattingWith(id);
    }

    @GetMapping("/get-current-user/{id}")
    public UserModel getCurrentUserById(@PathVariable String id) {
         Optional<UserModel> userModel = userRepository.findById(id);
         return userModel.get();
    }

    @DeleteMapping("/deleteUserById/roomId/{roomId}/currentUserId/{currentUserId}")
    public void removeUserById(@PathVariable String roomId, @PathVariable String currentUserId) {
        userService.removeUserIdByChatRoomId(roomId, currentUserId);
    }

    @GetMapping("/getUsersByChatRoomGroupId/{id}")
    public List<UserModel> getUsersByChatRoomGroupId(@PathVariable String id) {
       return userService.getUsersByChatRoomGroupId(id);
    }

    @GetMapping("/getUserByChatRoomAdminId/{roomId}")
    public UserModel getUserByChatRoomAdminId(@PathVariable String roomId) {
        return userService.returnUserByChatRoomAdminId(roomId);
    }

    @GetMapping("/leaveChatGroup/roomId/{roomId}/currentUserId/{userId}")
    public void leaveChatRoomGroup(@PathVariable String roomId, @PathVariable String userId) {
        userService.leaveChatGroup(roomId, userId);
    }

    @GetMapping("/addToFavourite/currentUser/{currentUserId}/friendId/{friendId}")
    public void addUserToFavouritePage(@PathVariable String currentUserId, @PathVariable String friendId) {
        userService.addUserToFavouritePage(currentUserId, friendId);
    }

    @GetMapping("/addGroupToFavourite/currentUser/{currentUserId}/friend/{friendId}")
    public void addChatGroupToFavouritesPage(@PathVariable String currentUserId, @PathVariable String friendId) {
        userService.addChatGroupToFavouritesPage(currentUserId, friendId);
    }

    @GetMapping("/getFavouriteGroups/{userId}")
    public List<ChatRoomModel> getFavouriteGroups(@PathVariable String userId) {
        return userService.getFavouriteGroups(userId);
    }

    @GetMapping("/removeUserFromFavouriteGroups/user/{userId}/friend/{friendId}")
    public void removeUserFromFavouriteGroups(@PathVariable String userId, @PathVariable String friendId) {
        userService.removeUserFromFavouriteGroupsList(userId, friendId);
    }

    @GetMapping("/getFavouriteChats/{userId}")
    public List<UserModel> getFavouriteChats(@PathVariable String userId) {
        return userService.getFavouriteChats(userId);
    }

    @GetMapping("/removeUserFromFavouriteChats/user/{userId}/friend/{friendId}")
    public void removeUserFromFavouriteChats(@PathVariable String userId, @PathVariable String friendId) {
        userService.removeUserFromFavouritesList(userId, friendId);
    }
}
