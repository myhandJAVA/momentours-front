<template>
    <div class="CommonMap">
        <div class="search-box">
            <input v-model="state.searchQuery" type="text" placeholder="장소를 입력하세요.">
            <button @click="searchLocation">🔍</button>
        </div>
        <div id="map"></div>
    </div>
</template>

<script>
import { reactive, onMounted } from 'vue';

export default {
    props: {
        initialCenter: {
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
            searchQuery: '', // 지도에서 장소 검색어
            placeService: null, // 장소 검색 서비스 객체
            markers: [], // 지도에 표시될 마커들을 담은 배열
            infoWindow: null, // 인포 윈도우 객체
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
            state.infoWindow = new window.kakao.maps.InfoWindow({ zIndex: 1 }); // 인포 윈도우 생성

            if (props.singleMarker) {
                addSingleMarker(props.singleMarker); // 단일 마커 표시
            }
        };

        // 단일 마커 추가
        const addSingleMarker = (markerData) => {
            clearMarkers(); // 기존 마커 제거
            const markerPosition = new window.kakao.maps.LatLng(markerData.lat, markerData.lng);
            const marker = new window.kakao.maps.Marker({
                position: markerPosition,
                map: state.map,
                title: markerData.placeName || 'Selected Location'
            });
            state.map.setCenter(markerPosition);
            state.markers.push(marker);

            // 마커 클릭 시 인포 윈도우 표시
            const content = `
                <div style="padding:10px; width: 200px; font-size: 14px;">
                    <strong>${markerData.placeName || '선택된 위치'}</strong><br>
                    ${markerData.address || '주소 정보 없음'}<br>
                    <a href="https://map.kakao.com/link/map/${markerData.placeName}" target="_blank">카카오맵에서 보기</a>
                </div>`;
            state.infoWindow.setContent(content);
            state.infoWindow.open(state.map, marker);

            kakao.maps.event.addListener(marker, 'click', () => {
                state.infoWindow.open(state.map, marker);
            });
        };

        // 장소 검색
        const searchLocation = () => {
            clearMarkers();
            state.placeService.keywordSearch(state.searchQuery, placesSearchCB);
        };

        // 장소 검색 후 마커 클릭 이벤트 설정
        const placesSearchCB = (data, status) => {
            if (status === kakao.maps.services.Status.OK) {
                const bounds = new kakao.maps.LatLngBounds();
                data.forEach((place) => {
                    if (!place || !place.place_name) {
                        console.warn('유효하지 않은 장소 정보입니다.', place);
                        return; // 유효하지 않은 데이터는 처리하지 않음
                    }

                    const markerPosition = new kakao.maps.LatLng(place.y, place.x);
                    const marker = new window.kakao.maps.Marker({
                        map: state.map,
                        position: markerPosition,
                        title: place.place_name
                    });

                    // 마커 클릭 시 선택 이벤트 설정
                    kakao.maps.event.addListener(marker, 'click', () => {
                        selectMarker(marker, place);
                    });

                    state.markers.push(marker);
                    bounds.extend(markerPosition);
                });
                state.map.setBounds(bounds);
            } else {
                alert('검색 결과가 없습니다.');
            }
        };

        // 마커 선택 시 호출
        const selectMarker = (marker, place) => {
            if (!place || !place.place_name) {
                console.error('유효하지 않은 place 객체입니다.', place);
                return; // place가 유효하지 않을 경우 함수 종료
            }

            // 장소 이름 및 주소 분리
            const placeName = place.place_name || 'Unknown Location';
            const roadAddress = place.road_address_name || place.address_name || '주소 정보 없음';

            // 기존 마커들 제거
            clearMarkers();

            // 선택한 마커 추가
            const markerData = {
                lat: place.y,
                lng: place.x,
                placeName,
                address: roadAddress,
            };
            addSingleMarker(markerData);

            // 인포 윈도우 내용 설정 및 열기
            const content = `
                <div style="padding:10px; width: 200px; font-size: 14px;">
                    <strong>${placeName}</strong><br>
                    ${roadAddress}<br>
                    <a href="https://map.kakao.com/link/map/${place.id}" target="_blank">카카오맵에서 보기</a>
                </div>`;
            state.infoWindow.setContent(content);
            state.infoWindow.open(state.map, marker);

            // 부모 컴포넌트로 데이터 전송
            emit('markerSelected', {
                lat: place.y,
                lng: place.x,
                placeName
            });
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
