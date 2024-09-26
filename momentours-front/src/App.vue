<template>
  <div class="app-flex-container">
  <header class="header">
    <Header/>
    <nav style="text-align: center;">
        <tr>
          <td><RouterLink class="link-button" to="/couple" replace>couple</RouterLink></td>
          <td><RouterLink class="link-button" to="/diary" replace>diary</RouterLink></td>
          <td><RouterLink class="link-button" to="/moment" replace>moment</RouterLink></td>
          <td><RouterLink class="link-button" to="/momentcourse" replace>momentcourse</RouterLink></td>
          <td><RouterLink class="link-button" to="/randomquestion" replace>randomquestion</RouterLink></td>
          <td><RouterLink class="link-button" to="/schedule" replace>schedule</RouterLink></td>
          <td><RouterLink class="link-button" to="/todocourse" replace>todocourse</RouterLink></td>
          <td><RouterLink class="link-button" to="/user" replace>user</RouterLink></td>
        </tr>
    </nav>
  </header>
  <main class="main">
        <RouterView/>
  </main>
  <footer class="footer">
    <Footer/>  
  </footer>
  </div>
</template>

<script setup>
  import Footer from './components/common/footer.vue';
  import Header from './components/common/Header.vue';
</script>

<style scoped>
  .app-flex-container{
    display: flex;
    flex-direction: column;
    align-items: normal;
    justify-content: space-evenly;
  }
  .main{
    height:90vh;
  }
  .link-button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #f2f2f2;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-decoration: none;
  color: #333;
}
</style>