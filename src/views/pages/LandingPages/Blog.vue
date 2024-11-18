<script setup>
import { DOMINIO, URL } from '@/utils';
import Cargando2 from '@/views/Componentes/Cargando2.vue';
import axios from 'axios';
import { onMounted, onUnmounted, ref } from 'vue';

const libros = ref(null);
const articulos = ref(null);
const verCargando = ref(false);

onMounted(() => {
    consultarArticulos();
});

// Función para consultar las imágenes principales
const consultarArticulos = async () => {
    try {
        verCargando.value = true;

        const response = await axios.get(URL + 'articulos', {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });

        console.log('articulos: ', response);
        libros.value = response.data.data_libros;
        articulos.value = response.data.data_articulos;

        verCargando.value = false;
    } catch (err) {
        console.error(err);
        verCargando.value = false;
    }
};
</script>

<template>
    <div id="articulos-educativos" class="relative flex flex-col items-center text-center px-6 lg:px-20 py-12 bg-gray-100">
        <div v-if="!verCargando" class="w-full lg:w-3/4">
            <h2 class="text-5xl font-bold text-green-800 leading-tight mb-12">Artículos sobre Temas Educativos</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- Tarjeta de Artículo 1 -->
                <div v-for="(articulo, index) in articulos" :key="index" class="group relative overflow-hidden rounded-lg shadow-lg bg-white">
                    <Image :src="DOMINIO + articulo.url_imagen" alt="Image" width="600" preview class="group-hover:scale-105 transition-transform duration-300" />
                    <div class="p-6">
                        <h4 class="font-bold text-green-600 mb-4">{{ articulo.titulo }}</h4>
                        <p class=" leading-normal text-green-600 mb-4">{{ articulo.descripcion }}</p>
                        <p>Publicado: <b>{{ articulo.fecha_publicacion }}</b></p>
                        <a :href="DOMINIO + articulo.url_archivo" target="_blank" class="text-lg font-semibold text-green-800 hover:text-green-600">Descargar archivo</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="contribuciones" class="relative flex flex-col items-center text-center px-6 lg:px-20 py-12 bg-gray-100">
        <div v-if="!verCargando" class="w-full lg:w-3/4">
            <h2 class="text-5xl font-bold text-green-800 leading-tight mb-12">Libros</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- Tarjeta de Contribución 1 -->
                <div v-for="(libro, index) in libros" :key="libros"  class="group relative overflow-hidden rounded-lg shadow-lg bg-white">
                    <Image :src="DOMINIO + libro.url_imagen" alt="Image" width="600" preview class="group-hover:scale-105 transition-transform duration-300" />
                    <div class="p-6">
                        <h3 class="font-bold text-green-600 mb-4">{{ libro.titulo }}</h3>
                        <p class="leading-normal text-green-600 mb-4">{{ libro.descripcion  }}</p>
                        <p>Publicado: <b>{{ libro.fecha_publicacion }}</b></p>
                        <a :href="DOMINIO + libro.url_archivo" target="_blank" class="text-lg font-semibold text-green-800 hover:text-green-600">Descargar archivo</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <Cargando2 v-if="verCargando" class="mt-10"> </Cargando2>
</template>

<style></style>
