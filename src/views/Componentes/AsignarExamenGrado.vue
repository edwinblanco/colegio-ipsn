<template>
    <!--Modal general para ver las preguntas del examen-->
    <div class="card flex justify-center">
        <Dialog v-model:visible="abrirModal" :header="headerModal" maximizable modal @hide="emit('ocultarModalAsignarExamenGrado')" :style="{ width: '80rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
            <div class="flex flex-col gap-6">
                <div class="grid grid-cols-12 gap-4">
                    <div class="col-span-3">
                        <Select v-model="gradoSeleccionado" :options="grados" optionLabel="name" placeholder="Seleccione un grado" fluid />
                        <small v-if="!gradoSeleccionado" class="text-red-500">Debe seleccionar un grado</small>
                    </div>
                    <div class="col-span-3">
                        <Button type="button" label="Asignar" @click="asignarExamenAgrado()" :disabled="!gradoSeleccionado"></Button>
                    </div>
                </div>
            </div>
            <DataTable v-if="asignaciones.length > 0" :value="asignaciones" size="small">
                <template #header>
                    <div class="flex flex-wrap items-center justify-between gap-2">
                        <span class="font-bold">Asignaciones</span>
                    </div>
                </template>
                <Column field="name" header="Grado">
                    <template #body="slotProps">
                        {{ slotProps.data.name }}
                    </template>
                </Column>
                <Column field="name" header="Fecha asignación">
                    <template #body="slotProps">
                        {{ slotProps.data.fechaAsig }}
                    </template>
                </Column>
                <Column field="name" >
                    <template #body="slotProps"">
                        <ConfirmPopup></ConfirmPopup>
                        <Button icon="pi pi-trash" size="small" severity="danger" @click="confirmarEliminarAsignacion($event, slotProps.data.examenId, slotProps.data.gradoId )"/>
                    </template>
                </Column>

            </DataTable>
            <Message v-if="asignaciones.length < 1 && !cargandoGeneral2" severity="warn" class="my-2">Sin asignaciones</Message>
            <Cargando2 v-if="cargandoGeneral2" />
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
import Cargando2 from './Cargando2.vue';

const confirm = useConfirm();
const toast = useToast();
const emit = defineEmits(['ocultarModalAsignarExamenGrado']);
const props = defineProps({
    verModal: {
        type: Boolean
    },
    examen: {
        type: Object
    }
});

const headerModal = ref('Asingar examen: '+props.examen.titulo)
const userData1 = store.getters['auth/getUser'];
const isAuthenticated1 = store.getters['auth/isAuthenticated'];

const abrirModal = ref(props.verModal);
const grados = ref([]);
const asignaciones = ref([]);
const verModalCrearPregunta = ref(false);
const cargandoGrados = ref(true);
const cargandoGeneral = ref(false);
const cargandoGeneral2 = ref(false);
const gradoSeleccionado = ref(null);

onMounted(() => {
    // Validar el token
    validarToken(userData1);
    consultarGrados();
    consultarAsignaciones();
});

const consultarGrados = async () => {
    // Obtener el token Bearer
    const token = userData1.access_token;

    //mostrar el spinner de carga de las preguntas
    cargandoGrados.value = true;
    grados.value = [];

    try {
        const response = await axios.get(URL + 'ver-grados', {
            headers: {
                Authorization: `Bearer ${token}`, // Agregar el Bearer token
                Accept: 'application/json', // Tipo de respuesta aceptada
                'Content-Type': 'application/json' // Tipo de contenido
            }
        });

        let gradosList = [];

        if (response.data.data.length) {
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
        }
    } catch (err) {
        console.log('Error al obtener datos de grados: ' + err.message); // Manejo de errores
        cargandoGrados.value = false;
    }
};

const consultarAsignaciones = async () => {
    // Obtener el token Bearer
    const token = userData1.access_token;
    asignaciones.value  = [];
    cargandoGeneral2.value = true;

    try {
        const response = await axios.get(URL + `ver-grado-asignado/${props.examen.code}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Agregar el Bearer token
                Accept: 'application/json', // Tipo de respuesta aceptada
                'Content-Type': 'application/json' // Tipo de contenido
            }
        });

        let asignacionesList = [];

        if(response.data.status !== 0){
            response.data.data.map((num, index) => {
                let asignacion = { name: num.grado + '-' + num.salon + '°', code: index, examenId: num.pivot.examen_id, gradoId: num.pivot.grado_id, fechaAsig: num.pivot.fecha_asignacion };
                asignacionesList.push(asignacion);
            });

            asignaciones.value = asignacionesList;
        }

        cargandoGeneral2.value = false;

    } catch (err) {
        cargandoGeneral2.value = false
        console.log('Error al obtener datos de asignaciones: ' + err.message); // Manejo de errores
    }
};

const asignarExamenAgrado = async () => {
    cargandoGeneral.value = true;

    try {
        const token = userData1.access_token;
        const response = await axios.post(
            URL + 'asignar-examen-grado',
            {
                examen_id: props.examen.code,
                grado_id: gradoSeleccionado.value.code
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
        toast.add({ severity: 'success', summary: 'Exito', detail: 'Asignación realizada correctamente', life: 10000 });
        consultarAsignaciones();
    } catch (error) {
        console.log(error);
        const errorMessage = error?.response?.data?.msg || 'Error desconocido'; // Mensaje por defecto
        cargandoGeneral.value = false;
        toast.add({ severity: 'error', summary: 'Error', detail: `Error al asignar: ${errorMessage}`, life: 10000 });
    }
};

const confirmarEliminarAsignacion = (event, examenId, gradoId) => {
    confirm.require({
        target: event.currentTarget,
        message: '¿Está seguro de eliminar la asignación?',
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
            eliminarAsignacionServidor(examenId, gradoId);
        },
        reject: () => {
            toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
};

const eliminarAsignacionServidor = async (examenId, gradoId) => {
    cargandoGeneral.value = true;

    try {
        const token = userData1.access_token;


        const payload = {
            examen_id: examenId,
            grado_id: gradoId
        };

        const response = await axios.delete(URL + 'eliminar-asignacion', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            data: payload // Los datos se envían aquí
        });

        console.log('eliminando asignacion: ', response);

        cargandoGeneral.value = false;
        toast.add({ severity: 'success', summary: 'Eliminado con exito', detail: `Asignación eliminada con exito`, life: 10000 });
        consultarAsignaciones();
    } catch (error) {
        console.log(error);
        const errorMessage = error?.response?.data?.msg || 'Error desconocido'; // Mensaje por defecto
        cargandoGeneral.value = false;
        toast.add({ severity: 'error', summary: 'Error', detail: `Error al eliminar: ${errorMessage}`, life: 10000 });
    }
};


</script>
