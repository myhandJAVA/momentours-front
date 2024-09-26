<template>
    <div class="MomentRegist">
        <div class="leftContent">
        </div>
        <div class="rightContent">
            <CommonMap @markerSelected="selectMarker" :initailCenter="{ lat: 35.1796, lng: 129.0756 }" :level="5" />
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
            momentContent: '' // 추억 글 내용
        });

        // 마커 선택 시 호출
        const selectMarker = (marker) => {
            state.selectedMarker = marker;
        };
    }
}

</script>

<style scoped>
.MomentRegist {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    height: 100vh;
}

.leftContent {
    padding: 20px;
}

.rightContent {
    display: flex;
    flex-direction: column;
}
</style>