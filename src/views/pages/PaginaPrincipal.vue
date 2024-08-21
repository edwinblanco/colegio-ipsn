<script setup>
import Academia from './LandingPages/Academia.vue';
import Adminisiones from './LandingPages/Adminisiones.vue';
import Alumnos from './LandingPages/Alumnos.vue';
import Biblioteca from './LandingPages/Biblioteca.vue';
import Blog from './LandingPages/Blog.vue';
import Contacto from './LandingPages/Contacto.vue';
import Footer from './LandingPages/Footer.vue';
import Galeria from './LandingPages/Galeria.vue';
import NoticiasEventos from './LandingPages/NoticiasEventos.vue';
import Padres from './LandingPages/Padres.vue';
import RedesSociales from './LandingPages/RedesSociales.vue';
import Separador from './LandingPages/Separador.vue';
import SobreNosotros from './LandingPages/SobreNosotros.vue';
import Inicio from './LandingPages/Inicio.vue';
import BotonVolverInicio from './BotonVolverInicio.vue';
import MenuNavegacion from './LandingPages/MenuNavegacion.vue';
</script>

<template>
    <div class="bg-surface-0 dark:bg-surface-900">
        <div id="home" class="landing-wrapper overflow-hidden">

            <!-- Menu de navegacion -->
            <MenuNavegacion></MenuNavegacion>

            <!--Redes sociales-->
            <RedesSociales></RedesSociales>

            <!--Inicio-->
            <!--<Inicio></Inicio>-->

            <!--Contacto-->
            <!--<Contacto></Contacto>-->

            <!--Separador-->
            <Separador></Separador>

            <router-view></router-view>

            <!--<SobreNosotros></SobreNosotros>
            <Adminisiones></Adminisiones>
            <Academia></Academia>
            <NoticiasEventos></NoticiasEventos>
            <Galeria></Galeria>
            <Blog></Blog>
            <Biblioteca></Biblioteca>
            <Alumnos></Alumnos>
            <Padres></Padres>-->

            <Footer></Footer>
        </div>
    </div>

    <BotonVolverInicio></BotonVolverInicio>

</template>

<style scoped>
</style>
