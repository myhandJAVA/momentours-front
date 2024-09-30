<template>
    <div>
        <Search :options1="selectOptions1" :options2="selectOptions2" />

        <PostList :headers="['번호', '제목', '기간', '좋아요', '작성일']" :posts="posts" :currentPage="currentPage"
            :postsPerPage="postsPerPage" @page-changed="handlePageChange" />
    </div>
</template>

<script>
import Search from '@/components/course/common/Search.vue';
import PostList from '@/components/course/common/PostList.vue';

export default {
    components: { Search, PostList },
    data() {
        return {
            posts: [],
            currentPage: 1,
            postsPerPage: 10,
            searchQuery: '',
            selectOptions1: [
                { value: '전체', text: '전체' },
                { value: '제목', text: '제목' },
                { value: '메모', text: '메모' },
                { value: '둘다', text: '제목+메모' },
                { value: '공개여부', text: '공개여부' },
            ],
            selectOptions2: [
                { value: '전체', text: '전체' },
                { value: '당일데이트', text: '당일데이트' },
                { value: '연일데이트', text: '연일데이트' },
                { value: '선택없음', text: '선택없음' },
            ],
        };
    },
    methods: {
        handlePageChange(page) {
            this.currentPage = page;
        },
        async fetchPosts() {
            try {
                const response = await fetch('http://localhost:8080/momentcourse');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                this.posts = data;  // 받아온 데이터를 this.posts에 저장
            } catch (error) {
                console.error("Error fetching posts: ", error);
            }
        },
    },
    mounted() {
        this.fetchPosts();
    }
};
</script>