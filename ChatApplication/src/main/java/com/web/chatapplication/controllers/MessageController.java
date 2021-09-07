package com.web.chatapplication.controllers;

import com.web.chatapplication.models.MessageModel;
import com.web.chatapplication.repos.MessageRepository;
import com.web.chatapplication.services.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.Message;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/message")
public class MessageController {

    @Autowired
    MessageRepository messageRepository;

    @Autowired
    MessageService messageService;


    @PostMapping("/currentUserId/{id}/post-message")
    public ResponseEntity<MessageModel> postMessage(@PathVariable String id ,@RequestBody MessageModel messageModel) {
        return messageService.postMessage(id, messageModel);
    }

    @GetMapping("/listByChatId/{id}/currentUserId/{userId}")
    public List<MessageModel> getMessagesByChatId(@PathVariable String id, @PathVariable String userId) {
        return messageService.getMessagesByChatId(id, userId);
    }

    @DeleteMapping("/delete-message/{id}")
    public void deleteMessageById(@PathVariable String id) {
        messageService.deleteMessageById(id);
    }

    @DeleteMapping("/delete-messageByChatRoom/{id}")
    public void deleteMessageByChatRoomId(@PathVariable String id) {
        messageService.deleteMessageIfChatRoomIsDeleted(id);
    }

    @GetMapping("/softDeleteMessage/{messageId}/userId/{currentUserId}")
    public void softDeleteAMessage(@PathVariable String messageId, @PathVariable String currentUserId) {
        messageService.softDeleteAMessage(messageId, currentUserId);
    }

    @PutMapping("/updateMessage/{messageId}/userId/{userId}")
    public ResponseEntity<MessageModel> updateMessage(@PathVariable String userId, @RequestBody MessageModel messageModel) {
        return messageService.updateMessage(userId ,messageModel);
    }

    @GetMapping("/get-messageById/{messageId}")
    public ResponseEntity<MessageModel> getMessageById(@PathVariable String messageId) {
        Optional<MessageModel> messageModel = messageRepository.findById(messageId);
        return new ResponseEntity<>(messageModel.get(), HttpStatus.OK);
    }
}
