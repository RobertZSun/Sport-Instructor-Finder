# Coach Finder

---

## 目录

1. 项目简介
2. 项目使用效果图
3. 安装说明
4. 关于作者

## 1. 项目简介

此项目是为了方便体育运动爱好者轻松的找到自己喜爱的运动教练而设立的网站，同时允许网站的用户注册成为运动教练，同时接收查看其他用户给自己的联系留言。此项目一共有 6 个模块，分别为：

1. 供用户登录和注册此网站
2. 登记注册为运动教练
3. 注册为教练后，可查看收到的有意向的人的微信联系方式和留言信息
4. 任何访问网站的人可向每一个教练发送联系请求
5. 筛选想要学习运动领域的培训讲师
6. 查看每个教练的个人详细介绍个人履历

此项目为运动教练和想学习某项运动的人提供了一对一培训直接沟通的机会，搭建了平台。

## 2. 效果图

筛选教练，查看教练个人信息履历，给教练留言

![image](https://img-blog.csdnimg.cn/83d59f1f66a54c7698f00da8fe7beada.gif)


用户登录，查看网站用户私信的留言和联系方式

用户注册，注册成为某些/项运动的运动教练，同时查看个人收到的私信信息

![image](https://img-blog.csdnimg.cn/6d34703b4ad24fcbb38048c8bf8815c2.gif#pic_center)

## 3. 安装说明

### 环境依赖

node v14.0.0+

### 部署安装

1. 创建属于你自己的 Firebase Project： check => https://console.firebase.google.com/
   ![image](https://img-blog.csdnimg.cn/20210428211607145.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjY1NTcxNw==,size_16,color_FFFFFF,t_70)
2. 创建完 Project 之后，创建属于你自己的 Realtime Database， 并获取到你 database 的 api 链接， 复制到记事本，以备稍后使用
   ![image](https://img-blog.csdnimg.cn/20210428211553275.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjY1NTcxNw==,size_16,color_FFFFFF,t_70)
3. 启用邮箱验证登录功能
   ![image](https://img-blog.csdnimg.cn/20210428211703131.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjY1NTcxNw==,size_16,color_FFFFFF,t_70)

4. 点击项目概览小齿轮下的项目设置，以获取登录验证 api 密钥，复制到记事本，以备稍后使用
   ![image](https://img-blog.csdnimg.cn/20210428212050495.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjY1NTcxNw==,size_16,color_FFFFFF,t_70)

plus： 查看 [Firebase Auth REST Api](https://firebase.google.com/docs/reference/rest/auth?authuser=0#section-create-email-password). 对应的用户注册和登记 api 链接
![image](https://img-blog.csdnimg.cn/20210428213455260.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjY1NTcxNw==,size_16,color_FFFFFF,t_70)

5. 替换store/module/auth 模块中的 actions 文件中 API_KEY 为 4 中复制好的 api key
6. 替换store/module/coaches 模块中的 actions 文件中 baseUrl 为 2 中复制好的 api 
7. 替换store/module/requests 模块中的 actions 文件中 baseUrl 为 2 中复制好的 api 
8. npm install //安装 node 运行环境
9. npm run serve // 在开发模式下启动项目
10. npm run build // 构建生产环境文件

## 4. 关于作者

Robert Sun

Email: robertsunzhe@hotmail.com

Tel: 18911604329
