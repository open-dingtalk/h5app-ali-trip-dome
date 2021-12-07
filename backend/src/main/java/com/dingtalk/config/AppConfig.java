package com.dingtalk.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {

    private String appKey;

    private String appSecret;

    private String corpId;

    private Long agentId;

    public Long getAgentId() {
        return agentId;
    }

    @Value("${app.agent_id}")
    public void setAgentId(String agentId) {
        this.agentId = Long.parseLong(agentId);
    }

    public String getAppKey() {
        return appKey;
    }

    @Value("${app.app_key}")
    public void setAppKey(String appKey) {
        this.appKey = appKey;
    }

    public String getAppSecret() {
        return appSecret;
    }

    @Value("${app.app_secret}")
    public void setAppSecret(String appSecret) {
        this.appSecret = appSecret;
    }

    public String getCorpId() {
        return corpId;
    }

    @Value("${app.corp_id}")
    public void setCorpId(String corpId) {
        this.corpId = corpId;
    }
}