<template>

    <div class="flex-row-d">
        <div style="display: flex;">
            <select v-model="selectedOption1">
                <option value="전체" selected>전체</option>
                <option value="제목">제목</option>
                <option value="메모">메모</option>
                <option value="둘다">제목+메모</option>
                <option value="공개여부">공개여부</option>
            </select>

            <select v-model="selectedOption2">
                <option value="전체" selected>전체</option>
                <option value="당일데이트">당일데이트</option>
                <option value="연인데이트">연인데이트</option>
                <option value="선택없음">선택없음</option>
            </select>

            <div class="input-container">
                <input type="text" placeholder="검색" v-model="searchQuery">
                <img src="@/assets/icons/search.svg" @click="handleSearch" class="search-icon" alt="Search" />
            </div>
        </div>

        <div>
            <button class="common-button bg-color-pink" style="margin-right: 130px">코스등록</button>
        </div>
    </div>

    <div>
        <PostList :headers="['번호', '제목', '기간', '작성일']" :posts="posts" :currentPage="currentPage"
            :postsPerPage="postsPerPage" @page-changed="handlePageChange" />
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
            postsPerPage: 10,
            searchQuery: ''
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
        },

        handleSearch() {
            console.log('검색어:', this.searchQuery);
            // 실제 검색 로직을 여기에 추가
        },
    },
    mounted() {
        this.fetchPosts();
    }
};
</script>

<style scoped>

.flex-row-d {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    margin-left: 35vw;
    z-index: 39;
    justify-content: space-between; 
}

.common-button {
    flex-shrink: 0;
    margin-left: auto;
}

select {
    width: 100px;
    padding: 5px;
    margin-right: 10px;
    border-radius: 6px;
    border-color: #CCCCCC;
}

select option {
    color: black;
    font-size: 14px;
}

.input-with-icon input {
    padding-left: 30px;
}

.input-with-icon::after {
    content: "";
    left: 8px;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    background-image: url('@/assets/icons/search.svg');
    background-size: cover;
}

.input-container {
    position: relative;
    display: flex;
    align-items: center;
}

input {
    flex: 1;
    padding: 8px 40px 8px 10px;
    font-size: 14px;
    border: none;
    outline: none;
    border-radius: 10px;
    box-shadow: 0 4px 12px 0 rgba(13, 10, 44, 0.06);
}

.search-icon {
    position: absolute;
    right: 10px;
    width: 20px;
    height: 20px;
    cursor: pointer;
}



</style>
