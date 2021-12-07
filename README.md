# （demo名称）

> - （demo介绍）
> - （demo结构）
>



## 研发环境准备

1. 需要有一个钉钉注册企业，如果没有可以创建：https://oa.dingtalk.com/register_new.htm#/

2. 成为钉钉开发者，参考文档：https://developers.dingtalk.com/document/app/become-a-dingtalk-developer

3. 登录钉钉开放平台后台创建一个H5应用： https://open-dev.dingtalk.com/#/index

4. 配置应用

   配置开发管理，参考文档：https://developers.dingtalk.com/document/app/configure-orgapp

    - **此处配置“应用首页地址”需公网地址，若无公网ip，可使用钉钉内网穿透工具：**

      https://developers.dingtalk.com/document/resourcedownload/http-intranet-penetration

![image-20210706171740868](https://img.alicdn.com/imgextra/i4/O1CN01C9ta8k1L3KzzYEPiH_!!6000000001243-2-tps-953-517.png)



配置相关权限：https://developers.dingtalk.com/document/app/address-book-permissions

本demo使用接口相关权限：

（列举该demo需要申请的权限）

![image-20210706172027870](https://img.alicdn.com/imgextra/i3/O1CN016WCr6428wDdBhkWi6_!!6000000007996-2-tps-1358-571.png)

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
git clone (demo下载地址)
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

（页面截图/功能效果截图）

### **参考文档**

1. 获取企业内部应用access_token，文档链接：https://developers.dingtalk.com/document/app/obtain-orgapp-token
2. （请完善文档）
