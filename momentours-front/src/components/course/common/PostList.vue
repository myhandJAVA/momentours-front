<template>
    <div class="container">
        <div class="flex-row-f">
            <div class="bg">
                <span class="item number">{{ headers[0] }}</span>
                <span class="item title">{{ headers[1] }}</span>
                <span class="item status">{{ headers[2] }}</span>
                <span class="item date">{{ headers[3] }}</span>
            </div>
            <div></div>
            <div class="bg-b">
                <ul class="course-list">
                    <li v-for="(post, index) in paginatedPosts" :key="index + 1" class="course-item">
                        <span class="item number">{{ (currentPage - 1) * postsPerPage + index + 1 }}</span>
                        <span class="item title">{{ post.toDoCourseTitle }}</span>
                        <span class="item status">
                            <span v-if="post.toDoCourseSort === 'fewDay'">연일데이트</span>
                            <span v-else-if="post.toDoCourseSort === 'oneDay'">당일데이트</span>
                            <span v-else>{{ post.toDoCourseSort }}</span>
                        </span>
                        <span class="item date">{{ post.toDoCourseCreateDate.split('T')[0] }}</span>
                    </li>
                </ul>
            </div>
        </div>

        <Pagination
            :totalPosts="totalPosts"
            :postsPerPage="postsPerPage"
            :currentPage="currentPage"
            @page-changed="handlePageChange"
        />
    </div>
</template>

<script>
import Pagination from './Pagination.vue';

export default {
    components: { Pagination },
    props: {
        headers: { type: Array, required: true },
        posts: { type: Array, required: true },
        currentPage: { type: Number, default: 1 },
        postsPerPage: { type: Number, default: 10 }
    },
    data() {
        return {
            posts: [], // 서버에서 받아오는 게시글 데이터
            currentPage: 1,     // 현재 페이지 번호
            postsPerPage: 10    // 한 페이지에 보여줄 게시글의 개수
        };
    },
    computed: {
        totalPosts() {
            return this.posts.length;
        },
        paginatedPosts() {
            // 현재 페이지에 해당하는 게시글 목록을 반환하는 computed 속성
            const start = (this.currentPage - 1) * this.postsPerPage;
            const end = start + this.postsPerPage;
            return this.posts.slice(start, end);
        }
    },
    methods: {
        handlePageChange(page) {
            this.currentPage = page;
        },
        async fetchPosts() {
            try {
                /* JSON Server에서 fetch를 사용하여 데이터 가져오기 */
                const response = await fetch('http://localhost:8080/posts');
                // 응답이 성공적인지 확인
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                // 응답을 JSON 형태로 변환
                const data = await response.json();
                this.posts = data;  // 받아온 데이터를 this.posts에 저장
            } catch (error) {
                console.error("Error fetching posts: ", error);
            }
        }
    },
    mounted() {
        // API 호출로 posts 데이터 가져오기
        // ex. this.posts = await fetchPosts();
        this.fetchPosts();
    }
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
        flex-basis: 10%; /* 번호 항목은 상대적으로 더 좁은 공간 할당 */
    }

    .title {
        flex-basis: 60%; /* 제목은 더 넓은 공간 할당 */
    }

    .status {
        flex-basis: 20%; /* 나머지 항목들은 균등하게 할당 */
    }

    .date {
        flex-basis: 30%;
    }

    .course-list {
        list-style: none;
        padding: 0;
        margin-top: 42px
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
        background-color: #f0f0f0; /* 연한 회색 배경색 */
        cursor: pointer;
    }

    li:last-child {
        border-radius: 0 0 14px 14px;
    }
</style>