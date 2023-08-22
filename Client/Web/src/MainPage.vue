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
        <div id="chat_area" class="surface-variant">
          <div id="chat_content_show_area" style="position: absolute; width: 90%; height: 440px; top: 10px; left: 5%; overflow: scroll; color: white; font-family: Noto Sans SC;">
            OpenLiveUser: 主播现在塔菲在播原神<br/>
            TestUser1: 真的吗111<br/>
            OpenLiveUser: 主播是真的关注塔菲谢谢喵<br/>
          </div>
          <md-filled-text-field label="接下来该说些什么呢..." labelStyle="{fontSize: '4px'}"
            style=" --md-filled-text-field-container-color: #4f585e ;top: 460px;position: absolute; height: 50px; --md-sys-typescale-body-large: 400 12px system-ui; left: 5%; width: 62%"></md-filled-text-field>
          <md-filled-tonal-button style="top: 465px;position: absolute; left: 70%;">
            发送
            <svg slot="icon" viewBox="0 0 48 48">
              <path d="M6 40V8l38 16Zm3-4.65L36.2 24 9 12.5v8.4L21.1 24 9 27Zm0 0V12.5 27Z" />
            </svg>
          </md-filled-tonal-button>
        </div>
      </div>
      <div class="container_anchor_info">
        <img class="avatar" id="anchor_img" style="width: 55px; height: 55px;top: 2px;position: absolute">
        <div id="anchor_name"
          style="color:white; position: absolute; left: 70px; font-family: Noto Sans SC Med;font-size: 18px">Loading...
        </div>
        <md-filled-button style="color:white; position: absolute; left: 70px; top: 30px;height: 30px"
          @click="wip_alert">主页</md-filled-button>
        <md-filled-button style="color:white; position: absolute; left: 150px; top: 30px;height: 30px;"
          @click="wip_alert">...</md-filled-button>
      </div>
    </div>
  </body>
</template>

<script setup>
import { wip_alert } from '@/page_onclick_process'
</script>

<style scoped>@import './css/app-fonts.css';
@import './css/mainpage.css'</style>