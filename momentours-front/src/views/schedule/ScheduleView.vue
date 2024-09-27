<template>
    <div class="board-box-schedule" v-if="event.clickType == 'Schedule'">
        <h3>(hidden)pk: {{ event.id }}</h3>
        <h2>일정제목: {{event.title}}</h2>
        <h2>일정메모: {{event.content}}</h2>
        <h2>일정 시작일: {{ event.start }}</h2>
        <h2>일정 종료일: {{ event.end }}</h2>
        <h3>(hidden)선택된 일자: {{ event.selectedDay }}</h3>
        <h3>(hidden)일정 content type: {{ event.contentType }}</h3>
        <template v-if="event.contentType == 'schedule'">
        <button class="common-button-radi7" @click="toEditRouter">수정</button>
        <button class="common-button-radi7" @click="toRemoveRouter">삭제</button>
        </template>
    </div>

    <div class="board-box-day" v-if="event.clickType == 'Day' && dayEvents.length !== 0">
        <template v-for="e in dayEvents">
            <h2>{{ e.title }}</h2>
        </template>
        <button class="common-button-radi7" @click="toRegistRouter">등록</button>
    </div>

    <div class="board-box-no-event" v-if="event.clickType == 'Day' && dayEvents.length == 0">
        <button class="common-button-radi7" @click="toRegistRouter">등록</button>
    </div>

</template>

<script setup>
    import { defineProps, ref, reactive } from 'vue';
    import {  useRouter } from 'vue-router';
    const router = useRouter();

    const props = defineProps({
        dayEvents: Array,
        event: Object
        });
    const dayEvents = props.dayEvents;
    const event = props.event;

    function toRegistRouter(){
        router.push('/schedule/regist');
    };
    function toEditRouter(){
        router.push('/schedule/edit');
    };
    function toRemoveRouter(){
        window.alert("삭제모달창 추가예정");
    };

</script>

<style  scoped>
    [class^="board-box"]{
        width: 40vw;
        height: 50vh;
        background-color: rgba(197, 182, 151, 0.15);
    }

</style>