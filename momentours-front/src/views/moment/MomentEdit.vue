<template>
    <div class="MomentEdit" v-if="state.momentData">
        <div class="leftContent">
            <div class="moment-card">
                <!-- 제목을 수정할 수 있는 input 필드 -->
                <h2 class="moment-title">
                    <input 
                        v-model="state.momentData.momentTitle" 
                        type="text" 
                        class="editable-title" 
                        placeholder="제목을 입력하세요."
                    />
                </h2>
                <div class="moment-info">
                    <p class="category">카테고리: {{ state.momentData.momentCategory }}</p>
                    <p class="like">좋아요: {{ state.momentData.momentLike }}</p>
                    <p class="view">조회수: {{ state.momentData.momentView }}</p>
                    <p class="date">작성일: {{ state.momentData.momentCreateDate.split(' ')[0] }}</p>
                </div>
                <div class="moment-content">
                    <!-- 내용을 수정할 수 있는 textarea -->
                    <textarea 
                        v-model="state.momentData.momentContent" 
                        class="editable-content" 
                        rows="10"
                        placeholder="내용을 입력하세요."
                    ></textarea>
                </div>
            </div>
            <!-- 수정 취소 및 저장 버튼 -->
            <div class="button-container">
                <button @click="saveChanges" class="save-button">저장하기</button>
                <button @click="cancelEdit" class="cancel-button">취소하기</button>
            </div>
        </div>
        <div class="rightContent">
            <CommonMap v-if="state.momentLocation" :singleMarker="state.momentLocation" :initialCenter="state.momentLocation" :level="5" />
        </div>
    </div>
    <div v-else>
        <p>데이터를 불러오는 중입니다...</p>
    </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import CommonMap from '@/components/common/CommonMap.vue';

const route = useRoute();
const router = useRouter();
const state = reactive({
    momentData: null,
    momentLocation: null
});

const fetchMomentData = async () => {
    try {
        const id = route.params.id; // 'id'로 변경
        const response = await fetch(`http://localhost:3000/Moments`);
        if (response.ok) {
            const data = await response.json();
            const moment = data.find((m) => m.id === id); // 'id'로 변경
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
            console.error('데이터를 가져오는데 실패했습니다.');
        }
    } catch (error) {
        console.error('데이터 전송 요청 중 문제가 발생함', error);
    }
};

// 저장 버튼 클릭 시
const saveChanges = async () => {
    try {
        const id = route.params.id; // 'id'로 변경
        const response = await fetch(`http://localhost:3000/Moments/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...state.momentData, // 기존 데이터 유지
                momentTitle: state.momentData.momentTitle, // 수정된 제목
                momentContent: state.momentData.momentContent // 수정된 내용
            })
        });

        if (response.ok) {
            alert('수정이 완료되었습니다.');
            router.push(`/moment/detail/${state.momentData.momentNo}`); // 'id'로 변경
        } else {
            console.error('수정 요청 실패');
        }
    } catch (error) {
        console.error('저장 중 문제가 발생했습니다.', error);
    }
};


// 취소 버튼 클릭 시
const cancelEdit = () => {
    router.push(`/moment/${route.params.id}`); // 'id'로 변경
};

onMounted(() => {
    fetchMomentData();
});
</script>

<style scoped>
.MomentEdit {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    padding: 20px;
    background-color: #f9f9f9;
}

.leftContent {
    padding: 20px;
    display: flex;
    flex-direction: column; /* 세로 정렬 */
    justify-content: space-between; /* 공간을 균등하게 분배 */
}

.editable-title {
    width: 100%;
    padding: 10px;
    font-size: 1.8rem;
    border: 1px solid #ddd;
    border-radius: 5px;
}

.editable-content {
    width: 100%;
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ddd;
    border-radius: 5px;
}

.save-button, .cancel-button {
    margin-top: 20px;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.button-container {
    display: flex; /* flexbox로 버튼을 수평 정렬 */
    gap: 10px; /* 버튼 간격 */
    margin-top: auto; /* 가능한 하단으로 이동 */
}

.save-button {
    padding: 10px 20px;
    background-color: #f0f0f0;
    border: 1px solid #ddd;
    cursor: pointer;
    border-radius: 5px;
}

.save-button:hover {
    background-color: #d1e7dd;
}

.cancel-button {
    padding: 10px 20px;
    background-color: #f0f0f0;
    border: 1px solid #ddd;
    cursor: pointer;
    border-radius: 5px;
}

.cancel-button:hover {
    background-color: #f8d7da;
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
