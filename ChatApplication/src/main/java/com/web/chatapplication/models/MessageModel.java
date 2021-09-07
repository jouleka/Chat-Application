package com.web.chatapplication.models;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "MessageModel")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class MessageModel {

    @Id
    private String id;
    private String usernameOfSender;
    private String userId;
    private String chatId;
    private List<String> usersSoftDeletingMessage;
    private boolean softDeleted = false;
    @NonNull
    private String text;
    private LocalDateTime timeOfSendingMessage;
    private List<String> seenUserIdList; // if message has been seen or not we put the id of users here;
}
