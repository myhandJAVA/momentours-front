<template>
    <div class="main-layout">
    <div class="content-wrapper">
        <div class="written-content">
        <WrittenContentList />
        </div>
        <div class="details-wrapper">
        <div class="couple-info-wrapper">
            <CoupleInfoComponent />
        </div>
        <div class="couple-details-wrapper">
            <CoupleDetails />
        </div>
        </div>
    </div>
    </div>
</template>

<script setup>

import CoupleInfoComponent from '@/components/couple/CoupleInfoComponent.vue';
import WrittenContentList from '@/components/couple/WrittenContentList.vue';
import CoupleDetails from '@/components/couple/CoupleDetails.vue';
</script>

<style scoped>
.main-layout {
    display: flex;
    flex-direction: column;
    height: 100vh;
}

.content-wrapper {
    display: flex;
    flex-grow: 1;
    padding: 20px;
    background-color: #f5f5f5;
}

.written-content {
    width: 200px;
    margin-right: 20px;
}

.details-wrapper {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.couple-info-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}

.couple-details-wrapper {
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
}

@media (max-width: 768px) {
    .couple-details-wrapper {
    flex-direction: column;
    align-items: center;
    }

    .written-content {
    display: none; /* 작은 화면에서 작성 목록을 숨김 */
    }
}
</style>
