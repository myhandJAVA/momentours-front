<template>
    <div>
        <Search :options1="selectOptions1" :options2="selectOptions2" navigateTo="/todocourse/regist"/>

        <PostList 
            :headers="['번호', '제목', '기간', '작성일']" 
            :posts="posts" 
            :currentPage="currentPage"
            :postsPerPage="postsPerPage" 
            @page-changed="handlePageChange" 
            @post-selected="goToDetail" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Search from '@/components/course/common/Search.vue';
import PostList from '@/components/course/common/PostList.vue';

const router = useRouter();

const posts = ref([]); // 게시물 리스트
const currentPage = ref(1);
const postsPerPage = ref(10);
const selectOptions1 = ref([
    { value: '전체', text: '전체' },
    { value: '제목', text: '제목' },
    { value: '메모', text: '메모' },
    { value: '둘다', text: '제목+메모' },
]);
const selectOptions2 = ref([
    { value: '전체', text: '전체' },
    { value: '당일데이트', text: '당일데이트' },
    { value: '연인데이트', text: '연인데이트' },
    { value: '선택없음', text: '선택없음' },
]);

const fetchPosts = async () => {
    try {
        const response = await fetch('http://localhost:8080/todocourse');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        posts.value = await response.json(); // 받아온 데이터를 posts에 저장
        // goToDetail(posts);  // 이렇게 하는거 맞나?
    } catch (error) {
        console.error("Error fetching posts: ", error);
    }
};

const handlePageChange = (page) => {
    currentPage.value = page; // 현재 페이지를 변경
};

const goToDetail = (post) => {
    router.push(`/todocourse/detail/${post.toDoCourseNo}`);
};

onMounted(() => {
    fetchPosts(); // 컴포넌트가 마운트될 때 게시물 가져오기
});

// export default {
//     components: { Search, PostList },
//     data() {
//         return {
//             posts: [],
//             currentPage: 1,
//             postsPerPage: 10,
//             searchQuery: '',
//             selectOptions1: [
//                 { value: '전체', text: '전체' },
//                 { value: '제목', text: '제목' },
//                 { value: '메모', text: '메모' },
//                 { value: '둘다', text: '제목+메모' },
//                 // { value: '공개여부', text: '공개여부' },
//             ],
//             selectOptions2: [
//                 { value: '전체', text: '전체' },
//                 { value: '당일데이트', text: '당일데이트' },
//                 { value: '연인데이트', text: '연인데이트' },
//                 { value: '선택없음', text: '선택없음' },
//             ],
//         };
//     },
//     methods: {
//         handlePageChange(page) {
//             this.currentPage = page;
//         },
//         async fetchPosts() {
//             try {
//                 const response = await fetch('http://localhost:8080/todocourse');
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! status: ${response.status}`);
//                 }
//                 const data = await response.json();
//                 this.post = data;  // 받아온 데이터를 this.posts에 저장
//             } catch (error) {
//                 console.error("Error fetching posts: ", error);
//             }
//         },
//         goToDetail(post) {
//             this.$router.push({
//                 // path: `/todocourse/detail/${id}`,
//                 // query: { id: post.toDoCourseNo }
//                 // name: 'TodoCourseDetailView', params: { id: 1 }
//                 name: 'TodoCourseDetailView',
//                 params: { id: post.toDoCourseNo }
//             });
//         }
//     },
//     mounted() {
//         this.fetchPosts();
//     }
// };
</script>