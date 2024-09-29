<template>
  <div class="written-content-list">
    <template v-for="item in contentList" :key="item.id">
      <RouterLink :to="item.route" class="router-link button-style">{{ item.label }}</RouterLink>
    </template>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const contentList = ref([
  { id: 2, label: '작성한 추억', route: '/moement/view' },
  { id: 3, label: '작성한 추억 코스', route: '/momentcourse/view' },
  { id: 4, label: '작성한 여행 코스', route: '/todocourse/list' },
  { id: 5, label: '캘린더', route: '/schedule' },
]);
</script>

<style scoped>
.written-content-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 200px;
}

.content-button {
  background-color: #f0f0f0;
  border: none;
  padding: 15px;
  font-size: 18px;
  text-align: left;
  cursor: pointer;
  border-radius: 8px;
}

.content-button:hover {
  background-color: #ececec;
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
</style>
