<template>
    <div>
        <Modal :isVisible="isVisible" :isYes="isRemoveClicked" 
        @update:isVisible="isVisible = $event" 
        @update:isYes="isRemoveClicked = $event">
                <h4>정말 일기를 삭제하시겠습니까?</h4>
                <button @click="confirmDelete">예</button>
                <button @click="cancelDelete">아니요</button>
        </Modal>
    </div>
</template>

<script setup>
import Modal from "@/components/common/Modal.vue";
import { ref, watch, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router'; 

const router = useRouter();
const route = useRoute(); // 현재 라우트를 가져옴
const isVisible = ref(true);
const isRemoveClicked = ref(false);
const diaryId = ref(null); // diaryId를 저장할 변수

// 컴포넌트가 mounted될 때 diaryId를 쿼리에서 가져옴
onMounted(() => {
    diaryId.value = route.query.diaryId; // 쿼리 파라미터에서 diaryId 가져오기
});

const confirmDelete = async () => {
    await deleteDiary(diaryId.value); // diaryId로 삭제 요청
    isVisible.value = false; // 모달 닫기
};

const cancelDelete = () => {
    isVisible.value = false; // 모달 닫기
};

const deleteDiary = async (diaryId) => {
    try {
        const response = await fetch(`http://localhost:8080/diary/${diaryId}`, {
            method: 'DELETE',
        });
        console.log('Response status:', response.status);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        alert('일기가 삭제되었습니다.');
        router.push('/diary/view'); // 삭제 후 일기 목록 페이지로 이동
    } catch (error) {
        console.error('일기 삭제 중 오류 발생:', error);
        alert('일기 삭제에 실패했습니다.'); // 사용자에게 오류 메시지 표시
    }
};
</script>
