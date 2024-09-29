<template>
    <div>
        <div>
            <input
                type="text"
                v-model="title"
                :placeholder="placeholderText"
                @focus="handleFocus"
                @blur="handleBlur"
                class="title-input"
            />
        </div>
        <hr class="title-hr">
    </div>
</template>

<script setup>
    import { ref } from 'vue';

    const title = ref('');

    // 사용자가 입력하지 않았을 때 보여줄 플레이스홀더 텍스트
    const placeholderText = ref('제목을 작성해주세요.');

    // 포커스가 되었을 때 플레이스홀더를 숨기는 함수
    const handleFocus = () => {
        placeholderText.value = '';
    };

    // 포커스가 해제되었을 때 제목이 비어있으면 플레이스홀더를 다시 표시하는 함수
    const handleBlur = () => {
    if (title.value === '') {
        placeholderText.value = '제목을 작성해주세요.';
    }
    };
</script>

<style scoped>
    .title-input {
        width: 100%;
        padding: 10px;
        font-size: 30px;
        border: transparent;
        outline: none;
        margin: 10px;
    }

    .title-input::placeholder {
        color: gray;
    }
    .title-hr {
        margin: 5px;
    }
</style>