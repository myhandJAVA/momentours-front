<template>
    <div>
        <main>
            <section class="main-banner">
                <button class="prev">&lt;</button>
                <div class="banner-item">
                    <img src="" alt="메인 배너 이미지">
                    <h2>이벤트 배너</h2>
                    <p>p태그 영역</p>
                </div>
                <button class="next">&gt;</button>
            </section>

            <section class="tour-deals">
                <h5>테마 설명 대제목</h5>
                <p>테마 설명 소제목</p>
                <div class="filter-options">
                    <button>카테고리1</button>
                    <button>카테고리2</button>
                    <button>카테고리3</button>
                    <button>카테고리4</button>
                    <button>카테고리5</button>
                </div>

                <div class="deal-cards">
                    <article class="card">
                        <img src="" alt="이미지 1">
                        <div class="card-content">
                            <h3>best1</h3>
                            <p>대제목1</p>
                        </div>
                    </article>
                    <article class="card">
                        <img src="" alt="이미지 2">
                        <div class="card-content">
                            <h3>best2</h3>
                            <p>대제목2</p>
                        </div>
                    </article>
                    <article class="card">
                        <img src="" alt="이미지 3">
                        <div class="card-content">
                            <h3>best3</h3>
                            <p>대제목3</p>
                        </div>
                    </article>
                </div>
            </section>

            <!-- <h1>Home</h1>
            <h2>currentRoute = {{ currentRoute.value }}</h2> -->
        </main>
    </div>
</template>

<script setup>
    import { useRoute } from 'vue-router';

    const currentRoute = useRoute();
</script>

<style src='@/assets/css/mainpage.css' scoped>

</style>
