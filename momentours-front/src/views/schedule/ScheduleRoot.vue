<template>

<header>
    <Header/>
</header>
<main>
    <div class="main">
        <CaleandarBoard/>
    </div>
</main>
<footer>
    <Footer/>  
</footer>

</template>

<script setup>

import Footer from '@/components/common/footer.vue';
import Header from '@/components/common/Header.vue';
import CommonPinkButton from '@/components/common/CommonPinkButton.vue';
import CommonBrownButton from '@/components/common/CommonBrownButton.vue';
import CommonLightBrownButton from '@/components/common/CommonLightBrownButton.vue';
import CaleandarBoard from '@/components/schedule/CalenadrBoard.vue';

</script>

<style scoped>
.main {
    margin-top: 10px;
    height: 50px;
    }
</style>