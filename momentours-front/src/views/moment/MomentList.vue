<template>
    <div class="moment-list-container">
        
        <button class="register-btn" @click="goToRegist">추억등록</button>

        <PostList
            :headers="headers"
            :posts="moments"
            :currentPage="currentPage"
            :postsPerPage="momentsPerPage"
            @page-changed="handlePageChange"
        />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import PostList from '@/components/moment/PostList.vue';

const moments = ref([]); // moments 데이터를 가져옴
const currentPage = ref(1);
const momentsPerPage = ref(10);
const headers = ['번호', '제목', '좋아요', '조회수', '작성일'];
const isLoading = ref(true); // 로딩 상태 추가

const router = useRouter();

const goToRegist = () => {
    router.push('/moment/regist');
}

const handlePageChange = (page) => {
  currentPage.value = page; // 페이지 변경 시 currentPage 업데이트  
};

const fetchMoments = async () => {
    try {
        const response = await axios.get('http://localhost:3000/Moments'); // 경로 수정
        console.log('받아온 데이터:', response.data); // 데이터를 확인하는 로그
        if (response.data && response.data.length > 0) {
            moments.value = response.data; // response.data.Moments가 아닌 response.data 사용
        } else {
            console.log('Moments 배열이 비어있습니다.');
        }
    } catch (error) {
        console.error('데이터를 가져오는 중 오류가 발생했습니다:', error);
    } finally {
        isLoading.value = false; // 로딩이 끝나면 false로 변경
    }
};

onMounted(() => {
    fetchMoments(); // 컴포넌트가 마운트되면 데이터 가져오기
});
</script>

<style scoped>
.moment-list-container {
    padding: 20px;
}
</style>
