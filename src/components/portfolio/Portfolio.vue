<template>
  <div class="vg-page page-portfolio" id="portfolio">
    <div class="container">
      <div class="text-center wow fadeInUp">
        <div class="badge badge-subhead">Portfolio</div>
      </div>
      <h1 class="text-center fw-normal wow fadeInUp">Mis Trabajos</h1>
      <div class="filterable-button py-3 wow fadeInUp" data-toggle="selected">
        <button :class="`btn btn-theme-outline ${currentCategory === '*' ? 'selected' : ''}`" data-filter="*" @click="setCategory('*')">Todos</button>

        <template v-if="categorias">
          <button v-for="(categoria, index) in categorias" :key="index" class="btn btn-theme-outline" @click="setCategory(categoria)">{{ categoria }}</button>
        </template>

      </div>
      <template v-if="portfolio">
        <div class="gridder my-3" id="galleryID">
          <template v-for="value in portfolio">
            <div v-if="currentCategory === '*' || currentCategory === value.categoria" class="grid-item" :key="value.id">
              <a class="img-place" :href="value.imagen" :data-pswp-width="value.width" :data-pswp-height="value.height" >
                <img loading="lazy" :src="value.mini" :alt="value.titulo">
              </a>
              <div class="img-caption portfolio-caption">
                <h5 class="text-white">{{ value.titulo }}</h5>
                <p v-html="value.descripcion.replace(/\n/g, '<br>')"></p>
              </div>
            </div>
          </template>
        </div> <!-- End gridder -->
      </template>

    </div>
  </div> <!-- End Portfolio page -->
</template>

<script>
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';
export default {
    props:{
      id:{
        type: Number,
        required: true
      }
    },
    data: () => ({
      currentCategory: '*',
      lightbox: null,
      categorias: [],
      portfolio: [],
    }),
    methods: {
      setCategory(categoria){
        this.currentCategory = categoria;
      },
    },
    async created() {
      const fetchCat = await fetch(`https://manejoweb.com.ar/api.php?get_categorias=${this.id}`);
      this.categorias = await fetchCat.json();
      const fetchPortfolio = await fetch(`https://manejoweb.com.ar/api.php?get_portfolio=${this.id}`);
      this.portfolio = await fetchPortfolio.json();
    },
    mounted() {

      if (!this.lightbox) {
        this.lightbox = new PhotoSwipeLightbox({
          gallery: '#galleryID',
          children: 'a',
          mouseMovePan: true,
          showHideAnimationType: 'zoom',
          initialZoomLevel: 'fit',
          secondaryZoomLevel: 1.5,
          maxZoomLevel: 1,

          imageClickAction: 'close',
          tapAction: 'close',

          pswpModule: () => import('photoswipe')
          
        });

        this.lightbox.init();
      }
    },
    unmounted() {
      if (this.lightbox) {
        this.lightbox.destroy();
        this.lightbox = null;
      }
    },
};
</script>
<style scoped>
.portfolio-caption {
  position:relative !important;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: var(--theme-red) !important;
}


</style>