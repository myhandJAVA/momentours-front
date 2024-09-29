<template>
    <div class="MomentDetail" v-if="state.momentData">
        <div class="leftContent">
            <div class="moment-card">
                <h2 class="moment-title">{{ state.momentData.momentTitle }}</h2>
                <div class="moment-info">
                    <p class="category">카테고리: {{ state.momentData.momentCategory }}</p>
                    <p class="like"> 좋아요: {{ state.momentData.momentLike }}</p>
                    <p class="view"> 조회수: {{ state.momentData.momentView }}</p>
                    <p class="date"> 작성일: {{ state.momentData.momentCreateDate.split(' ')[0] }}</p>
                </div>
                <div class="moment-content">
                    <h4>{{ state.momentData.momentContent }}</h4>
                </div>
            </div>
        </div>
        <div class="rightContent">
            <CommonMap v-if="state.momentLocation" :singleMarker="state.momentLocation" :initialCenter="state.momentLocation" :level="5" />
        </div>
    </div>
    <div v-else class="loading-container">
        <p>데이터를 불러오는 중입니다...</p>
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
        const response = await fetch(`http://localhost:3000/Moments`); // 전체 Moments 데이터를 가져옴
        if (response.ok) {
            const data = await response.json();
            console.log('받아온 데이터:', data); // 데이터 구조 확인

            // JSON 데이터가 배열이므로 해당하는 moment 찾기
            if (Array.isArray(data)) {
                const moment = data.find((m) => m.momentNo === Number(momentNo));
                if (moment) {
                    state.momentData = moment;
                    state.momentLocation = {
                        lat: moment.momentLatitude,
                        lng: moment.momentLongitude,
                        placeName: moment.momentLocationName,
                        address: moment.momentAddress,
                    };
                } else {
                    console.error('해당하는 모멘트를 찾을 수 없습니다.');
                }
            } else {
                console.error('데이터 형식이 올바르지 않습니다.', data);
            }
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
    background-color: #f9f9f9;
}

.leftContent {
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
}

.moment-card {
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    max-width: 600px;
    width: 100%;
    height: 100%;
}

.moment-title {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 20px;
    color: #333;
}

.moment-info {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin-bottom: 20px;
}

.moment-info p {
    background-color: #f1f1f1;
    padding: 10px;
    border-radius: 5px;
    font-size: 0.9rem;
    color: #555;
}

.category {
    background-color: #d3e5ff;
    color: #0073e6;
}

.like, .view, .date {
    display: flex;
    align-items: center;
}

.moment-content {
    font-size: 1.1rem;
    line-height: 1.6;
    color: #444;
    border-top: 1px solid #ddd;
    padding-top: 20px;
}

.rightContent {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100%;
}

.loading-container {
    text-align: center;
    font-size: 1.2rem;
    color: #555;
}
</style>
