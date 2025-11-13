package com.nutribot.app;

public class ChatMessage {
    
    public enum Type {
        USER, AI
    }
    
    private String content;
    private Type type;
    private long timestamp;
    
    public ChatMessage(String content, Type type, long timestamp) {
        this.content = content;
        this.type = type;
        this.timestamp = timestamp;
    }
    
    public String getContent() {
        return content;
    }
    
    public Type getType() {
        return type;
    }
    
    public long getTimestamp() {
        return timestamp;
    }
}
