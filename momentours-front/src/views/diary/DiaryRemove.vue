<template>
    <div>
        <button @click="openModal">일기 삭제</button>
        <Modal 
            v-if="isModalVisible" 
            :isVisible="isModalVisible"
            @update:isVisible="closeModal" 
            @update:isYes="confirmDelete"
        >
            정말 일기를 삭제하시겠습니까?
        </Modal>
    </div>
</template>

<script setup>
import Modal from "@/components/common/Modal.vue";
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router'; 

const router = useRouter();
const route = useRoute();
const isModalVisible = ref(false);
const diaryId = ref(null);

onMounted(() => {
    diaryId.value = route.query.diaryId;
});

const openModal = () => {
    isModalVisible.value = true;
};

const closeModal = () => {
    isModalVisible.value = false;
};

const confirmDelete = async () => {
    await deleteDiary(diaryId.value);
    closeModal();
    navigateAndRefresh();
};

const navigateAndRefresh = () => {
    router.push('/diary/view').then(() => {
        window.location.reload();
    });
};

const deleteDiary = async (diaryId) => {
    try {
        const response = await fetch(`http://localhost:8080/diary/${diaryId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        alert('일기가 삭제되었습니다.');
    } catch (error) {
        console.error('일기 삭제 중 오류 발생:', error);
        alert('일기 삭제에 실패했습니다.');
    }
};
</script>