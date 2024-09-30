<template>
    <div class="wrap">
        <div>
            <DiaryContent 
                v-if="Object.keys(selectedDiary).length" 
                :diaryData="selectedDiary" 
                :showWritePrompt="!selectedDiary.id"
            />
            <div class="wrap-w" v-else>일기가 없습니다.</div>
        </div>
        <div style="margin-left: 48px;">
            <DiaryContent 
                v-if="Object.keys(partnerDiary).length" 
                :diaryData="partnerDiary" 
                :showWritePrompt="!partnerDiary.id"
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

const selectedDiary = computed(() => {
    return props.diaryData.find(diary => diary.diaryUserNo === 12) || {};
});

const partnerDiary = computed(() => {
    return props.diaryData.find(diary => diary.diaryUserNo !== 12) || {};
});

watch(route, (newRoute, oldRoute) => {
    console.log('라우트가 변경되었습니다.');
    // 라우트 변경 시 실행할 작업
    if (newRoute.query.reload) {
        window.location.reload(); // 새로고침 또는 다른 동작
    }
});
</script>


<style scoped>
.wrap {
    display: flex;
}

.wrap-w {
    width: 480px;
}
</style>