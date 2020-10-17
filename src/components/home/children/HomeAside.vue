<template>
       <el-aside :style="{width:asideWidth+'px'}">
        <div class="toggle-button" @click="toggle">|||</div>        
        <el-menu :default-active="activePath" background-color="#1E1E1E" text-color="#fff" :unique-opened="true" :collapse='iscollapse' :collapse-transition='false' :router="true">
          <!-- 一级菜单 -->
          <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id">
            <template slot="title">
              <i :class="iconList[item.id]"></i>
             <span>{{ item.authName }}</span> 
            </template>
            <!-- 二级菜单 -->
            <el-menu-item :index="'/'+itemx.path" v-for="itemx in item.children" :key="itemx.children.id" @click="saveNavState('/'+itemx.path)">
              <template slot="title">
                <i class="el-icon-menu"></i>
                {{ itemx.authName }}</template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
</template>

<script>
export default {
  name: 'HomeAside',
  props: {
    menuList:{
        type:Array,
        default(){
            return []
        }
    }
  },
  data () {
    return {
         iconList:{
        '125':'el-icon-user-solid',
        '103':'el-icon-s-platform',
        '101':'el-icon-goods',
        '102':'el-icon-s-order',
        '145':'el-icon-s-data',
      },
        asideWidth:200,
        iscollapse:false ,
        activePath:''
    }
  },
  created () {
    this.activePath=window.sessionStorage.getItem('path')
  },

  methods:{
    toggle(){
      this.iscollapse=!this.iscollapse
      this.asideWidth=this.iscollapse?64:200
    },
    saveNavState(path){
      window.sessionStorage.setItem('path',path)
      this.activePath=path
    }
  }
 }

</script>

<style lang='less' scoped>
.el-aside {
  background-color: #1E1E1E;
  .el-menu{
    border-right: none;
  }
  .toggle-button{
    background-color: #253038;
    text-align: center;
    letter-spacing: 3px;
    cursor: pointer;
  }
}
</style>
