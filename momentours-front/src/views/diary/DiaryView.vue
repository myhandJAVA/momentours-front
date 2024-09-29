<template>
    <div class="wrap">
        <div><DiaryContent :diaryData="selectedDiary" /></div>
        <div style="margin-left: 48px;"><DiaryContent :diaryData="selectedDiaries" /></div>
    </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import { useRoute } from 'vue-router';
import DiaryContent from '@/components/diary/DiaryViewContent.vue';

const route = useRoute();
const selectedDiaries = ref([]);

const props = defineProps({
    selectedDate: String,
    diaries: {
        type: Array,
        default: () => [],
    },
});
</script>

<style scoped>
.wrap {
    display: flex;
}
</style>