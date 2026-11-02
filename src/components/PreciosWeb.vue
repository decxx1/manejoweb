<template>
    <section class="recent-posts">
        <div class="container text-center">
            <div class="title">
                <h2 id="precios" class="title-blue"  data-aos="fade-down" data-aos-duration="800">Precios</h2>
            </div>
            <div class="container" data-aos="fade-up" data-aos-duration="800">
                <p>Los presupuestos pueden variar, si nos contacta, también podemos hacer un presupuesto personalizado para usted. </p>
            </div>
        </div>
	
        <template v-if="planes">
            <div class="containersito">
                <template v-for="plan in planes" :key="plan.id" >
                    <div class="column" data-aos="fade-right" data-aos-delay="400" data-aos-duration="800">
                        <div class="header">
                            <i class="fas fa-globe"></i>
                            <h2><span>{{ plan.titulo }}</span><br/>{{ plan.subtitulo }}</h2>
                        </div>

                        <div class="money">
                            <h4><span>{{ plan.precio }}</span></h4>
                            <h6>{{ plan.pago }}</h6>
                        </div>

                        <div class="feature">
                            <ul>
                                <template v-for="(detalle, index) in plan.detalles" :key="index">
                                    <li><i class="fa fa-check-circle"></i>{{ detalle }}</li>
                                </template>
                            </ul>
                        </div>

                        <div class="bu">
                            <a href="#contact" >Contratar<span></span></a>
                        </div>
                    </div>
                </template>
            </div>
        </template>
	</section>
</template>

<script>
    import { fetchPlanes } from '../lib/cms.js'

    export default {
        data() {
            return {
                planes:[] 
            }
        },
        async created() {
            try {
                this.planes = await fetchPlanes('paginas-web')
            } catch {
                this.planes = []
            }
        },
    }
</script>

<style>

</style>