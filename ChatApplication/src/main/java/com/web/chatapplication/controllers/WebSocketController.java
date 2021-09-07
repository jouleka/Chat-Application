package com.web.chatapplication.controllers;

import com.web.chatapplication.models.MessageModel;
import com.web.chatapplication.repos.MessageRepository;
import com.web.chatapplication.services.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Date;

@Controller
public class WebSocketController {

    private final SimpMessagingTemplate template;

    @Autowired
    MessageRepository messageRepository;

    @Autowired
    MessageService messageService;

    @Autowired
    WebSocketController(SimpMessagingTemplate template){
        this.template = template;
    }

    @MessageMapping("/send/message")
//    @PostMapping("/send/message")
    @SendTo("/chat/public")
    public MessageModel onReceivedMessage(@Payload MessageModel messageModel){
//        this.template.convertAndSend("/chat",  new SimpleDateFormat("hh:mm:ss").format(new Date())+"- "+ messageModel);
        if(messageModel.getText().isEmpty()) {
            return null;
        }

        messageModel.setTimeOfSendingMessage(LocalDateTime.now());

        return messageRepository.save(messageModel);
    }

    @MessageMapping("/send/message")
    @SendTo("/chat/public")
    public MessageModel onDeletionOfMessage(@Payload MessageModel messageModel){
//        this.template.convertAndSend("/chat",  new SimpleDateFormat("hh:mm:ss").format(new Date())+"- "+ messageModel);
        if(messageModel.getText().isEmpty()) {
            return null;
        }

        messageModel.setTimeOfSendingMessage(LocalDateTime.now());

        return messageRepository.save(messageModel);
    }
}
