<template>
    <div>
        <h2>일정제목: </h2>
        <input  v-model="event.title" />
        <h2>일정메모: </h2>
        <input  v-model="event.content" />
        <h2>일정시작일: </h2>
        <input  type="date" v-model="event.start"/>
        <h2>일정종료일: </h2>
        <input  type="date" v-model="event.end"/>
        <br>
        <br>
        <br>
        <button @click="submitEvent">수정하기</button>

    </div>
</template>

<script setup>
import {defineProps, defineEmits} from 'vue';
const emit = defineEmits(['submit']);
const props = defineProps({
    event: Object,
    events: Array
});
const event = props.event;

const submitEvent = () => {
    if(event.title == ''){
        window.alert("제목 비어있음");
    } else if(event.start > event.end ) {
        window.alert("종료일이 시작일을 앞서있음");
    } else {
        emit('submit',event);
    }
};

</script>

<style lang="scss" scoped>

</style>