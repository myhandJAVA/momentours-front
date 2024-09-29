<template>
    <div class="navigation">
        <button class="nav-btn prev" @click="$emit('previous')" :disabled="isFirstQuestion">&lt;</button>
        <button class="nav-btn next" @click="$emit('next')" :disabled="isLatestQuestion">&gt;</button>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    isFirstQuestion: Boolean,
    isLatestQuestion: Boolean
});

defineEmits(['previous', 'next']);
</script>

<style scoped>
.navigation {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}

.nav-btn {
    background-color: #FFB6C1;
    border: none;
    padding: 10px 20px;
    border-radius: 50%;
    cursor: pointer;
}

.nav-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
</style>