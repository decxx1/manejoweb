<template>
    <section class="pricing-table">
        <div class="container">
            <div class="title text-center" data-aos="fade-up" data-aos-delay="200" data-aos-duration="800">
                <h6 class="title-primary" id="precios">Nuestras promos</h6>
                <h3 class="title-blue">Lista de precios</h3>
            </div>
            <template v-if="planes">
                <div class="row no-gutters">
                    <template v-for="plan in planes" :key="plan.id" >
                        <div class="col-md-4">
                            <div class="single-pricing text-center" data-aos="fade-up" data-aos-delay="0"
                                data-aos-duration="600">
                                <span>{{plan.pago}}</span>
                                <h2>{{plan.titulo}}</h2>
                                <p class="desc">{{plan.subtitulo}}</p>
                                <p class="price">{{plan.precio}}</p>
                                <template v-for="(detalle,index) in plan.detalles" :key="index">
                                    <p><i class="fa fa-check-circle"></i> {{ detalle }}</p>
                                </template>
                                <a href="#contact" class="btn btn-primary">Contratar</a>
                                <svg viewBox="0 0 170 193">
                                    <path fill-rule="evenodd" :fill="color"
                                        d="M39.000,31.999 C39.000,31.999 -21.000,86.500 9.000,121.999 C39.000,157.500 91.000,128.500 104.000,160.999 C117.000,193.500 141.000,201.000 150.000,183.000 C159.000,165.000 172.000,99.000 167.000,87.000 C162.000,75.000 170.000,63.000 152.000,45.000 C134.000,27.000 128.000,15.999 116.000,11.000 C104.000,6.000 89.000,-0.001 89.000,-0.001 L39.000,31.999 Z" />
                                </svg>
                            </div>
                        </div>
                    </template>
                </div>
            </template>
        </div>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                planes:[] 
            }
        },
        props:{
            url: {
                type: String,
                required: true
            },
            color: {
                type: String,
                required: true
            }
        },
        async created() {
            // const isProd = import.meta.env.PROD;
            // if (isProd) {
                const response = await fetch(this.url );
                this.planes = await response.json();
            // }else{
            //     this.planes = [{
            //         titulo:"Sitio web",
            //         subtitulo:"Normal",
            //         precio: "$20.000",
            //         pago:"Pago único",
            //         tipo:"pw",
            //         detalles_s:{0:"1 año",1:"Diseño personalizado",2:"Temática del cliente",3:"Personalización completa",4:"Dominio",5:"Certificado SSL",6:"Ancho de banda sin medición"}
            //     }]
            // }
        },
    }
</script>

<style>

</style>