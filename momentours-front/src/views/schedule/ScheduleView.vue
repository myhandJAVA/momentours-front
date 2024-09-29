<template>
<div class="main-box">
    <div class="board-box-schedule" v-if="event.clickType == 'Schedule'">
        <p class="title">일정 제목: {{ event.title }}</p>
        <p class="content">일정 메모: {{ event.content }}</p>
        <p class="date">일정 시작일: {{ event.start }}</p>
        <p class="date">일정 종료일: {{ event.end }}</p>
        
        <div v-if="event.class == 'schedule'" class="action-buttons">
            <button class="common-button edit" @click="toEditRouter">수정</button>
            <button class="common-button delete" @click="toRemoveRouter">삭제</button>
        </div>
        <div v-if="event.class == 'todocourse'" class="action-buttons">
            <button class="common-button delete" @click="toTodoCourseRouter">예정데이트코스</button>
        </div>

    </div>

    <div class="board-box-day" v-if="event.clickType == 'Day' && dayEvents.length !== 0">
        <h2 class="day-title">선택한 날의 일정:</h2>
        <div class="event-list">
            <template v-for="e in dayEvents" :key="e.id">
                <h3 class="event-title" @click="dayEventClicked(e)">{{ e.title }}</h3> 
            </template>
        </div>

    </div>


    <div class="board-box-no-event" v-if="event.clickType == 'Day' && dayEvents.length == 0">
        <h2 class="no-event">이 날의 일정이 없습니다</h2>
    </div>

        <button class="common-button regist" @click="toRegistRouter">등록</button>
    </div>
</template>


<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';
import '@/assets/css/common.css';

const router = useRouter();

const props = defineProps({
    dayEvents: Array,
    event: Object
});
const dayEvents = props.dayEvents;
const event = props.event;

function dayEventClicked(clickedEvent) {
    Object.assign(event, {
        id: clickedEvent.id,
        title: clickedEvent.title,
        content: clickedEvent.content,
        start: formatDate(clickedEvent.start),
        end: formatDate(clickedEvent.end),
        class: clickedEvent.class,
        clickType: 'Schedule'
    });
}

function formatDate(dateString) {
    if (!dateString) return ''; 
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function toRegistRouter(){
    router.push('/schedule/regist');
};
function toEditRouter(){
    router.push('/schedule/edit');
};
function toRemoveRouter(){
    router.push('/schedule/remove');
};
function toTodoCourseRouter(){
    router.push('todocourse');
}
</script>


<style scoped>

.main-box {
    position: relative;
    top:20vh;
}

[class^="board-box"] {
    display: flex; /* flexbox 사용 */
    flex-direction: column; /* 세로 방향으로 정렬 */
    justify-content: space-between; /* 공간을 동일하게 분배 */
    width: 40vw;
    height: auto;
    background-color: rgba(197, 182, 151, 0.15);
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 20px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
}

.button-container {
    display: flex; /* 버튼을 감싸는 div에 flexbox 사용 */
    justify-content: flex-end; /* 오른쪽 정렬 */
    margin-top: auto; /* 상단 여백을 자동으로 설정하여 아래로 밀림 */
}


.common-button {
    background-color: #cff3ff;
}
.common-button:hover {
    background-color: #b7e2f0;
}


.common-button.delete:hover {
    background-color: #e53935;
}


.title, .content, .date, .day-title {
    font-size: 1.2rem;
    color: #333;
    margin-bottom: 10px;
}

.day-title {
    font-weight: bold;
}

.event-list {
    margin-bottom: 20px;
}
.event-title {
    font-size: 1rem;
    color: #495057;
    margin-bottom: 0.5rem;
    cursor: pointer; 
    background-color: #e9ecef; 
    padding: 0.5rem; 
    border-radius: 4px;
    transition: background-color 0.3s;
}

.event-title:hover {
    background-color: #d0d0d0; 
}

.no-event {
    font-size: 1.1rem;
    color: #999;
    margin-bottom: 20px;
}

.action-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
}



.common-button.edit:hover {
    background-color: #8bec90;
}

.common-button.delete {
    background-color:  #f3d1f3;
}

.common-button.edit {
    background-color:  #b6f9c4;
}

.common-button.delete:hover {
    background-color: #f572ce;
}

.common-button.regist {
    background-color:  #c5fdd1;
    width: 7vw;
}

.common-button.regist:hover {
    background-color: #8bee5d;
}
</style>
