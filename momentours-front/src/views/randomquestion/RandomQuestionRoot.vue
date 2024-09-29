<template>
  <div class="main-view">
    <div class="quesheader">
      <button class="toggle-button" @click="toggleQuestionList">
        <span class="hamburger-icon">☰</span>
        {{ showQuestionList ? '질문 숨기기' : '질문 목록' }}
      </button>
    </div>
    <div v-if="showQuestionList">
      <QuestionList :questions="allQuestions" @selectQuestion="handleQuestionSelection" />
    </div>
    <div v-else>
      <div class="date-display">
        <span>{{ formattedQuestionDate }}</span>
      </div>
    <RandomQuestion :question="currentQuestion" />
    <QuestionReply :questionId="currentQuestion?.randQuesNo" @updateReply="handleReplyUpdate" />
    <NavigationButtons :isFirstQuestion="currentQuestionIndex === 0"
      :isLatestQuestion="currentQuestionIndex === allQuestions.length - 1" @previous="previousQuestion"
      @next="nextQuestion" />
  </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import RandomQuestion from './RandomQuestion.vue';
import QuestionReply from './QuestionReply.vue';
import NavigationButtons from './NavigationButtons.vue';
import QuestionList from './QuestionList.vue';

const allQuestions = ref([]);
const replies = ref({});
const currentQuestionIndex = ref(0);
const showQuestionList = ref(false);

const currentQuestion = computed(() => allQuestions.value[currentQuestionIndex.value] || null);

const formattedQuestionDate = computed(() => {
  if (!currentQuestion.value) return '';
  return formatDate(currentQuestion.value.randQuesCreateDate);
});

function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}년 ${month}월 ${day}일`;
}

async function fetchAllQuestions() {
  try {
    const response = await fetch('http://localhost:8080/all', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error('네트워크 오류...');
    }
    const data = await response.json();
    allQuestions.value = data;
  } catch (error) {
    console.error('질문 조회 실패...', error);
  }
}

function previousQuestion() {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--;
  }
}

function nextQuestion() {
  if (currentQuestionIndex.value < allQuestions.value.length - 1) {
    currentQuestionIndex.value++;
  }
}

const handleReplyUpdate = (questionId, updatedReply) => {
  if (replies.value[questionId]) {
    replies.value[questionId] = updatedReply;
  }
};

function toggleQuestionList() {
  showQuestionList.value = !showQuestionList.value;
}

function handleQuestionSelection(question) {
  const index = allQuestions.value.findIndex(q => q.randQuesNo === question.randQuesNo);
  if (index !== -1) {
    currentQuestionIndex.value = index;
    showQuestionList.value = false;
  }
}

onMounted(async () => {
  await fetchAllQuestions();
});
</script>
  
  <style scoped>
  .main-view {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px
  }

  .quesheader {
  margin-left: 20px;
}

  
  .date-display {
  text-align: center;
  margin-bottom: 20px;
  font-size: 18px;
  color: #333;
}
  

  .navigation {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 240px;
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  box-sizing: border-box;
  z-index: 2;
  gap: 550px;
}

.nav-btn {
  background-color: #FFB6C1;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}

.nav-btn:hover {
  background-color: #FFB3B3;
}

.nav-btn:first-child {
  position: absolute;
  left: 20px;
}

.nav-btn:last-child {
  position: absolute;
  right: 20px;
}

.toggle-button {
  display: flex;
  align-items: center;
  background-color: #FFC7C7;
  border: 1px solid #ccc;
  border-radius: 17px;
  padding: 3px 10px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.toggle-button:hover {
  background-color: #FFB3B3;
}

.hamburger-icon {
  margin-bottom: 3px;
  margin-right: 5px;
  font-size: 18px;
}
  </style>