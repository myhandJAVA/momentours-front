<template>
    <div class="diary-container">
        <DiaryCalendar/>

        <div class="diary-book-wrapper">
            <DiaryBook />
        </div>

        <div class="content-overlay">
            <RouterView />
        </div>
    </div>
</template>

<script setup>
import DiaryBook from '@/components/diary/DiaryBook.vue';
import DiaryCalendar from '@/components/diary/DiaryCalendar.vue';
import { RouterView } from 'vue-router';


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