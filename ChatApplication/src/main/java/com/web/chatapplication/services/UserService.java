package com.web.chatapplication.services;

import com.web.chatapplication.logic.SortByTimeOfSendingMessage;
import com.web.chatapplication.models.ChatRoomModel;
import com.web.chatapplication.models.UserModel;
import com.web.chatapplication.repos.ChatRoomRepository;
import com.web.chatapplication.repos.UserRepository;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import javax.swing.text.html.Option;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Month;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    ChatRoomRepository chatRoomRepository;

    public UserModel logedInUser(String id) {

       Optional<UserModel> user = userRepository.findById(id);

        return user.orElse(null);
    }

    public ResponseEntity<UserModel> createUser(UserModel userModel) {
        String emailRegex = "[a-zA-Z]+@[a-zA-Z]+\\.[a-zA-Z]{2,3}";
        Pattern emailPattern = Pattern.compile(emailRegex);
        Matcher emailMatcher = emailPattern.matcher(userModel.getEmail());

        String usernameRegex = "^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$";
        Pattern usernamePattern = Pattern.compile(usernameRegex);
        Matcher usernameMatcher = usernamePattern.matcher(userModel.getUsername());

        String nameRegex = "^[^±!@£$%^&*_+§¡€#¢§¶•ªº«\\\\/<>?:;|=.,]{1,20}$";
        Pattern namePattern = Pattern.compile(nameRegex);
        Matcher nameMatcher = namePattern.matcher(userModel.getName());

        String surnameRegex = "^[^±!@£$%^&*_+§¡€#¢§¶•ªº«\\\\/<>?:;|=.,]{1,20}$";
        Pattern surnamePattern = Pattern.compile(surnameRegex);
        Matcher surnameMatcher = surnamePattern.matcher(userModel.getSurname());

        String passRegex = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#&()–[{}]:;',?/*~$^+=<>]).{8,20}$";
        Pattern passPattern = Pattern.compile(passRegex);
        Matcher passMatcher = passPattern.matcher(userModel.getPassword());

        if(!emailMatcher.matches() || !usernameMatcher.matches() || !passMatcher.matches() || !nameMatcher.matches() || !surnameMatcher.matches()
                || userModel.getName().isEmpty() || userModel.getSurname().isEmpty() || userModel.getPassword().isEmpty() || userModel.getEmail().isEmpty()) {
            return new ResponseEntity<>(userModel, HttpStatus.BAD_REQUEST);
        }

        userModel.setFullname(userModel.getName() + " " + userModel.getSurname());

        userRepository.insert(userModel);
        return new ResponseEntity<>(userModel, HttpStatus.OK);
    }

    public ResponseEntity<UserModel> loginUser(UserModel userModel) {
        List<UserModel> userModelList = userRepository.findAll();

        for(UserModel user : userModelList) {
            if(user.getUsername().equals(userModel.getUsername()) && user.getPassword().equals(userModel.getPassword())) {
                user.setStatus(true);
                userRepository.save(user);
                if(user.isStatus()) {
                    return new ResponseEntity<>(user, HttpStatus.OK);
                }
            }
        }

        return new ResponseEntity<>(userModel, HttpStatus.BAD_REQUEST);

    }

    public boolean logoutUser(String id) {
        Optional<UserModel> userId = userRepository.findById(id);

        userId.get().setStatus(false);
        userRepository.save(userId.get());
        return userId.get().isStatus();
    }

    public ResponseEntity<UserModel> editUser(UserModel userModel) {

        String emailRegex = "[a-zA-Z]+@[a-zA-Z]+\\.[a-zA-Z]{2,3}";
        Pattern emailPattern = Pattern.compile(emailRegex);
        Matcher emailMatcher = emailPattern.matcher(userModel.getEmail());

        String usernameRegex = "^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$";
        Pattern usernamePattern = Pattern.compile(usernameRegex);
        Matcher usernameMatcher = usernamePattern.matcher(userModel.getUsername());

        String nameRegex = "^[^±!@£$%^&*_+§¡€#¢§¶•ªº«\\\\/<>?:;|=.,]{1,20}$";
        Pattern namePattern = Pattern.compile(nameRegex);
        Matcher nameMatcher = namePattern.matcher(userModel.getName());

        String surnameRegex = "^[^±!@£$%^&*_+§¡€#¢§¶•ªº«\\\\/<>?:;|=.,]{1,20}$";
        Pattern surnamePattern = Pattern.compile(surnameRegex);
        Matcher surnameMatcher = surnamePattern.matcher(userModel.getSurname());

        String passRegex = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#&()–[{}]:;',?/*~$^+=<>]).{8,20}$";
        Pattern passPattern = Pattern.compile(passRegex);
        Matcher passMatcher = passPattern.matcher(userModel.getPassword());

        if(!emailMatcher.matches() || !usernameMatcher.matches() || !passMatcher.matches() || !nameMatcher.matches() || !surnameMatcher.matches()
            || userModel.getName().isEmpty() || userModel.getSurname().isEmpty() || userModel.getPassword().isEmpty() || userModel.getEmail().isEmpty()) {
            return new ResponseEntity<>(userModel, HttpStatus.BAD_REQUEST);
        }
        userModel.setFullname(userModel.getName() + " " + userModel.getSurname());

        userRepository.save(userModel);
        return new ResponseEntity<>(userModel, HttpStatus.OK);
    }

    public List<UserModel> listAllUsersAfterChatCreation(String id) {
        List<UserModel> userModelList = userRepository.findAll();
        Optional<UserModel> userModel1 = userRepository.findById(id);

        userModelList.removeIf(newUserModel -> userModel1.get().getUsersIdChattingList().contains(newUserModel.getId()));
        userModelList.removeIf(userModel -> userModel.getId().equals(id));
//        userModelList.removeIf(user -> user.getUsersIdChattingList().contains(id));

        return userModelList;
    }

    public List<UserModel> listAllUsers(String id) {
        List<UserModel> userModelList = userRepository.findAll();
        userModelList.removeIf(userModel -> userModel.getId().equals(id));
        return userModelList;
    }

    public List<UserModel> chattingList(String newUserid, String currentUserId) {
        List<UserModel> userModelList = userRepository.findAll();

        for(UserModel user: userModelList) {
            if(user.getId().equals(newUserid)) {
                user.getUsersIdChattingList().removeIf(id -> id.equals(currentUserId));
                user.getUsersIdChattingList().add(currentUserId);
                user.setRecentlyActiveTime(LocalDateTime.now());
                userRepository.save(user);
            }
            if(user.getId().equals(currentUserId)) {
                user.getUsersIdChattingList().removeIf(id -> id.equals(newUserid));
                user.getUsersIdChattingList().add(newUserid);
                user.setRecentlyActiveTime(LocalDateTime.now());
                userRepository.save(user);
            }
        }
        return userRepository.saveAll(userModelList);

    }

    public List<UserModel> listChattingUsers(String id) {
        Optional<UserModel> userModel = userRepository.findById(id);
        List<UserModel> userModelList = userRepository.findAll();
        List<String> usersId = userModel.get().getUsersIdChattingList();
        List<UserModel> userModelList2 = new ArrayList<>();

        for(String currentUserId : usersId) {
            for(UserModel user : userModelList) {
                if(currentUserId.equals(user.getId())) {
                    userModelList2.add(user);
                }
            }
        }
//        userModelList2.sort(new SortByTimeOfSendingMessage());
        return userModelList2;
    }

    public UserModel getUserChattingWith(String id) {
        Optional<UserModel> user = userRepository.findById(id);

        return user.get();
    }

    public void removeUserIdByChatRoomId(String roomId, String currentUserId) {
        List<UserModel> userModelList = userRepository.findAll();

        Optional<ChatRoomModel> chatRoomModel = chatRoomRepository.findById(roomId);
        if(chatRoomModel.isPresent()){
            chatRoomModel.get().getUsersId().forEach(userId -> {
                Optional<UserModel> userModel = userRepository.findById(userId);
                if(userModel.isPresent()){
                    Optional<UserModel> foundUserById = userRepository.findById(currentUserId);
                    if(foundUserById.isPresent()){
                        foundUserById.get().getUsersIdChattingList().removeIf(id -> id.equals(userModel.get().getId()));
                        userRepository.save(foundUserById.get());
//                        chatRoomModel.get().getUsersId().remove(userId);
//                        chatRoomRepository.save(chatRoomModel.get());
                    }
                }
            });
        }
//        chatRoomModel.get().getUsersId().removeIf(userId -> !userId.equals(currentUserId));
//        chatRoomRepository.save(chatRoomModel.get());
//        userModelList.forEach(user -> {
//            if(user.getUsersIdChattingList().contains(id))
//        });
//
//        List<String> chatRoomUserIdList = chatRoomModel.get().getUsersId();
//
//        for(String chatRoomUserId : chatRoomUserIdList) {
//            userModelList.removeIf(userIdList -> userIdList.getUsersIdChattingList().removeIf(userId -> userId.equals(chatRoomUserId)));
//        }
    }

    public List<UserModel> getUsersByChatRoomGroupId(String id) {
        List<UserModel> userModelList = userRepository.findAll();
        List<UserModel> userModelList2 = new ArrayList<>();
        List<UserModel> userModelList3 = new ArrayList<>();
        Optional<ChatRoomModel> chatRoomModel = chatRoomRepository.findById(id);

        for(UserModel userModel: userModelList) {
            if(userModel.getChatIdList().contains(id)) {
                userModelList2.add(userModel);
                userModelList3.add(userModel);
            }
        }

        for(UserModel userModel: userModelList2) {
            if(userModel.getId().equals(chatRoomModel.get().getAdminId())) {
                userModelList3.remove(userModel);
            }
        }

        return userModelList3;
    }

    public UserModel returnUserByChatRoomAdminId(String roomId) {
        Optional<ChatRoomModel> chatRoomModel = chatRoomRepository.findById(roomId);
        List<UserModel> userModelList = userRepository.findAll();
        UserModel returnedUser = null;

        for(UserModel userModel: userModelList) {
            if(userModel.getId().equals(chatRoomModel.get().getAdminId())) {
                returnedUser = userModel;
            }
        }
        return returnedUser;
    }

    public void leaveChatGroup(String roomId, String currentUserId) {
        Optional<ChatRoomModel> chatRoomModel = chatRoomRepository.findById(roomId);
        Optional<UserModel> userModel = userRepository.findById(currentUserId);

        if(!userModel.get().getId().equals(chatRoomModel.get().getAdminId())) {
            userModel.get().getLeftChatRoomGroups().add(roomId);
            userModel.get().getChatIdList().remove(roomId);
            userModel.get().setTimeOfJoiningRoom(LocalDateTime.now());

            if(chatRoomModel.get().getChatType().equals("private")) {
                for(HashMap<String, LocalDateTime> hashMap: userModel.get().getListOfUniqueTimeOfJoiningRoom()) {
                    for(String key : hashMap.keySet()) {
                        if(key.equals(chatRoomModel.get().getId())) {
                            for(LocalDateTime time : hashMap.values()) {
                                hashMap.replace(key, time, LocalDate.of(2023, Month.JANUARY, 18).atStartOfDay());
                            }
                        }
                    }
                }
            }

            userRepository.save(userModel.get());
            chatRoomModel.get().getUsersId().remove(currentUserId);
            chatRoomModel.get().getInactiveUsersId().add(currentUserId);
            chatRoomRepository.save(chatRoomModel.get());
        }
    }

    public void addUserToFavouritePage(@PathVariable String currentUserId, @PathVariable String friendId) {
        Optional<UserModel> userModel = userRepository.findById(currentUserId);
        Optional<UserModel> friendUserModel = userRepository.findById(friendId);

        userModel.get().getFavouriteChats().remove(friendId);
        userModel.get().getFavouriteChats().add(friendId);

        userRepository.save(userModel.get());
    }

    public void addChatGroupToFavouritesPage(@PathVariable String currentUserId, @PathVariable String chatId) {
        Optional<UserModel> userModel = userRepository.findById(currentUserId);
        Optional<ChatRoomModel> chatRoomModel = chatRoomRepository.findById(chatId);

        userModel.get().getFavouriteGroups().remove(chatId);
        userModel.get().getFavouriteGroups().add(chatId);

        userRepository.save(userModel.get());
    }

    public List<ChatRoomModel> getFavouriteGroups(String userId) {
        List<ChatRoomModel> chatRoomModelList = chatRoomRepository.findAll();
        Optional<UserModel> userModel = userRepository.findById(userId);

        chatRoomModelList.removeIf(chatRoomModel -> !userModel.get().getFavouriteGroups().contains(chatRoomModel.getId()));
        return chatRoomRepository.saveAll(chatRoomModelList);
    }

    public void removeUserFromFavouriteGroupsList(String currentUserId, String friendId) {
        Optional<UserModel> userModel = userRepository.findById(currentUserId);

        userModel.get().getFavouriteGroups().removeIf(id -> id.equals(friendId));
        userRepository.save(userModel.get());
    }

    public List<UserModel> getFavouriteChats(String userId) {
        List<UserModel> userModelList = userRepository.findAll();
        Optional<UserModel> userModel = userRepository.findById(userId);

        userModelList.removeIf(user -> !userModel.get().getFavouriteChats().contains(user.getId()));
       return userRepository.saveAll(userModelList);
    }

    public void removeUserFromFavouritesList(String currentUserId, String friendId) {
        Optional<UserModel> userModel = userRepository.findById(currentUserId);

        userModel.get().getFavouriteChats().removeIf(id -> id.equals(friendId));
        userRepository.save(userModel.get());
    }
}
