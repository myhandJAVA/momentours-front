<template>
<div>
    <template v-if="localEvent.clickType === 'Schedule'">
        <template v-if="localEvent.contentType === 'schedule'">
            <h2>일정제목: </h2>
            <input v-model="localEvent.title" />
            <h2>일정메모: </h2>
            <input v-model="localEvent.content" />
            <h2>일정시작일: </h2>
            <input type="date" v-model="localEvent.start"/>
            <h2>일정종료일: </h2>
            <input type="date" v-model="localEvent.end"/>
            <br><br><br>
            <button type="button" @click="submitEvent">수정하기</button>
        </template>

        <template v-if="localEvent.contentType === 'todocourse'">
            <h3>일정제목: {{ localEvent.title }}</h3>
            <h3>일정메모: {{ localEvent.content }}</h3>
            <h3>일정시작일: {{ localEvent.start }}</h3>
            <h3>일정종료일: {{ localEvent.end }}</h3>
            <button @click="goToTodoCourseEdit">예정코스 수정하러가기</button>
            <br><br><br>
        </template>
    </template>

    <template v-if="localEvent.clickType === 'Day'">
    <h1>수정할 일정을 선택해주세요</h1>
    </template>
</div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';


const emit = defineEmits(['update:event']);
const router = useRouter();
const props = defineProps({
event: Object,
events: Array,
dayEvents: Array
});

const localEvent = ref({...props.event});

watch(() => props.event, (newVal) => {
localEvent.value = {...newVal};
}, { deep: true });

const submitEvent = () => {
if(localEvent.value.title === ''){
    window.alert("제목을 입력해주세요.");
} else if(localEvent.value.start > localEvent.value.end ) {
    window.alert("종료일이 시작일보다 빠릅니다. 다시 확인해주세요.");
} else {
    emit('update:event', localEvent.value);
    router.push('/schedule/view');
}
};

const goToTodoCourseEdit = () => {
router.push('/todocourse/edit/' + localEvent.value.id);
};
</script>

<style scoped>
/* 스타일링을 원하는 경우 여기에 추가하세요 */
</style>