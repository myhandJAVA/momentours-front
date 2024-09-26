<template>
    <div class="pagination">
        <!-- 이전 페이지 -->
        <button @click="prevPage" :disabled="currentPage === 1">이전</button>

        <span> | </span>

        <!-- 페이지 숫자 버튼 -->
        <button 
            v-for="page in totalPages" 
            :key="page" 
            @click="changePage(page)"
            :class="{ active: page === currentPage }"
        >
            {{ page }}
        </button>

        <span> | </span>

        <!-- 다음 페이지 -->
        <button @click="nextPage" :disabled="currentPage === totalPages">다음</button>
    </div>
</template>

<script>
    export default {
        props: {
            totalPosts: { type: Number, required: true },
            postsPerPage: { type: Number, default: 10},
            currentPage: { type: Number, default: 1}
        },
        computed: {
            totalPages() {
                return Math.ceil(this.totalPosts / this.postsPerPage);
            }
        },
        methods: {
            changePage(page) {
                this.$emit('page-changed', page);
            },
            prevPage() {
                if (this.currentPage > 1) {
                    this.changePage(this.currentPage - 1);
                }
            },
            nextPage() {
                if (this.currentPage < this.totalPages) {
                    this.changePage(this.currentPage + 1);
                }
            }
        }
    };

</script>

<style scoped>
.pagination {
    display: flex;
    justify-content: center; /* 중앙 정렬 */
    align-items: center;
    margin: 5px 0;
}

.pagination button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: 5px 10px;
}

.pagination button:disabled {
    color: grey;
    cursor: not-allowed;
}

.pagination button.active {
    font-weight: bold;
    border-bottom: 2px solid black;

}
</style>
