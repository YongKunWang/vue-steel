<template>
  <el-container class="home-container">
    <el-aside :width="isCollapse ? '64px':'200px'">
      <el-menu
        class="el-menu-vertical-demo"
        background-color="#304156"
        text-color="#fff"
        active-text-color="#409EFF"
        unique-opened
        :collapse="isCollapse"
        :collapse-transition="false"
        :router="true"
        :default-active="activePath"
      >
        <!--一级菜单-->
        <el-menu-item index="/home" @click="saveNavState('/home', null, null)">
          <i class="el-icon-s-platform"></i>
          <span slot="title">监控面板</span>
        </el-menu-item>
        <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
          <template slot="title">
            <i :class=iconObjs[item.id]></i>
            <span>{{item.authName}}</span>
          </template>
            <!--二级菜单-->
            <el-menu-item :index="'/'+subItem.path" v-for="subItem in item.children" :key="subItem.id" @click="saveNavState('/'+subItem.path, item.authName, subItem.authName)">
              <template>
                <i class="el-icon-menu"></i>
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>

        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container class="right-container">
      <el-header>
        <div class="navbar">
          <div class="logo-container">
            <i :class="isCollapse ? 'el-icon-s-unfold':'el-icon-s-fold'" style="padding: 0 15px; font-size: 24px" @click="toggleCollapse"></i>
          </div>
          <div class="bread-crumb">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item v-if="this.activePathLevel0 != null">{{this.activePathLevel0}}</el-breadcrumb-item>
              <el-breadcrumb-item v-if="this.activePathLevel1 != null">{{this.activePathLevel1}}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div class="user-container">
            <el-dropdown trigger="click" @command="handleCommand">
              <span class="el-dropdown-link">
                <el-avatar shape="square" :size="size" :src="squareUrl"></el-avatar>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="home">主页</el-dropdown-item>
                <el-dropdown-item command="logOut" divided>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      menuList: [],
      iconObjs: {
        100: 'iconfont icon-showpassword',
        101: 'iconfont icon-tijikongjian',
        102: 'iconfont icon-shangpin',
        103: 'iconfont icon-danju',
        104: 'iconfont icon-baobiao'
      },
      isCollapse: false,
      // 激活路径
      activePath: '',
      // 个人图标链接
      squareUrl: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80',
      // 个人图标大小
      size: 'large',
      // 面包屑导航
      activePathLevel0: '',
      activePathLevel1: ''
    }
  },
  created () {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
    this.activePathLevel0 = window.sessionStorage.getItem('activePathLevel0')
    this.activePathLevel1 = window.sessionStorage.getItem('activePathLevel1')
  },
  methods: {
    // 获得侧边栏列表
    async getMenuList () {
      const { data: res } = await this.$http.get('item/menus')
      if (res.meta.status !== 1000) return this.$message.error(res.meta.msg)
      // this.$message.success(res.meta.msg)
      // console.log(res)
      this.menuList = res.data
      // console.log(this.menuList)
    },
    // 保存链接的激活状态
    saveNavState (activePath, activePathLevel0, activePathLevel1) {
      // 记录链接状态
      window.sessionStorage.setItem('activePath', activePath)
      // 面包屑导航
      window.sessionStorage.setItem('activePathLevel0', activePathLevel0)
      window.sessionStorage.setItem('activePathLevel1', activePathLevel1)
      this.activePath = activePath
      this.activePathLevel0 = activePathLevel0
      this.activePathLevel1 = activePathLevel1
    },
    // 点击按钮，切换菜单的折叠与展开
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    },
    // 下拉菜单的指令
    handleCommand (command) {
      this.activePath = null
      this.activePathLevel0 = null
      this.activePathLevel1 = null
      if (command === 'home') {
        this.$router.push('/home')
      }
      if (command === 'logOut') {
        this.$router.push('/login')
      }
    },
    // 清除
    cleanBreadCrumb () {
      console.log('hhh')
    }
  }
}
</script>

<style lang="less" scoped>
  .home-container {
    height: 100%;
  }
  .el-aside {
    color: #fff;
    background-color: #304156;
  }
  .right-container {
    width: 100%;
  }
  .el-header {
    height: 50px !important;
    width: 100%;
    padding: 0;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    line-height: 50px;
    font-size: 14px;
    .navbar {
      height: 50px;
      overflow: hidden;
      position: relative;
      .logo-container {
        height: 100%;
        line-height: 60px;
        float: left;
        cursor: pointer;
      }
      .bread-crumb {
        float: left;
        margin-left: 20px;
        height:50px;
        font-size: 14px;
        .el-breadcrumb {
          line-height: 50px !important;
        }
      }
      .user-container {
        float: right;
        width: 70px;
        height: 50px;
        margin-top: 5px;
      }
    }
  }
  .el-main {
    width: 100%;
    height: 100%;
    padding: 10px 5px 0px;
    margin: 0;
  }
  .el-menu {
    border-right:0!important;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>
