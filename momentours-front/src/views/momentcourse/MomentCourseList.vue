<template>
    <div>
        <PostList
            :headers="['번호', '제목', '기간', '작성일']"
            :posts="posts" 
            :currentPage="currentPage"
            :postsPerPage="postsPerPage"
            @page-changed="handlePageChange"
        />
    </div>
</template>

<script>
import PostList from '@/components/course/common/PostList.vue';

export default {
    components: { PostList },
    data() {
        return {
            posts: [], // 서버에서 받아오는 게시글 데이터
            currentPage: 1,
            postsPerPage: 10
        };
    },
    methods: {
        handlePageChange(page) {
            this.currentPage = page;
        },
        async fetchPosts() {
            try {
                const response = await fetch('http://localhost:8080/posts');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                this.posts = data;  // 받아온 데이터를 this.posts에 저장
            } catch (error) {
                console.error("Error fetching posts: ", error);
            }
        }
    },
    mounted() {
        this.fetchPosts();
    }
};
</script>

<style scoped>
/* 스타일 여기에 추가 */
</style>
