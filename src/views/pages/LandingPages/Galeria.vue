<script setup>
import { DOMINIO, URL } from '@/utils';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import Cargando2 from '@/views/Componentes/Cargando2.vue';

const galeria = ref(null);
const verCargando = ref(false);

onMounted(() => {
    consultarGaleria();
});

// Función para consultar las imágenes principales
const consultarGaleria = async () => {
    try {
        verCargando.value = true;

        const response = await axios.get(URL + 'galeria', {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });

        console.log('galeria: ', response);
        galeria.value = response.data.data;
        verCargando.value = false;
    } catch (err) {
        console.error(err);
        verCargando.value = false;
    }
};

</script>

<template>
    <div id="fotos-eventos" class="relative flex flex-col items-center text-center px-6 lg:px-20 py-12 bg-gray-50">
      <div class="w-full lg:w-3/4">
        <h2 class="text-5xl font-bold text-green-800 leading-tight mb-12">Fotos de Eventos y Actividades</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="(imagen, index) in galeria" 
            :key="index"  
            class="group relative rounded-lg shadow-lg bg-white overflow-hidden"
          >
            <!-- Imagen principal con hover -->
            <Image 
              :src="DOMINIO + imagen.url_imagen" 
              :alt="imagen.titulo || 'Imagen de evento'" 
              width="600" 
              preview 
              class="group-hover:scale-105 transition-transform duration-300"
            />
            
            <!-- Descripción emergente en hover -->
            <div 
              class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <p class="text-white font-bold text-lg px-4">{{ imagen.titulo }}</p>
            </div>
            
            <!-- Descripción debajo de la imagen -->
            <div class="p-4">
                <p class="text-gray-700 text-sm text-center"><b>{{ imagen.tipo }}</b></p>
              <p class="text-gray-700 text-sm text-center">
                {{ imagen.descripcion || 'Descripción no disponible.' }}
              </p>
              <p class="text-gray-700 text-sm text-center">Publicado: <b>{{ imagen.fecha_publicacion }}</b></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Cargando2 v-if="verCargando" class="mt-10"> </Cargando2>
  </template>

<style scoped></style>
