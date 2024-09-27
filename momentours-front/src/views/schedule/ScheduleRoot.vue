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
    />
    </div>
</div>
</template>

<script setup>
import { ref, reactive,onMounted } from 'vue';
import Calendar from '@/components/schedule/Calendar.vue';

const jsonView = async () =>  {
    const scheduleResponse = await fetch("http://localhost:8080/schedule",{
        method:"GET"
    });
    const todocourseResponse = await fetch("http://localhost:8080/todocourse",{
        method:"GET"
    });
    const metdayResponse = await fetch("http://localhost:8080/metday",{
        method:"GET"
    });

    const schedules = await scheduleResponse.json();
    const todocourses = await todocourseResponse.json();
    const metdays = await metdayResponse.json();

return [...schedules,...todocourses];
};

const jsonEdit = async() => {
    await fetch(`http://localhost:8080/${event.contentType}/${event.id}`,{
        method: "PUT",
        body: JSON.stringify({
            "id":`${event.id}`,
            "start":`${event.start}`,
            "end":`${event.end}`,
            "title":`${event.title}`,
            "content":`${event.content}`,
            "contentType":`${event.contentType}`
        })
    });
    const newEvents = await jsonView();
    events.length = 0;
    events.push(...newEvents);
};

const jsonRemove = async() => {
    await fetch(`http://localhost:8080/${event.contentType}/${event.id}`,{
        method:"DELETE"
    });
    const newEvents = await jsonView();
    events.length = 0;
    events.push(...newEvents);
}

const events = reactive([]);

onMounted(async () => {
try {
    const data = await jsonView();
    events.push(...data);
} catch (error) {
    console.error("데이터 로딩 중 오류 발생:", error);
}
});

const event = reactive({id:'', title:'', content:'', start:'', end:'', clickType:'', selectedDay:'', contentType:''});
const dayEvents = reactive([]);

const eventClicked = (clickEvent) => {
Object.assign(event, {
    id: clickEvent.id,
    title: clickEvent.title,
    content: clickEvent.content,
    start: formatDate(clickEvent.start),
    end: formatDate(clickEvent.end),
    contentType: clickEvent.contentType,
    clickType: "Schedule"
});
}

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
}

function formatDate(dateString) {
if (!dateString) return ''; 
const date = new Date(dateString);
return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

const handleSubmit = (updatedEvent) => {
Object.assign(event, updatedEvent);
jsonEdit();
}

</script>

<style scoped>
.flex-container {
display: flex;
padding: 5vw;
}
.calendar {
background-color: white;
width: 43vw;
height: 50vw;
}
.board {
display: flex;
justify-content: center;
align-items: center;
width: 43vw;
height: 50vw;
background-color: #F9F5EA;
}
</style>