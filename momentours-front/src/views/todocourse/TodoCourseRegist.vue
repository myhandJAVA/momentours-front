<template>
    <div class="container">
        <!-- 왼쪽 부분 -->
        <div class="left-panel">
            <button class="common-button-radi7 upload-btn">업로드</button>
            <RegistTitle/>
        </div>
    
        <!-- 오른쪽 부분 -->
        <div class="right-panel">
    
        </div>
    </div>
</template>

<script setup>
import RegistTitle from '@/components/course/common/RegistTitle.vue';


</script>

<style scoped>
    .container {
        display: flex;
        height: 100vh;
    }

    .left-panel, .right-panel {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .upload-btn {
        color: #ffffff;
    }
</style>