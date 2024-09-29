<template>
    <div class="regist-wrap">
        <div class="left-space"></div> <!-- 왼쪽 여백 -->
        <div class="text-image-wrap">
            <textarea class="textareat-content" placeholder="본문을 작성해주세요." v-model="textContent" @input="adjustHeight">
            </textarea>
            <img class="img-box" src="@/assets/icons/img-box.svg" alt="사진 이미지" @click="selectImage">
        </div>
        <div class="regist-content">
            <button :class="uploadButtonClass" @click="openModal">업로드</button>
            <button :class="tempSaveButtonClass" @click="showAlert">임시저장</button>
            <button class="common-button bg-color-gray color-white">임시저장 글</button>
        </div>

        <!-- Modal component -->
        <Modal v-if="isModalVisible" :isVisible="isModalVisible" @update:isVisible="closeModal"
            @update:isYes="confirmUpload">
            일기를 수정하시겠습니까?
        </Modal>

        <!-- Alert for temporary save -->
        <b-alert show="dismissCountDown" dismissible variant="warning" @dismissed="dismissCountDown = 0"
            @dismiss-count-down="countDownChanged">
            This alert will dismiss after {{ dismissCountDown }} seconds...
        </b-alert>:
    </div>
</template>

<script setup>
import Modal from '@/components/common/Modal.vue';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const textContent = ref('');
const isModalVisible = ref(false);
const router = useRouter();
const dismissSecs = 2;
const dismissCountDown = ref(0);
const isLoading = ref(false);
const errorMessage = ref('');

const props = defineProps({
    id: String, // URL에서 가져올 일기 ID
});


// ID를 사용하여 일기 내용을 가져오는 로직
onMounted(async () => {
    const response = await fetch(`http://localhost:8080/diary/${props.id}`);
    if (response.ok) {
        const data = await response.json();
        textContent.value = data.textContent; // 가져온 내용으로 설정
    } else {
        console.error('일기 데이터를 가져오는 데 실패했습니다.');
    }
});

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

const saveDiary = async () => {
    // 저장 로직을 추가합니다.
    console.log('저장된 일기 내용:', diaryContent.value);
};

// 모달에서 Yes를 누르면 일기 등록 후 이동
const confirmUpload = () => {
    closeModal();
    registerDiary();
};

// 임시 저장 함수
const saveTemporarily = () => {
    // 여기에 임시 저장 로직을 추가합니다.
    console.log('임시 저장되었습니다:', textContent.value);
    showAlert(); // 경고 알림 표시
};

// 이미지 선택하기
const selectImage = () => {
    // fileInput 참조를 사용하여 파일 선택 창 열기
    fileInput.value.click(); // 파일 선택 창 열기
};

const countDownChanged = (dismissCountDown) => {
    dismissCountDown = dismissCountDown;
};

const showAlert = () => {
    dismissCountDown.value = dismissSecs; // dismissCountDown을 재설정
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
