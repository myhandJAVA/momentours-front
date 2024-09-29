<template>
    <div class="question-list-container">
        <div class="question-list">
            <div v-for="question in paginatedQuestions" :key="question.randQuesNo" class="question-item"
                @click="selectQuestion(question)">
                <img src="@/assets/icons/bulb-icon.svg" class="light-bulb-icon" ></img>
                <div class="question-content">
                    <div class="question-date">{{ formatDate(question.randQuesCreateDate) }}</div>
                    <div class="question-text">{{ question.randQuesContent }}</div>
                </div>
            </div>
        </div>
        <div class="pagination">
            <button @click="prevPage" :disabled="currentPage === 1">이전</button>
            <span>{{ currentPage }} / {{ totalPages }}</span>
            <button @click="nextPage" :disabled="currentPage === totalPages">다음</button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
    questions: {
        type: Array,
        required: true
    }
});

const emit = defineEmits(['selectQuestion']);

const currentPage = ref(1);
const questionsPerPage = 4;

const paginatedQuestions = computed(() => {
    const start = (currentPage.value - 1) * questionsPerPage;
    const end = start + questionsPerPage;
    return props.questions.slice(start, end);
});

const totalPages = computed(() =>
    Math.ceil(props.questions.length / questionsPerPage)
);

const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
    }
};

const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
};

const selectQuestion = (question) => {
    emit('selectQuestion', question);
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nanum+Brush+Script&display=swap');
.question-list-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

.question-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.question-item {
    font-family: "Nanum Brush Script", cursive;
    min-height: 130px;
    display: flex;
    align-items: flex-start;
    background-color: #F9F5EA;
    border-radius: 8px;
    padding: 15px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
    cursor: pointer;
    transition: background-color 0.3s;
}

.question-item:hover {
    background-color: #e9e9e9;
}

.light-bulb-icon {
    font-size: 24px;
    margin-right: 15px;
    flex-shrink: 0;
}

.question-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
}

.question-date {
    font-size: 0.9em;
    color: #666;
    align-self: center;
    margin-bottom: 10px;
    margin-right: 65px;
}

.question-text {
    font-size: 1.6em;
    line-height: 1.2;
}

.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
}

.pagination button {
    padding: 5px 10px;
    margin: 0 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.pagination button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
}
</style>