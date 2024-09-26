<template>
  <header>
    <Header/>
  </header>
  <main>
    <MainPage/>
  </main>
  <footer>
    <Footer/>  
  </footer>
</template>

<script setup>
  import Footer from './components/common/footer.vue';
  import Header from './components/common/Header.vue';
  import MainPage from './views/HomeView.vue';
</script>

<style scoped>
</style>