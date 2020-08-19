<template>
    <el-container>
        <el-aside width="200px">
            <el-col>
                <div class="logo">
                    <img src="../assets/logo.png"/>
                </div>
                <el-menu
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#020c18"
                default-active="/blemish_news"
                router
                text-color="#fff"
                active-text-color="#fff">
                    <el-submenu>
                        <template slot="title">
                        <i class="el-icon-smoking"></i>
                        <span>污点劣迹</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/blemish_tag">标签管理</el-menu-item>
                            <el-menu-item index="/blemish_news">新闻检索</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>

                    <el-submenu>
                        <template slot="title">
                        <i class="el-icon-s-home"></i>
                        <span>机构官网</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item>待开发</el-menu-item>
                            <el-menu-item>待开发</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>

                </el-menu>
            </el-col>
        </el-aside>
        <el-container>
            <el-header></el-header>
            <el-main><router-view></router-view></el-main>
        </el-container>
    </el-container>
</template>
<script>
export default {
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style>
html, body, #app, .el-container {
    padding: 0px;
    margin: 0px;
    height: 100%;
}
.el-submenu .el-menu-item {
    min-width: 190px !important;
}
.el-menu-item:hover {
    background: #1890ff !important;
}
.el-submenu__title:hover {
    background: #1890ff !important;
}
.el-menu-item.is-active {
    background: #1890ff !important;
}
.el-submenu__title.is-active {
    background: #1890ff !important;
}
.el-menu-item-group__title {
    padding: 0px !important;
}
.el-aside {
    background-color: #03132a;
}
.el-submenu {
    width: 200px !important;
}
.logo {
    width: 200px;
    height: 55px;
    background-color: #01274e;
}
.logo img {
    width: 100%;
    height: 100%;
}
.el-header {
    height: 56px !important;
    background-color: #fdfffe;
    border-bottom: #dcdfe6 1px solid;
}
.el-main {
    background-color: #f2f4f3;
}
td {
    padding: 3px !important;
    text-align: center !important;
}
th {
    text-align: center !important;
}
</style>
