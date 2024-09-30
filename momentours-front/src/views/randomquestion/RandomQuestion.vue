<template>
  <div class="questions-container">
    <div v-if="question">
      <img src="@/assets/icons/bulb-icon.svg" class="bulb-icon">
      <span class="random">랜덤질문!</span>
      <p class="content">{{ question.randQuesContent }}</p>
    </div>
    <div v-else class="loading">
      질문을 불러오는 중...
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  question: {
    type: Object,
    default: null
  }
});
</script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Nanum+Brush+Script&display=swap');

.questions-container {
  background-color: #e6e0d4;
  padding: 20px;
  border-radius: 20px;
  font-family: "Nanum Brush Script", cursive;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  margin: 20px auto;
  max-width: 800px;
  height: 140px;
  display: flex;
  flex-direction: column;
}

.question {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.question img {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}

.content {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
  padding: 0 20%;
}

.random {
  font-size: x-large;
}

.content {
  margin: -20px;
  font-size: 29px;
  line-height: 1.2;
  max-height: 100%;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}


  </style>