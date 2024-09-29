<template>
    <div class="couple-info">
    <img src="@/assets/icons/user-profile-image.svg" alt="Couple Image" class="couple-img" />
    <div class="info">
        <h3>새로운 커플명</h3>
        <p>함께한 날짜 - {{ date }}</p>
        <div class="btn-group">
            <RouterLink to="/couple/edit" class="router-link button-style edit-btn">수정하기</RouterLink>
            <RouterLink to="/couple/delete" class="router-link button-style delete-btn">삭제하기</RouterLink>
        </div>
    </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const date = ref('2022.05.05');
</script>

<style scoped>
.couple-info {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 80%;
    max-width: 600px;
}

.couple-img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 20px;
}

.info {
    text-align: center;
}

h3 {
    margin: 0;
    font-size: 22px;
    color: #333;
}

p {
    margin: 5px 0 15px;
    font-size: 16px;
    color: #666;
}

.btn-group {
    display: flex;
    gap: 10px;
}

.edit-btn, .delete-btn {
    padding: 10px 15px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
}


.router-link {
  text-decoration: none;
  color: inherit; /* 파란색 링크를 없애고 기본 텍스트 색상으로 설정 */
}

.button-style {
  display: block;
  padding: 10px 15px;
  margin-bottom: 10px;
  background-color: #C5B697;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 20px;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.button-style:hover {
  background-color: #e0e0e0;
}

.button-style:active {
  background-color: #ccc;
}

.edit-btn {
    background-color: #FFABAB;
}

.delete-btn {
    background-color: #dc3545;
}
</style>
