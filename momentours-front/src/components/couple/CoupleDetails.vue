<template>
    <div class="couple-details">
    <div class="detail-card" v-for="person in people" :key="person.name">
        <img src="@/assets/icons/user-profile-image.svg" alt="Profile Image" class="profile-img">
        <div class="detail-info">
        <h2>{{ person.name }}</h2>
        <p>mbti: {{ person.mbti }}</p>
        <p>나이: {{ person.age }}</p>
        <p>가입일: {{ person.joinDate }}</p>
        <p>성별: {{ person.gender }}</p>
        </div>
    </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const people = ref([
    {
    name: 'Moni Roy',
    mbti: 'ENTJ',
    age: 24,
    joinDate: '2024.03.02',
    gender: '여',
    image: '/path/to/moni.jpg',
    },
    {
    name: 'John Peter',
    mbti: 'ENTJ',
    age: 25,
    joinDate: '2024.03.02',
    gender: '남',
    image: '/path/to/john.jpg',
    },
]);
</script>

<style scoped>
.couple-details {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    justify-content: center;
}

.detail-card {
    background-color: #fff;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    width: 250px;
    text-align: center;
}

.profile-img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 15px;
}

.detail-info h2 {
    font-size: 20px;
    margin-bottom: 10px;
}

.detail-info p {
    margin: 5px 0;
    font-size: 16px;
    color: #666;
}
</style>
