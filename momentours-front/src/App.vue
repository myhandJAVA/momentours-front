<template>
  <header>
    <Header/>
  </header>
  <main>
    <div class="dd">
      <!-- 업로드 버튼 -->
      <CommonPinkButton label="업로드"/>
      <CommonBrownButton label="갈색버튼"/>
      <CommonLightBrownButton label="연한갈색버튼"/>
      <MainPage/>
    </div>
  </main>
  <footer>
    <Footer/>  
  </footer>
</template>

<script setup>
  import Footer from './components/common/footer.vue';
  import Header from './components/common/Header.vue';
  import CommonPinkButton from './components/common/CommonPinkButton.vue';
  import CommonBrownButton from './components/common/CommonBrownButton.vue';
  import CommonLightBrownButton from './components/common/CommonLightBrownButton.vue';
  import MainPage from './views/HomeView.vue';
</script>


<style scoped>
  .dd {
    margin-top: 10px;
    height: 50px;
  }
</style>