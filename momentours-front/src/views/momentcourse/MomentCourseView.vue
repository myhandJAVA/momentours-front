<template>
    <div>
        <ViewTitle :post="post" /> <!-- post를 props로 전달 -->
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import ViewTitle from '@/components/course/common/ViewTitle.vue';

const post = ref({});
const route = useRoute();

onMounted(async () => {
    const postId = route.params.id; // URL에서 id 가져오기
    const response = await fetch(`http://localhost:8080/momentcourse/${postId}`);
    post.value = await response.json(); // JSON 서버에서 데이터 가져오기
});
</script>


<style scoped>
.post-container {
    padding: 20px;
}
</style>