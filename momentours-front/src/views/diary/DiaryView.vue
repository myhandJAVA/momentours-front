<template>
    <div class="wrap">
        <div>
            <DiaryContent 
                v-if="Object.keys(selectedDiary).length" 
                :diaryData="selectedDiary" 
                :showWritePrompt="!selectedDiary.diaryNo"
            />
            <div v-else>일기가 없습니다.</div>
        </div>
        <div style="margin-left: 48px;">
            <DiaryContent 
                v-if="Object.keys(partnerDiary).length" 
                :diaryData="partnerDiary" 
                :showWritePrompt="!partnerDiary.diaryNo"
            />
            <div v-else>파트너의 일기가 없습니다.</div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import DiaryContent from '@/components/diary/DiaryViewContent.vue';

// Emit 정의
const emit = defineEmits(['update:diaryData']);

// Route 가져오기
const route = useRoute();

const props = defineProps({
    selectedDate: String,
    diaryData: {
        type: Array,
        default: () => [],
    },
});

// 일기 데이터를 가져오는 함수
const fetchDiaries = async () => {
    try {
        const response = await fetch(`http://localhost:8080/diary?date=${props.selectedDate}`);
        if (!response.ok) {
            throw new Error('서버 응답이 실패했습니다.');
        }
        return await response.json(); // 데이터를 반환
    } catch (error) {
        console.error('일기 데이터를 가져오는 중 오류 발생:', error);
    }
};

const selectedDiary = computed(() => {
    return props.diaryData.find(diary => diary.diaryUserNo === 12) || {};
});

const partnerDiary = computed(() => {
    return props.diaryData.find(diary => diary.diaryUserNo !== 12) || {};
});

// 컴포넌트가 처음 로드될 때 데이터 fetching
onMounted(async () => {
    const diaries = await fetchDiaries();
    if (diaries) {
        // 부모 컴포넌트에 데이터를 업데이트하는 로직
        emit('update:diaryData', diaries); // 부모에게 diaryData 업데이트 요청
    }
});

// 경로가 변경될 때마다 데이터 fetching
watch(() => route.path, async () => {
    const diaries = await fetchDiaries();
    if (diaries) {
        emit('update:diaryData', diaries);
    }
});
</script>


<style scoped>
.wrap {
    display: flex;
}
</style>
