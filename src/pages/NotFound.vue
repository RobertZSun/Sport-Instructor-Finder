<template>
  <el-row >
    <el-col :span='12' :offset='6'>
      <div class='content'>
        <el-row>
          <el-image
            src='https://img-blog.csdnimg.cn/20210622130139724.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjY1NTcxNw==,size_16,color_FFFFFF,t_70'
            fit='contain'></el-image>
        </el-row>
        <el-row type='flex' align='middle'>
          <el-col :span='14' :offset='4'><h1>不好！你好像迷路了，要不回首页吧~ </h1></el-col>
          <el-col :span='3'>
            <el-link href='/' :underline='false'>
              <el-button type='primary'>首页</el-button>
            </el-link>
          </el-col>
        </el-row>
      </div>
    </el-col>
  </el-row>
</template>