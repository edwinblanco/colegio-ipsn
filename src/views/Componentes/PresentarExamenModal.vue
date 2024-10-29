<template>
    <!-- Modal general para ver las preguntas del examen -->
    <div class="card flex justify-center">
        <Dialog v-model:visible="abrirModal" :header="headerModal" maximizable modal @hide="emit('ocultarModalAsignarExamenGrado')" :style="{ width: '80rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
            <div class="flex flex-col gap-12">
                <div class="grid grid-cols-12 gap-4">
                    <div class="col-span-10 border">
                        <div v-if="pregunta">
                            <h2>{{ pregunta.contenido }}</h2>
                            <div v-for="opcion in pregunta.opciones" :key="opcion.id">
                                <label>
                                    <input type="radio" :value="opcion.id" v-model="respuestaSeleccionada" />
                                    {{ opcion.contenido }}
                                </label>
                            </div>
                            <div class="flex justify-between mt-4">
                                <button @click="preguntaAnterior" :disabled="currentPreguntaIndex === 0">Anterior</button>
                                <button @click="siguientePregunta">Siguiente</button>
                            </div>
                        </div>
                        <div v-else>
                            <p>Cargando pregunta...</p>
                        </div>
                    </div>
                    <div class="col-span-2 border"></div>
                </div>
            </div>
            <div class="flex justify-end gap-2">
                <Button type="button" label="Cancelar" class="my-2" severity="secondary" @click="emit('ocultarModalAsignarExamenGrado')"></Button>
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

const confirm = useConfirm();
const toast = useToast();
const emit = defineEmits(['ocultarModalAsignarExamenGrado']);
const props = defineProps({
    verModal: {
        type: Boolean,
        required: true,
    },
    examen: {
        type: Object,
        required: true,
    }
});

const headerModal = ref('Presentado examen: ' + props.examen.titulo);
const userData1 = store.getters['auth/getUser'];
const isAuthenticated1 = store.getters['auth/isAuthenticated'];

const abrirModal = ref(props.verModal);
const cargandoGeneral = ref(false);
const pregunta = ref(null); // Para almacenar la pregunta actual
const currentPreguntaIndex = ref(0); // Índice de la pregunta actual
const respuestaSeleccionada = ref(null); // Opción seleccionada por el estudiante

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
        const response = await axios.get(URL + `obtener-examen-preguntas-opciones/${props.examen.code}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Agregar el Bearer token
                Accept: 'application/json', // Tipo de respuesta aceptada
                'Content-Type': 'application/json' // Tipo de contenido
            }
        });

        let gradosList = [];

        console.log('preguntas: ', response);

        /*if (response.data.data.length) {
            response.data.data.map((num, index) => {
                let grado = { name: num.grado + '-' + num.salon + '°', code: num.id };
                gradosList.push(grado);
            });

            grados.value = gradosList;

            //ocultar el spinner de carga de las preguntas
            cargandoGrados.value = false;
        } else {
            //ocultar el spinner de carga de las preguntas
            cargandoGrados.value = false;
        }*/
    } catch (err) {
        console.log('Error al obtener datos de grados: ' + err.message); // Manejo de errores
    }
};

const obtenerPregunta = async () => {
    const token = userData1.access_token;

    try {
        const response = await axios.get(URL + `obtener-pregunta/${props.examen.code}/${currentPreguntaIndex.value}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });

        console.log('pregunta sola: ', response.data.data);
        pregunta.value = response.data.data; // Almacena la pregunta obtenida
    } catch (error) {
        console.error('Error al obtener la pregunta:', error);
    }
};

const siguientePregunta = () => {
    if (respuestaSeleccionada.value !== null) {
        guardarRespuesta(); // Guarda la respuesta de la pregunta actual

        // Avanza a la siguiente pregunta
        currentPreguntaIndex.value++;
        respuestaSeleccionada.value = null; // Reinicia la selección
        obtenerPregunta(); // Carga la siguiente pregunta
    } else {
        alert('Por favor selecciona una respuesta.');
    }
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

    try {
        await axios.post(
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

        console.log('Respuesta guardada');
    } catch (error) {
        console.error('Error al guardar la respuesta:', error);
    }
};
</script>

