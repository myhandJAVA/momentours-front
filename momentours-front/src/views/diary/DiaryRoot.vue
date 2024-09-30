<template>
    <div class="diary-container">
        <DiaryCalendar v-model="selectedDate"/>

        <div class="diary-book-wrapper">
            <DiaryBook />
        </div>

        <div class="content-overlay">
            <RouterView :selected-date="selectedDate" :diary-data="filteredDiaryData"
            :fetchDiaryData="fetchDiaryData"/>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import DiaryBook from '@/components/diary/DiaryBook.vue';
import DiaryCalendar from '@/components/diary/DiaryCalendar.vue';
import { RouterView } from 'vue-router';

const selectedDate = ref('2024-09-30'); // 초기값 설정
const diaryData = ref([]);

const updateDiaryData = (newData) => {
    diaryData.value = newData; // 새로운 데이터로 업데이트
};

// fetch를 사용하여 JSON Server에서 데이터를 가져오는 함수
const fetchDiaryData = async () => {
    try {
        const response = await fetch('http://localhost:8080/diary');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        diaryData.value = data; // diaryData 업데이트
    } catch (error) {
        console.error('Error fetching diary data:', error);
    }
};

// 선택된 날짜에 해당하는 일기 데이터만 필터링
const filteredDiaryData = computed(() => {
    return diaryData.value.filter(entry => {
        const entryDate = entry.diaryCreateDate.split(' ')[0]; // "2024-09-26 18:04:03" -> "2024-09-26"
        return entryDate === selectedDate.value;
    });
});


// 컴포넌트가 마운트될 때 데이터를 가져옴
onMounted(fetchDiaryData);

// 선택된 날짜가 변경될 때마다 데이터를 다시 가져옴 (필요한 경우)
watch(selectedDate, fetchDiaryData);
</script>

<style scoped>
.diary-container {
    position: relative;
    width: 100%;
    height: 100vh;
}

.diary-book-wrapper {
    position: relative;
    z-index: -1;
}

.content-overlay {
    position: absolute;
    top: 144px;
    left: 24.5vw;
    z-index: 1;
}
</style>