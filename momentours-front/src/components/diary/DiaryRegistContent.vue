<template>
    <div class="regist-wrap">
        <div class="left-space"></div> <!-- 왼쪽 여백 -->
        <div class="text-image-wrap">
            <textarea class="textareat-content" placeholder="본문을 작성해주세요." v-model="textContent" @input="adjustHeight"
                :style="{ height: textAreaHeight + 'px' }">
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
            일기를 등록하시겠습니까?
        </Modal>

        <!-- Alert for temporary save -->
        <b-alert show="dismissCountDown" dismissible variant="warning" @dismissed="dismissCountDown = 0"
            @dismiss-count-down="countDownChanged">
            임시저장 되었습니다.
        </b-alert>:
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router'; // Router 기능을 위해 추가
import Modal from '../common/Modal.vue';

const textContent = ref('');
const isModalVisible = ref(false);
const router = useRouter();
const dismissSecs = 2; // 알림 지속 시간
const dismissCountDown = 0;

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
    isModalVisible.value = true;
};

// 모달 닫기
const closeModal = () => {
    isModalVisible.value = false;
};

// 모달에서 Yes를 누르면 일기 등록 후 이동
const confirmUpload = () => {
    // 예를 눌렀을 때 페이지 이동
    router.push('/diary/view');
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
    dismissCountDown = dismissSecs;
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
</style>
