<template>
    <div class="wrapper">
      <div id="main-div">
        <div
          id="main-button"
          :class="['tooltip--left', 'wave', { open: showChatButtons }]"
          data-tooltip="Escríbanos"
          @click="handleMainButtonClick"
        >
          <i :class="['fas', showChatButtons ? 'fa-times' : 'fa-comments']"></i>
        </div>
        <a
          target="_blank"
          href="https://wa.me/542612455960"
          class="tooltip--left whatsapp-color"
          data-tooltip="WhatsApp"
        >
          <i class="fab fa-whatsapp"></i>
        </a>
        <a
          v-if="!isMobile"
          id="msn"
          class="tooltip--left messenger-color"
          data-tooltip="Facebook"
          @click="handleMsnClick"
        >
          <i class="fab fa-facebook-messenger"></i>
        </a>
        <a
          v-if="isMobile"
          id="msncel"
          href="https://m.me/MarGocomunicacion"
          class="tooltip--left messenger-color"
          data-tooltip="Facebook"
          target="_blank"
        >
          <i class="fab fa-facebook-messenger"></i>
        </a>
  
        <div v-if="!isMobile && showFbChat" id="fb-chat" :class="{ active: showFbChat }">
          <div class="close" @click="handleFbChatCloseClick">
            X
          </div>
          <iframe
            src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FMarGocomunicacion&tabs=messages&width=340&height=331&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false&appId=160649695194253"
            width="340"
            height="271"
            style="border: none; overflow: hidden;"
            allowfullscreen="true"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          ></iframe>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        showChatButtons: false,
        showFbChat: false
      };
    },
    computed: {
      isMobile() {
        this.$nextTick
        const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
        return regex.test(navigator.userAgent);
      }
    },
    methods: {
      handleMainButtonClick() {
        this.showChatButtons = !this.showChatButtons;
      },
      handleMsnClick() {
        this.showFbChat = true;
      },
      handleFbChatCloseClick() {
        this.showFbChat = false;
      }
    }
  };
  </script>
  
  <style scoped>
 /*Boton whatsapp*/

#main-div {
    position: fixed;
    right: 20px;
    bottom: 20px;
    z-index: 99;
  }
  
  #main-button {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 0;
    bottom: 0;
    height: 50px;
    width: 50px;
    font-size: 20px;
    color: #fff;
    cursor: pointer;
    background-color: #0064f3;
    box-shadow: 0 0 10px 0 rgba(0,0,0,.5);
    border-radius: 50%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    -ms-border-radius: 50%;
    -o-border-radius: 50%;
  }
  
  #main-button ~ button {
    visibility: hidden;
    font-weight: 600;
    height: 50px;
    padding: 0 20px;
    color: #fff;
    background: linear-gradient(90deg, #00a1f5, #0064f3);
    box-shadow: 0 0 10px 0 rgba(0,0,0,.5);
    border: 0;
    position: absolute;
    z-index: -1;
    right: 0;
    bottom: 0;
    opacity: 0;
    white-space: nowrap;
    cursor: pointer;
    transition: .2s all linear;
    -webkit-transition: .2s all linear;
    -moz-transition: .2s all linear;
    -ms-transition: .2s all linear;
    -o-transition: .2s all linear;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
    -o-border-radius: 5px;
  }
  
  #main-button.open ~ button {
    visibility: visible;
    right: 70px;
    opacity: 1;
    transition: .4s all cubic-bezier(0, 0.01, 0, 1.27);
    -webkit-transition: .4s all cubic-bezier(0, 0.01, 0, 1.27);
    -moz-transition: .4s all cubic-bezier(0, 0.01, 0, 1.27);
    -ms-transition: .4s all cubic-bezier(0, 0.01, 0, 1.27);
    -o-transition: .4s all cubic-bezier(0, 0.01, 0, 1.27);
  }
  
  #main-button ~ a {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      position: absolute;
      right: 0;
      bottom: 0;
      z-index: -1;
      height: 50px;
      width: 50px;
      font-size: 30px;
      opacity: 0;
      text-decoration: none;
      color: #fff;
      background-color: #fff;
      box-shadow: 0 0 10px 0 rgba(0,0,0,.5);
      border-radius: 50%;
      -webkit-border-radius: 50%;
      -moz-border-radius: 50%;
      -ms-border-radius: 50%;
      -o-border-radius: 50%;
      transition: .2s all linear;
      -webkit-transition: .2s all linear;
      -moz-transition: .2s all linear;
      -ms-transition: .2s all linear;
      -o-transition: .2s all linear;
      border: inherit;
  }
  
  #main-button ~ .telegram-color {
    background: linear-gradient(0deg, #017AB1, #01ABE6);
  }
  
  #main-button ~ .whatsapp-color {
    background: linear-gradient(0deg, #00B100, #09db09);
  }
  
  #main-button ~ .messenger-color {
    background: linear-gradient(0deg, #0078FF, #00C6FF);
  }
  
  #main-button.open ~ a {
    opacity: 1;
    transition: .4s all cubic-bezier(0, 0.01, 0, 1.27);
    -webkit-transition: .4s all cubic-bezier(0, 0.01, 0, 1.27);
    -moz-transition: .4s all cubic-bezier(0, 0.01, 0, 1.27);
    -ms-transition: .4s all cubic-bezier(0, 0.01, 0, 1.27);
    -o-transition: .4s all cubic-bezier(0, 0.01, 0, 1.27);
  }
  
  #main-button.open ~ a:nth-of-type(2) {
    bottom: 120px;
  }
  #main-button.open ~ a:nth-of-type(3) {
    bottom: 180px;
  }
  #main-button.open ~ a:nth-of-type(1) {
    bottom: 60px;
  }
  
  .wave {
    animation-name: wave;
    animation-duration: 1s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }
  
  @keyframes wave {
    0% {box-shadow: 0 0 0px 0px rgba(255, 255, 255, 0.5);}
    100% {box-shadow: 0 0 0px 10px rgba(255, 255, 255, 0);}
  }
  
  .open {
    animation-iteration-count: 1;
  }
  </style>