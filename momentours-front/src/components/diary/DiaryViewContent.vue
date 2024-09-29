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
                <div><MoreBox/></div>
            </div>
            <div class="content-wrap">
                {{ diaryData.diaryContent }}
            </div>
            <div v-for="comment in diaryData.comments" :key="comment.commentNo" class="comment-wrap">
                <div class="name-wrap">
                    <div>
                        <span class="nickname">{{ comment.commentUserNo === 12 ? '나' : '파트너' }}</span>
                        <span class="seq">|</span>
                        <span class="time">{{ formatCommentTime(comment.commentCreateDate) }}</span>
                    </div>
                    <div><MoreBox/></div>
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

const formatCommentTime = (dateString) => {
    // 여기에 날짜 포맷팅 로직을 구현하세요
    // 예: "3분전", "1시간 전" 등으로 변환
    return "3분전"; // 임시 반환값
};
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    width: 25vw;
    height: 59vh; /* 필요에 따라 높이 조정 */
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
    height: 120px; /* 높이 조정하여 아래쪽으로 공간을 만듭니다. */
    box-sizing: border-box;
    border-top: 1px solid rgba(0, 0, 0, 0.10);
    margin: 0;
    position: relative; /* 위치를 상대적으로 설정 */
    bottom: 0; /* 아래쪽 고정 */
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
    height: 120px; /* 높이 조정하여 아래쪽으로 공간을 만듭니다. */
    box-sizing: border-box;
    border-top: 1px solid rgba(0, 0, 0, 0.10);
    margin: 0;
    position: relative; /* 위치를 상대적으로 설정 */
}

.textarea-container {
    position: relative;
    width: 100%;
    height: 100%;
}

/* .comment-text {
    width: 100%;
    height: 100%;
    border: 1px solid rgba(0, 0, 0, 0.20);
    color: rgba(0, 0, 0, 0.7);
    outline: none;
    resize: none;
    padding-bottom: 40px; 
    box-sizing: border-box;
}

.submit-button {
    position: absolute;
    right: 10px;
    bottom: 10px;
} */
</style>