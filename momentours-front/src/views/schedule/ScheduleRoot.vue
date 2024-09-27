<template>
    <div class="flex-container">
        <div :class="['flex','calendar']">
            <Calendar :events="events" :event="event" 
            :eventClicked="eventClicked" :cellClicked="cellClicked" />
        </div>
        <div :class="['flex','board']">
            <RouterView :event="event" :dayEvents="dayEvents" @submit="handleSubmit"/>
        </div>
    </div>
    
    </template>
    
    <script setup>
import {ref,reactive} from 'vue';
import Calendar from '@/components/schedule/Calendar.vue';
    
// const scheduleList = restView();

const events = reactive([
    { id:'1',start: '2024-09-25', end: '2024-09-25', title: '회의' , content: '메모',contentType:'schedule'},
    { id:'1', start: '2024-09-22', end: '2024-09-24', title: '테스트' , content: '메모',contentType:'todocourse'},
    { id:'2',start: '2024-09-22', end: '2024-09-22', title: '테스트2' , content: '메모2',contentType:'schedule'}
]);
const event = reactive({id:'',title:'',content:'',start:'',end:'',clickType:'',selectedDay:'',contentType:''});
const dayEvents = reactive([]);



const eventClicked = (clickEvent)=>{
    event.id = clickEvent.id;
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

const restEdit = async () =>{
    try {
        const response = await fetch('http://localhost:8000/momentours-service/calendar/{eventId}',{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxQGdtYWlsLmNvbSIsImF1dGgiOlsiUk9MRV9DT1VQTEUiXSwidXNlck5vIjoxMywiZXhwIjoxNzI3NDM5MDQ1fQ.Z7076P7ceyPfYxAdmD_QYkTnRUnxAQFhXJgHwaJKqkTYkzOixiwA-8JDZZxcqmgakKzB9G3n7AGM_IrqBwHB_A'
            },
            body: {
                'scheduleTitle': '',
                'scheduleMemo': '',
                'scheduleStartDate': '',
                'scheduleEndDate' : '',
                'userNo': '',
                'coupleNo': ''
            }
        });
        if(!response.ok) {
            throw new Error("네트워크 오류");
        }

        const data = await response.json();
        conssole.log(data.message);
    } catch(error) {
        console.error('수정에러',error);
        window.alert('수정오류발생!');
    }
};
const restView = async () => {
    try{
        const response = await fetch('http://localhost:8000/momentours-service/calendar',{
            method:'GET',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxQGdtYWlsLmNvbSIsImF1dGgiOlsiUk9MRV9DT1VQTEUiXSwidXNlck5vIjoxMywiZXhwIjoxNzI3NDM5MDQ1fQ.Z7076P7ceyPfYxAdmD_QYkTnRUnxAQFhXJgHwaJKqkTYkzOixiwA-8JDZZxcqmgakKzB9G3n7AGM_IrqBwHB_A'
            }
        });
        if(!response.ok){
            throw new Error("네트워크 오류");
        }
        const data = await response.json();
        const scheduleList = data.result;
        console.log(scheduleList);
        return scheduleList;
    } catch(error) {
        console.error('조회에러',error);
        window.alert('조회오류발생!');
    }
};

const  handleSubmit = async (submittedEvent) => {
    event.title = submittedEvent.title;
    event.content = submittedEvent.content;
    event.start = submittedEvent.start;
    event.end = submittedEvent.end;

    // 수정하러 백엔드를 한번 불러갔다옴
    await restEdit();
    // 수정하고 나서 조회했던 리스트를 수정함
    await restView();
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
    