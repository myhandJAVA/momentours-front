<template>
    <div class="main-container">
        <div class="header-bg">
            <div class="icon">
                <img src="@/assets/icons/hamburger.svg" alt="hamburger Icon" />
            </div>
            <div class="flex-column-bdd">
                <div class="momentourslogo">
                    <img src="@/assets/icons/momentours-logo.svg" alt="momentours-logo Icon" />
                </div>
                <span class="momentours">
                    <img src="@/assets/icons/Momentours.svg" alt="Momentours Icon" />
                </span>
            </div>
            <div class="man-div">
                <img src="@/assets/icons/user-profile-image.svg" alt="user-profile-image Icon" />
            </div>
            <div class="flex-column-def">
                <span class="flex-name">Moni Roy</span>
                <span class="admin">Admin</span>
            </div>
        </div>
    </div>
</template>

<script setup>
    
</script>

<style scoped>
    .main-container {
        position: relative;
        width: 100%;
        height: 70px;
    }

    .header-bg {
        position: absolute;
        width: 100%;
        height: 100%;
        background: #f9f5ea;
        z-index: 1;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2), 0 2px 10px 0 rgba(0,0,0,0.19);
    }
    .flex-column-bdd {
        position: absolute;
        width: 277px;
        height: 62px;
        top: 1px;
        left: 579px;
        z-index: 13;
    }       
    .momentourslogo {
        position: absolute;
        width: 94px;
        height: 69px;
        top: 0;
        left: 0;
        background-size: cover;
        z-index: 13;
        border-radius: 40px;
    }
    .momentours {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        width: 208px;
        height: 54px;
        top: 8px;
        left: 69px;
        white-space: nowrap;
        z-index: 10;
    }

    .man-div {
        position: absolute;
        width: 3.66%;
        height: 62.86%;
        top: 18.57%;
        left: 87.35%;
        z-index: 7;
    }

    .flex-column-def {
        position: absolute;
        width: 4.24%;
        height: 38px;
        top: 50%;
        left: 91.68%;
        font-size: 0px;
        transform: translate(0, -50%);
        z-index: 5;
    }

    .flex-name {
        display: block;
        position: relative;
        height: 19px;
        color: #404040;
        font-family: Nunito Sans, var(--default-font-family);
        font-size: 14px;
        font-weight: 700;
        line-height: 19px;
        text-align: left;
        white-space: nowrap;
        z-index: 4;
    }

    .admin {
        display: block;
        position: relative;
        height: 16px;
        margin: 3px 0 0 0;
        color: #565656;
        font-family: Nunito Sans, var(--default-font-family);
        font-size: 12px;
        font-weight: 600;
        line-height: 16px;
        text-align: left;
        white-space: nowrap;
        z-index: 5;
    }

    .icon {
        position: absolute;
        width: 2%;
        height: 42.86%;
        top: 38%;
        left: 2.5%;
        z-index: 7;
    }
</style>