package com.dingtalk.model;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

/**
 * 单据实体，此处简单模拟了单据的结构
 */
@Data
public class FlowEntity {
    /**
     * 单据模板名称
     */
    private String flowTitleName;
    /**
     * 单据名称
     */
    private String flowName;
    /**
     * 单据申请事由
     */
    private String flowDesc;

    private String flowStartTime;
    private String flowEndTime;

    private List<TripEntity> tripList;
    /**
     * 单据申请事由
     */
    private BigDecimal flowAmount;
    /**
     * 单据uuid
     */
    private String uuid;
    /**
     * 用户id
     */
    private String   userId;
    /**
     * 用户名称
     */
    private String userName;

    /**
     * 实例id
     */
    private String workRecordId;
    /**
     * 审批状态agree，refuse
     */
    private String flowStatus;
    /**
     * 单据url
     */
    private String url;
    /**
     * 获取待办状态0未处理，1已处理
     */
    private Long taskStatus;
}
