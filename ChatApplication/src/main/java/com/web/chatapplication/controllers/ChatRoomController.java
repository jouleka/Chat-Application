package com.web.chatapplication.controllers;

import com.web.chatapplication.models.ChatRoomModel;
import com.web.chatapplication.repos.ChatRoomRepository;
import com.web.chatapplication.services.ChatRoomService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/chat-room")
public class ChatRoomController {

    @Autowired
    ChatRoomRepository chatRoomRepository;

    @Autowired
    ChatRoomService chatRoomService;

    @PostMapping("/currentUserId/{currentUserId}/newFriendChattingWithId/{newFriendChattingWithId}/create")
    public ResponseEntity<ChatRoomModel> creatAChatRoom(@PathVariable String currentUserId, @PathVariable String newFriendChattingWithId, @RequestBody ChatRoomModel chatRoomModel) {
        return chatRoomService.creatAChatRoom(currentUserId, newFriendChattingWithId, chatRoomModel);
    }

    @GetMapping("/{currentUserId}/{userChattingWithId}")
    public ChatRoomModel getChatRoom(@PathVariable String currentUserId, @PathVariable String userChattingWithId) {
        return chatRoomService.getChatRoom(currentUserId, userChattingWithId);
    }

    @DeleteMapping("/deleteById/{id}")
    public void deleteChatRoomById(@PathVariable String id) {
        chatRoomService.deleteChatRoomById(id);
    }

    @PostMapping("/currentUserId/{id}/createChatRoomGroup")
    public ResponseEntity<ChatRoomModel> createAGroupChatRoom(@PathVariable String id,@RequestBody ChatRoomModel chatRoomModel) {
        return chatRoomService.createAGroupChatRoom(id ,chatRoomModel);
    }

    @GetMapping("/listChatRoomGroups/{id}")
    public List<ChatRoomModel> getGroupChatRooms(@PathVariable String id) {
        return chatRoomService.getGroupChatRooms(id);
    }

    @GetMapping("/listInactiveChatRoomGroups/{id}")
    public List<ChatRoomModel> getInactiveGroupChatRooms(@PathVariable String id) {
        return chatRoomService.getInactiveGroupChatRooms(id);
    }

    @GetMapping("/getChatRoomAfterClick/{id}")
    public ChatRoomModel getChatRoomAfterClick(@PathVariable String id) {
        return chatRoomService.getChatRoomAfterClick(id);
    }

    @GetMapping("/getChatRoomsByAdminIdAndChatType/{id}/userChattingWithId/{userChattingWithId}")
    public List<ChatRoomModel> getChatRoomsByAdminIdAndChatType(@PathVariable String id, @PathVariable String userChattingWithId) {
        return chatRoomService.getChatRoomsByAdminIdAndChatType(id, userChattingWithId);
    }

    @GetMapping("/addUserToChatRoom/roomId/{roomId}/userChattingWithId/{userChattingWithId}")
    public void addUserToChatRoom(@PathVariable String roomId, @PathVariable String userChattingWithId){
        chatRoomService.addUserToChatRoom(roomId, userChattingWithId);
    }

    @GetMapping("/removeUser/roomId/{roomId}/currentUserId/{currentUserid}/participantId/{participantId}")
    public void removeUserFromChatRoom(@PathVariable String roomId, @PathVariable String currentUserid, @PathVariable String participantId) {
        chatRoomService.removeUserFromChatRoom(roomId, currentUserid, participantId);
    }

    @GetMapping("/listPublicGroups/{userId}")
    public List<ChatRoomModel> getPublicGroups(@PathVariable String userId) {
        return chatRoomService.listPublicGroups(userId);
    }

    @GetMapping("/joinPublicChatRoom/roomId/{roomId}/userId/{userId}")
    public void joinPublicChatRoom(@PathVariable String roomId, @PathVariable String userId) {
        chatRoomService.joinPublicChatRoom(roomId, userId);
    }

    @DeleteMapping("/deleteChatGroupRoom/{roomId}")
    public void deleteChatRoomGroup(@PathVariable String roomId) {
        chatRoomService.deleteChatRoomGroup(roomId);
    }

    @PutMapping("/updateChatRoom/{roomId}")
    public ResponseEntity<ChatRoomModel> updateChatRoom(@RequestBody ChatRoomModel chatRoomModel) {
        return chatRoomService.updateChatRoomGroup(chatRoomModel);
    }

}
