<template>
    <div>
        <Modal :isVisible="isVisible" :isYes="isRemoveClicked" 
        @update:isVisible="isVisible = $event" 
        @update:isYes="isRemoveClicked = $event">
                <h4>정말 일정을 삭제하시겠습니까?</h4>
        </Modal>
    </div>
</template>

<script setup>
import Modal from "@/components/common/Modal.vue";
import { ref, watch,defineEmits } from 'vue';
import { useRouter } from 'vue-router'; 


const emit = defineEmits(['update:remove']);
const isVisible = ref(true);
const isRemoveClicked = ref(false);
const router = useRouter(); 


// 모달이 닫힐 때 라우팅
watch(isVisible, (newValue) => {
    if (!newValue) {
        router.push('/schedule/view');  
    }
});

// 'Yes' 버튼을 눌렀을 때 삭제 로직 실행
watch(isRemoveClicked,(newValue) => {
    if (newValue) {
        emit('update:remove');
        router.push('/schedule/view')
    }
    }
);
</script>

<style scoped>
.schedule-edit {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
}

h2 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
}

h3 {
  font-size: 1rem;
  color: #555;
  margin: 0.5rem 0;
}

input, textarea {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

button {
  padding: 0.5rem 1rem;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #3a7bc8;
}

.info-group {
  background-color: #f8f9fa;
  border-radius: 4px;
  padding: 1rem;
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .schedule-edit {
    padding: 1rem;
  }
}
</style>
