<template>
  <section class="lazy-background logos-swiper">
      <div class="container">
          <div class="title">
              <h3 data-aos="fade-right" data-aos-duration="800">Algunos de nuestros trabajos</h3>
          </div>
          <div class="clients">
              <div class="swiper-container clients-slider">
                  <div class="swiper-wrapper">
                      <div v-for="(logo, index) in logos" :key="index" class="swiper-slide">
                        <img :src="logo.src" :alt="logo.alt" :width="logo.width" >
                      </div>
                  </div>
                  <div class="test-pagination"></div>
              </div>
          </div>
      </div>
  </section>
</template>
<script>
  import Swiper from "swiper";
    // == Clients Slider == //
  export default {
    data(){
      return {
        logos:[
          {src:"src/images/logos/logotipo1.png",alt:"Logo UcoFit",width:"150"},
          {src:"src/images/logos/logotipo2.png",alt:"Logo Publicatate",width:"150"},
          {src:"src/images/logos/logotipo3.png",alt:"Logo Margo Comunicación y Diseño",width:"150"},
          {src:"src/images/logos/logotipo4.png",alt:"Logo Copias Uco",width:"150"},
          {src:"src/images/logos/logotipo5.png",alt:"Logo Natalia Carlen",width:"150"},
          {src:"src/images/logos/logotipo6.png",alt:"Logo Luxo",width:"150"},
          {src:"src/images/logos/logotipo7.png",alt:"Logo Gabi",width:"150"},
        ]
      }
    },
    mounted() {
      if (document.querySelectorAll('.clients-slider').length) {
        var swiper = new Swiper('.clients-slider', {
            autoplay: {
                delay: 2500,
                disableOnInteraction: true,
            },
            speed: 900,
            loop: true,
            slidesPerView: 5,
            breakpoints: {
                1200: {
                    slidesPerView: 4
                },
                992: {
                    slidesPerView: 3
                },
                576: {
                    slidesPerView: 2
                },
                400: {
                    slidesPerView: 1
                }
            }
        });

        document.querySelectorAll(".clients-slider").forEach(function (slider) {
            slider.addEventListener("mouseenter", function () {
                swiper.autoplay.stop();
            });

            slider.addEventListener("mouseleave", function () {
                swiper.autoplay.start();
            });
        });
      }
    }
  }
</script>
<style scoped>
.logos-swiper {
  background-image: url(../images/abstract-paper.svg);
  background-color: #939393;
  background-position: center;
  background-size: cover; 
  background-blend-mode: soft-light;
}
.logos-swiper .container h3 {
  color: #26264b;
  margin-top: 15px;
}
.swiper-container {
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  list-style: none;
  padding: 0;
  /* Fix of Webkit flickering */
  z-index: 1;
}

.swiper-container-no-flexbox .swiper-slide {
  float: left;
}

.swiper-container-vertical > .swiper-wrapper {
  flex-direction: column;
}

.swiper-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: flex;
  transition-property: -webkit-transform;
  transition-property: transform;
  transition-property: transform, -webkit-transform;
  box-sizing: content-box;
}

.swiper-container-android .swiper-slide,
.swiper-wrapper {
  -webkit-transform: translate3d(0px, 0, 0);
          transform: translate3d(0px, 0, 0);
}

.swiper-container-multirow > .swiper-wrapper {
  flex-wrap: wrap;
}

.swiper-container-free-mode > .swiper-wrapper {
  transition-timing-function: ease-out;
  margin: 0 auto;
}

.swiper-slide {
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  position: relative;
  transition-property: -webkit-transform;
  transition-property: transform;
  transition-property: transform, -webkit-transform;
}

.swiper-slide-invisible-blank {
  visibility: hidden;
}

/* Auto Height */
.swiper-container-autoheight, .swiper-container-autoheight .swiper-slide {
  height: auto;
}

.swiper-container-autoheight .swiper-wrapper {
  align-items: flex-start;
  transition-property: height, -webkit-transform;
  transition-property: transform, height;
  transition-property: transform, height, -webkit-transform;
}

/* 3D Effects */
.swiper-container-3d {
  -webkit-perspective: 1200px;
          perspective: 1200px;
}

.swiper-container-3d .swiper-wrapper, .swiper-container-3d .swiper-slide, .swiper-container-3d .swiper-slide-shadow-left, .swiper-container-3d .swiper-slide-shadow-right, .swiper-container-3d .swiper-slide-shadow-top, .swiper-container-3d .swiper-slide-shadow-bottom, .swiper-container-3d .swiper-cube-shadow {
  -webkit-transform-style: preserve-3d;
          transform-style: preserve-3d;
}

.swiper-container-3d .swiper-slide-shadow-left, .swiper-container-3d .swiper-slide-shadow-right, .swiper-container-3d .swiper-slide-shadow-top, .swiper-container-3d .swiper-slide-shadow-bottom {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10;
}

.swiper-container-3d .swiper-slide-shadow-left {
  background-image: linear-gradient(to left, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
}

.swiper-container-3d .swiper-slide-shadow-right {
  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
}

.swiper-container-3d .swiper-slide-shadow-top {
  background-image: linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
}

.swiper-container-3d .swiper-slide-shadow-bottom {
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
}

/* IE10 Windows Phone 8 Fixes */
.swiper-container-wp8-horizontal, .swiper-container-wp8-horizontal > .swiper-wrapper {
  touch-action: pan-y;
}

.swiper-container-wp8-vertical, .swiper-container-wp8-vertical > .swiper-wrapper {
  touch-action: pan-x;
}

</style>
