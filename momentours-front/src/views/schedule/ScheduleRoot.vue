<template>


<main>
    <div class="main">
        <CaleandarBoard/>
    </div>
</main>


</template>

<script setup>

import Footer from '@/components/common/footer.vue';
import Header from '@/components/common/Header.vue';
import CaleandarBoard from '@/components/schedule/CalendarBoard.vue';

</script>

<style scoped>
.main {
    margin-top: 10px;
    height: 50px;
    }
</style>