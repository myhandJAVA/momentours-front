<template>
    <header class="header">
      <button class="menu-icon" @click="$emit('toggle-sidebar')">
        ☰
      </button>
      <div class="logo" @click="toHomeRouter">
        <img src="@/assets/icons/momentours-logo.svg" alt="Momentours icon" class="logo-icon" />
        <span class="oooh-baby-regular">Momentours</span>
      </div>
      <div class="profile" @click="toMyPageRouter">
        <img src="@/assets/icons/user-profile-image.svg" alt="Profile" class="profile-image" />
        <div class="profile-info">
          <span class="profile-name">Moni Roy</span>
          <span class="profile-role">Admin</span>
        </div>
      </div>
    </header>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  const router = useRouter();
  defineEmits(['toggle-sidebar']);
  const toHomeRouter = ()=>{
    router.push('/');
};

  const toMyPageRouter = ()=>{
    router.push('/mypage');
  };
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Oooh+Baby&display=swap');
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: #F9F5EA;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  .menu-icon {
    font-size: 24px;
    background: none;
    border: none;
    cursor: pointer;
    color: #333;
  }
  
  .logo {
    display: flex;
    align-items: center;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    cursor: pointer; 
    user-select: none; 
  }
  
  .logo-icon {
    width: 70px;
    height: 70px;
  }
  
  .oooh-baby-regular {
  font-family: "Oooh Baby", cursive;
  font-weight: 400;
  font-style: normal;
  font-size: 26px;
  }
  
  .profile {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  
  .profile-image {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }
  
  .profile-info {
    display: flex;
    flex-direction: column;
  }
  
  .profile-name {
    font-weight: bold;
    color: #333;
  }
  
  .profile-role {
    font-size: 0.8em;
    color: #666;
  }
  </style>