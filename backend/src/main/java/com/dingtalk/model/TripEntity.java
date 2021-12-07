package com.dingtalk.model;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

/**
 * 行程实体，此处简单模拟了行程的结构
 */
@Data
public class TripEntity {
        String tripType;
        String tripStartCity;
        String tripEndCity;
        String tripStartDate;
        String tripEndDate;
}
