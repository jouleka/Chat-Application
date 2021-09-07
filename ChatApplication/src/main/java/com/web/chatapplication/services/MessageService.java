package com.web.chatapplication.services;

import com.web.chatapplication.logic.Sorting;
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
import org.springframework.messaging.Message;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class MessageService {

    @Autowired
    MessageRepository messageRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ChatRoomRepository chatRoomRepository;

    public ResponseEntity<MessageModel> postMessage( String id , MessageModel messageModel) {
        Optional<UserModel> userModel = userRepository.findById(id);

        if(messageModel.getText().isEmpty()) {
            return new ResponseEntity<>(messageModel, HttpStatus.BAD_REQUEST);
        }

        userModel.get().setRecentlyActiveTime(LocalDateTime.now());
        userRepository.save(userModel.get());
        messageModel.setTimeOfSendingMessage(LocalDateTime.now());

        messageRepository.insert(messageModel);
        return new ResponseEntity<>(messageModel, HttpStatus.OK);
    }

    public List<MessageModel> getMessagesByChatId(String id, String currentUserId) {
        List<MessageModel> messageModelList = messageRepository.findAll();
        List<MessageModel> messageModelList1 = new ArrayList<>();
        List<UserModel> userModelList = userRepository.findAll();
        Optional<ChatRoomModel> chatRoomModel = chatRoomRepository.findById(id);
        Optional<UserModel> userModel1 = userRepository.findById(currentUserId);
//        userModelList.removeIf(userChatRoomId -> userChatRoomId.getChatIdList().removeIf(roomId -> roomId.equals(id)));
        UserModel chatRoomUser = null;
        UserModel secChatRoomUser = null;
        HashMap<String, LocalDateTime> testHashMap = new HashMap<>();
        LocalDateTime testLocalDateTime = null;

        for(UserModel userModel: userModelList) {
            for(String chatId: userModel.getChatIdList()) {
                if(chatId.equals(id)) {
                    if(chatRoomUser == null) {
                        chatRoomUser = userModel;
                    }else {
                        secChatRoomUser = userModel;
                    }
                }
            }
        }
//
//        messageModelList.removeIf(message -> !message.getChatId().equals(id));
        if(messageModelList.size() >= 2) {
            messageModelList.sort(new Sorting());
        }


//        messageModelList1 = messageModelList;

        Iterator itr = messageModelList.iterator();
        while(itr.hasNext()) {
            MessageModel message = (MessageModel) itr.next();
            if(!message.getChatId().equals(id)) {
                itr.remove();
            }
        }

        for(HashMap<String, LocalDateTime> hashmap : userModel1.get().getListOfUniqueTimeOfJoiningRoom()) {
            for(String key: hashmap.keySet()) {
                if(key.equals(chatRoomModel.get().getId())) {
                    testHashMap = hashmap;
                }
            }
        }

        for(LocalDateTime time : testHashMap.values()) {
            testLocalDateTime = time;
        }

        if(chatRoomModel.get().getChatType().equals("oneToOne") || chatRoomModel.get().getChatType().equals("private")) {
            Iterator sortingItr = messageModelList.iterator();
            while(sortingItr.hasNext()) {
                MessageModel message = (MessageModel) sortingItr.next();
                if(message.getTimeOfSendingMessage().isBefore(testLocalDateTime)) {
                    sortingItr.remove();
                }
            }
        }

        Iterator softDeletedItr = messageModelList.iterator();
        while(softDeletedItr.hasNext()) {
            MessageModel message = (MessageModel) softDeletedItr.next();
            for(String userId: message.getUsersSoftDeletingMessage()) {
                if(userId.equals(currentUserId)) {
                    softDeletedItr.remove();
                }
            }
        }

//        for(MessageModel messageModel : messageModelList) {
//            if(messageModel.getUsersSoftDeletingMessage().contains(currentUserId)) {
//                messageModelList.removeIf(thisMessageModel -> thisMessageModel.isSoftDeleted());
//            }
//        }

//        if(!chatRoomModel.get().getChatType().equals("public")) {
//            for(MessageModel messageModel: messageModelList) {
//                if(!userModel1.get().getTimeOfJoiningRoom().isAfter(messageModel.getTimeOfSendingMessage())) {
//                    messageModelList1.remove(messageModel);
//                }
//            }
//        }

//        MessageModel mostRecentMessage = messageModelList.get(messageModelList.size() - 1);
//
//        for(MessageModel messageModel : messageModelList) {
//            if(messageModel.getTimeOfSendingMessage().isBefore(chatRoomUser.getTimeOfJoiningRoom()) ||
//                    mostRecentMessage.getTimeOfSendingMessage().isBefore(secChatRoomUser.getTimeOfJoiningRoom())) {
//                messageModelList.remove(messageModel);
//
//            }
//        }

        return messageRepository.saveAll(messageModelList);
    }

    public ResponseEntity<MessageModel> updateMessage(String userId ,MessageModel messageModel) {

        if(messageModel.getText().isEmpty() || !messageModel.getUserId().equals(userId)) {
            return new ResponseEntity<>(messageModel, HttpStatus.BAD_REQUEST);
        }

        messageRepository.save(messageModel);
        return new ResponseEntity<>(messageModel, HttpStatus.OK);
    }

    public void softDeleteAMessage(String messageId, String currentUserId) {
        Optional<MessageModel> messageModel = messageRepository.findById(messageId);

        messageModel.get().setSoftDeleted(true);
        messageModel.get().getUsersSoftDeletingMessage().add(currentUserId);
        messageRepository.save(messageModel.get());
    }

    public void deleteMessageById(String id) {
        messageRepository.deleteById(id);
    }

    public void deleteMessageIfChatRoomIsDeleted(String id) {
        List<MessageModel> messageModelList = messageRepository.findAll();

        for(MessageModel message : messageModelList) {
            if(message.getChatId().equals(id)) {
                messageRepository.delete(message);
            }
        }
    }
}
