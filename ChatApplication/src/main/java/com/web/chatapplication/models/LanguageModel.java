package com.web.chatapplication.models;

import com.fasterxml.jackson.annotation.JsonCreator;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "LanguageModel")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor(onConstructor_ = @JsonCreator)
@EqualsAndHashCode
public class LanguageModel {

    @Id
    private String id;

    private String language;
}
