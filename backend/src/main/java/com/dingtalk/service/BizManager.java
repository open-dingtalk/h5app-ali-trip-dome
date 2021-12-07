package com.dingtalk.service;

import com.alibaba.fastjson.JSON;
import com.aliyun.dingboot.common.token.ITokenManager;
import com.dingtalk.api.DefaultDingTalkClient;
import com.dingtalk.api.DingTalkClient;
import com.dingtalk.api.request.*;
import com.dingtalk.api.response.*;
import com.dingtalk.config.AppConfig;
import com.dingtalk.constant.UrlConstant;
import com.dingtalk.model.FlowEntity;
import com.dingtalk.model.TripEntity;
import com.taobao.api.ApiException;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.time.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.text.ParseException;
import java.util.*;

/**
 * 主业务service，编写你的代码
 */
@Service
public class BizManager {
    @Autowired
    ITokenManager tokenManager;
    @Autowired
    private AppConfig appConfig;
    private HashMap<String, Object> hashMap = new HashMap<>();

    public String hello() {
        return "HelloWorld";
    }


    public String getProcessCode() throws ApiException {
        // 1. 获取access_token
        // String accessToken = AccessTokenUtil.getAccessToken();
        String accessToken = tokenManager.getAccessToken(appConfig.getAppKey(), appConfig.getAppSecret());
        //2获取
        DingTalkClient client = new DefaultDingTalkClient(UrlConstant.PROCESS_GET_NAME);
        OapiProcessGetByNameRequest oapiProcessGetByNameRequest = new OapiProcessGetByNameRequest();
        oapiProcessGetByNameRequest.setName("易快报差旅申请单");
        OapiProcessGetByNameResponse execute = client.execute(oapiProcessGetByNameRequest, accessToken);
        if (StringUtils.isNotEmpty(execute.getProcessCode())) {
            return execute.getProcessCode();
        } else {
            return createProcess();
        }
//        return createProcess();
    }

    /**
     * 创建模板
     *
     * @return
     */
    public String createProcess() throws ApiException {
        // 1. 获取access_token
        //String accessToken = AccessTokenUtil.getAccessToken();
        String accessToken = tokenManager.getAccessToken(appConfig.getAppKey(), appConfig.getAppSecret());
        // 2. 创建模板
        DingTalkClient client = new DefaultDingTalkClient(UrlConstant.PROCESS_SAVE);
        OapiProcessSaveRequest oapiProcessSaveRequest = new OapiProcessSaveRequest();
        OapiProcessSaveRequest.SaveProcessRequest saveProcessRequest = new OapiProcessSaveRequest.SaveProcessRequest();
        saveProcessRequest.setAgentid(appConfig.getAgentId());
        ArrayList<OapiProcessSaveRequest.FormComponentVo> formComponentVos = new ArrayList<>();
        saveProcessRequest.setName("易快报差旅申请单");
//        saveProcessRequest.setProcessCode("PROC-A6A89562-474A-46EE-BDC3-0413986DED0D");
        saveProcessRequest.setDescription("易快报差旅申请单");
        OapiProcessSaveRequest.FormComponentVo formComponentVo = new OapiProcessSaveRequest.FormComponentVo();
        formComponentVo.setComponentName("TextField");
        OapiProcessSaveRequest.FormComponentPropVo formComponentPropVo = new OapiProcessSaveRequest.FormComponentPropVo();
        formComponentPropVo.setId("TextField-submitId");
        formComponentPropVo.setLabel("提交人");
        formComponentPropVo.setRequired(true);
        formComponentVo.setProps(formComponentPropVo);
        formComponentVos.add(formComponentVo);
        formComponentVo = new OapiProcessSaveRequest.FormComponentVo();
        formComponentPropVo = new OapiProcessSaveRequest.FormComponentPropVo();
        formComponentVo.setComponentName("TextField");
        formComponentPropVo.setId("TextField-flowDesc");
        formComponentPropVo.setLabel("出差事由");
        formComponentPropVo.setRequired(true);
        formComponentVo.setProps(formComponentPropVo);
        formComponentVos.add(formComponentVo);

        saveProcessRequest.setFormComponentList(formComponentVos);
        saveProcessRequest.setFakeMode(true);
        oapiProcessSaveRequest.setSaveProcessRequest(saveProcessRequest);
        OapiProcessSaveResponse execute = client.execute(oapiProcessSaveRequest, accessToken);
        // 3. 返回模板id
        if (execute.getErrcode() != 0) {
            throw new ApiException("-1", execute.getErrmsg());
        }
        return execute.getResult().getProcessCode();
    }

    /**
     * 创建并获取实例id
     *
     * @param flowEntity
     * @return
     * @throws ApiException
     */
    public String createWorkRecord(FlowEntity flowEntity) throws ApiException {
        // 1. 获取access_token
//        String accessToken = AccessTokenUtil.getAccessToken();
        String accessToken = tokenManager.getAccessToken(appConfig.getAppKey(), appConfig.getAppSecret());
        OapiProcessWorkrecordCreateRequest oapiProcessWorkrecordCreateRequest = new OapiProcessWorkrecordCreateRequest();
        OapiProcessWorkrecordCreateRequest.SaveFakeProcessInstanceRequest saveFakeProcessInstanceRequest = new OapiProcessWorkrecordCreateRequest.SaveFakeProcessInstanceRequest();
        String processCode = getProcessCode();
        saveFakeProcessInstanceRequest.setProcessCode(processCode);
        saveFakeProcessInstanceRequest.setAgentid(appConfig.getAgentId());
        saveFakeProcessInstanceRequest.setOriginatorUserId(flowEntity.getUserId());
        OapiProcessWorkrecordCreateRequest.FormComponentValueVo formComponentValueVo = new OapiProcessWorkrecordCreateRequest.FormComponentValueVo();
        ArrayList<OapiProcessWorkrecordCreateRequest.FormComponentValueVo> formComponentValueVos = new ArrayList<>();
        formComponentValueVo.setName("提交人");
        formComponentValueVo.setValue(flowEntity.getUserName());
        formComponentValueVos.add(formComponentValueVo);

        formComponentValueVo = new OapiProcessWorkrecordCreateRequest.FormComponentValueVo();
        formComponentValueVo.setName("出差事由");
        formComponentValueVo.setValue(flowEntity.getFlowDesc());
        formComponentValueVos.add(formComponentValueVo);

       /* formComponentValueVo = new OapiProcessWorkrecordCreateRequest.FormComponentValueVo();
        formComponentValueVo.setName("申请金额");
        formComponentValueVo.setValue(flowEntity.getFlowAmount().setScale(2, BigDecimal.ROUND_UP).toString());
        formComponentValueVos.add(formComponentValueVo);*/

        saveFakeProcessInstanceRequest.setFormComponentValues(formComponentValueVos);
        saveFakeProcessInstanceRequest.setUrl(flowEntity.getUrl());
        saveFakeProcessInstanceRequest.setTitle(flowEntity.getUserName()+"的"+flowEntity.getFlowName());
        oapiProcessWorkrecordCreateRequest.setRequest(saveFakeProcessInstanceRequest);
        DingTalkClient client = new DefaultDingTalkClient(UrlConstant.PROCESS_WORK_RECORD_CREATE);
        OapiProcessWorkrecordCreateResponse execute = client.execute(oapiProcessWorkrecordCreateRequest, accessToken);
        if (execute.getErrcode() != 0) {
            throw new ApiException("-1", execute.getErrmsg());
        }
        return execute.getResult().getProcessInstanceId();
    }

    /**
     * 更新实例
     *
     * @param flowEntity
     * @return
     * @throws ApiException
     */
    public Long updateWorkRecord(FlowEntity flowEntity) throws Exception {
        // 1. 获取access_token
//        String accessToken = AccessTokenUtil.getAccessToken();
        String accessToken = tokenManager.getAccessToken(appConfig.getAppKey(), appConfig.getAppSecret());
        OapiProcessWorkrecordUpdateRequest oapiProcessWorkrecordUpdateRequest = new OapiProcessWorkrecordUpdateRequest();
        OapiProcessWorkrecordUpdateRequest.UpdateProcessInstanceRequest updateProcessInstanceRequest = new OapiProcessWorkrecordUpdateRequest.UpdateProcessInstanceRequest();
        updateProcessInstanceRequest.setAgentid(appConfig.getAgentId());
        updateProcessInstanceRequest.setProcessInstanceId(flowEntity.getWorkRecordId());
        updateProcessInstanceRequest.setStatus("COMPLETED");
        updateProcessInstanceRequest.setResult(flowEntity.getFlowStatus());
        oapiProcessWorkrecordUpdateRequest.setRequest(updateProcessInstanceRequest);
        DingTalkClient client = new DefaultDingTalkClient(UrlConstant.PROCESS_WORK_RECORD_UPDATE);
        OapiProcessWorkrecordUpdateResponse execute = client.execute(oapiProcessWorkrecordUpdateRequest, accessToken);
        if (execute.getErrcode() != 0) {
            throw new ApiException("-1", execute.getErrmsg());
        }
        if ("agree".equals(flowEntity.getFlowStatus())) {
            FlowEntity flowEntityCache = (FlowEntity) hashMap.get(flowEntity.getUuid());
            approveFinishAli(flowEntityCache);
        }
        FlowEntity flowEntityCache = (FlowEntity) hashMap.get(flowEntity.getUuid());
        flowEntityCache.setFlowStatus(flowEntity.getFlowStatus());
        hashMap.put(flowEntityCache.getUuid(),flowEntityCache);
        return execute.getErrcode();
    }

    public void approveFinishAli(FlowEntity flowEntity) throws Exception {
        String accessToken = tokenManager.getAccessToken(appConfig.getAppKey(), appConfig.getAppSecret());
        OapiAlitripBtripApprovalNewRequest request = new OapiAlitripBtripApprovalNewRequest();
        OapiAlitripBtripApprovalNewRequest.OpenApiNewApplyRq rq = new OapiAlitripBtripApprovalNewRequest.OpenApiNewApplyRq();
        rq.setThirdpartApplyId(UUID.randomUUID().toString());
        rq.setTripTitle(flowEntity.getUserName()+"的"+flowEntity.getFlowName());
        ArrayList<OapiAlitripBtripApprovalNewRequest.OpenItineraryInfo> itineraryList = new ArrayList<>();
        OapiAlitripBtripInvoiceSearchResponse.OpenInvoiceDo openInvoiceDo = queryInvoice(flowEntity.getUserId());
        if(null == openInvoiceDo || null == openInvoiceDo.getId()){
            throw new Exception("获取发票失败");
        }
        for (TripEntity tripEntity : flowEntity.getTripList()) {
            OapiAlitripBtripApprovalNewRequest.OpenItineraryInfo openItineraryInfo = new OapiAlitripBtripApprovalNewRequest.OpenItineraryInfo();
            openItineraryInfo.setTripWay(0L);
            openItineraryInfo.setItineraryId(UUID.randomUUID().toString());
            if("飞机".equals(tripEntity.getTripType())){
                openItineraryInfo.setTrafficType(0L);
            }else {
                openItineraryInfo.setTrafficType(1L);
            }
            openItineraryInfo.setDepCity(tripEntity.getTripStartCity());
            openItineraryInfo.setArrCity(tripEntity.getTripEndCity());
            String thirdCenterId="";
            if(StringUtils.isEmpty(thirdCenterId=queryCenter(flowEntity.getUserId()))){
                thirdCenterId = createCenter();
            }
            openItineraryInfo.setThirdpartCostCenterId(thirdCenterId);
            openItineraryInfo.setInvoiceId(openInvoiceDo.getId());
            openItineraryInfo.setDepDate(DateUtils.parseDate(flowEntity.getFlowStartTime()+" 00:00:00", "yyyy-MM-dd HH:mm:ss"));
            openItineraryInfo.setArrDate(DateUtils.parseDate(flowEntity.getFlowEndTime()+" 23:59:59", "yyyy-MM-dd HH:mm:ss"));
            itineraryList.add(openItineraryInfo);
        }
        rq.setTripCause(flowEntity.getFlowDesc());
        rq.setUserid(flowEntity.getUserId());
        rq.setItineraryList(itineraryList);
        OapiAlitripBtripApprovalNewRequest.OpenUserInfo openUserInfo = new OapiAlitripBtripApprovalNewRequest.OpenUserInfo();
        openUserInfo.setUserid(flowEntity.getUserId());
        openUserInfo.setUserName(flowEntity.getUserName());
        ArrayList<OapiAlitripBtripApprovalNewRequest.OpenUserInfo> openUserInfos = new ArrayList<>();
        openUserInfos.add(openUserInfo);
        rq.setTravelerList(openUserInfos);
        rq.setCorpid(appConfig.getCorpId());
        rq.setStatus(1L);
        request.setRq(rq);
        DefaultDingTalkClient client = new DefaultDingTalkClient(UrlConstant.ALI_TRIP_BTRIP_APPROVAL_NEW);
        OapiAlitripBtripApprovalNewResponse execute = new OapiAlitripBtripApprovalNewResponse();
        try {
            System.out.println(JSON.toJSONString(request));
            execute = client.execute(request, accessToken);
            if (!execute.isSuccess()){
                throw new Exception(execute.getErrmsg());
            }
        } catch (ApiException e) {
            e.printStackTrace();
        }
    }

    public String createCenter() throws Exception {
        String accessToken = tokenManager.getAccessToken(appConfig.getAppKey(), appConfig.getAppSecret());
        OapiAlitripBtripCostCenterNewRequest.OpenCostCenterSaveRq rq = new OapiAlitripBtripCostCenterNewRequest.OpenCostCenterSaveRq();
        rq.setTitle("阿里商旅2");
        rq.setScope(1L);
        rq.setThirdpartId(UUID.randomUUID().toString());
        rq.setCorpid(appConfig.getCorpId());
        OapiAlitripBtripCostCenterNewRequest request = new OapiAlitripBtripCostCenterNewRequest();
        request.setRq(rq);
        DefaultDingTalkClient client = new DefaultDingTalkClient(UrlConstant.ALI_TRIP_BTRIP_COST_CENTER_NEW);
        OapiAlitripBtripCostCenterNewResponse execute;
        try {
            execute = client.execute(request, accessToken);
            if (execute.getErrcode() != 0) {
                throw new ApiException("-1", execute.getErrmsg());
            }
            createCostCenterEntitySet(rq.getThirdpartId());
            return rq.getThirdpartId();
        } catch (ApiException e) {
            e.printStackTrace();
        }
        return "";
    }

    public void createCostCenterEntitySet(String thirdCenterId) throws ApiException {
        String accessToken = tokenManager.getAccessToken(appConfig.getAppKey(), appConfig.getAppSecret());
        OapiAlitripBtripCostCenterEntityAddRequest.OpenCostCenterAddEntityRq rq = new OapiAlitripBtripCostCenterEntityAddRequest.OpenCostCenterAddEntityRq();
        OapiAlitripBtripCostCenterEntityAddRequest request = new OapiAlitripBtripCostCenterEntityAddRequest();
        List<OapiUserListsimpleResponse.ListUserSimpleResponse> userlist = getUserlist();
        rq.setCorpid(appConfig.getCorpId());
        rq.setThirdpartId(thirdCenterId);
        ArrayList<OapiAlitripBtripCostCenterEntityAddRequest.OpenOrgEntityDo> openOrgEntityDos = new ArrayList<>();
        for (OapiUserListsimpleResponse.ListUserSimpleResponse user : userlist) {
            OapiAlitripBtripCostCenterEntityAddRequest.OpenOrgEntityDo openOrgEntityDo = new OapiAlitripBtripCostCenterEntityAddRequest.OpenOrgEntityDo();
            openOrgEntityDo.setEntityId(user.getUserid());
            openOrgEntityDo.setEntityType("1");
            openOrgEntityDos.add(openOrgEntityDo);
        }
        rq.setEntityList(openOrgEntityDos);
        request.setRq(rq);

        DefaultDingTalkClient client = new DefaultDingTalkClient(UrlConstant.ALI_TRIP_BTRIP_COST_CENTER_ENTITY_SET);
        OapiAlitripBtripCostCenterEntityAddResponse execute;
        try {
            execute = client.execute(request, accessToken);
            if (execute.getErrcode() != 0) {
                throw new ApiException("-1", execute.getErrmsg());
            }
        } catch (ApiException e) {
            e.printStackTrace();
        }
    }

    /**
     * 获取三方成本中心id
     * @return
     * @throws Exception
     */
    public String queryCenter(String userId) throws Exception {
        String accessToken = tokenManager.getAccessToken(appConfig.getAppKey(), appConfig.getAppSecret());
        OapiAlitripBtripCostCenterQueryRequest request = new OapiAlitripBtripCostCenterQueryRequest();
        OapiAlitripBtripCostCenterQueryRequest.OpenCostCenterQueryRq rq = new OapiAlitripBtripCostCenterQueryRequest.OpenCostCenterQueryRq();
        rq.setCorpid(appConfig.getCorpId());
        rq.setUserid(userId);
        DefaultDingTalkClient client = new DefaultDingTalkClient(UrlConstant.ALI_TRIP_BTRIP_COST_CENTER_QUERY);
        request.setRq(rq);
        OapiAlitripBtripCostCenterQueryResponse execute;
        try {
            execute = client.execute(request, accessToken);
            if (execute.getErrcode() != 0) {
                throw new ApiException("-1", execute.getErrmsg());
            }
            return execute.getCostCenterList().get(0).getThirdpartId();
        } catch (ApiException e) {
            e.printStackTrace();
        }
        return "";
    }

    public void createInvoice() throws ApiException {
        String accessToken = tokenManager.getAccessToken(appConfig.getAppKey(), appConfig.getAppSecret());
        OapiAlitripBtripInvoiceSettingAddRequest.OpenInvoiceModifyAndNewRq rq = new OapiAlitripBtripInvoiceSettingAddRequest.OpenInvoiceModifyAndNewRq();
        OapiAlitripBtripInvoiceSettingAddRequest request = new OapiAlitripBtripInvoiceSettingAddRequest();
        rq.setCorpid(appConfig.getCorpId());
        rq.setType(1L);
        rq.setTitle("王赫测试公司");
        rq.setTaxNo("11111");
        rq.setThirdPartId(UUID.randomUUID().toString());
        request.setRq(rq);
        DefaultDingTalkClient client = new DefaultDingTalkClient(UrlConstant.ALI_TRIP_BTRIP_INVOICE_SETTING_ADD);
        OapiAlitripBtripInvoiceSettingAddResponse execute;
        try {
            execute = client.execute(request, accessToken);
            if (execute.getErrcode() != 0) {
                throw new ApiException("-1", execute.getErrmsg());
            }
        } catch (ApiException e) {
            e.printStackTrace();
        }
    }

    public OapiAlitripBtripInvoiceSearchResponse.OpenInvoiceDo queryInvoice(String userId) throws ApiException {
        String accessToken = tokenManager.getAccessToken(appConfig.getAppKey(), appConfig.getAppSecret());
        OapiAlitripBtripInvoiceSearchRequest request = new OapiAlitripBtripInvoiceSearchRequest();
        OapiAlitripBtripInvoiceSearchRequest.OpenInvoiceRq rq = new OapiAlitripBtripInvoiceSearchRequest.OpenInvoiceRq();
        rq.setCorpid(appConfig.getCorpId());
        rq.setUserid(userId);
        DefaultDingTalkClient client = new DefaultDingTalkClient(UrlConstant.ALI_TRIP_BTRIP_INVOICE_SEARCH);
        request.setRq(rq);
        OapiAlitripBtripInvoiceSearchResponse execute;
        try {
            execute = client.execute(request, accessToken);
            if (execute.getErrcode() != 0) {
                throw new ApiException("-1", execute.getErrmsg());
            }
            return execute.getInvoice().get(0);
        } catch (ApiException e) {
            e.printStackTrace();
        }
        return null;
    }


    public void approveFinish(FlowEntity flowEntity) throws Exception {
        String accessToken = tokenManager.getAccessToken(appConfig.getAppKey(), appConfig.getAppSecret());
        OapiAttendanceApproveFinishRequest request = new OapiAttendanceApproveFinishRequest();
        request.setUserid(flowEntity.getUserId());
        request.setBizType(2L);
        request.setFromTime(flowEntity.getFlowStartTime());
        request.setToTime(flowEntity.getFlowEndTime());
        request.setDurationUnit("day");
        request.setCalculateModel(1L);
        request.setTagName("出差");
        request.setSubType(flowEntity.getFlowName());
        request.setApproveId(UUID.randomUUID().toString());
        request.setJumpUrl(flowEntity.getUrl());
        DefaultDingTalkClient client = new DefaultDingTalkClient(UrlConstant.ATTENDANCE_APPROVE_FINISH);
        OapiAttendanceApproveFinishResponse execute = new OapiAttendanceApproveFinishResponse();
        try {
            execute = client.execute(request, accessToken);
        } catch (ApiException e) {
            e.printStackTrace();
        }
    }

    /**
     * 创建待办
     *
     * @param flowEntity userName,userId，
     * @return
     * @throws ApiException
     */
    public String createWorkRecordTask(FlowEntity flowEntity) throws ApiException {
        // 1. 获取access_token
//        String accessToken = AccessTokenUtil.getAccessToken();
        String accessToken = tokenManager.getAccessToken(appConfig.getAppKey(), appConfig.getAppSecret());
        //2创建实例
        String workRecord = createWorkRecord(flowEntity);
        //3创建待办任务
        OapiProcessWorkrecordTaskCreateRequest request = new OapiProcessWorkrecordTaskCreateRequest();
        OapiProcessWorkrecordTaskCreateRequest.SaveTaskRequest saveTaskRequest = new OapiProcessWorkrecordTaskCreateRequest.SaveTaskRequest();
        ArrayList<OapiProcessWorkrecordTaskCreateRequest.TaskTopVo> taskTopVos = new ArrayList<>();
        OapiProcessWorkrecordTaskCreateRequest.TaskTopVo taskTopVo = new OapiProcessWorkrecordTaskCreateRequest.TaskTopVo();
        taskTopVo.setUserid(flowEntity.getUserId());
        taskTopVo.setUrl(flowEntity.getUrl());
        taskTopVos.add(taskTopVo);
        saveTaskRequest.setTasks(taskTopVos);
        saveTaskRequest.setProcessInstanceId(workRecord);
        request.setRequest(saveTaskRequest);
        DingTalkClient client = new DefaultDingTalkClient(UrlConstant.PROCESS_WORK_RECORD_TASK_CREATE);
        OapiProcessWorkrecordTaskCreateResponse execute = client.execute(request, accessToken);
        if (execute.getErrcode() != 0) {
            throw new ApiException("-1", execute.getErrmsg());
        }
        flowEntity.setWorkRecordId(workRecord);
        hashMap.put(flowEntity.getUuid(), flowEntity);
        return workRecord;
    }

    /**
     * 先不用
     *
     * @param flowEntity
     * @throws ApiException
     */
    public void updateWorkRecordTask(FlowEntity flowEntity) throws ApiException {
        // 1. 获取access_token
//        String accessToken = AccessTokenUtil.getAccessToken();
        String accessToken = tokenManager.getAccessToken(appConfig.getAppKey(), appConfig.getAppSecret());
        OapiProcessWorkrecordUpdateRequest oapiProcessWorkrecordUpdateRequest = new OapiProcessWorkrecordUpdateRequest();
        OapiProcessWorkrecordUpdateRequest.UpdateProcessInstanceRequest updateProcessInstanceRequest = new OapiProcessWorkrecordUpdateRequest.UpdateProcessInstanceRequest();
        updateProcessInstanceRequest.setAgentid(appConfig.getAgentId());
        updateProcessInstanceRequest.setProcessInstanceId(flowEntity.getWorkRecordId());
        updateProcessInstanceRequest.setStatus("COMPLETED");
        updateProcessInstanceRequest.setResult(flowEntity.getFlowStatus());
        oapiProcessWorkrecordUpdateRequest.setRequest(updateProcessInstanceRequest);
        DingTalkClient client = new DefaultDingTalkClient(UrlConstant.PROCESS_WORK_RECORD_UPDATE);
        OapiProcessWorkrecordUpdateResponse execute = client.execute(oapiProcessWorkrecordUpdateRequest, accessToken);
    }

    /**
     * 获取待办列表
     *
     * @param flowEntity
     * @throws ApiException
     */
    public OapiProcessWorkrecordTaskQueryResponse getTasks(FlowEntity flowEntity) throws ApiException {
        // 1. 获取access_token
//        String accessToken = AccessTokenUtil.getAccessToken();
        String accessToken = tokenManager.getAccessToken(appConfig.getAppKey(), appConfig.getAppSecret());
        OapiProcessWorkrecordTaskQueryRequest oapiProcessWorkrecordTaskQueryRequest = new OapiProcessWorkrecordTaskQueryRequest();
        oapiProcessWorkrecordTaskQueryRequest.setUserid(flowEntity.getUserId());
        oapiProcessWorkrecordTaskQueryRequest.setOffset(0L);
        oapiProcessWorkrecordTaskQueryRequest.setCount(50L);
        oapiProcessWorkrecordTaskQueryRequest.setStatus(flowEntity.getTaskStatus());
        DingTalkClient client = new DefaultDingTalkClient(UrlConstant.PROCESS_WORK_RECORD_TASK_QUERY);
        OapiProcessWorkrecordTaskQueryResponse execute = client.execute(oapiProcessWorkrecordTaskQueryRequest, accessToken);
        return execute;
    }

    /**
     * 获取根部门用户集合
     */
    public List<OapiUserListsimpleResponse.ListUserSimpleResponse> getUserlist() throws ApiException {
        String accessToken = tokenManager.getAccessToken(appConfig.getAppKey(), appConfig.getAppSecret());
        OapiUserListsimpleRequest oapiUserListsimpleRequest = new OapiUserListsimpleRequest();
        oapiUserListsimpleRequest.setDeptId(1L);
        oapiUserListsimpleRequest.setCursor(0L);
        oapiUserListsimpleRequest.setSize(100L);
        oapiUserListsimpleRequest.setOrderField("entry_asc");
        DingTalkClient client = new DefaultDingTalkClient(UrlConstant.USER_LIST_SIMPLE);
        OapiUserListsimpleResponse execute = client.execute(oapiUserListsimpleRequest, accessToken);
        if (execute.getErrcode() != 0) {
            throw new ApiException(execute.getErrmsg());
        }
        List<OapiUserListsimpleResponse.ListUserSimpleResponse> list = execute.getResult().getList();
        return list;
    }

    public Object selectUuid(String uuid) {
        return hashMap.get(uuid);
    }



    public String getAddress(FlowEntity flowEntity) throws ApiException {
        String accessToken = tokenManager.getAccessToken(appConfig.getAppKey(), appConfig.getAppSecret());
        OapiAlitripBtripAddressGetRequest request = new OapiAlitripBtripAddressGetRequest();
        OapiAlitripBtripAddressGetRequest.OpenApiJumpInfoRq rq = new OapiAlitripBtripAddressGetRequest.OpenApiJumpInfoRq();
        rq.setCorpid(appConfig.getCorpId());
        rq.setUserid(flowEntity.getUserId());
        rq.setType(1L);
        rq.setActionType(4L);
        request.setRequest(rq);
        DingTalkClient client = new DefaultDingTalkClient(UrlConstant.ALI_TRIP_BTRIP_ADDRESS_GET);
        OapiAlitripBtripAddressGetResponse execute = client.execute(request, accessToken);
        if (execute.getErrcode() != 0) {
            throw new ApiException(execute.getErrmsg());
        }
        return execute.getResult().getUrl();
    }
}
