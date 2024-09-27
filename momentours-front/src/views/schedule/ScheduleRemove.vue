<template>
    <div>
        <Modal :isVisible="isVisible" :isYes="isRemoveClicked" 
        @update:isVisible="isVisible = $event" 
        @update:isYes="isRemoveClicked = $event"/>
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
</style>
