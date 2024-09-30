<template>  
    <main class=""> 
        <div class="login-container">
            <img src="@/assets/icons/Momentours-logo.svg" alt="momentours logo">
            <img src="@/assets/icons/Momentours.svg" alt="momentours logo">
            
           <b><p>아이디와 비밀번호를 입력해주세요.</p></b>
            
            <form @submit.prevent="handleLogin">
                <div class="input-group">
                   <b><label for="email">이메일</label></b>
                    <input type="email" id="email" v-model="email" placeholder="아이디를 입력해주세요." required>
                </div>
                
                <div class="input-group">
                  <b><label for="password">비밀번호</label></b>
                     <div class="password-input">
                     <input type="password" id="password" v-model="password" placeholder="비밀번호를 입력해주세요." required>
                      </div>
                </div>
                
                <b><button type="submit" class="login-btn">로그인</button></b>
                <b><button type="button" @click="goToSignup" class="signup-btn">회원가입</button></b>
            </form>
            
            <div class="additional-links">
                <a href="#">아이디 찾기</a>
                <a href="#">비밀번호 찾기</a>
            </div>
        </div>
    </main>
    </template>
    
    <script setup>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    
    const router = useRouter();
    
    const email = ref('');
    const password = ref('');
    
    const handleLogin = async () => {
        try {
            const response = await fetch(`http://localhost:3000/user-info?email=${email.value}`);
            if (!response.ok) {
                throw new Error('서버 응답 오류');
            }
            const users = await response.json();
            
            const user = users.find(u => u.email === email.value && u.pwd === password.value);
            
            if (user) {
                // 로그인 성공

                // 로그인 시 localStorage:
                // 로그인 시 db.json에 있는 email 및 pwd 값을 비교하여 true라면 해당 정보를 갖고 로그인
                // Pinia(Pinia는 상태 관리 라이브러리로, 앱의 전역 상태를 관리하는 데 사용) 같은 방식을 현재 사용하고 있지 않기 때문에 
                // localStorage 임시로 회원에 대한 데이터를 저장하여 데이터를 이용 및 관리 할 수 있도록 편법같은 기능을 사용
                
                localStorage.setItem('user', JSON.stringify(user)); // 사용자 정보를 로컬 스토리지에 저장
                alert('로그인 성공!');
                router.push('/mypage'); // 로그인 후 마이페이지로 이동
            } else {
                alert('이메일 또는 비밀번호가 올바르지 않습니다.');
            }
        } catch (error) {
            console.error('로그인 오류:', error);
            alert('로그인 중 오류가 발생했습니다.');
        }
    };
    
    const goToSignup = () => {
        router.push('/signup');
    };
    </script>
    
    <style src='@/assets/css/login.css' scoped>
    </style>