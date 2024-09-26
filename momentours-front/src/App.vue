<template>
  <div class="app-container">
    <Header @toggle-sidebar="toggleSidebar" />
    <Sidebar :is-active="isSidebarActive" @close="closeSidebar" />
      <main>
        <!-- 메인 콘텐츠가 여기에 들어갑니다 -->
         <HomeView/>
      </main>
    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Footer from './components/common/Footer.vue';
import Header from './components/common/Header.vue';
import Sidebar from './components/common/Sidebar.vue';

import HomeView from './views/HomeView.vue';

const isSidebarActive = ref(false);

const toggleSidebar = () => {
  isSidebarActive.value = !isSidebarActive.value;
};

const closeSidebar = () => {
  isSidebarActive.value = false;
};
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}


main {
  flex: 1;
}
</style>