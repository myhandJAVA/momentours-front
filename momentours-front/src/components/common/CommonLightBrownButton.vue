<template>
    <button class="common-button" @click="handleClick">
        {{ label }}
    </button>
</template>

<script setup>
    const props = defineProps({
        label: {
        type: String,
        required: true
    },
    onClick: {
        type: Function,
        default: () => {}
    }
    });

    const handleClick = () => {
        props.onClick();
    };
</script>

<style scoped>
    .common-button {
        background-color: #F9F5EA;
        color: #333;
        border: none;
        padding: 7px 28px;
        border-radius: 7px;
        font-size: 15px;
        cursor: pointer;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    }
</style>
