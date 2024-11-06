<template>
    <!--Modal general para ver las preguntas del examen-->
    <div class="card flex justify-center">
        <Dialog v-model:visible="abrirModal" :header="headerModal" maximizable modal @hide="emit('ocultarInformeExamen')" :style="{ width: '80rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
            <DataTable v-if="estudiantes.length > 0" :value="estudiantes" size="small">
                <template #header>
                    <div class="flex flex-wrap items-center justify-between gap-2">
                        <span class="font-bold">Informe</span>
                    </div>
                </template>
                <Column field="nombre" header="Estudiante">
                    <template #body="slotProps">
                        {{ slotProps.data.nombre }}
                    </template>
                </Column>
                <Column field="fecha_presentacion" header="Fecha presentación">
                    <template #body="slotProps">
                        {{ slotProps.data.fecha_presentacion }}
                    </template>
                </Column>
                <Column field="estado" header="Estado">
                    <template #body="slotProps">
                        {{ slotProps.data.estado }}
                    </template>
                </Column>

                <Column field="puntaje" header="Nota">
                    <template #body="slotProps">
                        {{ slotProps.data.puntaje }}
                    </template>
                </Column>
                <!--<Column field="name" >
                    <template #body="slotProps"">
                        <Button icon="pi pi-trash" size="small" severity="danger" @click="confirmarEliminarAsignacion($event, slotProps.data.examenId, slotProps.data.gradoId )"/>
                    </template>
                </Column>-->

            </DataTable>
            <Message v-if="estudiantes.length < 1 && !cargandoGeneral2" severity="warn" class="my-2">Sin informe</Message>
            <Cargando2 v-if="cargandoGeneral2" />
            <div class="flex justify-end gap-2">
                <Button type="button" label="Cancelar" class="my-2" severity="secondary" @click="emit('ocultarInformeExamen')"></Button>
            </div>
        </Dialog>
    </div>

    <Cargando v-if="cargandoGeneral" />
</template>

<script setup>
import store from '@/store';
import { URL, validarToken } from '@/utils';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import Cargando from './Cargando.vue';

const emit = defineEmits(['ocultarInformeExamen']);
const props = defineProps({
    verModal: {
        type: Boolean
    },
    examen: {
        type: Object
    }
});

const headerModal = ref('Informe: ' + props.examen.titulo);
const userData1 = store.getters['auth/getUser'];
const isAuthenticated1 = store.getters['auth/isAuthenticated'];

const abrirModal = ref(props.verModal);
const cargandoGeneral = ref(false);
const cargandoGeneral2 = ref(false);
const estudiantes = ref([]);

onMounted(() => {
    // Validar el token
    validarToken(userData1);
    consultarInforme();
});

const consultarInforme = async () => {
    // Obtener el token Bearer
    const token = userData1.access_token;

    try {
        const response = await axios.get(URL + `examen-informe-estudiantes/${props.examen.code}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Agregar el Bearer token
                Accept: 'application/json', // Tipo de respuesta aceptada
                'Content-Type': 'application/json' // Tipo de contenido
            }
        });

       estudiantes.value = response.data.estudiantes,

        console.log('Datos informe: ', response);
    } catch (err) {
        console.log('Error al obtener datos de informe: ', err); // Manejo de errores
    }
};
</script>
