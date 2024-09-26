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
            // posts 데이터를 가져오는 코드
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