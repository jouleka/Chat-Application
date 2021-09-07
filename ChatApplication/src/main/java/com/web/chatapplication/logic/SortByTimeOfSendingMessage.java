package com.web.chatapplication.logic;

import com.web.chatapplication.models.MessageModel;
import com.web.chatapplication.models.UserModel;
import org.apache.catalina.User;

import java.util.Comparator;

public class SortByTimeOfSendingMessage implements Comparator<UserModel> {

    @Override
    public int compare(UserModel o1, UserModel o2) {
        return o2.getRecentlyActiveTime().compareTo(o1.getRecentlyActiveTime());
    }
}
