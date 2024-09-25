<template>
  <header>
    <h1>Router 사용하기</h1>
    <hr>
    <div class="wrapper">
      <!-- <button @click='home'>Home</button> 이렇게 해서 함수로 넘겨도 되지만 RouterLink가 더 좋다 -->
      <!-- <h2>basic router</h2>
      <nav>
        <RouterLink to="/" active-class="active" replace>Home</RouterLink>
        <RouterLink to="/pathvariable/1" active-class="active" replace>PathVariable</RouterLink>
        <RouterLink to="/querystring?name=홍길동&age=20" active-class="active" replace>QueryString</RouterLink>
      </nav> -->
      
      
      <h2>nested router</h2>
      <nav>

        <!-- replace 속성은 브라우저의 히스토리 스택을 대체하여 뒤로가기를 방지한다. -->
        <RouterLink to="/diary/list" active-class="active" replace>일기목록</RouterLink>
        <RouterLink to="/user/login" active-class="active" replace>로그인</RouterLink>
        <RouterLink to="/moment/regist" active-class="active" replace>추억등록</RouterLink>
      </nav>
    </div>
  </header>
  <main>
    <RouterView/>
  </main>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>