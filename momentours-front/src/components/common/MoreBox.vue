<!-- MoreBox.vue -->
<template>
    <div class="more-options" @click.stop="toggleMenu">
        <img src="@/assets/icons/threeDots.svg" alt="threeDots">
        <div v-if="isMenuOpen" class="menu-dropdown">
            <ul>
                <li>수정</li>
                <hr class="">
                <li style="color: red;">삭제</li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const isMenuOpen = ref(false);

// 더보기 메뉴 상태 전환
const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
};

// 더보기 메뉴 이외의 클릭 시 메뉴 닫기
const closeMenu = () => {
    isMenuOpen.value = false;
};

// 클릭 이벤트 감지
const handleClickOutside = (event) => {
    const moreOptionsElement = document.querySelector('.more-options');
    if (moreOptionsElement && !moreOptionsElement.contains(event.target)) {
        closeMenu();
    }
};

/* 메뉴 액션 함수 작성!! */


// 컴포넌트가 마운트될 때 클릭 이벤트 등록
onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});

// 컴포넌트가 언마운트될 때 클릭 이벤트 제거
onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.more-options {
    cursor: pointer;
    position: relative;
}

.menu-dropdown {
    position: absolute;
    right: 0;
    top: 30px;
    width: 100px;
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
    text-align: center;
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
