package com.web.chatapplication.services;

import com.web.chatapplication.models.ChatRoomModel;
import com.web.chatapplication.models.MessageModel;
import com.web.chatapplication.models.UserModel;
import com.web.chatapplication.repos.ChatRoomRepository;
import com.web.chatapplication.repos.MessageRepository;
import com.web.chatapplication.repos.UserRepository;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Month;
import java.util.*;

@Service
public class ChatRoomService {

    @Autowired
    ChatRoomRepository chatRoomRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    MessageRepository messageRepository;

    public ResponseEntity<ChatRoomModel> creatAChatRoom(String currentUserId, String newFriendChattingWithId, ChatRoomModel chatRoomModel) {
        List<ChatRoomModel> chatRoomModelsList = chatRoomRepository.findAll();
        Optional<UserModel> currentUser = userRepository.findById(currentUserId);
        Optional<UserModel> newFriendChattingWith = userRepository.findById(newFriendChattingWithId);
        List<String> currentUserIdOfChats = currentUser.get().getChatIdList();
        List<String> newFriendChattingWithIdOfChats = newFriendChattingWith.get().getChatIdList();
        HashMap<String, LocalDateTime> chatHashMap = new HashMap<>();
        String chatRoomCurrentUserId = "";
        String chatRoomUserStartingConvoWith = "";

        for(ChatRoomModel chatRoom: chatRoomModelsList) {
            for(String chatRoomUserId: chatRoom.getUsersId()) {
                if(chatRoomCurrentUserId.isEmpty()) {
                    chatRoomCurrentUserId = chatRoomUserId;
                }else {
                    chatRoomUserStartingConvoWith = chatRoomUserId;
                }
            }
            if(chatRoomCurrentUserId.equals(currentUserId) && chatRoomUserStartingConvoWith.equals(newFriendChattingWithId) ||
                chatRoomCurrentUserId.equals(newFriendChattingWithId) && chatRoomUserStartingConvoWith.equals(currentUserId)) {
                currentUser.get().getUsersIdChattingList().removeIf(id -> id.equals(newFriendChattingWithId));
                currentUser.get().getUsersIdChattingList().add(newFriendChattingWithId);

                for(HashMap<String, LocalDateTime> hashMap: currentUser.get().getListOfUniqueTimeOfJoiningRoom()) {
                    for(String key : hashMap.keySet()) {
                        if(key.equals(chatRoom.getId())) {
                            for(LocalDateTime time : hashMap.values()) {
                                hashMap.replace(key, time, LocalDateTime.now());
                            }
                        }
                    }
                }

                userRepository.save(currentUser.get());
                newFriendChattingWith.get().getUsersIdChattingList().removeIf(id -> id.equals(currentUserId));
                newFriendChattingWith.get().getUsersIdChattingList().add(currentUserId);

                for(HashMap<String, LocalDateTime> hashMap: newFriendChattingWith.get().getListOfUniqueTimeOfJoiningRoom()) {
                    for(String key : hashMap.keySet()) {
                        if(key.equals(chatRoom.getId())) {
                            for(LocalDateTime time : hashMap.values()) {
                                hashMap.replace(key, time, LocalDateTime.now());
                            }
                        }
                    }
                }

                userRepository.save(newFriendChattingWith.get());
                return new ResponseEntity<>(chatRoom, HttpStatus.OK);
            }
            chatRoomCurrentUserId = "";
            chatRoomUserStartingConvoWith = "";
        }

        chatRoomModel.setChatName((currentUser.get().getUsername() + "vs" + newFriendChattingWith.get().getUsername()));

        ChatRoomModel chatRoomSaved = chatRoomRepository.save(chatRoomModel);
        chatHashMap.put(chatRoomSaved.getId(), LocalDateTime.now());
        currentUser.get().getChatIdList().add(chatRoomSaved.getId());
//        currentUser.get().setTimeOfJoiningRoom(LocalDateTime.now());
//        currentUser.get().getUniqueTimeOfJoiningRoom().put(LocalDateTime.now(), chatRoomSaved.getId());
        currentUser.get().getListOfUniqueTimeOfJoiningRoom().add(chatHashMap);
        userRepository.save(currentUser.get());
        newFriendChattingWith.get().getChatIdList().add(chatRoomSaved.getId());
//        newFriendChattingWith.get().setTimeOfJoiningRoom(LocalDateTime.now());
//        newFriendChattingWith.get().getUniqueTimeOfJoiningRoom().put(LocalDateTime.now(), chatRoomSaved.getId());
        newFriendChattingWith.get().getListOfUniqueTimeOfJoiningRoom().add(chatHashMap);
        userRepository.save(newFriendChattingWith.get());
        return new ResponseEntity<>(chatRoomSaved, HttpStatus.OK);

//
//        for(ChatRoomModel chatRoom : chatRoomModelsList) {
//            for(String usersId: chatRoom.getUsersId()) {
//                if(chatRoomCurrentUserId.isEmpty()) {
//                    chatRoomCurrentUserId = usersId;
//                }else {
//                    chatRoomUserStartingConvoWith = usersId;
//                }
//            }
//            if(!chatRoomModel.getUsersId().contains(chatRoomCurrentUserId) && !chatRoomModel.getUsersId().contains(chatRoomUserStartingConvoWith)) {
//                chatRoomRepository.insert(chatRoomModel);
//                return new ResponseEntity<>(chatRoomModel, HttpStatus.OK);
//            }else if(chatRoomModel.getUsersId().contains(chatRoomCurrentUserId) && chatRoomModel.getUsersId().contains(chatRoomUserStartingConvoWith)) {
//                return new ResponseEntity<>(chatRoomModel, HttpStatus.BAD_REQUEST);
//            }
//        }
//
//        if(chatRoomModelsList.size() == 0) {
//            chatRoomRepository.insert(chatRoomModel);
//            return new ResponseEntity<>(chatRoomModel, HttpStatus.OK);
//        }

//        return new ResponseEntity<>(chatRoomModel, HttpStatus.OK);

    }

    public ChatRoomModel getChatRoom(String currentUserId, String userChattingWithId) {
        List<ChatRoomModel> chatRoomModelList = chatRoomRepository.findAll();

        String chatRoomCurrentUserId = "";
        String chatRoomUserStartingConvoWith = "";

        for (ChatRoomModel chatRoom : chatRoomModelList) {
            for (String usersId : chatRoom.getUsersId()) {
                if (chatRoomCurrentUserId.isEmpty()) {
                    chatRoomCurrentUserId = usersId;
                } else {
                    chatRoomUserStartingConvoWith = usersId;
                }
            }
            if (chatRoomCurrentUserId.equals(currentUserId) && chatRoomUserStartingConvoWith.equals(userChattingWithId) || chatRoomCurrentUserId.equals(userChattingWithId) && chatRoomUserStartingConvoWith.equals(currentUserId)) {
                return chatRoom;
            }
            chatRoomCurrentUserId = "";
            chatRoomUserStartingConvoWith = "";
        }
        return null;
    }

    public void deleteChatRoomById(String id) {
        Optional<ChatRoomModel> chatRoomModel = chatRoomRepository.findById(id);
        List<UserModel> userModelList = userRepository.findAll();
        List<String> userIdChattingList = new ArrayList<>();

//        for(String chatRoomUserId: chatRoomModel.get().getUsersId()) {
//            userModelList.removeIf(newUserIdChattingList -> newUserIdChattingList.getUsersIdChattingList().removeIf(userId -> userId.equals(chatRoomUserId)));
//        }
//
//        userRepository.saveAll(userModelList);

//        for(UserModel user: userModelList) {
//            for(String userChatListId: user.getUsersIdChattingList()) {
//                for(String chatRoomUserId: chatRoomModel.get().getUsersId()) {
//                    if(chatRoomUserId.equals(userChatListId)) {
//                        user.getUsersIdChattingList().remove(userChatListId);
//                        userRepository.save(user);
//                        break;
//                    }
//                }
//            }
//        }

//        chatRoomRepository.deleteById(id);

    }

    public ResponseEntity<ChatRoomModel> createAGroupChatRoom(String currentUserid ,ChatRoomModel chatRoomModel) {
        List<UserModel> userModelList = userRepository.findAll();
        HashMap<String, LocalDateTime> chatHashMap = new HashMap<>();

        if(chatRoomModel.getChatName().isEmpty() || chatRoomModel.getChatType().isEmpty() || chatRoomModel.getUsersId().isEmpty()) {
            return new ResponseEntity<>(chatRoomModel, HttpStatus.BAD_REQUEST);
        }
        chatRoomModel.getUsersId().add(currentUserid);

        chatRoomRepository.save(chatRoomModel);

        ChatRoomModel chatRoomSaved = chatRoomRepository.save(chatRoomModel);
        String adminId = chatRoomSaved.getAdminId();
        chatRoomSaved.getUsersId().add(adminId);
        chatHashMap.put(chatRoomSaved.getId(), LocalDateTime.now());

        List<String> chatRoomSavedUsersId = chatRoomSaved.getUsersId();
        for(UserModel userModel: userModelList) {
            for(String chatRoomUserId: chatRoomSavedUsersId) {
                if(userModel.getId().equals(chatRoomUserId)) {
                    userModel.getChatIdList().add(chatRoomSaved.getId());
                    userRepository.save(userModel);
                }
            }
        }

        //test----------------------

        for(String usersId : chatRoomSaved.getUsersId()) {
            Optional<UserModel> userModel = userRepository.findById(usersId);
            userModel.get().getListOfUniqueTimeOfJoiningRoom().add(chatHashMap);
            userRepository.save(userModel.get());
        }

        //end of test-----------------

        return new ResponseEntity<>(chatRoomSaved, HttpStatus.OK);
    }

    public List<ChatRoomModel> getGroupChatRooms(String id) {
        List<ChatRoomModel> chatRoomModelList = chatRoomRepository.findAll();

        chatRoomModelList.removeIf(chatRoomType -> chatRoomType.getChatType().equals("oneToOne"));
        chatRoomModelList.removeIf(chatRoom -> !chatRoom.getUsersId().contains(id));
        return chatRoomModelList;
    }

    public List<ChatRoomModel> getInactiveGroupChatRooms(String id) {
        List<ChatRoomModel> chatRoomModelList = chatRoomRepository.findAll();

        chatRoomModelList.removeIf(chatRoomType -> chatRoomType.getChatType().equals("oneToOne"));
        chatRoomModelList.removeIf(chatRoom -> !chatRoom.getInactiveUsersId().contains(id));
        return chatRoomModelList;
    }

    public ChatRoomModel getChatRoomAfterClick(String id) {
        Optional<ChatRoomModel> chatRoomModel = chatRoomRepository.findById(id);
        return chatRoomModel.get();
    }

    public List<ChatRoomModel> getChatRoomsByAdminIdAndChatType(String currentUserid, String userChattingWithId) {
        List<ChatRoomModel> chatRoomModelList = chatRoomRepository.findAll();
        Optional<UserModel> userModel = userRepository.findById(userChattingWithId);
        List<ChatRoomModel> chatRoomModelList2 = new ArrayList<>();

        chatRoomModelList.removeIf(chatRoom -> chatRoom.getChatType().equals("oneToOne"));
        chatRoomModelList.removeIf(chatRoom -> chatRoom.getUsersId().contains(userChattingWithId));

        for(ChatRoomModel chatRoom: chatRoomModelList) {

            if(chatRoom.getAdminId().equals(currentUserid) || chatRoom.getChatType().equals("public")) {
                chatRoomModelList2.add(chatRoom);
            }
        }
        return chatRoomModelList2;
    }

    public void addUserToChatRoom(String chatRoomId, String userChattingWithId) {
        Optional<ChatRoomModel> chatRoomModel = chatRoomRepository.findById(chatRoomId);
        Optional<UserModel> userModel = userRepository.findById(userChattingWithId);
        HashMap<String, LocalDateTime> chatHashMap = new HashMap<>();
        chatHashMap.put(chatRoomId, LocalDateTime.now());

        chatRoomModel.get().getUsersId().add(userChattingWithId);
        if(chatRoomModel.get().getInactiveUsersId().contains(userChattingWithId)) {
            chatRoomModel.get().getInactiveUsersId().remove(userChattingWithId);
        }
        userModel.get().getChatIdList().add(chatRoomId);
        if(userModel.get().getLeftChatRoomGroups().contains(chatRoomId)) {
            userModel.get().getLeftChatRoomGroups().remove(chatRoomId);
        }

//        List<HashMap<String, LocalDateTime>> newHashMapList = userModel.get().getListOfUniqueTimeOfJoiningRoom();
        List<HashMap<String, LocalDateTime>> newHashMapList = new ArrayList<>();

        for(HashMap<String, LocalDateTime> someHashMap : userModel.get().getListOfUniqueTimeOfJoiningRoom()) {
            newHashMapList.add(someHashMap);
        }

        for(HashMap<String, LocalDateTime> hashMap: newHashMapList) {
            if(!hashMap.keySet().contains(chatRoomId)) {
                userModel.get().getListOfUniqueTimeOfJoiningRoom().add(chatHashMap);
            }else if(hashMap.keySet().contains(chatRoomId)) {
                if(chatRoomModel.get().getChatType().equals("private")) {
                    for(LocalDateTime time : hashMap.values()) {
                        hashMap.replace(chatRoomId, time, LocalDateTime.now());
                    }
                }
            }
        }


//        userModel.get().setTimeOfJoiningRoom(LocalDateTime.now());

        chatRoomRepository.save(chatRoomModel.get());
        userRepository.save(userModel.get());
    }

    public void removeUserFromChatRoom(String roomId, String currentUserId, String participantId) {
        Optional<ChatRoomModel> chatRoomModel = chatRoomRepository.findById(roomId);
        Optional<UserModel> userModel = userRepository.findById(participantId);


        if(chatRoomModel.get().getAdminId().equals(currentUserId)) {
            chatRoomModel.get().getUsersId().remove(participantId);
            userModel.get().getChatIdList().remove(roomId);

            Iterator itr = userModel.get().getListOfUniqueTimeOfJoiningRoom().iterator();
            while(itr.hasNext()) {
                HashMap<String, LocalDateTime> hashmap = (HashMap<String, LocalDateTime>) itr.next();
                for(String key : hashmap.keySet()) {
                    if(key.equals(roomId)) {
                        itr.remove();
                    }
                }
            }

        }

        chatRoomRepository.save(chatRoomModel.get());
        userRepository.save(userModel.get());

    }

    public List<ChatRoomModel> listPublicGroups(String currentUserId) {
        List<ChatRoomModel> chatRoomModelList = chatRoomRepository.findAll();

        chatRoomModelList.removeIf(chatRoom -> !chatRoom.getChatType().equals("public"));
        chatRoomModelList.removeIf(chatRoom -> chatRoom.getUsersId().contains(currentUserId));
        chatRoomModelList.removeIf(chatRoom -> chatRoom.getInactiveUsersId().contains(currentUserId));

        return chatRoomModelList;
    }

    public void joinPublicChatRoom(String roomId, String userId) {
        Optional<ChatRoomModel> chatRoomModel = chatRoomRepository.findById(roomId);
        Optional<UserModel> userModel = userRepository.findById(userId);

        chatRoomModel.get().getUsersId().add(userId);
        userModel.get().getChatIdList().add(roomId);
        chatRoomRepository.save(chatRoomModel.get());
        userRepository.save(userModel.get());

    }

    public void deleteChatRoomGroup(String roomId) {
        List<UserModel> userModelList = userRepository.findAll();
        List<MessageModel> messageModelList = messageRepository.findAll();

        Iterator itr = messageModelList.iterator();
        while(itr.hasNext()) {
            MessageModel message = (MessageModel) itr.next();
            if(message.getChatId().equals(roomId)) {
                itr.remove();
                messageRepository.delete(message);
            }
        }

//        messageRepository.saveAll(messageModelList);

        for(UserModel userModel : userModelList) {
            if(userModel.getLeftChatRoomGroups().contains(roomId)) {
                userModel.getLeftChatRoomGroups().remove(roomId);
            }else if(userModel.getChatIdList().contains(roomId)) {
                userModel.getChatIdList().remove(roomId);
            }
        }

        chatRoomRepository.deleteById(roomId);
    }

    public ResponseEntity<ChatRoomModel> updateChatRoomGroup(ChatRoomModel chatRoomModel) {

        if(chatRoomModel.getChatName().isEmpty() || chatRoomModel.getChatType().isEmpty()) {
            return new ResponseEntity<>(chatRoomModel, HttpStatus.BAD_REQUEST);
        }

        chatRoomRepository.save(chatRoomModel);
        return new ResponseEntity<>(chatRoomModel, HttpStatus.OK);
    }

}
