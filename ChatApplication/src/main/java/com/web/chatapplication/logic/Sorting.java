package com.web.chatapplication.logic;

import com.web.chatapplication.models.MessageModel;

import java.util.Comparator;

public class Sorting implements Comparator<MessageModel> {


    @Override
    public int compare(MessageModel o1, MessageModel o2) {
        return o1.getTimeOfSendingMessage().compareTo(o2.getTimeOfSendingMessage());
    }
}
