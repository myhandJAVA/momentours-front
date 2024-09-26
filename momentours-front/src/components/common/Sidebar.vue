<template>
  <div class="sidebar-overlay" v-if="isActive" @click="closeSidebar">
    <div class="sidebar" @click.stop>
      <div class="logo-container">
    <div class="momentours-logo">
      <img src="@/assets/icons/momentours-logo.svg" alt="logo">
    </div>
    <div class="momentours">Momentours</div>
  </div>
  <div class="menu-container">
    <div class="sidebar_divider"></div>
    <div class="menu-item2">홈</div>
    <div class="sidebar_divider"></div>
    <div class="menu-item">마이페이지</div>
    <div class="menu-item2">커플페이지</div>
    <div class="sidebar_divider"></div>
    <div class="pages">PAGES</div>
    <div class="menu-item">추억</div>
    <div class="menu-item">추억코스</div>
    <div class="menu-item">예정데이트코스</div>
    <div class="menu-item">일기</div>
    <div class="menu-item">랜덤질문</div>
    <div class="menu-item2">일정</div>
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
