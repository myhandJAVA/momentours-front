<template>
    <div class="modal-overlay" v-if="isVisible">
      <div class="modal">
        <h3>정말로 삭제하시겠습니까?</h3>
        <div class="button-container">
          <button @click="confirmDelete">예</button>
          <button @click="cancelDelete">아니요</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  const props = defineProps({
    isVisible: Boolean,
    onConfirm: Function,
    onCancel: Function,
  });
  
  const confirmDelete = () => {
    props.onConfirm();
  };
  
  const cancelDelete = () => {
    props.onCancel();
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal {
    background: white;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
  }
  
  .button-container {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  </style>
  