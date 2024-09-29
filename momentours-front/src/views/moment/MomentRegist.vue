<template>
    <div class="MomentRegist">
        <div class="leftContent">
            <!-- 제목 입력 -->
            <input class="title" v-model="state.momentTitle" placeholder="제목을 입력하세요" />

            <!-- 카테고리 선택 영역 -->
            <div class="category-select">
                <label v-for="category in categories" :key="category" class="category-label">
                    <input type="radio" :value="category" v-model="state.selectedCategory" />
                    <span class="radio-circle"></span>
                    {{ category }}
                </label>
            </div>

            <!-- 내용 입력 -->
            <textarea class="content" v-model="state.momentContent" placeholder="내용을 입력하세요"></textarea>

            <!-- 공개 여부 선택 및 업로드 버튼 영역 -->
            <div class="public-upload">
                <div class="public-select">
                    <label v-for="ispublic in publics" :key="ispublic" class="public-label">
                        <input type="radio" :value="ispublic" v-model="state.selectedPublic" />
                        <span class="radio-circle"></span>
                        {{ ispublic }}
                    </label>
                </div>
                <button class="submit-button" @click="registerMoment">추억 등록</button>
            </div>
        </div>
        <div class="rightContent">
            <CommonMap @markerSelected="selectMarker" :initialCenter="{ lat: 35.1796, lng: 129.0756 }" :level="5" />
        </div>
    </div>
</template>

<script>
import { reactive } from 'vue';
import axios from 'axios';
import CommonMap from '@/components/common/CommonMap.vue';

export default {
    components: {
        CommonMap
    },

    setup() {
        const categories = ['맛집', '여행', '카페', '체험', '산책'];
        const publics = ['공개', '비공개'];

        const state = reactive({
            selectedMarker: null,   // 선택한 마커 정보
            momentTitle: '',
            momentContent: '',
            selectedCategory: '', // 선택한 카테고리
            selectedPublic: '', // 공개 여부
            selectedPlace: null // 선택된 장소 정보
        });

// 마커 선택 시 호출
const selectMarker = ({ marker, place }) => {
    // place 객체가 없을 경우 기본값 설정
    const { place_name = 'Unknown Location', road_address_name = '', address_name = '' } = place;

    state.selectedMarker = marker;
    state.selectedPlace = {
        placeName: place_name,
        roadAddress: road_address_name || address_name,
        lat: marker.getPosition().getLat(),
        lng: marker.getPosition().getLng()
    };
};

        // 글 등록 함수
        const registerMoment = async () => {
            if (!state.momentTitle || !state.momentContent || !state.selectedCategory || !state.selectedPublic || !state.selectedPlace) {
                alert('모든 필드를 입력해주세요.');
                return;
            }

            try {
                // 기존 Moments 데이터 가져오기
                const response = await axios.get('http://localhost:3000/Moments');
                const moments = response.data;

                // 가장 큰 momentNo 찾기
                const lastMomentNo = moments.length > 0 ? Math.max(...moments.map(moment => moment.momentNo)) : 0;

                // 새 momentNo 할당
                const newMomentNo = lastMomentNo + 1;

                // 새로운 moment 객체 생성
                const newMoment = {
                    momentNo: newMomentNo,
                    momentTitle: state.momentTitle,
                    momentCategory: state.selectedCategory,
                    momentContent: state.momentContent,
                    momentCreateDate: new Date().toISOString(), // 현재 날짜와 시간
                    momentUpdateDate: null,
                    momentIsPublic: state.selectedPublic === '공개',
                    momentLike: 0,
                    momentView: 0,
                    momentCoupleNo: 1, // 임의로 설정
                    momentIsDeleted: false,
                    momentLongitude: state.selectedPlace.lng,
                    momentLatitude: state.selectedPlace.lat,
                    momentAddress: state.selectedPlace.roadAddress,
                    momentLocationName: state.selectedPlace.placeName
                };

                // 새 Moment 등록
                const postResponse = await axios.post('http://localhost:3000/Moments', newMoment);
                console.log('등록 성공:', postResponse.data);
                alert('추억이 성공적으로 등록되었습니다.');
            } catch (error) {
                console.error('등록 중 오류가 발생했습니다:', error);
                alert('추억 등록에 실패했습니다.');
            }
        };

        return {
            state,
            categories,
            publics,
            selectMarker,
            registerMoment
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

/* 카테고리 선택 영역 스타일 */
.category-select {
    display: flex;
    justify-content: flex-start;
    gap: 15px;
    margin-bottom: 20px;
}

/* 공개 여부 선택 및 업로드 버튼 스타일 */
.public-upload {
    display: flex;
    justify-content: space-between; /* 공개 여부와 업로드 버튼을 양 끝에 배치 */
    align-items: center;
    margin-bottom: 20px;
}

/* 공개 여부 선택 영역 스타일 */
.public-select {
    display: flex;
    gap: 15px;
}

/* 공개 여부 및 카테고리 스타일 */
.category-label, .public-label {
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 1.1rem;
}

/* 라디오 버튼 스타일 */
.radio-circle {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: 10px;
    border-radius: 50%;
    border: 2px solid #ddd;
    position: relative;
}

input[type="radio"] {
    display: none;
}

input[type="radio"]:checked + .radio-circle {
    background-color: #c5b697;
    border-color: #c5b697;
}

.radio-circle:after {
    content: '';
    width: 10px;
    height: 10px;
    background-color: white;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
}

input[type="radio"]:checked + .radio-circle:after {
    opacity: 1;
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
    resize: vertical;
}

/* 등록 버튼 스타일 */
.submit-button {
    padding: 10px 20px;
    background-color: #f1c40f;
    border: none;
    border-radius: 10px;
    font-size: 1rem;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
    margin-top: 20px;
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
