<template>
<div class="flex-container">
    <div :class="['flex','calendar']">
        <Calendar :events="events" :event="event" 
        :eventClicked="eventClicked" :cellClicked="cellClicked" />
    </div>
    <div :class="['flex','board']">
        <Board :dayEvents="dayEvents" :event="event" />
    </div>
</div>

</template>

<script setup>
import {ref,reactive} from 'vue';
import Calendar from '@/components/schedule/Calendar.vue';
import Board from '@/components/schedule/Board.vue';

const events = reactive([
    { start: '2024-09-25', end: '2024-09-25', title: '회의' , content: '메모'},
    { start: '2024-09-22', end: '2024-09-24', title: '테스트' , content: '메모'},
    { start: '2024-09-22', end: '2024-09-22', title: '테스트2' , content: '메모2'}
]);
const event = reactive({value:{title:'',content:'',start:'',end:'',type:'',selectedDay:''}});
const dayEvents = reactive([]);



const eventClicked = (clickEvent)=>{
    event.value.title = clickEvent.title;
    event.value.content = clickEvent.content;
    event.value.start = formatDate(clickEvent.start);
    event.value.end = formatDate(clickEvent.end);
    event.value.type = "Schedule";
}

const cellClicked = (clickEvent)=>{
    dayEvents.length=0;
    let date = clickEvent;
    date = formatDate(date);
    for (const i in events){
    if(date >= events[i].start && date <= events[i].end){
        dayEvents.push(events[i]);
    }
    }
    event.value.type = "Day";
    event.value.selectedDay = formatDate(clickEvent);
}

function formatDate(dateString) {
    if (!dateString) return ''; 

    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}


</script>

<style scoped>
.calendar{
    background-color: white
    ;
    width: 500px;
    height: 500px;
}
.board{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 500px;
    height: 500px;
    background-color: #F9F5EA;
}
.flex-container{
    display: flex;
}
</style>
