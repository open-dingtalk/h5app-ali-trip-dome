package com.dingtalk.controller;

import com.alibaba.fastjson.JSON;
import com.dingtalk.api.response.OapiProcessWorkrecordTaskCreateResponse;
import com.dingtalk.api.response.OapiProcessWorkrecordTaskQueryResponse;
import com.dingtalk.api.response.OapiUserListsimpleResponse;
import com.dingtalk.model.FlowEntity;
import com.dingtalk.model.RpcServiceResult;
import com.dingtalk.model.TripEntity;
import com.dingtalk.service.BizManager;
import com.taobao.api.ApiException;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 主业务Controller，编写你的代码
 */
@RestController
@RequestMapping("/biz")
@CrossOrigin
public class BizController {
    Logger log = LoggerFactory.getLogger(BizController.class);


    @Autowired
    BizManager bizManager;

    @RequestMapping("/hello")
    public RpcServiceResult hello(@RequestBody FlowEntity flowEntity) {
        String hello = bizManager.hello();
        System.out.println(JSON.toJSON(flowEntity));
        return RpcServiceResult.getSuccessResult(hello);
    }

    /**
     * 创建待办
     *
     * @param flowEntity
     * @return
     */
    @PostMapping(value = "/createTask")
    public RpcServiceResult createWorkRecordTask(@RequestBody FlowEntity flowEntity, HttpServletRequest request) {
        try {
            flowEntity.setUrl(getUrl(request, flowEntity.getUrl()));
            String workRecordId = bizManager.createWorkRecordTask(flowEntity);
            return RpcServiceResult.getSuccessResult(workRecordId);
        } catch (Exception ex) {
            ex.printStackTrace();
            return RpcServiceResult.getFailureResult("-1", "createTask exception");
        }
    }

    private String getUrl(HttpServletRequest request, String flowUrl) {
        return request.getScheme() + "://" + request.getServerName() + flowUrl;
    }

    /**
     * 更新待办
     *
     * @param flowEntity workRecordId   flowStatus：agree，refuse
     * @return
     */
    @PostMapping(value = "/update")
    public RpcServiceResult updateWorkRecord(@RequestBody FlowEntity flowEntity) {
        try {
            Long i = bizManager.updateWorkRecord(flowEntity);
            return RpcServiceResult.getSuccessResult(i);
        } catch (Exception ex) {
            ex.printStackTrace();
            return RpcServiceResult.getFailureResult("-1", "createTask exception");
        }
    }


    /**
     * 查询待办列表
     *
     * @param flowEntity userId,stauts
     * @return
     */
    @PostMapping(value = "/query/tasks")
    public RpcServiceResult queryTasks(@RequestBody FlowEntity flowEntity) {
        try {
            OapiProcessWorkrecordTaskQueryResponse taskS = bizManager.getTasks(flowEntity);
            return RpcServiceResult.getSuccessResult(taskS);
        } catch (Exception ex) {
            ex.printStackTrace();
            return RpcServiceResult.getFailureResult("-1", "createTask exception");
        }
    }

    /**
     * 查询根部门用户
     *
     * @return
     */
    @PostMapping(value = "/query/user/list")
    public RpcServiceResult queryUserList() {
        try {
            List<OapiUserListsimpleResponse.ListUserSimpleResponse> userlist = bizManager.getUserlist();
            return RpcServiceResult.getSuccessResult(userlist);
        } catch (Exception ex) {
            ex.printStackTrace();
            return RpcServiceResult.getFailureResult("-1", ex.getMessage());
        }
    }

    /**
     * 根据uuid返回实例id
     *
     * @return
     */
    @PostMapping(value = "/query/uuid")
    public RpcServiceResult queryUUid(@RequestBody FlowEntity flowEntity) {
        Object uuid = bizManager.selectUuid(flowEntity.getUuid());
        return RpcServiceResult.getSuccessResult(uuid);
    }

    @PostMapping(value = "/get/address")
    public RpcServiceResult getAddress(@RequestBody FlowEntity flowEntity) throws ApiException {
        String url = bizManager.getAddress(flowEntity);
        return RpcServiceResult.getSuccessResult(url);
    }



    /* */

    /**
     * 根据实例id返回实例参数
     *
     * @return
     *//*
    @PostMapping(value = "/query/flowEntity")
    public RpcServiceResult queryFlowEntity(@RequestBody FlowEntity flowEntity) {
        Object uuid = bizManager.selectFlowEntity(flowEntity.getWorkRecordId());
        return RpcServiceResult.getSuccessResult(uuid);
    }*/
    @PostMapping(value = "/test")
    public void test() throws Exception {
        String s = bizManager.queryCenter("");

    }
    @PostMapping(value = "/test1")
    public void test1() throws Exception {
        String s = bizManager.createCenter();
    }
}
