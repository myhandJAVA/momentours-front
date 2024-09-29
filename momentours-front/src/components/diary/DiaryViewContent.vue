<template>
    <div class="container">
        <div class="top-wrap">
            <div class="profile">
                <img src="@/assets/icons/user-profile-image.svg" alt="Profile" class="profile-image" />
                <div>야야야ㅑ야</div>
            </div>
            <div><MoreBox/></div>
        </div>
        <div class="content-wrap">
            오늘 점심을 뭐먹을 지 너무 고민이 되는 데 뭐 먹을까? 나 점심때 
            오늘 점심을 뭐먹을 지 너무 고민이 되는 데 뭐 먹을까? 오늘 점심을 
            뭐먹을 지 너무 고민이 되는 오늘 점심을 뭐먹을 지 너무 고민이 되는
            데 뭐 먹을까? 나 점심때 ...
        </div>
        <div class="comment-wrap" >
            <div class="name-wrap">
                <div>
                    <span class="nickname">야야야얍</span>
                    <span class="seq">|</span>
                    <span class="time">3분전</span>
                </div>
                <div><MoreBox/></div>
            </div>
            <div style="margin-top: 5px;">
                <span>너무 맛있는 점심을 먹고싶은데...</span>
            </div>
        </div>
        <!-- <div class="textarea-container">
                <textarea class="comment-text" placeholder="댓글을 입력하세요."></textarea>
                <button class="submit-button common-button bg-color-brown">댓글작성</button>
        </div> -->
    </div>
</template>

<script setup>
import MoreBox from '@/components/common/MoreBox.vue';

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