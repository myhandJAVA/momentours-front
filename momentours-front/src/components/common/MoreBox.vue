<template>
    <div class="more-options" @click.stop="toggleMenu">
        <img src="@/assets/icons/threeDots.svg" alt="threeDots">
        <div v-if="isMenuOpen" class="menu-dropdown">
            <ul>
                <li @click="editItem">수정</li>
                <hr class="hr-mr">
                <li @click="deleteItem" style="color: red;">삭제</li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
    diaryId: {
        type: Number,
        required: true,
    },
});

const emit = defineEmits(['delete-diary']);
const isMenuOpen = ref(false);

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
};

// 삭제 클릭 시 diaryId emit
const deleteItem = () => {
    emit('delete-diary', props.diaryId); // diaryId를 부모 컴포넌트로 전달
};
</script>




<style scoped>
.more-options {
    cursor: pointer;
    position: relative;
}

.menu-dropdown {
    position: absolute;
    right: 0;
    top: 10px;
    width: 100px;
    background-color: white;
    border: 1px solid #ddd;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 10;
    padding: 4px;
    border-radius: 4px;
}

.menu-dropdown ul {
    list-style: none;
    padding: 0;
    margin: 0;
    text-align: center;
}

.menu-dropdown li {
    padding: 8px 12px;
    cursor: pointer;
    font-size: 0.9rem;
}

.menu-dropdown li:hover {
    background-color: #f0f0f0;
}

.hr-mr {
    margin: 2px !important;
}
</style>
