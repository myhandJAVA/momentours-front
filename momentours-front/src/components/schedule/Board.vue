<template>
    <div class="board-box-schedule" v-if="event.value.type == 'Schedule'">
        <h2>{{event.value.title}}</h2>
        <h2>{{event.value.content}}</h2>
        <h1>{{ event.value.start }}</h1>
        <h1>{{ event.value.end }}</h1>
        <h1>{{ event.value.type }}</h1>
        <h1>selected: {{ event.value.selectedDay }}</h1>
    </div>

    <div class="board-box-day" v-if="event.value.type == 'Day' && dayEvents.length !== 0">
        <template v-for="e in dayEvents">
            <h2>{{ e.title }}</h2>
        </template>
        <h1>selected: {{ event.value.selectedDay }}</h1>
    </div>
</template>

<script setup>
    import { defineProps, ref } from 'vue';

    const props = defineProps({
        dayEvents: Array,
        event: Object
        });
    const dayEvents = props.dayEvents;
    const event = props.event;

</script>

<style  scoped>
    [class^="board-box"]{
        width: 400px;
        height: 400px;
        background-color: white;
    }
</style>