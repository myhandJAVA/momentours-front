<template>
    <div class="container">
        <div class="flex-row-f">
            <div class="bg">
                <span class="item number">{{ headers[0] }}</span>
                <span class="item title">{{ headers[1] }}</span>
                <span class="item status">{{ headers[2] }}</span>
                <span class="item like">{{ headers[3] }}</span>
                <span class="item date">{{ headers[4] }}</span>
            </div>
            <div class="bg-b">
                <ul class="course-list">
                    <li v-for="(post, index) in paginatedPosts" :key="index + 1" class="course-item">
                        <span class="item number">{{ (currentPage - 1) * postsPerPage + index + 1 }}</span>
                        <span class="item title">{{ post.momCourseTitle }}</span>
                        <span class="item status">
                            <span v-if="post.momCourseSort === 'fewDay'">연일데이트</span>
                            <span v-else-if="post.momCourseSort === 'oneDay'">당일데이트</span>
                            <span v-else>{{ post.momCourseSort }}</span>
                        </span>
                        <span class="item like">{{ post.momCourseLike }}</span>
                        <span class="item date">{{ post.momCourseCreateDate.split('T')[0] }}</span>
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
        headers: { type: Array, required: true }, // 헤더 데이터를 prop으로 받음
        posts: { type: Array, required: true },   // 외부에서 데이터를 받아오는 prop
        currentPage: { type: Number, default: 1 },
        postsPerPage: { type: Number, default: 10 }
    },
    computed: {
        totalPosts() {
            return this.posts.length;
        },
        paginatedPosts() {
            const start = (this.currentPage - 1) * this.postsPerPage;
            const end = start + this.postsPerPage;
            return this.posts.slice(start, end);
        }
    },
    methods: {
        handlePageChange(page) {
            this.$emit('page-changed', page);
        }
    }
};
</script>


<style scoped>
.flex-row-f {
    margin: 20px 0 0 300px;
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
    /* box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25); */
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
    flex-basis: 60%;
}

.status, .like {
    flex-basis: 20%;
}

.date {
    flex-basis: 30%;
}

.course-list {
    list-style: none;
    padding: 0;
    margin-top: 47px
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
    /* 연한 회색 배경색 */
    cursor: pointer;
}

li:last-child {
    border-radius: 0 0 14px 14px;
}
</style>