package com.hummingbird.backend.user.util;

import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;

@Service
public class SessionUtilService {
    private final HttpSession httpSession;

    public SessionUtilService(HttpSession httpSession) {
        this.httpSession = httpSession;
    }

    public static final String USER_ID = "USER_ID";



    public void setSessionId(long id) {
        httpSession.setAttribute(USER_ID, id);
    }

    public void logout() {
        httpSession.removeAttribute(USER_ID);
    }

    public Long getSessionId() {
        return (Long) httpSession.getAttribute(USER_ID);
    }
}
