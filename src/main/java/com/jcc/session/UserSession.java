package com.jcc.session;

import javax.servlet.http.HttpSession;
import java.util.concurrent.ConcurrentHashMap;

public class UserSession {
    private static UserSession instance;
    private ConcurrentHashMap<String, String> userSessionMap;

    private UserSession(){userSessionMap=new ConcurrentHashMap<String, String>();}

    public static UserSession getInstance() {
        if (instance == null) {
            synchronized (UserSession.class) {
                if (instance == null) {
                    instance = new UserSession();
                }
            }
        }
        return instance;
    }

    public void addSession(HttpSession session,String rid) {
        if (session != null) {
            userSessionMap.put(rid,session.getId());
        }
    }

    public void delSession(HttpSession session) {
        if (session != null&&session.getAttribute("rid")!=null) {
            userSessionMap.remove(session.getAttribute("rid"));
        }
    }

    public ConcurrentHashMap<String, String> getUserSessionMap(){return userSessionMap;}
    public String getSessionId(String rid){
        if(userSessionMap.containsKey(rid))
            return userSessionMap.get(rid);
        else return null;
    }
}
