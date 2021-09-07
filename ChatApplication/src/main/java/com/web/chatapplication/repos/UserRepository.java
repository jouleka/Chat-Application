package com.web.chatapplication.repos;

import com.web.chatapplication.models.UserModel;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<UserModel, String> {


}
