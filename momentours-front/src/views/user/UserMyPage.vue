<template>
  <div class="body-wrapper">
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
            <input type="text" id="nickname" v-model="updatedUserInfo.nickname" required>
            <label for="phone">전화번호</label>
            <input type="text" id="phone" v-model="updatedUserInfo.phone" placeholder="{{ userInfo.phone }}" required pattern="\d{3}-\d{4}-\d{4}">
            <label for="mbti">MBTI</label>
            <select id="mbti" v-model="updatedUserInfo.mbti" required>
              <option value="" disabled>MBTI를 선택해주세요.</option>
              <option value="INTJ">INTJ</option>
              <option value="ENTJ">ENTJ</option>
              <option value="ENTP">ENTP</option>
            </select>
            <label for="birth">생일</label>
            <input type="date" id="birth" v-model="updatedUserInfo.birth" required>
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

// 업데이트된 사용자 정보 저장
const updatedUserInfo = ref({
  nickname: userInfo.value.nickname,
  phone: userInfo.value.phone,
  mbti: userInfo.value.mbti,
  birth: userInfo.value.birth
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

const updateUserInfo = () => {
  // 입력값 유효성 검사
  if (!updatedUserInfo.value.nickname || !updatedUserInfo.value.phone || !updatedUserInfo.value.mbti || !updatedUserInfo.value.birth) {
    alert('필수 항목을 모두 입력해주세요.');
    return;
  }

  // phone 번호 형식 검사
  const phoneRegex = /^\d{3}-\d{4}-\d{4}$/;
  if (!phoneRegex.test(updatedUserInfo.value.phone)) {
    alert('전화번호 형식이 올바르지 않습니다.');
    return;
  }

  // 사용자 정보 업데이트
  userInfo.value = {
    ...userInfo.value,
    nickname: updatedUserInfo.value.nickname,
    phone: updatedUserInfo.value.phone,
    mbti: updatedUserInfo.value.mbti,
    birth: updatedUserInfo.value.birth
  };

  alert('회원정보가 성공적으로 수정되었습니다.');
};
</script>

<style src='@/assets/css/mypage.css' scoped>
</style>