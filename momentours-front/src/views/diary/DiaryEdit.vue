<template>
    <div class="regist-wrap">
        <div class="left-space"></div>
        <div class="text-image-wrap">
            <textarea class="textareat-content" placeholder="본문을 작성해주세요." v-model="textContent" @input="adjustHeight">
            </textarea>
            <img class="img-box" src="@/assets/icons/img-box.svg" alt="사진 이미지" @click="selectImage">
        </div>
        <div class="regist-content">
            <button :class="uploadButtonClass" @click="updateDiary">수정완료</button>
            <button :class="tempSaveButtonClass" @click="showAlert">임시저장</button>
            <button class="common-button bg-color-gray color-white">임시저장 글</button>
        </div>

        <Modal v-if="isModalVisible" :isVisible="isModalVisible" @update:isVisible="closeModal"
            @update:isYes="confirmUpload">
            일기를 수정하시겠습니까?
        </Modal>

        <b-alert show="dismissCountDown" dismissible variant="warning" @dismissed="dismissCountDown = 0"
            @dismiss-count-down="countDownChanged">
            This alert will dismiss after {{ dismissCountDown }} seconds...
        </b-alert>:
    </div>
</template>

<script setup>
import Modal from '@/components/common/Modal.vue';
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const textContent = ref('');
const isModalVisible = ref(false);
const router = useRouter();
const route = useRoute();
const dismissSecs = 2;
const dismissCountDown = ref(0);
const isLoading = ref(false);
const errorMessage = ref('');

// 컴포넌트가 마운트될 때 URL 쿼리 파라미터에서 content 가져오기
onMounted(() => {
    const content = route.query.content; // URL에서 content 가져오기
    if (content) {
        textContent.value = content; // textarea에 내용 설정
    }
});

// 일기 업데이트 함수
const updateDiary = async () => {
    const diaryId = route.params.id;
    try {
        const response = await fetch(`http://localhost:8080/diary/${diaryId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                diaryContent: textContent.value,
            }),
        });
        if (!response.ok) {
            throw new Error('Failed to update diary');
        }
        router.push('/diary/view');
    } catch (error) {
        console.error('Error updating diary:', error);
    }
};

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

// 모달에서 Yes를 누르면 일기 등록 후 이동
const confirmUpload = () => {
    closeModal();
    updateDiary();
};

// 임시 저장 함수
const saveTemporarily = () => {
    console.log('임시 저장되었습니다:', textContent.value);
    showAlert(); // 경고 알림 표시
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
