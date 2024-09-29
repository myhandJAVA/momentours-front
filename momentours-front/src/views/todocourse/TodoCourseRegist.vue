<template>
    <div class="container">
        <!-- 왼쪽 부분 -->
        <div class="left-panel">
            <br>
            <div class="upload-btn">
                <button class="common-button-radi7">업로드</button>
            </div>
            <RegistTitle/>
            <div class="radio-group">
                <label><input type="radio" v-model="selectedOption" value="당일 데이트" /> 당일 데이트</label>
                <label><input type="radio" v-model="selectedOption" value="연일 데이트" /> 연일 데이트</label>
                <label><input type="radio" v-model="selectedOption" value="선택 안함" /> 선택 안함</label>
            </div>
            <div class="regist-box">
                <div class="date-css">
                    <p>데이트 시작일 : 
                    <input 
                        type="date" 
                        v-model="localEvent.start"
                        :disabled="selectedOption === '선택 안함'"
                        @input="handleStartDateChange"
                    >
                    </p>
                </div>
                <br>
                <div class="date-css">
                    <p>데이트 종료일 : 
                    <input 
                        type="date" 
                        v-model="localEvent.end"
                        :disabled="selectedOption === '선택 안함' || selectedOption === '당일 데이트'"
                        :min="localEvent.start"
                    >
                    </p>
                </div>
            </div>
            <br>
            <PostMemo/>
            <hr>
            <div style="color: gray; font-size: 20px;">
                코스를 등록해주세요.
            </div>
        </div>
    
        <!-- 오른쪽 부분 -->
        <div class="right-panel">
            <div class="map-container">
                <CommonMap/>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';
import RegistTitle from '@/components/course/common/RegistTitle.vue';
import PostMemo from '@/components/course/common/PostMemo.vue';
import CommonMap from '@/components/common/CommonMap.vue';
const selectedOption = ref('선택 안함');

const localEvent = reactive({
    start: '',
    end: ''
});

// 시작일 선택에 따른 종료일 처리
const handleStartDateChange = () => {
    if (selectedOption.value === '당일 데이트') {
        localEvent.end = localEvent.start;
    } else if (selectedOption === '연일 데이트') {
        localEvent.end = '';
    }
};

// 옵션에 따른 날짜 필드 초기화 처리
watch (selectedOption, (newVal) => {
    if (newVal === '선택 안함') {
        localEvent.start = '';
        localEvent.end = '';
    } else if (newVal === '당일 데이트') {
        localEvent.end = localEvent.start;
    }
});

/* 지도 관련!! */

</script>

<style scoped>
    .container {
        display: flex;
        height: 100vh;
    }

    .left-panel, .right-panel {
        flex: 1;
        justify-content: center;
        align-items: center;
        margin: 20px;
    }
    .right-panel {
        display: flex;
        flex-direction: column;
    }

    .common-button-radi7 {
        color: #ffffff;
        background-color: #999999;
    }
    .upload-btn {
        display: flex;
        justify-content: end;
    }

    .radio-group {
        display: flex;
        gap: 15px;
        margin-bottom: 20px;
    }
    
    .date-css {
        display: flex;
        color: #333;
        background-color: #F9F5EA;
        width: 100%;
        height: 50px;
        padding: 10px;
        border: none;
        outline: none;
        margin: -10px;
    }

    .map-container {
        width: 100%;
        height: 100%;
    }
</style>