<template>
    <div v-if="modelValue" class="modal-overlay" @click="closeModal">
      <div class="modal" @click.stop>
        <div class="modal-content">
          <slot></slot>
        </div>
        <div class="modal-actions">
          <slot name="actions">
            <button @click="onCancel">취소</button>
            <button @click="onConfirm">확인</button>
          </slot>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    modelValue: {
      type: Boolean,
      required: true,
    },
  });
  
  const emit = defineEmits(['update:modelValue', 'confirm', 'cancel']);
  
  const closeModal = () => {
    emit('update:modelValue', false);
  };
  
  const onConfirm = () => {
    emit('confirm');
    closeModal();
  };
  
  const onCancel = () => {
    emit('cancel');
    closeModal();
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    max-width: 500px;
    width: 100%;
    z-index: 1001;
  }
  
  .modal-actions {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
  
  .modal-actions button {
    margin-left: 10px;
    padding: 5px 10px;
    cursor: pointer;
  }
  </style>