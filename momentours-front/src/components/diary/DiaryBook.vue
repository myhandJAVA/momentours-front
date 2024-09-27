<template>
    <div class="page-container">
        <div class="book-container">
            <div class="ellipse left-arrow">
                <img src="@/assets/icons/prePage.svg" alt="왼쪽 화살표">
            </div>
            <div class="book-overlay">
                <div class="book-left"></div>
                <div class="book-left" style="margin-left: 10px;"></div>
                <div class="book-left" style="margin-left: 20px;"></div>
            </div>
            <div class="book-overlay">
                <div class="book-right"></div>
                <div class="book-right" style="margin-right: 10px;"></div>
                <div class="book-right" style="margin-right: 20px;"></div>
            </div>
            <div class="ellipse right-arrow">
                <img src="@/assets/icons/nextPage.svg" alt="오른쪽 화살표">
            </div>
        </div>
    </div>
</template>

<script setup>
// 스크립트 내용은 그대로 유지
</script>

<style scoped>
.page-container {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    overflow: hidden;
}

.book-container {
    position: relative;
    width: 100%;
    max-width: 1200px;
    height: 600px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.book-overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    z-index: -20;
}

.book-right {
    position: absolute;
    margin-top: 60px;
    margin-left: 590px;
    width: 530px;
    height: 573px;
    background: #f9f5ea;
    filter: blur(1px);
    border-radius: 0 59px 59px 0;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
}

.book-left {
    position: absolute;
    margin-top: 60px;
    margin-right: 510px;
    width: 530px;
    height: 573px;
    background: #f9f5ea;
    filter: blur(1px);
    border-radius: 59px 0 0 59px;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
}

.ellipse {
    position: absolute;
    width: 40px;
    height: 40px;
    background: #FFC7C7;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    z-index: 10;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
}

.left-arrow {
    left: 10px;
}

.right-arrow {
    right: -27px;
}

.ellipse img {
    width: 18px;
    height: 18px;
}
</style>