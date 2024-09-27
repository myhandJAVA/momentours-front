<template>
  <div class="sidebar-overlay" v-if="isActive" @click="closeSidebar">
    <div class="sidebar" @click.stop>
      <div class="logo-container">
    <div class="momentours-logo">
      <img src="@/assets/icons/momentours-logo.svg" alt="logo" class="logo-icon">
    </div>
    <div class="momentours">Momentours</div>
  </div>
  <div class="menu-container">
    <div class="sidebar_divider"></div>
    <div class="menu-item2"><RouterLink class="link-button" to="/" replace>홈</RouterLink></div>
    <div class="sidebar_divider"></div>
    <div class="menu-item"><RouterLink class="link-button" to="/mypage">마이페이지</RouterLink></div>
    <div class="menu-item2"><RouterLink class="link-button" to="/couplepage">커플페이지</RouterLink></div>
    <div class="sidebar_divider"></div>
    <div class="pages">PAGES</div>
    <div class="menu-item"><RouterLink class="link-button" to="/moment">추억</RouterLink></div>
    <div class="menu-item"><RouterLink class="link-button" to="/momentcourse">추억코스</RouterLink></div>
    <div class="menu-item"><RouterLink class="link-button" to="/todocourse">예정데이트코스</RouterLink></div>
    <div class="menu-item"><RouterLink class="link-button" to="/diary">일기</RouterLink></div>
    <div class="menu-item"><RouterLink class="link-button" to="/randomquestion">랜덤질문</RouterLink></div>
    <div class="menu-item2"><RouterLink class="link-button"to="/schedule" replace>일정</RouterLink></div>
    <div class="sidebar_divider"></div>
    <div class="menu-item">공지</div>
    <div class="menu-item">로그아웃</div>
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
</style>
