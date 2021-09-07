package com.web.chatapplication.models;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Document(collection = "UserModel")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class UserModel {

    @Id
    private String id;

    @NonNull
    private String name;
    @NonNull
    private String surname;
    
    private String fullname;
    @Indexed(unique = true)
    private String username;

    @NonNull
    private String password;

    private List<String> chatIdList = new ArrayList<>();
    private List<String> usersIdChattingList = new ArrayList<>();
    private List<String> leftChatRoomGroups = new ArrayList<>();
    private List<String> favouriteChats =  new ArrayList<>();
    private List<String> favouriteGroups = new ArrayList<>();

    @Indexed(unique = true)
    private String email;
//    @Indexed(unique = true)
//    private int phoneNumber;

    private boolean status = false;
    private LocalDateTime recentlyActiveTime = null;
    private LocalDateTime timeOfJoiningRoom = null;
    private List<HashMap<String, LocalDateTime>> listOfUniqueTimeOfJoiningRoom = new ArrayList<>();
    private String profilePhoto;
    private List<String> language;
    private List<String> Interests;
    private boolean favourites;
    private String description;
}
