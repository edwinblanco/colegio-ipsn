<script setup>
import { DOMINIO, URL } from '@/utils';
import Cargando2 from '@/views/Componentes/Cargando2.vue';
import axios from 'axios';
import { onMounted, ref } from 'vue';

const noticias = ref(null);
const eventos = ref(null);
const anuncios = ref(null);
const verCargando = ref(false);

onMounted(() => {
    consultarAnuncios();
});

// Función para consultar las imágenes principales
const consultarAnuncios = async () => {
    try {
        verCargando.value = true;

        const response = await axios.get(URL + 'anuncios', {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });

        console.log('imagenes: ', response);
        noticias.value = response.data.data_noticias;
        eventos.value = response.data.data_eventos;
        anuncios.value = response.data.data_anuncios;
        verCargando.value = false;
    } catch (err) {
        console.error(err);
        verCargando.value = false;
    }
};
</script>

<template>
    <div v-if="noticias" id="noticias-recientes" class="relative flex flex-col items-center text-center px-3 lg:px-2 py-12 bg-gray-100">
        <div class="w-full lg:w-3/4">
            <h2 class="text-5xl font-bold text-green-800 leading-tight mb-12">Noticias Recientes del Colegio</h2>
            <!-- La clase grid se aplica aquí -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div v-for="(noticia, index) in noticias" :key="index" class="relative bg-white p-6 rounded-lg shadow-lg overflow-hidden group">
                    <Image :src="DOMINIO + noticia.url_imagen" alt="Image" width="600" preview class="group-hover:scale-105 transition-transform duration-300" />
                    <h4 class="text-3xl font-bold text-green-600 mb-4">{{ noticia.titulo }}</h4>
                    <p class="leading-normal text-green-600 mb-4">{{ noticia.descripcion }}</p>
                    <p>
                        Publicado: <b>{{ noticia.fecha_publicacion }}</b>
                    </p>
                </div>
            </div>
        </div>
    </div>

    <div v-if="eventos" id="proximos-eventos" class="relative flex flex-col items-center text-center px-6 lg:px-20 py-12 bg-gray-50">
        <div class="w-full lg:w-3/4">
            <h2 class="text-5xl font-bold text-green-800 leading-tight mb-12">Próximos Eventos</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div v-for="(evento, index) in eventos" :key="index" class="relative bg-white p-6 rounded-lg shadow-lg overflow-hidden group">
                    <Image :src="DOMINIO + evento.url_imagen" alt="Image" width="600" preview class="group-hover:scale-105 transition-transform duration-300" />
                    <h4 class="text-3xl font-bold text-green-600 mb-4">{{ evento.titulo }}</h4>
                    <p class="leading-normal text-green-600 mb-4">{{ evento.descripcion }}</p>
                    <p>
                        Publicado: <b>{{ evento.fecha_publicacion }}</b>
                    </p>
                </div>
            </div>
        </div>
    </div>

    <div v-if="anuncios" id="anuncios-importantes" class="relative flex flex-col items-center text-center px-6 lg:px-20 py-12 bg-gray-100">
        <div class="w-full lg:w-3/4">
            <h2 class="text-5xl font-bold text-green-800 leading-tight mb-12">Anuncios Importantes</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div v-for="(anuncio, index) in anuncios" :key="index" class="relative bg-white p-6 rounded-lg shadow-lg overflow-hidden group">
                    <Image :src="DOMINIO + anuncio.url_imagen" alt="Image" width="600" preview class="group-hover:scale-105 transition-transform duration-300" />
                    <h4 class="text-3xl font-bold text-green-600 mb-4">{{ anuncio.titulo }}</h4>
                    <p class="leading-normal text-green-600 mb-4">{{ anuncio.descripcion }}</p>
                    <p>
                        Publicado: <b>{{ anuncio.fecha_publicacion }}</b>
                    </p>
                </div>
            </div>
        </div>
    </div>

    <Cargando2 v-if="verCargando" class="mt-10"> </Cargando2>
</template>

<style scoped></style>
