package com.web.chatapplication.repos;

import com.web.chatapplication.models.InterestsModel;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface InterestsRepository extends MongoRepository<InterestsModel, String> {
}
