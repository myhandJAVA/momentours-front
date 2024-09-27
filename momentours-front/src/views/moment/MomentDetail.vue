<template>
    <div class="MomentDetail">
        <div class="leftContent">
            <h1>{{ momentData.momentTitle }}</h1>
            <p>{{ momentData.momentCategory }}</p>
            <br>
            <h3>{{ momentData.momentContent }}</h3>

        </div>
        <div class="rightContent">
            <CommonMap v-if="momentLocation" :singleMarker="momentLocation" :initialCenter="momentLocation" :level="5" />
        </div>
    </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import CommonMap from '@/components/common/CommonMap.vue';

const route = useRoute();
const state = reactive({
    momentData: null,
    momentLocation: null
});

const fetchMomentData = async () => {
    try {
        const momentNo = route.params.momentNo;
        const response = await fetch(`http://localhost:3000/Moments/${momentNo}`);
        if (response.ok) {
            const data = await response.json();
            state.momentData = data;
            state.momentLocation = {lat: data.momentLatitude, lng: data.momentLongitude}
        } else {
            console.error('데이터를 가져오는데 실패했습니다.');
        }
    } catch (error) {
        console.error('데이터 전송 요청 중 문제가 발생함', error);
    }
};

onMounted(() => {
    fetchMomentData();
});

</script>

<style scoped>
.MomentDetail {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    padding: 20px;
}

.leftContent {
    padding: 20px;
}

.rightContent {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>