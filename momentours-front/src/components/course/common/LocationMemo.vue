<template>
    <div>
        <textarea
                :value="memo"
                :placeholder="placeholderMemo"
                @focus="handleFocus"
                @blur="handleBlur"
                @input="handleInput"
                ref="textarea"
                class="memo-input"
        ></textarea>
        <p>{{ charCount }}/{{ maxChars }}</p>
        <p v-if="charCount >= maxChars" class="error">글자 수 제한을 초과했습니다.</p>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const memo = ref('');
const placeholderMemo = ref('메모를 입력하세요.');
const textarea = ref(null);

// 글자 수 제한
const maxChars = 100;

// 현재 글자 수 계산
const charCount = ref(0);


const handleFocus = () => {
    placeholderMemo.value='';
};

const handleBlur = () => {
    if (memo.value === '') {
        placeholderMemo.value = '메모를 입력하세요.';
    }
};

// 높이를 내용에 맞춰 자동으로 조정하는 함수
const adjustHeight = () => {
    const el = textarea.value;
    if (el) {
        el.style.height = 'auto'; // 높이를 먼저 'auto'로 설정하여 기존 높이를 리셋
        el.style.height = `${el.scrollHeight}px`; // 내용에 맞게 높이를 재설정
    }
};

// 글자 수 업데이트 함수
const updateCharCount = () => {
    charCount.value = memo.value.length;
};

// 글자 수 체크 및 업데이트
const handleInput = (event) => {
    if (event.target.value.length <= maxChars) {
        memo.value = event.target.value;            // 글자 수가 제한 이하일 경우에만 업데이트
    } else {
        event.target.value = memo.value;
    }
    adjustHeight();
    updateCharCount();
}

watch(memo, () => {
    updateCharCount();
});

onMounted(() => {
    adjustHeight();
});    
</script>

<style scoped>
    .memo-input {
        color: #333;
        width: 100%;
        padding: 10px;
        border: transparent;
        border-radius: 7px;
        outline: none;
        font-size: 13px;
        background-color: #FFC7C7;
        resize: none;
        overflow: hidden;
    }
    .error {
        color: red;
    }
    p {
        font-size: 1.5vh;
        margin: 0;
        text-align: right;
    }
</style>