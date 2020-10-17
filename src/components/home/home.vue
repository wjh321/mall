<template>
  <el-container class="mainBox" direction="vertical">
    <!-- 1头部区域 -->
    <home-header></home-header>
    <!-- 2主体区域 -->
    <el-container>
      <home-aside :menu-list='menuList'></home-aside>
      <home-main></home-main>
    </el-container>
  </el-container>
</template>

<script>
import { getMeauList } from "../../network/menu";
import HomeAside from '@/components/home/children/HomeAside'
import HomeHeader from '@/components/home/children/HomeHeader'
import HomeMain from '@/components/home/children/HomeMain'
export default {
  name: "home",
  data() {
    return {
      menuList:[],
    }
  },
  components:{
    HomeAside,
    HomeHeader,
    HomeMain
  },
  created() {
    getMeauList().then((res) => {
      this.menuList = res.data;
    });
  },
  methods: {
   
  }
}
</script>

<style lang="less" scoped>
.mainBox {
  height: 100%;
/*   background-color: green; */
}

</style>
