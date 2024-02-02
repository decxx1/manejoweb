<template>
    <button id="return-to-top" v-show="showButton" @click="topFunction" title="Ir Arriba"><i class="fas fa-chevron-up"></i></button>
</template>
  
  <script>
  export default {
    data() {
      return {
        showButton: false
      };
    },
    mounted() {
      window.addEventListener("scroll", this.scrollFunction);
    },
    beforeUnmount() {
      window.removeEventListener("scroll", this.scrollFunction);
    },
    methods: {
      scrollFunction() {
        if (document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000) {
          this.showButton = true;
        } else {
          this.showButton = false;
        }
      },
      topFunction() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      }
    }
  };
  </script>

  <style scoped>
  
#return-to-top {
    position: fixed;
	z-index:3;
    bottom: 20px;
    left: calc(50% - 18px);
    background: var(--my-color);
    width: 35px;
    height: 35px;
    display: block;
    text-decoration: none;
    -webkit-border-radius: 35px;
    -moz-border-radius: 35px;
    border-radius: 35px;
    -webkit-transition: all 0.3s linear;
    -moz-transition: all 0.3s ease;
    -ms-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    transition: all 0.3s ease;
}
#return-to-top i {
    color: #fff;
    margin: 0;
    left: 0;
    top: 0;
    font-size: 19px;
    -webkit-transition: all 0.3s ease;
    -moz-transition: all 0.3s ease;
    -ms-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    transition: all 0.3s ease;
}
#return-to-top:hover {
    background: navy;
}
#return-to-top:hover i {
    color: #fff;
    top: -5px;
}
  </style>