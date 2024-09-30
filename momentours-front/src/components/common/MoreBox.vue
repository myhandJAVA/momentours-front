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
    diaryContent: { // diaryContent prop 추가
        type: String,
        required: true,
    }
});

const emit = defineEmits(['delete-diary', 'edit-diary']);
const isMenuOpen = ref(false);

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
};

const deleteItem = () => {
    emit('delete-diary', props.diaryId);
};

const editItem = () => {
    emit('edit-diary', { id: props.diaryId, content: props.diaryContent }); // ID와 내용 함께 emit
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
