package com.web.chatapplication.models;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "ChatRoomModel")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class ChatRoomModel {

    @Id
    private String id;

    private List<String> messagesId = new ArrayList<>();
    private List<String> usersId = new ArrayList<>();;
    private List<String> inactiveUsersId = new ArrayList<>();;
    private String adminId;

    @NonNull
    private String chatType = "oneToOne"; //private, public or one to one convo;

    private boolean status; // public, private
    private String joinRoomCode; // if room is private;

    @NonNull
    @Indexed(unique = true)
    private String chatName;

    private LocalDateTime mostRecentConversation;
    private boolean favourite;

}
