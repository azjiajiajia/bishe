package com.jcc.session;

import com.jcc.entity.Reader;
import com.mysql.cj.Session;

import javax.servlet.http.HttpSession;
import java.util.Collection;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

public class MySessionContext {
    private static MySessionContext instance;
    private ConcurrentHashMap<String, HttpSession> sessionMap;

    private MySessionContext() {
        sessionMap = new ConcurrentHashMap<String, HttpSession>();
    }

    public static MySessionContext getInstance() {
        if (instance == null) {
            synchronized (MySessionContext.class) {
                if (instance == null) {
                    instance = new MySessionContext();
                }
            }
        }
        return instance;
    }

    public void addSession(HttpSession session) {
        if (session != null) {
            sessionMap.put(session.getId(), session);
        }
    }

    public void delSession(HttpSession session) {
        if (session != null) {
            sessionMap.remove(session.getId());
        }
    }

    public HttpSession getSession(String sessionID) {
        if (sessionID == null) {
            return null;
        }
        return sessionMap.get(sessionID);
    }

    public ConcurrentHashMap<String, HttpSession> getSessionMap() {
        return sessionMap;
    }

    public boolean hasSession(String sessionId){
        if(sessionId!=null&&sessionMap.containsKey(sessionId))
            return true;
        else
            return false;
    }
}
