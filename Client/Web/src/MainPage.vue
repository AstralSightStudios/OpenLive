<template>
  <body>
    <div class="app">
      <div class="userinfo" id="user_info_div">
        <div class="userinfo_username">OpenLiveUser</div>
        <img src="./icon/icon_gold.png" class="userinfo_gold_img">
        <div class="userinfo_gold_num">13.14</div>
        <img src="./icon/icon_exp.png" class="userinfo_exp_img">
        <div class="userinfo_exp_num">114514</div>
        <img src="./img/default_profile_img.png" class="avatar" style="position: absolute;right: 0px;">
      </div>
      <div id="live_title" class="container_live_title"
        style="color: white; font-size: 24px; font-family: Noto Sans SC Med;">Loading...</div>
      <div class="container">
        <div id="live_player" class="surface-variant">
          <video id="live_player_vjs" class="video-js" controls preload="auto" style="width: 100%; height: 100%;">
            <p class="vjs-no-js">
              To view this video please enable JavaScript, and consider upgrading to a web browser that
              <a href="https://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
            </p>
          </video>
        </div>
        <div id="live_chat_clip"></div>
        <div id="chat_area" class="surface-variant"></div>
      </div>
      <div class="container_anchor_info">
        <img class="avatar" id="anchor_img" style="width: 55px; height: 55px;top: 2px;position: absolute">
        <div id="anchor_name"
          style="color:white; position: absolute; left: 70px; font-family: Noto Sans SC Med;font-size: 18px">Loading...
        </div>
        <md-filled-button style="color:white; position: absolute; left: 70px; top: 30px;height: 30px"
          >主页</md-filled-button>
        <md-filled-button style="color:white; position: absolute; left: 150px; top: 30px;height: 30px;"
          >...</md-filled-button>
      </div>
    </div>
  </body>
</template>

<style scoped>
@import './css/app-fonts.css';
@import './css/mainpage.css'
</style>