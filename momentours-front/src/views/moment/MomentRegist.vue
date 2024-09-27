<template>
    <div class="MomentRegist">
        <div class="leftContent">
            <!-- 제목 입력 -->
            <input class="title" v-model="state.momentTitle" placeholder="제목을 입력하세요" />

            <!-- 내용 입력 -->
            <textarea class="content" v-model="state.momentContent" placeholder="내용을 입력하세요"></textarea>
        </div>
        <div class="rightContent">
            <CommonMap @markerSelected="selectMarker" :initialCenter="{ lat: 35.1796, lng: 129.0756 }" :level="5" />
        </div>
    </div>
</template>

<script>
import {reactive} from 'vue';
import CommonMap from '@/components/common/CommonMap.vue';

export default {
    components: {
        CommonMap
    },

    setup() {
        const state = reactive({
            selectedMarker: null,   // 선택한 마커 정보
            momentTitle: '',
            momentContent: ''
        });

        // 마커 선택 시 호출
        const selectMarker = (marker) => {
            state.selectedMarker = marker;
        };

        return {
            state,
            selectMarker
        };
    }
};
</script>

<style scoped>
/* 전체 레이아웃 */
.MomentRegist {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    height: 100vh;
}

/* 제목 입력 필드 스타일 */
.title {
    width: 100%;
    font-size: 2rem;
    font-weight: bold;
    padding: 15px;
    margin-bottom: 20px;
    border: 2px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 내용 입력 필드 스타일 */
.content {
    width: 100%;
    height: 300px;
    font-size: 1.2rem;
    line-height: 1.6;
    padding: 20px;
    border: 2px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    resize: vertical; /* 사용자가 내용 칸 크기를 조절할 수 있도록 */
}

/* 왼쪽 영역 스타일 */
.leftContent {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

/* 오른쪽 영역 스타일 */
.rightContent {
    display: flex;
    flex-direction: column;
}

/* 맵 주변 스타일 */
.rightContent .map-wrapper {
    flex-grow: 1;
    border: 1px solid #ddd;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
