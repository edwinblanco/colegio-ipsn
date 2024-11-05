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
                            <div class="flex justify-center align-center flex-wrap">
                                <div v-for="(imagen, index) in pregunta.imagenes" :key="imagen.id" class="m-2">
                                    <!-- Agregar margenes -->
                                    <Image :src="DOMINIO + imagen.url" alt="Image" width="450" preview />
                                </div>
                            </div>
                            <div>
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div v-for="opcion in pregunta.opciones" :key="opcion.id" class="col-span-1">
                                        <div class="flex items-center">
                                            <RadioButton v-model="respuestaSeleccionada" :inputId="'opcion' + opcion.id" name="opciones" :value="opcion.id" />
                                            <label :for="'opcion' + opcion.id" class="ml-2">{{ opcion.contenido }} {{ opcion.id }} </label>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex justify-between mt-4">
                                    <Button icon="pi pi-chevron-left" outlined @click="preguntaAnterior" :disabled="currentPreguntaIndex === 0"></Button>
                                    <Button label="Guardar respuesta" severity="info" size="small" outlined @click="guardarRespuestaConValidacion" :disabled="!respuestaSeleccionada"></Button>
                                    <Button icon="pi pi-chevron-right" outlined @click="siguientePregunta" v-if="!(currentPreguntaIndexTotal === currentPreguntaIndex)"></Button>
                                </div>
                            </div>
                        </div>
                        <Cargando2 v-if="cargandoPregunta"></Cargando2>
                    </div>
                    <div class="md:col-span-2 border">
                        <div class="flex flex-wrap gap-2">
                            <div v-for="(pregunta, index) in preguntas" :key="pregunta.id">
                                <Button v-if="pregunta.tiene_respuesta" :label="String(index + 1)" size="small" @click="obtenerPreguntaIndex(index)" :class="['m-1', { 'font-bold underline': index === currentPreguntaIndex }]" />
                                <Button v-else :label="String(index + 1)" size="small" outlined @click="obtenerPreguntaIndex(index)" :class="['m-1', { 'font-bold underline': index === currentPreguntaIndex }]" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex justify-end gap-2">
                <ConfirmPopup></ConfirmPopup>
                <Button type="button" label="Cancelar" class="my-2" severity="secondary" @click="emit('ocultarModalAsignarExamenGrado')"></Button>
                <Button type="button" label="Enviar todo y terminar" severity="contrast" :disabled="!habilitarTerminarTodo" class="my-2" @click="confirmarEnviarTodo"></Button>
            </div>
        </Dialog>
    </div>
    <Cargando v-if="cargandoGeneral" />
</template>

<script setup>
import store from '@/store';
import { DOMINIO, URL, validarToken } from '@/utils';
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
    iniciarExamen();
    obtenerPregunta();
    consultarPreguntas();
});

const iniciarExamen = async () => {
    // Obtener el token Bearer
    const token = userData1.access_token;

    try {
        const response = await axios.get(URL + `iniciar-examen/${props.examen.code}/${userData1.user.id}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Agregar el Bearer token
                Accept: 'application/json', // Tipo de respuesta aceptada
                'Content-Type': 'application/json' // Tipo de contenido
            }
        });

        console.log('Inicio de examen: ', response);
    } catch (err) {
        const errorMessage = err?.response?.data?.msg || 'Error desconocido'; // Mensaje por defecto
        toast.add({ severity: 'error', summary: 'Error', detail: `Error: ${errorMessage}`, life: 10000 });
        emit('ocultarModalAsignarExamenGrado');
        console.log('Error al obtener datos de inicio de examen: ', err); // Manejo de errores
    }
};

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

const obtenerPreguntaIndex = (index) => {
    currentPreguntaIndex.value = index;
    obtenerPregunta();
};

const obtenerPregunta = async () => {
    const token = userData1.access_token;
    cargandoPregunta.value = true;
    pregunta.value = false;
    respuestaSeleccionada.value = null;
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
};

const preguntaAnterior = () => {
    if (currentPreguntaIndex.value > 0) {
        guardarRespuesta(); // Guarda la respuesta de la pregunta actual
        currentPreguntaIndex.value--; // Retrocede a la pregunta anterior
        respuestaSeleccionada.value = null; // Reinicia la selección
    }
};

// Cuando se da click en boton de guardar pregunta
const guardarRespuestaConValidacion = () => {
    const respuesta_id = respuestaSeleccionada.value;

    console.log('res: ', respuestaSeleccionada.value);

    if (!respuesta_id) {
        toast.add({ severity: 'warning', summary: 'Campos sin diligenciar', detail: `Por favor completa todos los campos antes de enviar.`, life: 6000 });
        return;
    } else {
        guardarRespuesta();
    }
};

// Cuando se da click en los botones de navegación del examen
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
        obtenerPregunta();
        habilitarTerminarTodo.value = response.data.examen_completado;
    } catch (error) {
        console.error('Error al guardar la respuesta:', error);
        cargandoPregunta.value = false;
    }
};

const confirmarEnviarTodo = (event) => {
    confirm.require({
        target: event.currentTarget,
        message: '¿Enviar todo y terminar?',
        icon: 'pi pi-exclamation-triangle',
        rejectProps: {
            label: 'Cancelar',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: 'Enviar y terminar'
        },
        accept: () => {
            enviarTodo();
        },
        reject: () => {}
    });
};

const enviarTodo = async () => {
    const token = userData1.access_token;
    cargandoGeneral.value = true;

    try {
        const response = await axios.post(
            URL + 'enviar-y-terminar/' + props.examen.code,
            {}, // Este es el cuerpo de la solicitud, si no necesitas enviar datos, puedes dejarlo vacío
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
        );

        console.log('Enviar todo: ', response);
        cargandoGeneral.value = false;
        toast.add({ severity: 'success', summary: 'Examen terminado', detail: `Examen terminado y enviado`, life: 10000 });
        emit('ocultarModalAsignarExamenGrado');
    } catch (error) {
        const errorMessage = error?.response?.data?.msg || 'Error desconocido'; // Mensaje por defecto
        toast.add({ severity: 'error', summary: 'Error', detail: `Error: ${errorMessage}`, life: 10000 });
        cargandoGeneral.value = false;
        console.error('Error enviar todo:', error);
    }
};
</script>
