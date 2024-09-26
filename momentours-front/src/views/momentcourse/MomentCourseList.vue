<template>

    <div class="flex-row-d">
        <div>
            <select v-model="selectedOption1">
                <option value="전체" selected>전체</option>
                <option value="제목">제목</option>
                <option value="메모">메모</option>
                <option value="공개여부">공개여부</option>
            </select>

            <select v-model="selectedOption2">
                <option value="전체" selected>전체</option>
                <option value="당일데이트">당일데이트</option>
                <option value="연인데이트">연인데이트</option>
                <option value="선택없음">선택없음</option>
            </select>

            <div class="input-container">
                <input type="text" placeholder="검색">
            </div>
        </div>

        <div>
            <button class="common-button bg-color-pink">코스등록</button>
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

.flex-row-d {
    display: flex;
    margin-top: 20px;
    margin-left: 37vw;
    z-index: 39;
    justify-content: space-between; /* 요소들이 양쪽 끝으로 정렬되도록 설정 */
}

.input-container {
    flex-grow: 1; /* 이 컨테이너가 남은 공간을 차지하게 만듦 */
    margin-right: 10px; /* 버튼과의 간격 */
}

.common-button {
    flex-shrink: 0; /* 버튼의 크기가 줄어들지 않도록 설정 */
    margin-left: auto; /* 버튼을 오른쪽 끝으로 배치 */
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
}

input {
    flex: 1;
    padding: 10px;
    font-size: 14px;
    border: none;
    border-radius: 10px;
    box-shadow: 0 4px 12px 0 rgba(13, 10, 44, 0.06);
    outline: none;
    background: transparent;
    z-index: 44;
}

.input-with-icon {
    position: relative;
}

.input-with-icon input {
    padding-left: 30px;
}

.input-with-icon::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 8px;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    background-image: url('@/assets/icons/search.svg');
    background-size: cover;
}

.input-container input {
    flex: 1;
    font-size: 14px;
    border: none;
    border-radius: 10px;
    outline: none;
    background: transparent;
    z-index: 44;
    padding-right: 40px;
    padding: 8px;
    background-image: url('@/assets/icons/search.svg');
    background-position: right 10px center;
    background-repeat: no-repeat;
    background-size: 20px 20px;
    box-shadow: 0 4px 12px 0 rgba(13, 10, 44, 0.06);
}



</style>
