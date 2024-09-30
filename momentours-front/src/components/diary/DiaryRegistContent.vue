<template>
    <div class="regist-wrap">
        <div class="left-space"></div>
        <div class="text-image-wrap">
            <textarea class="textareat-content" placeholder="본문을 작성해주세요." v-model="localEvent.textContent" @input="adjustHeight">
            </textarea>
            <img class="img-box" src="@/assets/icons/img-box.svg" alt="사진 이미지" @click="selectImage">
        </div>
        <div class="regist-content">
            <button :class="uploadButtonClass" @click="openModal">업로드</button>
            <button :class="tempSaveButtonClass" @click="showAlert">임시저장</button>
            <button class="common-button bg-color-gray color-white">임시저장 글</button>
        </div>

        <Modal v-if="isModalVisible" :isVisible="isModalVisible" @update:isVisible="closeModal"
            @update:isYes="confirmUpload">
            일기를 등록하시겠습니까?
        </Modal>

        <b-alert show="dismissCountDown" dismissible variant="warning" @dismissed="dismissCountDown = 0"
            @dismiss-count-down="countDownChanged">
            This alert will dismiss after {{ dismissCountDown }} seconds...
        </b-alert>:
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import Modal from '../common/Modal.vue';

const textContent = ref('');
const isModalVisible = ref(false);
const router = useRouter();
const dismissSecs = 2;
const dismissCountDown = ref(0);
const isLoading = ref(false);
const errorMessage = ref('');

// 업로드 버튼과 임시저장 버튼의 클래스 동적 변경
const uploadButtonClass = computed(() => {
    return textContent.value.trim() !== ''
        ? 'common-button bg-color-pink'
        : 'common-button bg-color-gray color-white';
});

const tempSaveButtonClass = computed(() => {
    return textContent.value.trim() !== ''
        ? 'common-button bg-color-pink'
        : 'common-button bg-color-gray color-white';
});

// 모달 열기
const openModal = () => {
    if (textContent.value.trim() !== '') {
        isModalVisible.value = true;
    } else {
        errorMessage.value = '일기 내용을 입력해주세요.';
    }
};

// 모달 닫기
const closeModal = () => {
    isModalVisible.value = false;
};

const formatDate = (date) => {
    const pad = (n) => (n < 10 ? '0' + n : n);
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
};

// 일기 등록 함수
const registerDiary = async () => {
    isLoading.value = true;
    errorMessage.value = '';

    try {
        const response = await fetch('http://localhost:8080/diary', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                diaryContent: textContent.value,
                diaryCreateDate: formatDate(new Date()),
                diaryUserNo: 12,
                coupleNo: 5, 
                diaryIsDeleted: 0,
                files: [],
                comments: []
            }),
        });

        if (!response.ok) {
            throw new Error('서버 응답이 실패했습니다.');
        }

        const result = await response.json();
        console.log('일기가 성공적으로 등록되었습니다:', result);

        // 일기 등록 후 페이지 이동
        router.push('/diary/view');
    } catch (error) {
        console.error('일기 등록 중 오류 발생:', error);
        errorMessage.value = '일기 등록에 실패했습니다. 다시 시도해주세요.';
    } finally {
        isLoading.value = false;
    }
};

const confirmUpload = () => {
    closeModal();
    registerDiary();
};

// 임시 저장 함수
const saveTemporarily = () => {
    console.log('임시 저장되었습니다:', textContent.value);
    showAlert();
};

// 이미지 선택하기
const selectImage = () => {
    fileInput.value.click();
};
</script>

<style scoped>
.regist-wrap {
    display: flex;
    justify-content: space-between;
    width: 100vw;
    height: 100vh;
}

.left-space {
    background-color: #F9F5EA;
    width: 15vw;
    height: 100vh;
    margin-top: 3px;
}

.text-image-wrap {
    display: flex;
    align-items: flex-start;
    margin-left: 40px;
    margin-top: 55px;
    width: 65vw;
}

.textareat-content {
    width: 90%;
    height: 950px;
    border: none;
    outline: none;
    resize: none;
    padding: 10px;
}

.img-box {
    width: 30px;
    height: auto;
    margin-left: 10px;
    cursor: pointer;
}

.regist-content {
    background-color: #F9F5EA;
    width: 14vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-top: 55px;
    margin-top: 3px;
}

.common-button {
    width: 110px;
    height: 30px;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.error-message {
    color: red;
    margin-top: 10px;
}
</style>
