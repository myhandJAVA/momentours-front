<template>
    <div>
        <div class="leftContent">
            <h2>{{ momentData.momentTitle }}</h2>
            <p></p>
        </div>
        <div class="rightContent">
            <CommonMap v-if="momentLocation" :singleMarker="momentLocation" :initialCenter="momentLocation" :level="5" />
        </div>
    </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue';
import CommonMap from '@/components/common/CommonMap.vue';

const state = reactive({
    momentData = null,
    momentLocation = null
});

const fetchMomentData = async () => {
    try {
        const response = await fetch('http://localhost:3000/Moments/');
        if (response.ok) {
            const data = await response.json();
            state.momentData = data;
            state.momentLocation = {lat: data.}
        }
    }
}

</script>

<style scoped>

</style>