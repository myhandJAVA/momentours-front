<template>
    <div>
        <h2>일정 제목:</h2>
        <input v-model="localEvent.title" />

        <h2>일정 메모:</h2>
        <input v-model="localEvent.content" />

        <h2>일정 시작일:</h2>
        <input type="date" v-model="localEvent.start" />

        <h2>일정 종료일:</h2>
        <input type="date" v-model="localEvent.end" />

        <br /><br /><br />
        <button type="button" @click="registEvent">등록하기</button>
    </div>
</template>

<script setup>
import { reactive, defineEmits } from 'vue';
import { useRouter } from 'vue-router';
import '@/assets/css/common.css';


const localEvent = reactive({
    title: '',
    content: '',
    start: '',
    end: '',
    contentType:"schedule"
});

const emit = defineEmits(['update:regist']);
const router = useRouter();

const registEvent = async () => {
    if (localEvent.title === '') {
        window.alert("제목을 입력해주세요.");
    } else if (new Date(localEvent.start) > new Date(localEvent.end)) {
        window.alert("종료일이 시작일보다 빠릅니다. 다시 확인해주세요.");
    } else if (localEvent.start == '' || localEvent.end == ''){
        window.alert("시작일과 종료일을 입력해주세요.")
    } else {
        emit('update:regist', localEvent);
        router.push('/schedule/view');
    }
};
</script>

<style scoped>
/* 스타일을 추가할 수 있습니다. */
</style>
