<template>
  <div class="answers-container">
    <div v-if="replies.length > 0" v-for="(reply, index) in replies" :key="reply.randomReplyNo" class="answer-section">
      <h3 class="user-name">{{ reply.userName }} 답변</h3>
      <div class="answer-item">
        <div v-if="reply.randomReplyContent === '텅'" class="no-answer"
          :class="{ 'writing': isWriting && writingReplyNo === reply.randomReplyNo }">
          <img src="@/assets/icons/warmtone.svg" class="no-answer-background">
          <div v-if="!isWriting" class="no-answer-content">
            아직 답변을 작성하지 않으셨네요..!
            <button v-if="index === 0" @click="startWriting(reply.randomReplyNo)" class="wrt-btn">작성하기</button>
          </div>
          <div v-else-if="index === 0" class="writing-area">
            <textarea v-model="newReplyContent" class="edit-textarea" placeholder="답변을 입력하세요..."></textarea>
            <div class="button-group3">
              <button @click="submitNewReply(reply)" class="action-btn save-btn">업로드</button>
              <button @click="cancelWriting" class="action-btn cancel-btn">취소</button>
            </div>
          </div>
        </div>
        <div v-else class="answer-content">
          <p v-if="editingReplyNo !== reply.randomReplyNo">{{ reply.randomReplyContent }}</p>
          <div v-else-if="index === 0" class="writing-area">
            <textarea v-model="editedContent" class="edit-textarea"></textarea>
            <div class="button-group2">
              <button @click="saveEdit(reply)" class="action-btn save-btn">저장</button>
              <button @click="cancelEdit" class="action-btn cancel-btn">취소</button>
            </div>
          </div>
          <div v-if="index === 0 && editingReplyNo !== reply.randomReplyNo" class="button-group">
            <button @click="startEdit(reply)" class="action-btn edit-btn">수정</button>
            <button @click="showDeleteModal(reply)" class="action-btn delete-btn">삭제</button>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="loading">답변을 불러오는 중...</div>
  </div>
  <Modal :isVisible="isModalVisible" :isYes="isDeleteConfirmed" @update:isVisible="isModalVisible = $event"
    @update:isYes="confirmDelete">
    <h4>정말 답변을 삭제하시겠습니까?</h4>
  </Modal>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import Modal from '@/components/common/Modal.vue';

const props = defineProps({
  questionId: {
    type: [String, Number],
    required: true
  }
});

const emit = defineEmits(['updateReply', 'update:remove']);

const replies = ref([]);
const editingReplyNo = ref(null);
const isWriting = ref(false);
const writingReplyNo = ref(null);
const editedContent = ref('');
const newReplyContent = ref('');
const isModalVisible = ref(false);
const isDeleteConfirmed = ref(false);
const replyToDelete = ref(null);
const router = useRouter();

watch(() => props.questionId, (newQuestionId, oldQuestionId) => {
  if (newQuestionId !== oldQuestionId) {
    fetchReply();
  }
}, { immediate: true });

async function fetchReply() {
  if (!props.questionId) return;
  try {
    const response = await fetch(`http://localhost:8080/${props.questionId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) throw new Error('네트워크 오류...');
    const data = await response.json();
    replies.value = data;
  } catch (error) {
    console.error('답변 조회 실패...', error);
    replies.value = [];
  }
}

function startWriting(replyNo) {
  isWriting.value = true;
  writingReplyNo.value = replyNo;
  newReplyContent.value = '';
}

function cancelWriting() {
  isWriting.value = false;
  writingReplyNo.value = null;
  newReplyContent.value = '';
}

async function submitNewReply(reply) {
  if (!newReplyContent.value.trim()) {
    alert('답변 내용을 입력해주세요.');
    return;
  }
  try {
    const response = await fetch(`http://localhost:8080/replies`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...reply,
        randomReplyContent: newReplyContent.value
      }),
    });
    if (!response.ok) throw new Error('서버 응답 오류');
    const updatedReply = await response.json();
    replies.value = replies.value.map(item => 
      item.randomReplyNo === reply.randomReplyNo ? updatedReply : item
    );
    emit('updateReply', props.questionId, replies.value);
    cancelWriting();
  } catch (error) {
    console.error('답변 등록 중 오류 발생:', error);
  }
}

function startEdit(reply) {
  editingReplyNo.value = reply.randomReplyNo;
  editedContent.value = reply.randomReplyContent;
}

function cancelEdit() {
  editingReplyNo.value = null;
  editedContent.value = '';
}

async function saveEdit(reply) {
  if(!editedContent.value.trim()) {
    window.alert('답변을 작성해주세요');
    return;
  }
  try {
    const updatedReply = { ...reply, randomReplyContent: editedContent.value };
    const response = await fetch(`http://localhost:8080/replies/${reply.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedReply)
    });
    if (!response.ok) throw new Error('서버 응답 오류');
    replies.value = replies.value.map(item => 
      item.randomReplyNo === reply.randomReplyNo ? updatedReply : item
    );
    emit('updateReply', props.questionId, replies.value);
    editingReplyNo.value = null;
  } catch (error) {
    console.error('답변 수정 중 오류 발생:', error);
  }
}

function showDeleteModal(reply) {
  replyToDelete.value = reply;
  isModalVisible.value = true;
}

function confirmDelete(confirmed) {
  isDeleteConfirmed.value = confirmed;
  if (confirmed && replyToDelete.value) {
    deleteReply(replyToDelete.value);
  }
  isModalVisible.value = false;
}

async function deleteReply(reply) {
  try {
    const response = await fetch(`http://localhost:8080/replies/${reply.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) throw new Error('서버 응답 오류');
    replies.value = replies.value.map(item => 
      item.randomReplyNo === reply.randomReplyNo ? { ...item, randomReplyContent: "텅" } : item
    );
    emit('updateReply', props.questionId, replies.value);
    router.push('/randomquestion/view');
  } catch (error) {
    console.error('답변 삭제 중 오류 발생:', error);
    window.alert('삭제 중 오류가 발생했습니다!');
  }
}

onMounted(() => {
  if (props.questionId) {
    fetchReply();
  }
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nanum+Brush+Script&display=swap');

.answers-container {
  display: flex;
  justify-content: space-around;
  gap: 50px;
  margin-top: 20px;
  flex-wrap: wrap;
}

.answer-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 30px;
}

.user-name {
  font-family: "Nanum Brush Script", cursive;
  color: #333;
  text-align: center;
  font-size: 24px;
  margin-bottom: -1px;
}

.answer-item {
  background-color: #F9F5EA;
  padding: 20px;
  border-radius: 25px;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
  width: 330px;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  font-family: "Nanum Brush Script", cursive;
  color: #333;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.no-answer, .answer-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.no-answer-background {
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 155%;
  height: auto;
  object-fit: cover;
  z-index: 1;
  transition: opacity 0.3s ease;
}

.no-answer.writing .no-answer-background {
  opacity: 0;
}

.no-answer-content, .writing-area {
  position: relative;
  z-index: 2;
  width: 100%;
}

.no-answer-content {
  font-size: 35px;
  text-align: center;
  padding: 0 20px;
  margin-bottom: 60px;
}

.writing-area {
  font-family: Dotum;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: calc(100% - 80px);
}

.edit-textarea {
  width: 90%;
  height: 250px;
  margin-bottom: 10px;
  font-size: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  text-align: left;
  vertical-align: top;
  resize: none; 
}

.button-group {
  bottom: 30px;
  font-family: cursive;
  display: flex;
  justify-content: center;
  gap: 45px;
  margin-top: 20px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
}

.button-group3 {
  bottom: -30px;
  font-family: cursive;
  display: flex;
  justify-content: center;
  gap: 45px;
  margin-top: 20px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
}

.button-group2 {
  bottom: -30px;
  font-family: cursive;
  display: flex;
  justify-content: center;
  gap: 45px;
  margin-top: 20px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
}

.action-btn {
  padding: 1px 15px;
  border: none;
  border-radius: 15px;
  background-color: #FFC7C7;
  color: #000000;
  cursor: pointer;
  font-size: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.action-btn:hover {
  background-color: #FFB3B3;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
}

.wrt-btn {
  padding: 5px 15px;
  position: absolute;
  bottom: -150px;
  left: 50%;
  transform: translateX(-50%);
  font: caption;
  border: none;
  border-radius: 15px;
  background-color: #FFC7C7;
  color: #000000;
  cursor: pointer;
  font-size: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.wrt-btn:hover {
  background-color: #FFB3B3;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
}

.answer-content p {
  font-size: 24px;
  color: #555;
  text-align: center;
  word-break: keep-all;
  overflow-wrap: break-word;
  width: 90%;
  max-height: calc(100% - 80px);  
  overflow-y: auto; 
}

.loading {
  width: 100%;
  text-align: center;
  padding: 20px;
  font-size: 16px;
  color: #666;
}

@media (max-width: 768px) {
  .answers-container {
    flex-direction: column;
    align-items: center;
    gap: 30px;
  }

  .answer-section {
    width: 100%;
    max-width: 330px;
  }
}
</style>