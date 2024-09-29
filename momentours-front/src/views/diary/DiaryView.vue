<template>
    <div class="wrap">
        <div><DiaryContent /></div>
        <div style="margin-left: 48px;"><DiaryContent /></div>
    </div>
</template>

<script setup>
import DiaryContent from '@/components/diary/DiaryViewContent.vue';
</script>

<style scoped>
.wrap {
    display: flex;
}
</style>