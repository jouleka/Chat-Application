package com.web.chatapplication.models;

import com.fasterxml.jackson.annotation.JsonCreator;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "InterestsModel")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor(onConstructor_ = @JsonCreator)
@EqualsAndHashCode
public class InterestsModel {

    @Id
    private String id;

    private String interestType;
    private String interestDescription;
    private List<String> userIdList;
}
