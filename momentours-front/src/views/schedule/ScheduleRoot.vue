<template>
    <div class="flex-container">
        <div :class="['flex','calendar']">
            <Calendar :events="events" :event="event" 
            :eventClicked="eventClicked" :cellClicked="cellClicked" />
        </div>
        <div :class="['flex','board']">
            <RouterView :event="event" :dayEvents="dayEvents"/>
        </div>
    </div>
    
    </template>
    
    <script setup>
import {ref,reactive} from 'vue';
import Calendar from '@/components/schedule/Calendar.vue';
    

const events = reactive([
    { start: '2024-09-25', end: '2024-09-25', title: '회의' , content: '메모',contentType:'schedule'},
    { start: '2024-09-22', end: '2024-09-24', title: '테스트' , content: '메모',contentType:'todocourse'},
    { start: '2024-09-22', end: '2024-09-22', title: '테스트2' , content: '메모2',contentType:'schedule'}
]);
const event = reactive({title:'',content:'',start:'',end:'',clickType:'',selectedDay:'',contentType:''});
const dayEvents = reactive([]);



const eventClicked = (clickEvent)=>{
    event.title = clickEvent.title;
    event.content = clickEvent.content;
    event.start = formatDate(clickEvent.start);
    event.end = formatDate(clickEvent.end);
    event.contentType = clickEvent.contentType;
    event.clickType = "Schedule";
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
    event.clickType = "Day";
    event.selectedDay = formatDate(clickEvent);
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
        width: 43vw;
        height: 50vw;
    }
    .board{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 43vw;
        height: 50vw;
        background-color: #F9F5EA;
    }
    .flex-container{
        display: flex;
        padding: 5vw;
    }
    .in-board{
        display: flex;
        justify-content: center;
    }
    </style>
    