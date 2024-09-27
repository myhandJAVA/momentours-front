<template>
    <div class="CommonMap">
        <div class="search-box" v-if="!singleMarker"> <!-- 싱글 마커일 때는 검색창 숨김 -->
            <input v-model="state.searchQuery" type="text" placeholder="장소를 입력하세요.">
            <button @click="searchLocation">🔍</button>
        </div>
        <div id="map"></div>
    </div>
</template>

<script>
import {reactive, onMounted} from 'vue';

    export default {
        props: {
            initialCenter: { // 기본으로 표시될 좌표(신대방삼거리역 2번출구)
                type: Object,
                default: () => ({
                    lat: 37.499526,
                    lng: 126.928357
                })
            },
            level: {
                type: Number,
                default: 5
            },
            singleMarker: {
                type: Object,
                default: null
            }
        },
        setup(props, { emit }) {
            const state = reactive({
                map: null,
                searchQuery:'', // 지도에서 장소 검색어
                placeService: null, // 장소 검색 서비스 객체
                markers: [] // 지도에 표시될 마커들을 담은 배열
            });

            // 카카오 맵 초기화
            const initializeMap = () => {
                const container = document.getElementById('map');
                const options = {
                    center: new window.kakao.maps.LatLng(props.initialCenter.lat, props.initialCenter.lng),
                    level: props.level
                };
                state.map = new window.kakao.maps.Map(container, options);
                state.placeService = new window.kakao.maps.services.Places();

                if (props.singleMarker) {
                    addSingleMarker(props.singleMarker); // 단일 마커 표시
                }
            };

            const addSingleMarker = (markerData) => {
                const markerPosition = new window.kakao.maps.LatLng(markerData.lat, markerData.lng);
                const marker = new window.kakao.maps.Marker({
                    position: markerPosition,
                    map: state.map,
                    title: markerData.placeName || 'Selected Location'
                });
                state.map.setCenter(markerPosition);
            };

            // 장소 검색
            const searchLocation = () => {
                clearMarkers();
                state.placeService.keywordSearch(state.searchQuery, placesSearchCB);
            };

            // 검색 콜백 함수
            const placesSearchCB = (data, status) => {
                if (status === kakao.maps.services.Status.OK) {
                    const bounds = new kakao.maps.LatLngBounds();
                    data.forEach((place) => {
                        const markerPosition = new kakao.maps.LatLng(place.y, place.x);
                        const marker = new kakao.maps.Marker({
                            map: state.map,
                            position: markerPosition,
                            title: place.place_name
                        });
                        // 마커 클릭 시 선택 이벤트
                        kakao.maps.event.addListener(marker, 'click', () => {
                            emit('markerSelected', marker);
                        });
                        state.markers.push(marker);
                        bounds.extend(markerPosition);
                    });
                    state.map.setBounds(bounds);
                } else {
                    alert('검색 결과가 없습니다.');
                }
            };

            // 마커 초기화
            const clearMarkers = () => {
                state.markers.forEach((marker) => {
                    marker.setMap(null);
                });
                state.markers = [];
            };

            // 카카오 맵 스크립트 로드 (추후 api 키 가릴 예정)
            const loadKakaoMap = () => {
                if (window.kakao && window.kakao.maps) {
                    initializeMap();
                } else {
                    loadKakaoScript();
                }
            };

            const loadKakaoScript = () => {
                const script = document.createElement('script');
                script.src = '//dapi.kakao.com/v2/maps/sdk.js?appkey=c8393dffd1b8337cb746c5dd156c2523&libraries=services&autoload=false';
                script.onload = () => window.kakao.maps.load(initializeMap);
                document.head.appendChild(script);
            };

            // 컴포넌트 마운트 시 카카오 맵 로드
            onMounted(() => {
                loadKakaoMap();
            });

            return {
                state,
                searchLocation
            };
        }
    };
</script>

<style scoped>
.mapComponent {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
}

.search-box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-bottom: 10px;
}

.search-box input {
    width: 80%;
    padding: 8px;
    margin-right: 5px;
    border: 1px solid #ddd;
    border-radius: 5px;
}

.search-box button {
    padding: 8px 15px;
    background-color: #f1c40f;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

#map {
    width: 100%;
    height: 600px;
    border: 1px solid #ddd;
    border-radius: 10px;
}
</style>