package com.hummingbird.backend.push.service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.hummingbird.backend.push.dto.PushMessageByToken;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.IOException;

@Service
@Log4j2
public class FCMService {

    @Value("${project.properties.firebase-create-scoped}")
    String fireBaseCreateScoped;

    @Value("${project.properties.fcm_private_key_path}")
    private String FCM_PRIVATE_KEY_PATH;

    private FirebaseMessaging instance;

    // spring boot 가 실행될 때 실행됨

    /**
     * FCM 기본 setting
     * @throws IOException
     */
    @PostConstruct
    public void firebaseSetting() throws IOException {
        try {
            GoogleCredentials googleCredentials = GoogleCredentials
                    .fromStream(new ClassPathResource(FCM_PRIVATE_KEY_PATH).getInputStream());

            FirebaseOptions firebaseOptions = FirebaseOptions.builder()
                    .setCredentials(googleCredentials)
                    .build();

            if (FirebaseApp.getApps().isEmpty()){
                FirebaseApp app = FirebaseApp.initializeApp(firebaseOptions);
                log.info("Firebase application init");
            }
        } catch (IOException e){
            log.error("FireBase start error");
            throw new RuntimeException(e.getMessage());
        }
    }


    /**
     * 손님에게 알림 보내기
     * @param pushMessageByToken
     * @param userId
     */
    public void sendByTokenToUser(PushMessageByToken pushMessageByToken, String userId){
//        TODO make user repository and alter method
//        List<String> tokens = getuserTokens(userId);
        String token = "";
        if (token.isBlank()){
            log.info("손님 fcm 토큰이 존재하지 않습니다. userId: {}, 메세지 정보: {}", userId, pushMessageByToken);
        }
        Message message =Message.builder()
                .setToken(pushMessageByToken.getToken())
                .putData("title", pushMessageByToken.getTitle())
                .putData("message", pushMessageByToken.getMessage())
                .build();

        String pushResponse = "";
        try {
            pushResponse = FirebaseMessaging.getInstance().send(message);
            log.info("손님 Success Push response: {}",pushResponse);
        } catch (FirebaseMessagingException e){
            log.error("손님 Failed to push notification, error log: {}",e.getMessage());
        }

    }

    /**
     * 점주님께 알림 보내기
     * @param pushMessageByToken
     * @param userId
     */
    public void sendByTokenToStoreManager(PushMessageByToken pushMessageByToken, String userId){
//        TODO make user repository and alter method
//        List<String> tokens = getuserTokens(userId);
        String token = "";
        if (token.isBlank()){
            log.info("점주 fcm 토큰이 존재하지 않습니다. userId: {}, 메세지 정보: {}", userId, pushMessageByToken);
        }
        Message message =Message.builder()
                .setToken(pushMessageByToken.getToken())
                .putData("title", pushMessageByToken.getTitle())
                .putData("message", pushMessageByToken.getMessage())
                .build();

        String pushResponse = "";
        try {
            pushResponse = FirebaseMessaging.getInstance().send(message);
            log.info("점주 Success Push response: {}",pushResponse);
        } catch (FirebaseMessagingException e){
            log.error("점주 Failed to push notification, error log: {}",e.getMessage());
        }

    }

}
