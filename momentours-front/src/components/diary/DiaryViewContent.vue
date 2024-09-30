<template>
    <div class="container">
        <div v-if="showWritePrompt" class="write-prompt">
            일기를 작성해주세요.
        </div>
        <template v-else>
            <div class="top-wrap">
                <div class="profile">
                    <img src="@/assets/icons/user-profile-image.svg" alt="Profile" class="profile-image" />
                    <div>{{ diaryData.diaryUserNo === 12 ? '나' : '파트너' }}</div>
                </div>
                <div>
                    <MoreBox :diaryId="diaryData.id" :diaryContent="diaryData.diaryContent"
                        @delete-diary="toRemoveRouter" @edit-diary="toEditRouter" />
                </div>
            </div>
            <div class="content-wrap">
                {{ diaryData.diaryContent }}
            </div>
            <div v-for="comment in diaryData.comments" :key="comment.commentNo" class="comment-wrap">
                <div class="name-wrap">
                    <div>
                        <span class="nickname">{{ comment.commentUserNo === 12 ? '나' : '파트너' }}</span>
                        <span class="seq">|</span>
                        <span class="time">{{ comment.commentCreateDate }}</span>
                    </div>
                </div>
                <div style="margin-top: 5px;">
                    <span>{{ comment.commentContent }}</span>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';
import MoreBox from '@/components/common/MoreBox.vue';

const props = defineProps({
    diaryData: {
        type: Object,
        default: () => ({}),
    },
    showWritePrompt: {
        type: Boolean,
        default: false
    }
});

const router = useRouter();

const toEditRouter = ({ id, content }) => {
    router.push({ path: `/diary/edit/${id}`, query: { content } });
};

const toRemoveRouter = (diaryId) => {
    router.push({ path: '/diary/remove', query: { diaryId } });
};

</script>



<style scoped>
.container {
    display: flex;
    flex-direction: column;
    width: 25vw;
    height: 59vh;
    position: relative;
    overflow: hidden;
}

.top-wrap {
    display: flex;
    justify-content: space-between;
    margin-bottom: 13px;
}

.profile {
    display: flex;
    align-items: center;
}

.profile-image {
    width: 40px;
    height: 40px;
    margin-right: 10px;
}

.content-wrap {
    width: 100%;
    flex: 1;
}

.comment-wrap {
    width: 100%;
    height: 120px;
    box-sizing: border-box;
    border-top: 1px solid rgba(0, 0, 0, 0.10);
    margin: 0;
    position: relative;
    bottom: 0;
}

.name-wrap {
    display: flex;
    margin-top: 13px;
    justify-content: space-between;
    color: rgba(0, 0, 0, 0.7);
}

.seq {
    margin-left: 7px;
    color: rgba(0, 0, 0, 0.4);
}

.time {
    margin-left: 7px;
    color: rgba(0, 0, 0, 0.4);
}

.comment-text {
    width: 100%;
    height: 100%;
    border: 1px solid rgba(0, 0, 0, 0.20);
    color: rgba(0, 0, 0, 0.7);
    outline: none;
    resize: none;
}

.comment-wrap {
    width: 100%;
    height: 120px;
    box-sizing: border-box;
    border-top: 1px solid rgba(0, 0, 0, 0.10);
    margin: 0;
    position: relative;
}

.textarea-container {
    position: relative;
    width: 100%;
    height: 100%;
}
</style>