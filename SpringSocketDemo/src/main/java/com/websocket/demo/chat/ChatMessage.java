package com.websocket.demo.chat;


import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ChatMessage {
    static private int countOnline = 0;
    private int prevOnline;
    private String content;
    private String timestamp;
    private String sender;
    private MessageType type;
    public static void IncreaseCount(){
        countOnline += 1;
    }

    public static void DecreaseCount(){
        countOnline -= 1;
        if(countOnline <= 0){
            countOnline = 0;
        }
    }

    public static int GetCount(){
        return countOnline;
    }

    public void setCount(){
        prevOnline = countOnline;
    }
}


