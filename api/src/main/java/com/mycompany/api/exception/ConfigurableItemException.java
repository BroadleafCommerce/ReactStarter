package com.mycompany.api.exception;

import java.util.HashMap;
import java.util.Map;

/**
 * @author Nick Crum ncrum
 */
public class ConfigurableItemException extends RuntimeException {

    protected Map<String, Object> messages = new HashMap<>();

    public ConfigurableItemException addMessage(String key, Object value) {
        messages.put(key, value);
        return this;
    }

    public Map<String, Object> getMessages() {
        return messages;
    }

    public void setMessages(Map<String, Object> messages) {
        this.messages = messages;
    }
}
