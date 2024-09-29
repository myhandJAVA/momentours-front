<template>
    <div class="calendar-container">
        <div class="icon-container">
            <img src="@/assets/icons/calendar.svg" alt="Calendar Icon" class="icon">
        </div>
        <div class="arrow-container">
            <img src="@/assets/icons/arrow-left.svg" alt="Left Arrow" class="arrow" @click="prevDate">
        </div>
        <div class="dates-container">
            <div v-for="(date, index) in displayedDates" :key="index"
                :class="['date-box', date === dates[selectedDate] ? 'active' : '']" 
                @click="selectDate(dates.indexOf(date))">
                <p>{{ date }}</p>
                <div v-if="dates.indexOf(date) < todayIndex" class="hearts">
                    <span v-for="n in 2" :key="n" class="heart">♥</span>
                </div>
            </div>
        </div>
        <div class="arrow-container">
            <img src="@/assets/icons/arrow-right.svg" alt="Right Arrow" class="arrow" @click="nextDate">
        </div>
        <button class="common-button bg-color-pink num" @click="goToDiaryRegist">일기작성</button>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter();

const goToDiaryRegist = () => {
    router.push('/diary/regist'); // 일기 작성 페이지로 이동
};

const selectedDate = ref(3) // 기본적으로 중간 날짜 선택
const dates = ref([
    "24. 09. 26 (목)",
    "24. 09. 27 (금)",
    "24. 09. 28 (토)",
    "24. 09. 29 (일)",
    "24. 09. 30 (월)",
    "24. 10. 1 (화)",
    "24. 10. 2 (수)"
])
const displayedDates = ref([])
const todayIndex = ref(-1)

const updateDisplayedDates = () => {
    let start = Math.max(0, selectedDate.value - 3)
    let end = Math.min(dates.value.length, start + 7)
    start = Math.max(0, end - 7)
    displayedDates.value = dates.value.slice(start, end)
}

const selectDate = (index) => {
    selectedDate.value = index
    updateDisplayedDates()
}

const prevDate = () => {
    if (selectedDate.value > 0) {
        selectedDate.value--
        updateDisplayedDates()
    }
}

const nextDate = () => {
    if (selectedDate.value < dates.value.length - 1) {
        selectedDate.value++
        updateDisplayedDates()
    }
}

onMounted(() => {
    const today = new Date()
    const todayString = `24. ${String(today.getMonth() + 1).padStart(2, '0')}. ${String(today.getDate()).padStart(2, '0')}`
    todayIndex.value = dates.value.findIndex(date => date.includes(todayString))
    if (todayIndex.value !== -1) {
        selectedDate.value = todayIndex.value
    }
    updateDisplayedDates()
})

watch(selectedDate, updateDisplayedDates)
</script>

<style scoped>
/* 스타일은 이전과 동일하게 유지 */
.calendar-container {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    padding: 0 90px 0 90px;
    margin-top: 10px;
    margin-bottom: 10px;
    cursor: pointer;
}

.icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
}

.icon {
    width: 30px;
}

.arrow-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 10px;
    cursor: pointer;
}

.arrow {
    width: 45px;
    height: 45px;
    font-weight: bold;
}

.dates-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.date-box {
    padding: 10px;
    text-align: center;
    cursor: pointer;
    border-radius: 10px;
    width: 130px;
}

.date-box.active {
    border: 2px solid #d4b896;
    background-color: #f7f2ec;
}

.hearts {
    margin-top: 5px;
}

.heart {
    color: #f59797;
    margin-left: 5px;
    font-size: 25px;
}

.num {
    flex-basis: 8%;
}
</style>