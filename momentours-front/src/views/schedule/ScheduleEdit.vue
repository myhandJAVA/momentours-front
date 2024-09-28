<template>
<div class="container">
    <template v-if="localEvent.clickType === 'Schedule'">
        <template v-if="localEvent.class === 'schedule'">
            <div class="content-box">
                <p>일정제목 </p>
                <input v-model="localEvent.title" />
                <hr>
                <p>일정메모</p>
                <input v-model="localEvent.content" />
                <hr>
                <p>일정시작일</p>
                <input type="date" v-model="localEvent.start"/>
                <hr>
                <p>일정종료일</p>
                <input type="date" v-model="localEvent.end"/>
                <hr>
                <div class="button-box">
                    <button class="common-button" type="button" @click="submitEvent">수정하기</button>
                    <button class="common-button" type="button" @click="goToViewPage">뒤로가기</button>
                </div>
            </div>
        </template>

        <template v-if="localEvent.class === 'todocourse'">
            <div class="content-box">
            <h3>일정제목: {{ localEvent.title }}</h3>
            <h3>일정메모: {{ localEvent.content }}</h3>
            <h3>일정시작일: {{ localEvent.start }}</h3>
            <h3>일정종료일: {{ localEvent.end }}</h3>
            <div class="button-box">
            <button class="common-button" @click="goToTodoCourseEdit">예정코스 수정하러가기</button>
            <button class="common-button" @click="goToViewPage">뒤로가기</button>
        </div>
            </div>
        </template>
    </template>

    <template v-if="localEvent.clickType === 'Day'">
        <div class="content-box">
    <h3>수정할 일정을 선택해주세요</h3>
    <button class="common-button" @click="goToViewPage">뒤로가기</button>
    </div>
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

const goToViewPage = ()=>{
    router.push('/schedule');
};
</script>

<style scoped>
.container {
    display: flex;
    justify-content: center; /* 가로 중앙 정렬 */
    align-items: center; /* 세로 중앙 정렬 */
    min-height: 65vh;
}
.content-box{

    display: flex;
    flex-direction: column;
    align-items: center; /* 자식 요소 중앙 정렬 */
    padding: 2rem; /* 내부 여백 */
    border: 1px solid #ccc; /* 테두리 */
    border-radius: 8px; /* 모서리 둥글게 */
    background-color: white; /* 배경색 */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
    

    
}
.button-box {
    display: flex; /* 버튼을 가로로 배치 */
    gap: 1rem; /* 버튼 간의 간격 */
    margin-top: 1rem; /* 버튼 위쪽 여백 */
}
</style>