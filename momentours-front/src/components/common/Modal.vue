<template>
    <div class="modal-overlay" v-if="isVisible">
        <div class="modal-content">
            <button class="close-button" @click="closeModal">X</button> 
            <div class="modal-message">
                <slot></slot> <!-- 외부에서 주입된 내용 -->
            </div>
            <div class="buttons">
                <button class="common-button-radi7" @click="closeModal">No</button>
                <button class="common-button-radi7-pink" @click="yesModal">Yes</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import '@/assets/css/common.css';

const props = defineProps({
    isVisible: {
        type: Boolean,
        default: true
    },
    isYes: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['update:isVisible','update:isYes']);

const closeModal = () => {
    emit('update:isVisible', false);
};
const yesModal = () => {
    emit('update:isYes', true);
};
</script>
<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center; /* 화면의 세로 방향 가운데 정렬 */
    z-index: 5;
}

.modal-content {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center; /* 가로 방향 가운데 정렬 */
    justify-content: center; /* 세로 방향 가운데 정렬 */
    background: #f9f4e7;
    padding: 20px;
    border-radius: 5px;
    width: 30vw;
    height: 27vh;
}

.modal-message {
    font-size: 1.5vw; /* 글씨 크기 */
    text-align: center; /* 텍스트 가운데 정렬 */
    margin-bottom: 20px; /* 버튼들과 간격 */
    flex-grow: 1; /* 가용 공간을 차지하여 가운데 배치 */
    display: flex;
    justify-content: center;
    align-items: center; /* 메시지 세로 가운데 정렬 */
}

.close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 1.7vw;
    cursor: pointer;
    border: none;
    background-color: transparent;
    color: #333333;
    font-weight: bold;
}

.buttons {
    display: flex;
    justify-content: flex-end;
    gap: 1vw;
    margin-top: auto;
}

.common-button-radi7-pink {
    background-color: #FFC7C7;
    color: #333;
    border: none;
    padding: 7px 28px;
    border-radius: 7px;
    font-size: 15px;
    cursor: pointer;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
}
</style>
