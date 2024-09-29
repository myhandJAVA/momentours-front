<template>
    <div class="body">
      <div class="container">
        <div class="logoimage">
          <img src="" alt="Momentours Logo">
        </div>
        <h2>회원가입 정보를 입력해주세요.</h2>
        <form id="signupForm" @submit.prevent="handleSignup">
          <label for="email">이메일</label>
          <input type="email" id="email" v-model="email" placeholder="이메일을 입력해주세요." required>
  
          <label for="password">비밀번호</label>
          <div style="position:relative;">
            <input type="password" id="password" v-model="password" placeholder="비밀번호를 입력해주세요." required>
          </div>
  
          <label for="passwordConfirm">비밀번호 확인</label>
          <div style="position:relative;">
            <input type="password" id="passwordConfirm" v-model="passwordConfirm" placeholder="다시 한번 비밀번호를 입력해주세요." required>
          </div>
  
          <label for="name">이름</label>
          <input type="text" id="name" v-model="name" placeholder="이름을 입력해주세요." required>
  
          <label for="nickname">닉네임</label>
          <input type="text" id="nickname" v-model="nickname" placeholder="닉네임을 입력해주세요." required>
  
          <label for="phone">전화번호</label>
          <input type="tel" id="phone" v-model="phone" placeholder="010-0000-0000" required pattern="\d{3}-\d{4}-\d{4}">
  
          <label for="mbti">MBTI</label>
          <select id="mbti" v-model="mbti" required>
            <option value="" disabled selected>MBTI를 선택해주세요.</option>
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
  
          <label for="birth">생일</label>
          <input type="date" id="birth" v-model="birth" required>
  
          <button type="submit" class="btn">회원가입</button>
        </form>
        <div class="login-link">
          이미 계정을 가지고 계신가요? <a href="/login">로그인</a>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  const email = ref('');
  const password = ref('');
  const passwordConfirm = ref('');
  const name = ref('');
  const nickname = ref('');
  const phone = ref('');
  const mbti = ref('');
  const birth = ref('');
  
  const handleSignup = async () => {
    if (password.value !== passwordConfirm.value) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
  
    const userData = {
      email: email.value,
      pwd: password.value,
      name: name.value,
      nickname: nickname.value,
      phone: phone.value,
      birth: birth.value,
      mbti: mbti.value,
      gender: '', // 성별 입력 필드가 없어서 빈 문자열로 설정
      joinDate: new Date().toISOString().split('T')[0]
    };
  
    try {
      const response = await fetch('http://localhost:3000/user-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        throw new Error('회원가입에 실패했습니다.');
      }
  
      alert('회원가입이 완료되었습니다.');
      router.push('/login');
    } catch (error) {
      console.error('회원가입 오류:', error);
      alert(error.message);
    }
  };
  </script>
  
  <style src="@/assets/css/signup.css" scoped>
  </style>