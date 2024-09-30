<template>
    <Modal 
      :modelValue="modelValue" 
      @update:modelValue="value => emit('update:modelValue', value)"
      @confirm="onConfirm" 
      @cancel="onCancel"
    >
      <p>정말 추억을 삭제하시겠습니까?</p>
    </Modal>
</template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  import Modal from './Modal.vue';
  
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
  