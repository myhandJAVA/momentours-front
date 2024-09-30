<template>
  <div class="sidebar-overlay" v-if="isActive" @click="closeSidebar">
    <div class="sidebar" @click.stop>
      <div class="logo-container">
    <div class="momentours-logo" @click="toHomeRouter">
      <img src="@/assets/icons/momentours-logo.svg" alt="logo" class="logo-icon">
    </div>
    <div class="momentours" @click="toHomeRouter">Momentours</div>
  </div>
  <div class="menu-container">
  <div class="sidebar_divider"></div>
  
  <RouterLink class="menu-item link-button" to="/" replace>홈</RouterLink>
  <div class="sidebar_divider"></div>
  
  <RouterLink class="menu-item link-button" to="/mypage">마이페이지</RouterLink>
  <RouterLink class="menu-item link-button" to="/couplepage">커플페이지</RouterLink>
  
  <div class="sidebar_divider"></div>
  
  <div class="pages">PAGES</div>
  
  <RouterLink class="menu-item link-button" to="/moment">추억</RouterLink>
  <RouterLink class="menu-item link-button" to="/momentcourse">추억코스</RouterLink>
  <RouterLink class="menu-item link-button" to="/todocourse">예정데이트코스</RouterLink>
  <RouterLink class="menu-item link-button" to="/diary">일기</RouterLink>
  <RouterLink class="menu-item link-button" to="/randomquestion">랜덤질문</RouterLink>
  
  <RouterLink class="menu-item2 link-button" to="/schedule" replace>일정</RouterLink>
  
  <div class="sidebar_divider"></div>
  
  <div class="menu-item">공지</div>
  <div class="menu-item" @click="logoutAndHome">로그아웃</div>
</div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps(['isActive']);
const emit = defineEmits(['close']);

const closeSidebar = () => {
  emit('close');
};

const logoutAndHome = () =>{
  window.alert("로그아웃 되었습니다!");
  router.push('/');
}

import { useRouter } from 'vue-router';
  const router = useRouter();
  const toHomeRouter = ()=>{
    router.push('/');
};
</script>

<style src="@/assets/css/side.css"></style>
<style scoped>
  .menu-item2:hover,
.menu-item2:hover :deep(a),
.menu-item2:hover :deep(*) {
  color: #FFFFFF;
}
.menu-item:hover,
.menu-item:hover :deep(a),
.menu-item:hover :deep(*) {
  color: #FFFFFF;
}
.link-button {
  text-decoration: none;

}
.momentours{
  cursor: pointer;
  transition: all 0.3s ease;
}
.momentours-logo{
  cursor: pointer;
  transition: all 0.3s ease;
}
</style>
