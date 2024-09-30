<template>
    <div>
      <main>
        <section class="main-banner">
          <button class="prev" @click="prevSlide">&lt;</button>
          <div class="banner-item">
            <img :src="currentImage" alt="메인 배너 이미지" class="banner-image">
          </div>
          <button class="next" @click="nextSlide">&gt;</button>
        </section>
  
        <section class="tour-deals">
          <h3>테마 여행</h3>
          <h5>당신의 순간을 더 설레게</h5>
          <div class="filter-options">
            <button 
              v-for="category in categories" 
              :key="category"
              @click="setCategory(category)"
              :class="{ active: currentCategory === category }"
            >
              {{ category }}
            </button>
          </div>
  
          <div class="deal-cards">
            <article class="card" v-for="review in filteredReviews" :key="review.id">
              <img :src="review.image" :alt="review.title">
              <div class="card-content">
                <h5>{{ review.title }}</h5>
                <p>{{ review.description }}</p>
              </div>
            </article>
          </div>
        </section>
      </main>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted, computed } from 'vue';
  import { useRoute } from 'vue-router';
  
  const currentRoute = useRoute();
  
  // 이미지 경로 배열
  const images = [
    '/src/assets/image/home/event1.jpg',
    '/src/assets/image/home/event2.jpg',
    '/src/assets/image/home/event3.jpg',
    '/src/assets/image/home/event4.jpg',
    '/src/assets/image/home/event5.jpg'
  ];
  
  // 현재 이미지 인덱스
  const currentIndex = ref(0);
  
  // 현재 이미지를 위한 계산된 속성
  const currentImage = computed(() => images[currentIndex.value]);
  
  // 다음 슬라이드로 이동하는 함수
  const nextSlide = () => {
    currentIndex.value = (currentIndex.value + 1) % images.length;
  };
  
  // 이전 슬라이드로 이동하는 함수
  const prevSlide = () => {
    currentIndex.value = (currentIndex.value - 1 + images.length) % images.length;
  };
  
  // 자동 슬라이딩을 위한 인터벌
  let slideInterval;
  
  // 자동 슬라이딩 시작
  const startSlideShow = () => {
    slideInterval = setInterval(nextSlide, 5000); // 5초마다 슬라이드 변경
  };
  
  // 자동 슬라이딩 정지
  const stopSlideShow = () => {
    clearInterval(slideInterval);
  };
  
  // 라이프사이클 훅
  onMounted(() => {
    startSlideShow();
  });
  
  onUnmounted(() => {
    stopSlideShow();
  });
  
  // 카테고리 및 리뷰 데이터
  const categories = ['맛집', '카페', '여행', '체험', '산책'];
  const currentCategory = ref('맛집');
  
  // 수정된 부분: 각 카테고리별로 3개의 항목 추가 및 이미지 경로 수정
  const reviews = [
    { id: 1, category: '맛집', title: 'OO육몽 홍대본점', description: '눈돌아가게 만드는 압도적인 비주얼!!', image: '/src/assets/image/home/eat/food1.png' },
    { id: 2, category: '맛집', title: 'OO샹로우 홍대점', description: '대학생들의 배를 채워줄 든든한 중식!', image: '/src/assets/image/home/eat/food2.png' },
    { id: 3, category: '맛집', title: 'OO닭발 홍대점', description: '대한민국 최초 대창마라닭발!!', image: '/src/assets/image/home/eat/food3.png' },
    { id: 4, category: '카페', title: '1인 1잔 은평점', description: '한국 고유의 멋과 향을 한번에', image: '/src/assets/image/home/cafe/cafe1.png' },
    { id: 5, category: '카페', title: '숲 뷰 OO츠', description: '빌딩 숲에 지친 현대인들을 위한 쉼터', image: '/src/assets/image/home/cafe/cafe2.png' },
    { id: 6, category: '카페', title: '카페3', description: '유니크한 테마 카페', image: '/src/assets/image/home/cafe/cafe3.png' },
    { id: 7, category: '여행', title: '나홀로 아프리카 여행 (1)', description: '', image: '/src/assets/image/home/trip/trip1.png' },
    { id: 8, category: '여행', title: '나홀로 아프리카 여행 (2)', description: '', image: '/src/assets/image/home/trip/trip2.png' },
    { id: 9, category: '여행', title: '연인과 함께 떠나는 유럽 기차여행', description: '', image: '/src/assets/image/home/trip/trip3.png' },
    { id: 10, category: '체험', title: '스O프 매직 포레스트 강남', description: '스머프와 함께 즐기는 도심형 소형 테마파크', image: '/src/assets/image/home/activity/act1.png' },
    { id: 11, category: '체험', title: '뷰O풀 캐리커쳐 익선동', description: '연인과 함께하는 캐리커쳐', image: '/src/assets/image/home/activity/act2.png' },
    { id: 12, category: '체험', title: 'Entry55', description: '술과 공연을 함께 즐기는 매력만점 재즈바', image: '/src/assets/image/home/activity/act3.png' },
    { id: 13, category: '산책', title: '낙산공원', description: '성곽 너머 펼쳐지는 서울 야경', image: '/src/assets/image/home/walk/walk1.png' },
    { id: 14, category: '산책', title: '반포 한강 공원', description: '한강 최고의 야경 스팟', image: '/src/assets/image/home/walk/walk2.png' },
    { id: 15, category: '산책', title: '창경궁', description: '이게 바로 Back To the 조선?!', image: '/src/assets/image/home/walk/walk3.png' },
  ];
  
  // 카테고리 변경 함수
  const setCategory = (category) => {
    currentCategory.value = category;
  };
  
  // 필터링된 리뷰
  const filteredReviews = computed(() => {
    return reviews.filter(review => review.category === currentCategory.value);
  });
  </script>
  
  <style src='@/assets/css/mainpage.css' scoped>
  </style>