<template>
  <body>
    <div class="app">
      <md-dialog id="universal_error_dialog" style="--md-dialog-container-color: var(--md-sys-color-on-error-container); width: 25%">
        <div slot="headline" id="universal_error_dialog_title" style="font-family: Noto Sans SC Med; color: black">出现错误</div>
        <form id="form" slot="content" method="dialog">
          <div style="font-family: Noto Sans SC Med; color: black" id="universal_error_dialog_text">未指定</div>
        </form>
        <div slot="actions">
          <md-text-button form="form" value="close" style="font-family: Noto Sans SC Med; --md-text-button-label-text-color: black; --md-text-button-hover-label-text-color: gray; --md-text-button-pressed-label-text-color: gray; --md-text-button-disabled-label-text-color: gray">确定</md-text-button>
        </div>
      </md-dialog>

      <md-dialog id="universal_info_dialog" style="--md-dialog-container-color: var(--md-sys-color-on-tertiary); width: 25%">
        <div slot="headline" id="universal_info_dialog_title" style="font-family: Noto Sans SC Med;">通知</div>
        <form id="form" slot="content" method="dialog">
          <div style="font-family: Noto Sans SC Med;" id="universal_info_dialog_text">未指定</div>
        </form>
        <div slot="actions">
          <md-text-button form="form" value="close" style="font-family: Noto Sans SC Med;" @click="close_info_dialog">确定</md-text-button>
        </div>
      </md-dialog>

      <md-dialog id="dialog_login" style="--md-dialog-container-color: var(--md-sys-color-on-tertiary); width: 25%">
        <div slot="headline" style="font-family: Noto Sans SC Med;">登录</div>
        <form id="form" slot="content" method="dialog">
          <md-filled-text-field label="用户名" style=" --md-filled-text-field-container-color: #4f585e; width: 100%;"></md-filled-text-field>
          <div style="height: 10px"/>
          <md-filled-text-field label="密码" type="password" style=" --md-filled-text-field-container-color: #4f585e; width: 100%;"></md-filled-text-field>
          <div style="height: 20px"/>
          <a href="#" style="color: white" @click="go_register_click">没有账号？立即注册 >>></a>
        </form>
        <div slot="actions">
          <md-text-button form="form" value="close" style="font-family: Noto Sans SC Med;">关闭</md-text-button>
          <md-outlined-button form="form" value="ok" style="font-family: Noto Sans SC Med;">立即登录</md-outlined-button>
        </div>
      </md-dialog>

      <md-dialog id="dialog_register" style="--md-dialog-container-color: var(--md-sys-color-on-tertiary); width: 25%">
        <div slot="headline" style="font-family: Noto Sans SC Med;">注册</div>
        <form id="form" slot="content" method="dialog">
          <md-filled-text-field label="用户名" id="dialog_register_username" value="" style=" --md-filled-text-field-container-color: #4f585e; width: 100%;"></md-filled-text-field>
          <div style="height: 10px"/>
          <md-filled-text-field label="密码" id="dialog_register_password" value="" type="password" style=" --md-filled-text-field-container-color: #4f585e; width: 100%;"></md-filled-text-field>
          <div style="height: 10px"/>
          <md-filled-text-field label="确认密码" id="dialog_register_confirm_password" value="" type="password" style=" --md-filled-text-field-container-color: #4f585e; width: 100%;"></md-filled-text-field>
        </form>
        <div slot="actions">
          <md-text-button form="form" value="close" style="font-family: Noto Sans SC Med;" @click="go_back_login_click">返回</md-text-button>
          <md-outlined-button form="form" value="ok" style="font-family: Noto Sans SC Med;" @click="go_register_setname_click">下一步</md-outlined-button>
        </div>
      </md-dialog>

      <md-dialog id="dialog_register_setname" style="--md-dialog-container-color: var(--md-sys-color-on-tertiary); width: 25%">
        <div slot="headline" style="font-family: Noto Sans SC Med;">给自己取个名字吧！</div>
        <form id="form" slot="content" method="dialog">
          <md-filled-text-field label="你想让他人在直播间中怎么称呼你呢..." style=" --md-filled-text-field-container-color: #4f585e; width: 100%;"></md-filled-text-field>
        </form>
        <div slot="actions">
          <md-text-button form="form" value="close" style="font-family: Noto Sans SC Med;" @click="go_back_register_from_setname_click">返回</md-text-button>
          <md-outlined-button form="form" value="ok" style="font-family: Noto Sans SC Med;">完成注册</md-outlined-button>
        </div>
      </md-dialog>
      
      <div class="userinfo" id="user_info_div" @click="userinfo_div_click">
        <div class="userinfo_username" style="font-family: Noto Sans SC Med;" id="username_text">未登录</div>
        <img src="./icon/icon_gold.png" class="userinfo_gold_img">
        <div class="userinfo_gold_num" id="user_gold_text">---</div>
        <img src="./icon/icon_exp.png" class="userinfo_exp_img">
        <div class="userinfo_exp_num" id="user_exp_text">---</div>
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
          <div id="chat_content_show_area"
            style="position: absolute; width: 90%; height: 440px; top: 10px; left: 5%; overflow: scroll; color: white; font-family: Noto Sans SC;">
            OpenLiveUser: 主播现在塔菲在播原神<br />
            TestUser1: 真的吗111<br />
            OpenLiveUser: 主播是真的关注塔菲谢谢喵<br />
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
          @click=" wip_alert ">主页</md-filled-button>
        <md-filled-button style="color:white; position: absolute; left: 150px; top: 30px;height: 30px;"
          @click=" wip_alert ">...</md-filled-button>
      </div>
    </div>
  </body>
</template>

<script lang="ts" setup>
import { wip_alert, userinfo_div_click, go_register_click, go_back_login_click, go_register_setname_click, go_back_register_from_setname_click } from '@/page_onclick_process';
import { close_info_dialog } from '@/universal_commands'
</script>

<style scoped>
@import './css/app-fonts.css';
@import './css/mainpage.css'
</style>