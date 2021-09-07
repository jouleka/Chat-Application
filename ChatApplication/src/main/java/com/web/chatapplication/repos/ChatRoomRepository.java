package com.web.chatapplication.repos;

import com.web.chatapplication.models.ChatRoomModel;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ChatRoomRepository extends MongoRepository<ChatRoomModel, String> {
}
