<template>
<div class="body">
  <div class="container">
    <div class="logoimage">
    <img src="" alt="Momentours Logo">
    </div>
    <h2>회원가입 정보를 입력해주세요.</h2>
    <form id="signupForm">
      <label for="email">이메일</label>
      <input type="text" id="email" placeholder="이메일을 입력해주세요." required>

      <label for="password">비밀번호</label>
      <div style="position:relative;">
        <input type="password" id="password" placeholder="비밀번호를 입력해주세요." required>
      </div>

      <label for="passwordConfirm">비밀번호 확인</label>
      <div style="position:relative;">
        <input type="password" id="passwordConfirm" placeholder="다시 한번 비밀번호를 입력해주세요." required>
    </div>

      <label for="nickname">닉네임</label>
      <input type="text" id="nickname" placeholder="닉네임을 입력해주세요." required>

      <label for="phone">전화번호</label>
      <input type="text" id="phone" placeholder="010-0000-0000" required pattern="\d{3}-\d{4}-\d{4}">

      <label for="mbti">MBTI</label>
      <select id="mbti" required>
        <option value="" disabled selected>MBTI를 선택해주세요.</option>
        <option value="INTJ">INTJ</option>
        <option value="INTP">INTP</option>
        <option value="ENTJ">ENTJ</option>
        <option value="ENTP">ENTP</option>
        <option value="INFJ">INFJ</option>
        <option value="INFP">INFP</option>
        <option value="ENFJ">ENFJ</option>
        <option value="ENFP">ENFP</option>
        <option value="ISTJ">ISTJ</option>
        <option value="ISFJ">ISFJ</option>
        <option value="ESTJ">ESTJ</option>
        <option value="ESFJ">ESFJ</option>
        <option value="ISTP">ISTP</option>
        <option value="ISFP">ISFP</option>
        <option value="ESTP">ESTP</option>
        <option value="ESFP">ESFP</option>
      </select>

      <label for="mbti">생일</label>
      <div class="birth-container">
        <select id="birthYear">
          <option value="" disabled selected>년도</option>
          <!-- 연도 선택 -->
        </select>
        <select id="birthMonth">
          <option value="" disabled selected>월</option>
          <!-- 월 선택 -->
        </select>
        <select id="birthDay">
          <option value="" disabled selected>일</option>
          <!-- 일 선택 -->
        </select>
      </div>

      <button type="submit" class="btn">회원가입</button>
    </form>
    <div class="login-link">
      이미 계정을 가지고 계신가요? <a href="/login">로그인</a>
    </div>
  </div>

  <!-- <script>
    // 비밀번호 visible 기능
    function togglePasswordVisibility(id) {
      const passwordField = document.getElementById(id);
      if (passwordField.type === "password") {
        passwordField.type = "text";
      } else {
        passwordField.type = "password";
      }
    }
  </script> -->
</div>
</template>

<script setup>

</script>

<style src= '@/assets/css/signup.css' scoped>

</style>