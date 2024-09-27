<template>
    <div class="post-container">
        
        <h1 class="title">{{ title }}</h1>

        <div class="user-info">
            <div class="user-left">
                <img :src="userImage" alt="userImage" class="user-image"/>
                <div class="user-details">
                    <span class="name">{{ userName }}</span>
                    <span class="date">| {{ date }}</span>
                    <span class="type">| {{ type }}</span>
                </div>
            </div>
            <MoreBox/>
        </div>

        <!-- 수평선 -->
        <hr/>
    </div>
</template>

<script setup>
import MoreBox from '@/components/common/MoreBox.vue';
import { ref } from 'vue';

// 게시글 정보 예시
// const title = ref('강릉 데이트');
// const userName = ref('안녕하세요나는주코야끼');
// const date = ref('2024. 09. 02.');
// const type = ref('연일데이트');
// const userImage = ref('https://via.placeholder.com/40');
</script>

<style scoped>
.post-container {
    margin: 20px;
    position: relative;
}

/* 제목 스타일 */
.title {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 30px;
}

/* 작성자 정보 컨테이너 */
.user-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #000000;
    font-size: 0.9rem;
}

/* 작성자 정보 왼쪽 */
.user-left {
    display: flex;
    align-items: center;
}

/* 작성자 이미지 스타일 */
.user-image {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
}

/* 작성자 이름 및 세부 정보 */
.user-details {
    display: flex;
    align-items: center;
}

.name {
    margin-right: 5px;
}

.date {
    margin-left: 5px;
    color:#888;
}
.type {
    margin-left: 5px;
}

/* 더보기 메뉴 아이콘 스타일 */
.more-options {
    cursor: pointer;
    position: relative;
}

.more-options svg {
    fill: #888;
    width: 24px;
    height: 24px;
}

/* 메뉴 드롭다운 스타일 */
.menu-dropdown {
    position: absolute;
    right: 0;
    top: 30px;
    background-color: white;
    border: 1px solid #ddd;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 10;
    padding: 10px;
    border-radius: 4px;
}

.menu-dropdown ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.menu-dropdown li {
    padding: 8px 12px;
    cursor: pointer;
    font-size: 0.9rem;
}

.menu-dropdown li:hover {
    background-color: #f0f0f0;
}
</style>
