<template>
    <Modal 
      :isVisible="isVisible" 
      @update:isVisible="value => emit('update:isVisible', value)"
      @update:isYes="value => emit('update:isYes', value)"
    >
      <p>정말 추억을 삭제하시겠습니까?</p>
    </Modal>
</template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  import Modal from '@/components/common/Modal.vue';

  const props = defineProps({
    isVisible: {
      type: Boolean,
      required: true,
    },
  });
  
  const emit = defineEmits(['update:isVisible', 'update:isYes']);
  
  const closeModal = () => {
    emit('update:isVisible', false);
  };
  
const yesModal = () => {
  console.log('yes 버튼 클릭');
  emit('update:isYes', true);
  closeModal();
}
  </script>
  