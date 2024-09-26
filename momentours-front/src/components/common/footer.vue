<template>
    <div class="footerfooter-more-info">
    <div class="divider"></div>
    <div class="sns-icons">
        <img class="footersocial-media-logoinstr" alt="Instagram logo" src="/image/logos/Instagram.svg">
        <img class="footersocial-media-logotwitt" alt="Twitter logo" src="/image/logos/Twitter.svg">
        <img class="footersocial-media-logofaceb" alt="Facebook logo" src="/image/logos/Facebook.svg">
        </div>
    <div class="info-parent">
        <div class="info">Info</div>
        <div class="support">Support</div>
        <div class="marketing">Marketing</div>
    </div>
        <div class="terms-of-use">Terms of Use</div>
        <div class="terms-of-use">Privacy Policy</div>
        <div class="divider"></div>
        <div class="copyright-2024-wrapper">
        <div class="terms-of-use">@copyright 2024</div>
    </div>
    </div>
</template>

<script setup>

</script>

<style scoped>

body {
  	margin: 0;
  	line-height: normal;
}
    .divider {
  	width: 100%;
  	position: relative;
  	background-color: #c5b697;
  	height: 1px;
}
.footersocial-media-logoinstr {
  	position: absolute;
  	top: 0px;
  	left: 0px;
  	width: 40px;
  	height: 40px;
}
.footersocial-media-logotwitt {
  	position: absolute;
  	top: 0px;
  	left: 108px;
  	width: 40px;
  	height: 40px;
}
.footersocial-media-logofaceb {
  	position: absolute;
  	top: 0px;
  	left: 54px;
  	width: 40px;
  	height: 40px;
}
.sns-icons {
  	width: 148px;
  	position: relative;
  	height: 40px;
}
.info {
  	position: absolute;
  	top: 0px;
  	left: 0px;
  	white-space: pre-wrap;
  	text-align: left;
}
.support {
  	position: absolute;
  	top: 0px;
  	left: 45.5px;
}
.marketing {
  	position: absolute;
  	top: 0px;
  	left: 125.5px;
}
.info-parent {
  	width: 205.5px;
  	position: relative;
  	height: 24px;
}
.terms-of-use {
  	position: relative;
}
.copyright-2024-wrapper {
  	display: flex;
  	flex-direction: row;
  	align-items: flex-start;
  	justify-content: flex-start;
  	text-align: left;
  	font-size: 14px;
}
.footerfooter-more-info {
  	width: 100%;
  	position: relative;
  	background-color: #fff;
  	overflow: hidden;
  	display: flex;
  	flex-direction: column;
  	align-items: center;
  	justify-content: flex-start;
  	padding: 47px 111px;
  	box-sizing: border-box;
  	gap: 20px;
  	text-align: center;
  	font-size: 16px;
  	color: #333;
  	font-family: Poppins;
}
</style>