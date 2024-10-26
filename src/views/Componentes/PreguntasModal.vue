<template>
    <!--Modal general para ver las preguntas del examen-->
    <div class="card flex justify-center">
        <Dialog v-model:visible="abrirModal" maximizable modal @hide="emit('ocultarModalPreguntas')" :style="{ width: '80rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
            <!-- Slot personalizado para el header con formato HTML -->
            <template #header>
                <div><b>Examen:</b> {{ props.examen.titulo }} -------- <b> Porcentaje aplicado: </b>{{ porcentaje_aplicado }}%</div>
            </template>

            <Cargando2 v-if="cargandoPreguntas" />

            <!--preguntas ya cargadas-->
            <Accordion v-if="preguntas && preguntas.length" class="mb-3 border">
                <AccordionPanel v-for="(pregunta, index) in preguntas" :key="pregunta.code" :value="String(pregunta.code)" class="shadow-lg">
                    <AccordionHeader
                        >Pregunta #{{ index + 1 }}
                        <Tag v-if="pregunta.opciones.length < 2" severity="danger" value="Pregunta incompleta"></Tag>
                        <Tag v-if="!pregunta.opciones.some((opcion) => opcion.correcta === 1)" severity="danger" value="Pregunta sin rta correcta"> </Tag>
                    </AccordionHeader>
                    <AccordionContent>
                        <h2 class="text-center"><b>Enunciado:</b></h2>
                        <p>{{ pregunta.name }}</p>
                        <p><b>Valor: </b>{{ pregunta.valor }}%</p>
                        <Button icon="pi pi-pencil" class="mx-1" severity="info" raised @click="editarPregunta(pregunta)" />
                        <Divider />
                        <div>
                            <p class="text-center"><b>Opciones:</b></p>
                            <Message v-if="!pregunta.opciones.length" severity="warn" class="my-5">Sin opciones asignadas</Message>
                            <div class="grid grid-cols-12 gap-4">
                                <div v-for="(opcion, index) in pregunta.opciones" :key="opcion.id" :value="opcion.id" class="col-span-6">
                                    <Card>
                                        <template #content>
                                            <p>
                                                <b>{{ index + 1 }}. </b> {{ opcion.contenido }} <Tag v-if="opcion.correcta" severity="success" value="Correcta"></Tag><br />
                                                <ConfirmPopup></ConfirmPopup>
                                                <Button icon="pi pi-pencil" aria-label="Edit" size="small" @click="editarOpcion(opcion)" />
                                                <Button class="mx-1" icon="pi pi-trash" size="small" severity="danger" @click="confirmarEliminacionOpcion($event, opcion.id)"></Button>
                                            </p>
                                        </template>
                                    </Card>
                                </div>
                            </div>
                        </div>
                        <Divider />
                        <ConfirmPopup></ConfirmPopup>
                        <Button label="Eliminar pregunta" severity="danger" raised class="my-2" @click="confirmarEliminacionPregunta($event, pregunta.code)" />
                        <Button label="Agregar opción" severity="primary" raised class="m-2" @click="mostrarModalCrearOpcionf(pregunta.code)" />
                    </AccordionContent>
                </AccordionPanel>
            </Accordion>

            <!--Cuando no hay preguntas en el examen-->
            <Message v-if="sinPreguntasAsignadas" severity="warn" class="my-5">Sin preguntas asignadas</Message>
            <Button type="button" label="Agregar pregunta" severity="info" @click="mostrarModalCrearPreguntaf"></Button>
        </Dialog>
    </div>

    <!--Modal para crear la cabecera de la pregunta-->
    <Dialog v-model:visible="verModalCrearPregunta" modal :header="headerEditarCrearPregunta" :style="{ width: '50rem' }">
        <!--formulario agregar pregunta-->
        <div class="flex flex-col gap-6">
            <div class="grid grid-cols-12 gap-4">
                <div class="col-span-10">
                    <label for="name" class="block font-bold mb-3">Enunciado</label>
                    <Textarea id="descripcion" v-model="enunciado" required="true" rows="3" cols="20" fluid />
                    <small v-if="!enunciado" class="text-red-500">Debe escribir el enunciado de la pregunta</small>
                </div>
                <div class="col-span-2">
                    <label for="name" class="block font-bold mb-3">% valor</label>
                    <InputNumber v-model="valor" inputId="minmax" :min="0" :max="100" fluid />
                    <small v-if="!valor" class="text-red-500">Debe definir el porcentaje de la pregunta</small>
                </div>
                <div class="col-span-12" v-if="true">
                    <Toast />
                    <FileUpload name="demo[]" url="/api/upload" @upload="onTemplatedUpload($event)" :multiple="true" accept="image/*" :maxFileSize="1000000" @select="onSelectedFiles">
                        <template #header="{ chooseCallback, uploadCallback, clearCallback, files }">
                            <div class="flex flex-wrap justify-between items-center flex-1 gap-4">
                                <div class="flex gap-2">
                                    <Button @click="chooseCallback()" icon="pi pi-images" rounded outlined severity="secondary"></Button>
                                    <Button @click="uploadEvent(uploadCallback)" icon="pi pi-cloud-upload" rounded outlined severity="success" :disabled="!files || files.length === 0"></Button>
                                    <Button @click="clearCallback()" icon="pi pi-times" rounded outlined severity="danger" :disabled="!files || files.length === 0"></Button>
                                </div>
                                <ProgressBar :value="totalSizePercent" :showValue="false" class="md:w-20rem h-1 w-full md:ml-auto">
                                    <span class="whitespace-nowrap">{{ totalSize }}B / 1Mb</span>
                                </ProgressBar>
                            </div>
                        </template>
                        <template #content="{ files, uploadedFiles, removeUploadedFileCallback, removeFileCallback }">
                            <div class="flex flex-col gap-8 pt-4">
                                <div v-if="files.length > 0">
                                    <h5>Pending</h5>
                                    <div class="flex flex-wrap gap-4">
                                        <div v-for="(file, index) of files" :key="file.name + file.type + file.size" class="p-8 rounded-border flex flex-col border border-surface items-center gap-4">
                                            <div>
                                                <img role="presentation" :alt="file.name" :src="file.objectURL" width="100" height="50" />
                                            </div>
                                            <span class="font-semibold text-ellipsis max-w-60 whitespace-nowrap overflow-hidden">{{ file.name }}</span>
                                            <div>{{ formatSize(file.size) }}</div>
                                            <Badge value="Pending" severity="warn" />
                                            <Button icon="pi pi-times" @click="onRemoveTemplatingFile(file, removeFileCallback, index)" outlined rounded severity="danger" />
                                        </div>
                                    </div>
                                </div>

                                <div v-if="uploadedFiles.length > 0">
                                    <h5>Completed</h5>
                                    <div class="flex flex-wrap gap-4">
                                        <div v-for="(file, index) of uploadedFiles" :key="file.name + file.type + file.size" class="p-8 rounded-border flex flex-col border border-surface items-center gap-4">
                                            <div>
                                                <img role="presentation" :alt="file.name" :src="file.objectURL" width="100" height="50" />
                                            </div>
                                            <span class="font-semibold text-ellipsis max-w-60 whitespace-nowrap overflow-hidden">{{ file.name }}</span>
                                            <div>{{ formatSize(file.size) }}</div>
                                            <Badge value="Completed" class="mt-4" severity="success" />
                                            <Button icon="pi pi-times" @click="removeUploadedFileCallback(index)" outlined rounded severity="danger" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <template #empty>
                            <div class="flex items-center justify-center flex-col">
                                <i class="pi pi-cloud-upload !border-2 !rounded-full !p-8 !text-4xl !text-muted-color" />
                                <p class="mt-6 mb-0">Drag and drop files to here to upload.</p>
                            </div>
                        </template>
                    </FileUpload>
                </div>
            </div>
        </div>
        <div class="flex justify-end gap-2">
            <Button class="mt-2" type="button" label="Cancel" severity="secondary" @click="verModalCrearPregunta = false"></Button>
            <Button class="mt-2" v-if="voyAcrearPregunta" type="button" label="Crear" @click="guardarPreguntaServidor" :disabled="!valor || !enunciado"></Button>
            <Button class="mt-2" v-else type="button" label="Editar" @click="editarPreguntaServidor" :disabled="!valor || !enunciado"></Button>
        </div>
    </Dialog>

    <!--Modal para agregar las opciones de la pregunta-->
    <div class="card flex justify-center">
        <Dialog v-model:visible="mostrarModalCrearOpcion" modal :header="headerEditarCrearOpcion" :style="{ width: '50rem' }">
            <div class="flex flex-col gap-6">
                <div class="grid grid-cols-12 gap-4">
                    <div class="col-span-10">
                        <label for="name" class="block font-bold mb-3">Enunciado</label>
                        <Textarea id="descripcion" v-model="enunciadoOpcion" required="true" rows="3" cols="20" fluid></Textarea>
                        <small v-if="!enunciadoOpcion" class="text-red-500">Debe escribir el enunciado de la opción</small>
                    </div>
                    <div class="col-span-2">
                        <label for="name" class="block font-bold mb-3">¿Es la correcta?</label>
                        <ToggleSwitch v-model="checkedCorrecta" />
                    </div>
                </div>
            </div>
            <div class="flex justify-end gap-2">
                <Button type="button" label="Cancel" severity="secondary" @click="mostrarModalCrearOpcion = false"></Button>
                <Button v-if="voyAcrearOpcion" type="button" label="Crear" @click="guardarOpcionServidor()" :disabled="!enunciadoOpcion"></Button>
                <Button v-else type="button" label="Editar" @click="actualizarOpcionServidor()" :disabled="!enunciadoOpcion"></Button>
            </div>
        </Dialog>
    </div>

    <Cargando v-if="cargandoGeneral" />
</template>

<script setup>
import store from '@/store';
import { URL, validarToken } from '@/utils';
import axios from 'axios';
import { usePrimeVue } from 'primevue/config';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref } from 'vue';
import Cargando from './Cargando.vue';
import Cargando2 from './Cargando2.vue';

const confirm = useConfirm();
const emit = defineEmits(['ocultarModalPreguntas']);
const props = defineProps({
    verModal: {
        type: Boolean
    },
    examen: {
        type: Object
    }
});

const userData1 = store.getters['auth/getUser'];
const isAuthenticated1 = store.getters['auth/isAuthenticated'];

const abrirModal = ref(props.verModal);
const preguntas = ref([]);
const porcentaje_aplicado = ref(0);
const verModalCrearPregunta = ref(false);
const enunciado = ref(null);
const valor = ref(null);
const cargandoPreguntas = ref(true);
const cargandoGeneral = ref(false);
const sinPreguntasAsignadas = ref(false);
const mostrarModalCrearOpcion = ref(false);
const checkedCorrecta = ref(false);
const enunciadoOpcion = ref(null);
const idPregunta = ref(null);
const idopcion = ref(null);
const voyAcrearOpcion = ref(true);
const voyAcrearPregunta = ref(true);
const headerEditarCrearOpcion = ref('');
const headerEditarCrearPregunta = ref('');

onMounted(() => {
    // Validar el token
    validarToken(userData1);
    consultarPreguntas();
});

const consultarPreguntas = async () => {
    // Obtener el token Bearer
    const token = userData1.access_token;

    //mostrar el spinner de carga de las preguntas
    cargandoPreguntas.value = true;
    preguntas.value = [];

    try {
        const response = await axios.get(URL + `ver-preguntas-por-examen/${props.examen.code}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Agregar el Bearer token
                Accept: 'application/json', // Tipo de respuesta aceptada
                'Content-Type': 'application/json' // Tipo de contenido
            }
        });

        let preguntasList = [];

        if (response.data.data.preguntas.length) {
            response.data.data.preguntas.map((num, index) => {
                let pregunta = { name: num.contenido, code: num.id, valor: num.valor, opciones: num.opciones };
                preguntasList.push(pregunta);
            });

            porcentaje_aplicado.value = response.data.data.total_valor_preguntas;
            preguntas.value = preguntasList;

            //ocultar el spinner de carga de las preguntas
            cargandoPreguntas.value = false;
            sinPreguntasAsignadas.value = false;
        } else {
            sinPreguntasAsignadas.value = true;

            //ocultar el spinner de carga de las preguntas
            cargandoPreguntas.value = false;
        }
    } catch (err) {
        console.log('Error al obtener datos de preguntas: ' + err.message); // Manejo de errores
        cargandoPreguntas.value = false;
    }
};

const guardarPreguntaServidor = async () => {
    cargandoGeneral.value = true;
    sinPreguntasAsignadas.value = false;
    try {
        const token = userData1.access_token;
        const response = await axios.post(
            URL + 'crear-pregunta',
            {
                examen_id: props.examen.code,
                contenido: enunciado.value,
                valor: valor.value
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
        );
        verModalCrearPregunta.value = false;
        cargandoGeneral.value = false;
        toast.add({ severity: 'success', summary: 'Exito', detail: 'Pregunta guardada correctamente', life: 10000 });
        consultarPreguntas();
    } catch (error) {
        console.log(error);
        const errorMessage = error?.response?.data?.msg || 'Error desconocido'; // Mensaje por defecto
        cargandoGeneral.value = false;
        toast.add({ severity: 'error', summary: 'Error', detail: `Error al guardar: ${errorMessage}`, life: 10000 });
    }
};

const editarPreguntaServidor = async () => {
    cargandoGeneral.value = true;
    sinPreguntasAsignadas.value = false;
    try {
        const token = userData1.access_token;
        const response = await axios.post(
            URL + 'editar-pregunta',
            {
                pregunta_id: idPregunta.value,
                contenido: enunciado.value,
                valor: valor.value
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
        );
        verModalCrearPregunta.value = false;
        cargandoGeneral.value = false;
        toast.add({ severity: 'success', summary: 'Exito', detail: 'Pregunta actualizada correctamente', life: 10000 });
        consultarPreguntas();
    } catch (error) {
        console.log(error);
        const errorMessage = error?.response?.data?.msg || 'Error desconocido'; // Mensaje por defecto
        cargandoGeneral.value = false;
        toast.add({ severity: 'error', summary: 'Error', detail: `Error al actualizar: ${errorMessage}`, life: 10000 });
    }
};

const mostrarModalCrearOpcionf = (idPreg) => {
    mostrarModalCrearOpcion.value = true;
    idPregunta.value = idPreg;
    headerEditarCrearOpcion.value = 'Agregar opción';
    (enunciadoOpcion.value = null), (checkedCorrecta.value = false);
    voyAcrearOpcion.value = true;
};

const mostrarModalCrearPreguntaf = () => {
    verModalCrearPregunta.value = true;
    headerEditarCrearPregunta.value = 'Agregar pregunta';
    enunciado.value = null;
    valor.value = null;
    voyAcrearOpcion.value = true;
};

const guardarOpcionServidor = async () => {
    cargandoGeneral.value = true;

    try {
        const token = userData1.access_token;
        const response = await axios.post(
            URL + 'crear-opcion',
            {
                pregunta_id: idPregunta.value,
                contenido: enunciadoOpcion.value,
                correcta: checkedCorrecta.value
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
        );

        console.log('guardando opcion: ', response);

        mostrarModalCrearOpcion.value = false;
        cargandoGeneral.value = false;
        toast.add({ severity: 'success', summary: 'Creado con exito', detail: `Opción agregada con exito`, life: 10000 });
        consultarPreguntas();
    } catch (error) {
        console.log(error);
        const errorMessage = error?.response?.data?.msg || 'Error desconocido'; // Mensaje por defecto
        cargandoGeneral.value = false;
        toast.add({ severity: 'error', summary: 'Error', detail: `Error al guardar: ${errorMessage}`, life: 10000 });
    }
};

const editarOpcion = (opcion) => {
    enunciadoOpcion.value = opcion.contenido;
    checkedCorrecta.value = opcion.correcta == 1 ? true : false;
    idopcion.value = opcion.id;

    headerEditarCrearOpcion.value = 'Editar opción';
    voyAcrearOpcion.value = false;
    mostrarModalCrearOpcion.value = true;
};

const editarPregunta = (pregunta) => {
    enunciado.value = pregunta.name;
    valor.value = pregunta.valor;
    idPregunta.value = pregunta.code;

    headerEditarCrearPregunta.value = 'Editar pregunta';
    voyAcrearPregunta.value = false;
    verModalCrearPregunta.value = true;
};

const actualizarOpcionServidor = async () => {
    cargandoGeneral.value = true;

    try {
        const token = userData1.access_token;
        const response = await axios.post(
            URL + 'actualizar-opcion',
            {
                opcion_id: idopcion.value,
                contenido: enunciadoOpcion.value,
                correcta: checkedCorrecta.value
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
        );

        console.log('actualizando opcion: ', response);

        mostrarModalCrearOpcion.value = false;
        cargandoGeneral.value = false;
        toast.add({ severity: 'success', summary: 'Actualizado con exito', detail: `Opción actualizada con exito`, life: 10000 });
        consultarPreguntas();
    } catch (error) {
        console.log(error);
        const errorMessage = error?.response?.data?.msg || 'Error desconocido'; // Mensaje por defecto
        cargandoGeneral.value = false;
        toast.add({ severity: 'error', summary: 'Error', detail: `Error al actualizar: ${errorMessage}`, life: 10000 });
    }
};

const confirmarEliminacionOpcion = (event, idOpcion) => {
    idopcion.value = idOpcion;
    confirm.require({
        target: event.currentTarget,
        message: '¿Está seguro de eliminar la opción?',
        icon: 'pi pi-info-circle',
        rejectProps: {
            label: 'Cancelar',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: 'Eliminar',
            severity: 'danger'
        },
        accept: () => {
            eliminarOpcionServidor();
        },
        reject: () => {}
    });
};

const eliminarOpcionServidor = async () => {
    cargandoGeneral.value = true;

    try {
        const token = userData1.access_token;
        const response = await axios.delete(URL + 'eliminar-opcion/' + idopcion.value, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });

        console.log('eliminando opcion: ', response);

        mostrarModalCrearOpcion.value = false;
        cargandoGeneral.value = false;
        toast.add({ severity: 'success', summary: 'Eliminado con exito', detail: `Opción eliminada con exito`, life: 10000 });
        consultarPreguntas();
    } catch (error) {
        console.log(error);
        const errorMessage = error?.response?.data?.msg || 'Error desconocido'; // Mensaje por defecto
        cargandoGeneral.value = false;
        toast.add({ severity: 'error', summary: 'Error', detail: `Error al eliminar: ${errorMessage}`, life: 10000 });
    }
};

const confirmarEliminacionPregunta = (event, idpregunta) => {
    idPregunta.value = idpregunta;
    confirm.require({
        target: event.currentTarget,
        message: '¿Está seguro de eliminar la pregunta?',
        icon: 'pi pi-info-circle',
        rejectProps: {
            label: 'Cancelar',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: 'Eliminar',
            severity: 'danger'
        },
        accept: () => {
            eliminarPreguntaServidor();
        },
        reject: () => {}
    });
};

const eliminarPreguntaServidor = async () => {
    cargandoGeneral.value = true;

    try {
        const token = userData1.access_token;
        const response = await axios.delete(URL + 'eliminar-pregunta/' + idPregunta.value, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        mostrarModalCrearOpcion.value = false;
        cargandoGeneral.value = false;
        toast.add({ severity: 'success', summary: 'Eliminado con exito', detail: `Pregunta eliminada con exito`, life: 10000 });
        consultarPreguntas();
    } catch (error) {
        console.log(error);
        const errorMessage = error?.response?.data?.msg || 'Error desconocido'; // Mensaje por defecto
        cargandoGeneral.value = false;
        toast.add({ severity: 'error', summary: 'Error', detail: `Error al eliminar: ${errorMessage}`, life: 10000 });
    }
};

// ----------------------------------------------
// Para las imagenes
const $primevue = usePrimeVue();
const toast = useToast();

const totalSize = ref(0);
const totalSizePercent = ref(0);
const files = ref([]);

const onRemoveTemplatingFile = (file, removeFileCallback, index) => {
    removeFileCallback(index);
    totalSize.value -= parseInt(formatSize(file.size));
    totalSizePercent.value = totalSize.value / 10;
};

const onClearTemplatingUpload = (clear) => {
    clear();
    totalSize.value = 0;
    totalSizePercent.value = 0;
};

const onSelectedFiles = (event) => {
    console.log('hi');
    files.value = event.files;
    files.value.forEach((file) => {
        totalSize.value += parseInt(formatSize(file.size));
    });
};

const uploadEvent = (callback) => {
    totalSizePercent.value = totalSize.value / 10;
    callback();
};

const onTemplatedUpload = () => {
    console.log('Hola,');
    toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
};

const formatSize = (bytes) => {
    const k = 1024;
    const dm = 3;
    const sizes = $primevue.config.locale.fileSizeTypes;

    if (bytes === 0) {
        return `0 ${sizes[0]}`;
    }

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

    return `${formattedSize} ${sizes[i]}`;
};
</script>
