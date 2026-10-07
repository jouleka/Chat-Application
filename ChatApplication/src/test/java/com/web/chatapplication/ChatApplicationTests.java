package com.web.chatapplication;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest(properties = "spring.data.mongodb.auto-index-creation=false")
class ChatApplicationTests {

    @Test
    void contextLoads() {
    }

}
