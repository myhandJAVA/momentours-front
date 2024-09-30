<template>
    <div class="flex-row-d">
        <div style="display: flex;">
            <select v-model="selectedOption1">
                <option v-for="option in options1" :key="option.value" :value="option.value">
                    {{ option.text }}
                </option>
            </select>

            <select v-model="selectedOption2">
                <option v-for="option in options2" :key="option.value" :value="option.value">
                    {{ option.text }}
                </option>
            </select>

            <div class="input-container">
                <input type="text" placeholder="검색" v-model="searchQuery" />
                <img src="@/assets/icons/search.svg" @click="handleSearch" class="search-icon" alt="Search" />
            </div>
        </div>

        <div>
            <button class="common-button bg-color-pink" @click="navigateToPath" style="margin-right: 130px">코스등록</button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        options1: {
            type: Array,
            required: true,
        },
        options2: {
            type: Array,
            required: true,
        },
        navigateTo: {
            type: String,
            required: true,
        }
    },
    data() {
        return {
            selectedOption1: "전체",
            selectedOption2: "전체",
            searchQuery: "",
        };
    },
    methods: {
        handleSearch() {
            console.log('검색어:', this.searchQuery);
            // 실제 검색 로직을 여기에 추가
        },
        navigateToPath() {
            this.$router.push(this.navigateTo); // Vue Router를 사용한 경로 이동
        }
    },
};
</script>

<style scoped>
/* 스타일은 기존 컴포넌트에서 사용하던 것을 그대로 가져와주세요. */
.flex-row-d {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    margin-left: 35vw;
    z-index: 39;
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