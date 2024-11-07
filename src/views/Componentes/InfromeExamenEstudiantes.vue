<template>
    <!--Modal general para ver las preguntas del examen-->
    <div class="card flex justify-center">
        <Dialog v-model:visible="abrirModal" header="Informe" maximizable modal @hide="emit('ocultarInformeExamen')" :style="{ width: '80rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
            <div class="bg-white shadow-md rounded-lg px-2 mb-4 mx-auto grid grid-cols-3 gap-4 border">
                <div class="col-span-1">
                    <span class="font-semibold text-gray-700">Título:</span>
                    <div class="text-gray-600">{{ props.examen.titulo }}</div>
                </div>

                <div class="col-span-1">
                    <span class="font-semibold text-gray-700">Descripción:</span>
                    <div class="text-gray-600">{{ props.examen.descripcion }}</div>
                </div>

                <div class="col-span-1">
                    <span class="font-semibold text-gray-700">Fecha Límite:</span>
                    <div class="text-gray-600">{{ props.examen.fecha_limite }}</div>
                </div>
            </div>

            <DataTable v-if="estudiantes.length > 0" :value="estudiantes" size="small" class="bg-white shadow-md border">
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
                <Column field="estado_entrega" header="Estado entrega">
                    <template #body="slotProps">
                        {{ slotProps.data.estado_entrega }}
                    </template>
                </Column>
                <Column field="estado_entrega" header="Tiempo de Entrega">
                    <template #body="slotProps">
                        <Tag
                            v-if="slotProps.data.estado_entrega == 'A tiempo' && slotProps.data.estado == 'completado'"
                            severity="success"
                            :value="'Entregado: ' + slotProps.data.diferencia_fecha.dias + ' días ' + slotProps.data.diferencia_fecha.horas + ' horas ' + slotProps.data.diferencia_fecha.minutos + ' minutos antes'"
                        ></Tag>
                        <Tag
                            v-if="slotProps.data.estado_entrega == 'Con retraso' && slotProps.data.estado == 'completado'"
                            severity="danger"
                            :value="'Entregado: ' + slotProps.data.diferencia_fecha.dias * -1 + ' días ' + slotProps.data.diferencia_fecha.horas + ' horas ' + slotProps.data.diferencia_fecha.minutos + ' minutos despúes'"
                        ></Tag>
                    </template>
                </Column>
                <Column field="estado" header="Estado presentación">
                    <template #body="slotProps">
                        {{ slotProps.data.estado }}
                    </template>
                </Column>
                <Column field="puntaje" header="Nota">
                    <template #body="slotProps">
                        {{ slotProps.data.puntaje }}
                    </template>
                </Column>
                <Column field="puntaje" header="">
                    <template #body="slotProps">
                        <Tag v-if="slotProps.data.puntaje >= 60" severity="success" value="Aprobó"></Tag>
                        <Tag v-if="slotProps.data.puntaje < 60 && slotProps.data.estado == 'completado'" severity="danger" value="Reprobó"></Tag>
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
</template>

<script setup>
import store from '@/store';
import { URL, validarToken } from '@/utils';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import Cargando2 from './Cargando2.vue';

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
    cargandoGeneral2.value = true;

    try {
        const response = await axios.get(URL + `examen-informe-estudiantes/${props.examen.code}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Agregar el Bearer token
                Accept: 'application/json', // Tipo de respuesta aceptada
                'Content-Type': 'application/json' // Tipo de contenido
            }
        });

        (estudiantes.value = response.data.estudiantes), (cargandoGeneral2.value = false);

        console.log('Datos informe: ', response);
    } catch (err) {
        console.log('Error al obtener datos de informe: ', err); // Manejo de errores
        cargandoGeneral2.value = false;
    }
};
</script>
