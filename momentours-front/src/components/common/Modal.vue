<template>
    <div class="modal-overlay" v-if="isVisible">
        <div class="modal-content">
            <button class="close-button" @click="closeModal">X</button> <!-- X 버튼 추가 -->
            <slot></slot>
            <div class="buttons">
                <button class="common-button-radi7" @click="closeModal">No</button>
                <button class="common-button-radi7-pink" @click="closeModal">Yes</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import '@/assets/css/common.css';
import { ref } from 'vue';

const props = defineProps({
    isVisible: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['update:isVisible']);

const closeModal = () => {
    emit('update:isVisible', false);
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
    align-items: center;
    z-index: 5;
}

.modal-content {
    position: relative; /* 절대 위치를 사용하려면 relative 필요 */
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
    background: #f9f4e7;
    padding: 20px;
    border-radius: 5px;
    width: 30vw;
    height: 27vh;
}

/* X 버튼 스타일 */
.close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 2vw;
    cursor: pointer;
    border: none;
    background-color: transparent;
    color: #333333;
    font-weight: bold;
}

/* 버튼들 */
.buttons {
    display: flex;
    justify-content: flex-end;
    margin-top: auto;
    gap: 1vw;
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
