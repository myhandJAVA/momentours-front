<template>
    <div class="regist-container">
    <div class="regist-box">
        <p>일정 제목</p>
        <input v-model="localEvent.title" />
        <hr>
        <p>일정 메모</p>
        <input v-model="localEvent.content" />
        <hr>
        <p>일정 시작일</p>
        <input type="date" v-model="localEvent.start" />
        <hr>
        <p>일정 종료일</p>
        <input type="date" v-model="localEvent.end" />

        <div class="button-box">
            <button class="common-button" type="button" @click="registEvent">등록하기</button>
            <button class="common-button" type="button" @click="goToViewPage">뒤로가기</button>
        </div>
    </div>
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
    class:"schedule"
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
const goToViewPage = ()=>{
    router.push('/schedule');
};
</script>

<style scoped>
.regist-container {
    display: flex;
    justify-content: center; 
    align-items: center; 
    min-height: 60vh; 
}

.regist-box{
    
    display: flex;
    flex-direction: column;
    align-items: center; 
    padding: 2rem; 
    border: 1px solid #ccc; 
    border-radius: 8px; 
    background-color: white; 
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); 
    
}
.button-box {
    display: flex; 
    gap: 1rem; 
    margin-top: 1rem; 
}
</style>
