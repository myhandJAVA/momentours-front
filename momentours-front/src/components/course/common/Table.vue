<!-- <template>
  <div class="table-container">
    <div class="overflow-auto">
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
    ></b-pagination>

    <p class="mt-3">Current Page: {{ currentPage }}</p>

    <b-table
      id="my-table"
      :items="items"
      :per-page="perPage"
      :current-page="currentPage"
      small
    ></b-table>
  </div>
    <b-table :items="items" :fields="fields" striped hover></b-table>
    <table>
      <thead>
        <tr>
          <th>번호</th>
          <th>제목</th>
          <th>공개여부</th>
          <th>조회수</th>
          <th>좋아요</th>
          <th>작성일</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in paginatedData" :key="item.id">
          <td>{{ currentPage * itemsPerPage + index + 1 }}</td>
          <td>{{ item.title }}</td>
          <td>{{ item.public ? '공개' : '비공개' }}</td>
          <td>{{ item.views }}</td>
          <td>{{ item.likes }}</td>
          <td>{{ item.date }}</td>
        </tr>
      </tbody>
    </table>

    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 0">이전</button>
      <span v-for="page in totalPages" :key="page">
        <button @click="goToPage(page - 1)" :class="{ active: page === currentPage + 1 }">{{ page }}</button>
      </span>
      <button @click="nextPage" :disabled="currentPage >= totalPages - 1">다음</button>
    </div>
  </div>
</template> -->

<template>
  <div class="table-container">
    <div class="overflow-auto">
      <p class="mt-3">Current Page: {{ currentPage }}</p>

      <b-table
        id="my-table"
        :items="paginatedItems" 
        :fields="fields"
        :per-page="perPage"
        :current-page="currentPage"
        hover
      ></b-table>

      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-table"
      ></b-pagination>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const fields = [
  { key: 'id', label: '번호' },
  { key: 'title', label: '제목' },
  { key: 'public', label: '공개여부', formatter: (value) => (value ? '공개' : '비공개') },
  { key: 'views', label: '조회수' },
  { key: 'likes', label: '좋아요' },
  { key: 'date', label: '작성일' },
];

const perPage = ref(10);
const currentPage = ref(1);
const items = ref([
  { id: 1, title: '강릉여행 당일치기 코스', public: true, views: 0, likes: 0, date: '2024.09.20' },
  { id: 2, title: '여수여행 3박 4일 코스', public: false, views: 213, likes: 23, date: '2024.09.20' },
  { id: 3, title: '서울 핫플 코스', public: true, views: 21, likes: 14, date: '2024.09.20' },
  { id: 4, title: '인천 알찬 데이트 코스', public: true, views: 2, likes: 1, date: '2024.09.20' },
  { id: 5, title: '양양 1박 2일 데이트 코스', public: false, views: 321, likes: 163, date: '2024.09.20' },
  { id: 6, title: '2박 3일 춘천 알찬 코스', public: true, views: 51, likes: 46, date: '2024.09.20' },
  { id: 7, title: '용산 데이트 코스 추천', public: true, views: 56, likes: 35, date: '2024.09.20' },
  { id: 8, title: '신당동 하루 코스', public: true, views: 93, likes: 61, date: '2024.09.19' },
  { id: 9, title: '춘천 여기 가면 정복!', public: false, views: 3167, likes: 245, date: '2024.09.19' },
  { id: 10, title: '춘천 여기 가면 정복!', public: false, views: 3167, likes: 245, date: '2024.09.19' },
  { id: 11, title: '춘천 여기 가면 정복!', public: false, views: 3167, likes: 245, date: '2024.09.19' },
  { id: 12, title: '춘천 여기 가면 정복!', public: false, views: 3167, likes: 245, date: '2024.09.19' },
  { id: 12, title: '춘천 여기 가면 정복!', public: false, views: 3167, likes: 245, date: '2024.09.19' },
  { id: 12, title: '춘천 여기 가면 정복!', public: false, views: 3167, likes: 245, date: '2024.09.19' },
  { id: 12, title: '춘천 여기 가면 정복!', public: false, views: 3167, likes: 245, date: '2024.09.19' },
  { id: 12, title: '춘천 여기 가면 정복!', public: false, views: 3167, likes: 245, date: '2024.09.19' },
]);

// 전체 항목 수
const rows = computed(() => items.value.length);

// 현재 페이지에 따라 필터링된 항목 계산
const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  const end = start + perPage.value;
  return items.value.slice(start, end);
});

// // 페이지네이션 관련 변수
// const currentPage = ref(0); // 현재 페이지
// const itemsPerPage = ref(5); // 페이지 당 아이템 개수

// // 총 페이지 계산
// const totalPages = computed(() => Math.ceil(data.value.length / itemsPerPage.value));

// // 현재 페이지에 보여줄 데이터
// const paginatedData = computed(() => {
//   const start = currentPage.value * itemsPerPage.value;
//   const end = start + itemsPerPage.value;
//   return data.value.slice(start, end);
// });

// // 페이지 이동 함수
// const prevPage = () => {
//   if (currentPage.value > 0) currentPage.value--;
// };

// const nextPage = () => {
//   if (currentPage.value < totalPages.value - 1) currentPage.value++;
// };

// const goToPage = (page) => {
//   currentPage.value = page;
// };
</script>

<style scoped>
.table-container {
  margin: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

th, td {
  padding: 10px;
  border: 1px solid #ddd;
}

th {
  background-color: #f5f5f5;
}

.pagination {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

button {
  margin: 0 5px;
  padding: 5px 10px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  cursor: pointer;
}

button.active {
  background-color: #d3d3d3;
  font-weight: bold;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>