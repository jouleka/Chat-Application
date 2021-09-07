package com.web.chatapplication.repos;

import com.web.chatapplication.models.MessageModel;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MessageRepository extends MongoRepository<MessageModel, String> {
}
