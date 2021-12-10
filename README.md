# 阿里商旅实现费控报销demo

## 功能介绍
企业开通阿里商旅，员工在企业自建应用或三方应用内提交差旅申请通过，跳转阿里商旅订购，差旅数据实时同步回应用，实现差旅全场景申请、审批、订票、报销一体化的流程，避免人工填写出错，规范整体费用支出操作

## 项目结构

backend：后端模块，springboot构建，钉钉接口功能包括：获取token，免登陆，创建和更新审批模板等。

frontend：前端模块，react构建，场景功能包括：免登操作、展示单据详情，审批待办，发送审批消息等。



## 研发环境准备

1. 需要有一个钉钉注册企业，如果没有可以创建：https://oa.dingtalk.com/register_new.htm#/

2. 成为钉钉开发者，参考文档：https://developers.dingtalk.com/document/app/become-a-dingtalk-developer

3. 登录钉钉开放平台后台创建一个H5应用： https://open-dev.dingtalk.com/#/index

4. 配置应用

   配置开发管理，参考文档：https://developers.dingtalk.com/document/app/configure-orgapp

    - **此处配置“应用首页地址”需公网地址，若无公网ip，可使用钉钉内网穿透工具：**

      https://developers.dingtalk.com/document/resourcedownload/http-intranet-penetration

![image-2021120201](https://z3.ax1x.com/2021/12/02/otwOot.png)



配置相关权限：https://developers.dingtalk.com/document/app/address-book-permissions

开通阿里商旅后，需要在后台配置发票信息和成本中心

本demo使用接口相关权限：

“通讯录部门信息读权限”、“通讯录部门成员读权限”、“成员信息读权限”、“企业调用接口执行审批操作的权限”、“审批流数据管理权限”、“考勤组管理权限”、“阿里商旅专用权限点”、“阿里商旅专用写入权限点”

![image-2021120202](https://z3.ax1x.com/2021/12/02/ot0ot0.png)

## 脚本启动（推荐）

### 脚本说明

脚本中内置了内网穿透工具，不需要再额外启动

```shell
dingBoot-linux.sh     # linux版本
dingBoot-mac.sh       # mac版本
dingBoot-windows.bat  # windows版本
```

### 启动命令

执行时将其中参数替换为对应的应用参数，在backend目录下执行（脚本同级目录），参数获取方法：

1. 获取corpId——开发者后台首页：https://open-dev.dingtalk.com/#/index
2. 进入应用开发-企业内部开发-点击进入应用-基础信息-获取appKey、appSecret、agentId

- **启动linux脚本**

```shell
./dingBoot-linux.sh start {项目名} {端口号} {appKey} {appSecret} {agentId} {corpId}
```
- **mac系统(mac m1芯片暂不支持)**

```shell
./dingBoot-mac.sh start {项目名} {端口号} {appKey} {appSecret} {agentId} {corpId}
```
- **windows系统 使用cmd命令行启动**

```shell
./dingBoot-windows.bat {项目名} {端口号} {appKey} {appSecret} {agentId} {corpId}
```

- **示例（linux脚本执行）**

```sh
 ./dingBoot-linux.sh start h5-demo 8080 ding1jmkwa4o19bxxxx ua2qNVhleIx14ld6xgoZqtg84EE94sbizRvCimfXrIqYCeyj7b8QvqYxxx 122549400 ding9f50b15bccd1000
```

### 启动后配置

1. **配置地址**

启动完成会自动生成临时域名，配置方法：进入开发者后台->进入应用->开发管理->应用首页地址和PC端首页地址

2. **发布应用**

配置好地址后进入“版本管理与发布页面”，发布应用，发布后即可在PC钉钉或移动钉钉工作台访问应用

## 手动启动

### 下载本项目至本地

```shell
git clone https://github.com/open-dingtalk/h5app-ali-trip-dome.git
```

### 获取相应参数

获取到以下参数，修改后端application.yaml

```yaml
app:
  app_key: *****
  app_secret: *****
  agent_id: *****
  corp_id: *****
```

参数获取方法：登录开发者后台

1. 获取corpId：https://open-dev.dingtalk.com/#/index
2. 进入应用开发-企业内部开发-点击进入应用-基础信息-获取appKey、appSecret、agentId

### 修改前端页面

**打开项目，命令行中执行以下命令，编译打包生成build文件**

```shell
cd front-end
npm install
npm run build
```

**将打包好的静态资源文件放入后端**

![image-20210706173224172](https://img.alicdn.com/imgextra/i2/O1CN01QLp1Qw1TCVrPddfjZ_!!6000000002346-2-tps-322-521.png)

### 启动项目

- 启动springboot
- 移动端钉钉点击工作台，找到应用，进入应用

### 页面展示

操作列表

![](https://img.alicdn.com/imgextra/i3/O1CN01opqTlP21ymZhoiauS_!!6000000007054-2-tps-399-268.png)

差旅申请

![](https://img.alicdn.com/imgextra/i2/O1CN01wTCejI1LoyE9UEl0q_!!6000000001347-2-tps-400-1607.png)

待办列表

![](https://img.alicdn.com/imgextra/i2/O1CN010XNrVv2AH7M2l4waR_!!6000000008177-2-tps-400-756.png)

待办详情

![](https://img.alicdn.com/imgextra/i4/O1CN01krD81Q1XrVoTNEUiS_!!6000000002977-2-tps-400-758.png)

单据同步阿里商旅

![](https://img.alicdn.com/imgextra/i4/O1CN01eOSLeT1F81OJrAk7G_!!6000000000441-2-tps-400-797.png)

阿里商旅订购 

![](https://img.alicdn.com/imgextra/i2/O1CN016LZmCo1mACbD9p34E_!!6000000004913-2-tps-400-797.png)


### **参考文档**

1. 获取企业内部应用access_token，文档链接：https://developers.dingtalk.com/document/app/obtain-orgapp-token
2. 创建或更新审批模板，文档链接：https://developers.dingtalk.com/document/app/save-approval-template
3. 创建实例，文档链接：https://developers.dingtalk.com/document/app/initiate-an-approval-process-without-a-process
4. 更新实例状态，文档链接：https://developers.dingtalk.com/document/app/to-do-instance-status
5. 创建待办事项，文档链接：https://developers.dingtalk.com/document/app/create-a-to-do-task
6. 更新待办状态，文档链接：https://developers.dingtalk.com/document/app/update-to-do-task-status
7. 获取模板code接口，文档链接：https://developers.dingtalk.com/document/app/obtains-the-template-code-based-on-the-template-name
8. 获取待办列表，文档链接：https://developers.dingtalk.com/document/app/query-a-user-s-to-do-items
9. 获取部门用户基础信息，文档链接：https://developers.dingtalk.com/document/app/queries-the-simple-information-of-a-department-user
11. 审批完成通知接口，文档链接：https://open.dingtalk.com/document/orgapp-server/notice-of-approval
12. 创建成本中心，文档链接：https://open.dingtalk.com/document/orgapp-server/new-cost-center
13. 查询成本中心，文档链接：https://open.dingtalk.com/document/orgapp-server/query-cost-center
14. 创建发票信息，文档链接：https://open.dingtalk.com/document/orgapp-server/new-invoice-configuration
15. 查询发票信息，文档链接：https://open.dingtalk.com/document/orgapp-server/query-available-invoices
16. 设置成本中心人员，文档链接：https://open.dingtalk.com/document/orgapp-server/set-up-cost-center-personnel-information
17. 获取商旅跳转url，文档链接：https://open.dingtalk.com/document/orgapp-server/obtain-business-travel-access-addresses
