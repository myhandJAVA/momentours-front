<template>
    <div class="container">
        <div>
            <ViewTitle 
                v-if="post"
                :title="post.toDoCourseTitle"
                :date="post.toDoCourseCreateDate.split('T')[0]"
                :type="post.toDoCourseSort"
                />
            
        </div>
    </div>
</template>

<script>
import ViewTitle from '@/components/course/common/ViewTitle.vue';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

export default {
    components: { ViewTitle },
    setup() {
        const route = useRoute();
        const post = ref(null);

        // const fetchPostDetail = async (id) => {
        //     try {
        //         const response = await fetch(`http://localhost:8080/todocourse/detail/${id}`);
        //         if (!response.ok) {
        //             throw new Error(`Http error! status: ${response.status}`);
        //         }
        //         const post = await response.json();
        //         console.log("Fetched post: ", post.value);
        //     } catch (error) {
        //         console.error("Error fetching post details: ", error);
        //     }
        // };

        // onMounted(() => {
        //     const id = post.toDOCourseNo;
        //     if (id) {
        //         fetchPostDetail(id);
        //     }
        // });

        return {
            post
        };
    },
};

</script>

<style scoped>
    .container {
        display: flex;
        height: 100vh;
    }
</style>