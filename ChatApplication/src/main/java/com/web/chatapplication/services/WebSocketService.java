package com.web.chatapplication.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;

@Service
public class WebSocketService {

    private final SimpMessagingTemplate template;

    @Autowired
    WebSocketService(SimpMessagingTemplate template){
        this.template = template;
    }

    public void onReceivedMessage(String message){
        this.template.convertAndSend("/chat",  new SimpleDateFormat("HH:mm:ss").format(new Date())+"- "+ message);
    }
}
