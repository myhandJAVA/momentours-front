<template>
<div class="flex-container">
    <div :class="['flex','calendar']">
    <Calendar :events="events" :event="event" 
    :eventClicked="eventClicked" :cellClicked="cellClicked" />
    </div>
    <div :class="['flex','board']">
    <RouterView 
        :event="event" 
        :dayEvents="dayEvents" 
        @update:event="handleSubmit"
        @update:remove="handleRemove"
        @update:regist="handleRegist"
    />
    </div>
</div>
</template>

<script setup>
import { ref, reactive,onMounted } from 'vue';
import Calendar from '@/components/schedule/Calendar.vue';
import '@/assets/css/common.css';


const jsonView = async () =>  {
    const scheduleResponse = await fetch("http://localhost:8080/calendar",{
        method:"GET"
    });


    const schedules = await scheduleResponse.json();


return [...schedules];
};

const jsonEdit = async() => {
    await fetch(`http://localhost:8080/calendar/${event.id}`,{
        method: "PUT",
        body: JSON.stringify({
            "id":`${event.id}`,
            "start":`${event.start}`,
            "end":`${event.end}`,
            "title":`${event.title}`,
            "content":`${event.content}`,
            "class":`${event.class}`
        })
    });
    const newEvents = await jsonView();
    events.length = 0;
    events.push(...newEvents);
};

const jsonRemove = async()=>{
    await fetch(`http://localhost:8080/calendar/${event.id}`,{
        method:"DELETE"
    });
    const newEvents = await jsonView();
    events.length = 0;
    events.push(...newEvents);
};

const jsonRegist = async(newEvent)=>{
    await fetch(`http://localhost:8080/calendar`,{
        method:"POST",
        body: JSON.stringify({
            "start":`${newEvent.start}`,
            "end":`${newEvent.end}`,
            "title":`${newEvent.title}`,
            "content":`${newEvent.content}`,
            "class":`${newEvent.class}`
        })
    })
    const newEvents = await jsonView();
    events.length = 0;
    events.push(...newEvents);
};



const events = reactive([]);

onMounted(async () => {
try {
    const data = await jsonView();
    events.push(...data);
} catch (error) {
    console.error("데이터 로딩 중 오류 발생:", error);
}
});

const event = reactive({id:'', title:'', content:'', start:'', end:'', clickType:'', selectedDay:'', class:''});
const dayEvents = reactive([]);

const eventClicked = (clickEvent) => {
Object.assign(event, {
    id: clickEvent.id,
    title: clickEvent.title,
    content: clickEvent.content,
    start: formatDate(clickEvent.start),
    end: formatDate(clickEvent.end),
    class: clickEvent.class,
    clickType: "Schedule"
});
};

const cellClicked = (clickEvent) => {
dayEvents.length = 0;
const date = formatDate(clickEvent);
for (const e of events) {
    if (date >= e.start && date <= e.end) {
    dayEvents.push(e);
    }
}
event.clickType = "Day";
event.selectedDay = date;
};

function formatDate(dateString) {
if (!dateString) return ''; 
const date = new Date(dateString);
return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

const handleSubmit = (updatedEvent) => {
Object.assign(event, updatedEvent);
jsonEdit();
};

const handleRemove = () => {
    jsonRemove();
    event.id = '';
    event.title = '';
    event.content = '';
    event.start = '';
    event.end = '';
    event.clickType = '';
    event.selectedDay = '';
    event.class = '';
};

const handleRegist = (newEvent) => {
    jsonRegist(newEvent);
    for (let key in event) {
    if (event.hasOwnProperty(key)) {
        event[key] = ''; 
    }
}

};

</script>

<style scoped>

.flex-container {
display: flex;
padding: 2rem;
gap: 2rem;
background-color: #f0f4f8;
min-height: 100vh;
}

.calendar {
flex: 1;
background-color: white;
border-radius: 8px;
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
padding: 1.5rem;
max-height: 80vh;
overflow: auto;
}

.board {
flex: 1;
display: flex;
justify-content: center;
align-items: flex-start;
background-color: #F9F5EA;
border-radius: 8px;
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
padding: 1.5rem;
max-height: 80vh;
overflow: auto;
}

@media (max-width: 768px) {
.flex-container {
    flex-direction: column;
}

.calendar, .board {
    width: 100%;
    height: auto;
}
}
:deep(.vuecal__event.schedule) {
    background-color: rgba(167, 255, 217, 0.9);
    border: 1px solid rgb(205, 253, 255);
    }

:deep(.vuecal__event.todocourse) {
        background-color: #ffeab2;
    border: 1px solid rgb(241, 224, 173);
    color: #000000;
}

:deep(.vuecal__event.memorial) {
        background-color: #FFC7C7;
    border: 1px solid rgb(241, 182, 182);
    color: #2b2b2b;
}

.main-box {
    position: relative;
    top:20vh;
}

</style>