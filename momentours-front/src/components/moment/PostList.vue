<template>
    <div class="container">
        <div v-if="posts && posts.length > 0" class="flex-row-f">
            <div class="bg">
                <span class="item number">{{ headers[0] }}</span>
                <span class="item title">{{ headers[1] }}</span>
                <span class="item likes">{{ headers[2] }}</span>
                <span class="item views">{{ headers[3] }}</span>
                <span class="item date">{{ headers[4] }}</span>
            </div>
            <div class="bg-b">
                <ul class="moment-list">
                    <li 
                        v-for="(moment, index) in paginatedPosts" 
                        :key="index + 1" 
                        class="moment-item"
                        @click="goToDetail(moment.momentNo)" 
                    >
                        <span class="item number">{{ (currentPage - 1) * postsPerPage + index + 1 }}</span>
                        <span class="item title">{{ moment.momentTitle }}</span>
                        <span class="item likes">{{ moment.momentLike }}</span>
                        <span class="item views">{{ moment.momentView }}</span>
                        <span class="item date">{{ moment.momentCreateDate.split(' ')[0] }}</span>
                    </li>
                </ul>
            </div>
        </div>
        <div v-else>
            <p>게시물이 없습니다.</p>
        </div>

        <Pagination
            :totalPosts="totalPosts"
            :postsPerPage="postsPerPage"
            :currentPage="currentPage"
            @page-changed="handlePageChange"
        />
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import Pagination from './Pagination.vue';

// Props 받아오기
const props = defineProps({
    headers: { type: Array, required: true },
    posts: { type: Array, default: () => [] },
    currentPage: { type: Number, default: 1 },
    postsPerPage: { type: Number, default: 10 }
});

const router = useRouter();

// 클릭 이벤트 함수 정의
const goToDetail = (momentNo) => {
    router.push(`/moment/detail/${momentNo}`); // 디테일 페이지로 이동
};

// Computed Properties
const totalPosts = computed(() => props.posts.length);

const paginatedPosts = computed(() => {
    const start = (props.currentPage - 1) * props.postsPerPage;
    const end = start + props.postsPerPage;
    return props.posts.slice(start, end);
});

// 부모 컴포넌트로 페이지 변경 이벤트 전달
const handlePageChange = (page) => {
    emit('page-changed', page);
};
</script>

<style scoped>
    .flex-row-f {
        margin: 50px 0 0 300px;
        z-index: 124;
    }

    .bg {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: absolute;
        width: 45vw;
        height: 6vh;
        background: #c5b697;
        border: 1px solid #c5b697;
        z-index: 124;
        border-radius: 14px 14px 0 0;
        box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
        padding: 0 20px;
    }

    .bg-b {
        top: 10vh;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .number {
        flex-basis: 10%;
    }

    .title {
        flex-basis: 50%;
    }

    .likes {
        flex-basis: 20%;
    }

    .views {
        flex-basis: 20%;
    }

    .date {
        flex-basis: 30%;
    }

    .moment-list {
        list-style: none;
        padding: 0;
        margin-top: 42px;
    }

    ul {
        list-style: none;
        padding: 0;
    }

    li {
        display: flex;
        width: 45vw;
        border-bottom: 1px solid #ddd;
        border-left: 1px solid #ddd;
        border-right: 1px solid #ddd;
        padding: 10px 20px;
    }

    li:hover {
        background-color: #f0f0f0;
        cursor: pointer;
    }

    li:last-child {
        border-radius: 0 0 14px 14px;
    }
</style>
