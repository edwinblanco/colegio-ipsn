<template>
    <!-- Modal general para ver las preguntas del examen -->
    <div class="card flex justify-center">
        <Dialog v-model:visible="abrirModal" :header="headerModal" maximizable modal @hide="emit('ocultarModalAsignarExamenGrado')" :style="{ width: '80rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
            <div class="flex flex-col gap-12">
                <div class="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div class="md:col-span-10 p-4">
                        <div v-if="pregunta && !cargandoPregunta">
                            <h2 class="my-2">
                                <b>{{ pregunta.contenido }}</b>
                            </h2>
                            <div>
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div v-for="opcion in pregunta.opciones" :key="opcion.id" class="col-span-1">
                                        <div class="flex items-center">
                                            <RadioButton v-model="respuestaSeleccionada" :inputId="'opcion' + opcion.id" name="opciones" :value="opcion.id" />
                                            <label :for="'opcion' + opcion.id" class="ml-2">{{ opcion.contenido }}</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex justify-between mt-4">
                                    <Button icon="pi pi-chevron-left" outlined @click="preguntaAnterior" :disabled="currentPreguntaIndex === 0"></Button>
                                    <Button icon="pi pi-chevron-right" outlined @click="siguientePregunta" v-if="!(currentPreguntaIndexTotal === currentPreguntaIndex)"></Button>
                                </div>
                            </div>
                        </div>
                        <Cargando2 v-if="cargandoPregunta"></Cargando2>
                    </div>
                    <div class="md:col-span-2 border">
                        <div class="flex flex-wrap gap-2">
                            <div v-for="(pregunta, index) in preguntas" :key="pregunta.id">
                                <Button v-if="pregunta.tiene_respuesta" :label="String(index + 1)" size="small" class="m-1" />
                                <Button v-else :label="String(index + 1)" size="small" outlined class="m-1" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex justify-end gap-2">
                <Button type="button" label="Cancelar" class="my-2" severity="secondary" @click="emit('ocultarModalAsignarExamenGrado')"></Button>
                <Button type="button" label="Enviar todo y terminar" severity="contrast" :disabled="!habilitarTerminarTodo" class="my-2" @click=""></Button>
            </div>
        </Dialog>
    </div>
    <Cargando v-if="cargandoGeneral" />
</template>

<script setup>
import store from '@/store';
import { URL, validarToken } from '@/utils';
import axios from 'axios';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref } from 'vue';
import Cargando from './Cargando.vue';
import Cargando2 from './Cargando2.vue';

const confirm = useConfirm();
const toast = useToast();
const emit = defineEmits(['ocultarModalAsignarExamenGrado']);
const props = defineProps({
    verModal: {
        type: Boolean,
        required: true
    },
    examen: {
        type: Object,
        required: true
    }
});

const headerModal = ref('Presentado examen: ' + props.examen.titulo);
const userData1 = store.getters['auth/getUser'];
const isAuthenticated1 = store.getters['auth/isAuthenticated'];

const abrirModal = ref(props.verModal);
const cargandoGeneral = ref(false);
const pregunta = ref(null); // Para almacenar la pregunta actual
const preguntas = ref(null);
const currentPreguntaIndex = ref(0); // Índice de la pregunta actual
const respuestaSeleccionada = ref(null); // Opción seleccionada por el estudiante
const cargandoPregunta = ref(false);
const currentPreguntaIndexTotal = ref(null);
const habilitarTerminarTodo = ref(false);

onMounted(() => {
    // Validar el token
    validarToken(userData1);
    obtenerPregunta();
    consultarPreguntas();
});

const consultarPreguntas = async () => {
    // Obtener el token Bearer
    const token = userData1.access_token;

    try {
        const response = await axios.get(URL + `obtener-examen-preguntas/${props.examen.code}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Agregar el Bearer token
                Accept: 'application/json', // Tipo de respuesta aceptada
                'Content-Type': 'application/json' // Tipo de contenido
            }
        });

        console.log('preguntas: ', response);

        currentPreguntaIndexTotal.value = response.data.data.preguntas.length - 1;
        preguntas.value = response.data.data.preguntas;
    } catch (err) {
        console.log('Error al obtener datos de preguntas: ' + err.message); // Manejo de errores
    }
};

const obtenerPregunta = async () => {
    const token = userData1.access_token;
    cargandoPregunta.value = true;
    pregunta.value = false;

    try {
        const response = await axios.get(URL + `obtener-pregunta/${props.examen.code}/${currentPreguntaIndex.value}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });

        console.log('pregunta sola: ', response.data);
        pregunta.value = response.data.data;
        habilitarTerminarTodo.value = response.data.examen_completado;
        if (response.data.resp) {
            respuestaSeleccionada.value = response.data.resp.respuesta_id;
        }
        cargandoPregunta.value = false;
    } catch (error) {
        console.error('Error al obtener la pregunta:', error);
        cargandoPregunta.value = false;
    }
};

const siguientePregunta = () => {
    guardarRespuesta(); // Guarda la respuesta de la pregunta actual

    // Avanza a la siguiente pregunta
    currentPreguntaIndex.value++;
    respuestaSeleccionada.value = null; // Reinicia la selección
    obtenerPregunta(); // Carga la siguiente pregunta
};

const preguntaAnterior = () => {
    if (currentPreguntaIndex.value > 0) {
        guardarRespuesta(); // Guarda la respuesta de la pregunta actual
        currentPreguntaIndex.value--; // Retrocede a la pregunta anterior
        respuestaSeleccionada.value = null; // Reinicia la selección
        obtenerPregunta(); // Carga la pregunta anterior
    }
};

const guardarRespuesta = async () => {
    const token = userData1.access_token;
    cargandoPregunta.value = true;

    try {
        const response = await axios.post(
            URL + 'guardar-respuesta',
            {
                pregunta_id: pregunta.value.id,
                examen_id: props.examen.code,
                respuesta_id: respuestaSeleccionada.value
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
        );

        console.log('Respuesta guardada: ', response);
        consultarPreguntas();
        habilitarTerminarTodo.value = response.data.examen_completado;
    } catch (error) {
        console.error('Error al guardar la respuesta:', error);
        cargandoPregunta.value = false;
    }
};
</script>
