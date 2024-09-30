<template>
    <div class="body-wrapper"> <!-- body 역할을 대신하는 div -->
      <div class="main-container">
        <div class="combined-container">
          <div class="info-container">

            <div class="profile-card">
              <img src="@/assets/icons/user-profile-image.svg" alt="프로필 사진">
              <p>MBTI: {{ userInfo.mbti }}</p>
              <p>나이: {{ calculateAge(userInfo.birth) }}</p>
              <p>가입일: {{ userInfo.joinDate }}</p>
              <p>성별: {{ userInfo.gender }}</p>
            </div>
          </div>
  
          <div class="edit-container">
            <h2>내 정보 수정</h2>
            <form id="editForm" @submit.prevent="updateUserInfo">
              <label for="email">이메일</label>
              <input type="email" id="email" v-model="userInfo.email" disabled>

              <label for="password">비밀번호</label>
              <input type="password" id="password" v-model="userInfo.pwd" disabled>

              <label for="nickname">닉네임</label>
              <input type="text" id="nickname" v-model="userInfo.nickname" required>

              <label for="phone">전화번호</label>
              <input type="text" id="phone" v-model="userInfo.phone" placeholder="{{ userinfo.phone }}" required pattern="\d{3}-\d{4}-\d{4}">

              <label for="mbti">MBTI</label>
              <select id="mbti" v-model="userInfo.mbti" required>
                <option value="" disabled>MBTI를 선택해주세요.</option>
                <option value="INTJ">INTJ</option>
                <option value="ENTJ">ENTJ</option>
                <option value="ENTP">ENTP</option>
              </select>

              <label for="birth">생일</label>
              <input type="date" id="birth" v-model="userInfo.birth" required>

              <button type="submit">저장</button>
            </form>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

// 사용자 정보 초기화
const userInfo = ref({
  email: "gildong@naver.com",
  pwd: "gildong123",
  name: "홍길동",
  nickname: "gildong",
  phone: "010-1555-6666",
  birth: "1999-09-09",
  mbti: "ENTP",
  gender: "F",
  joinDate: "2024.03.02" 
});

// 나이 계산 메소드
const calculateAge = (birth) => {
  const birthDate = new Date(birth);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

</script>

<style src='@/assets/css/mypage.css' scoped>
</style>
