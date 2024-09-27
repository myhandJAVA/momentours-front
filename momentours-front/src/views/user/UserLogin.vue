<template>  
<main class=""> 
    <div class="login-container">
        <h1>Momentours</h1>
       <b><p>아이디와 비밀번호를 입력해주세요.</p></b>
        
        <form>
            <div class="input-group">
               <b><label for="email">이메일</label></b>
                <input type="email" id="email" placeholder="아이디를 입력해주세요." required>
            </div>
            
            <div class="input-group">
                <b><label for="password">비밀번호</label></b>
                <div class="password-input">
                    <input type="password" id="password" placeholder="비밀번호를 입력해주세요." required>
                    <button type="button" class="toggle-password">
                    </button>
                </div>
            </div>
            
            <b><button type="submit" class="login-btn">로그인</button></b>
            <b><button type="button" class="signup-btn">회원가입</button></b>
        </form>
        
        <div class="additional-links">
            <a href="#">아이디 찾기</a>
            <a href="#">비밀번호 찾기</a>
        </div>
    </div>
</main>
</template>

<script setup>
    import { useRoute } from 'vue-router';
    
    const currentRoute = useRoute();
</script>

<style src='@/assets/css/login.css' scoped>

</style>