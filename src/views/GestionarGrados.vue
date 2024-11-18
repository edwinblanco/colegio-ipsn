<script setup>
import store from '@/store';
import { DOMINIO, URL, validarToken } from '@/utils';
import { FilterMatchMode } from '@primevue/core/api';
import axios from 'axios';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref } from 'vue';
import Cargando from './Componentes/Cargando.vue';

const userData = store.getters['auth/getUser'];
const isAuthenticated = store.getters['auth/isAuthenticated'];

const verCargandoSpinner = ref(false);
const toast = useToast();
const confirm = useConfirm();

const dt = ref();
const grados = ref([]);
const verModalCrearGrado = ref(false);
const headerModalGrado = ref('Crear grado');
const salon = ref(null);
const idGrado = ref(null);
const submitted = ref(false);
const grado = ref(null);

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

onMounted(() => {
    // Validar token
    validarToken(userData);
    // Consultar grados
    consultarGrados();
});

// Función para consultar los grados
const consultarGrados = async () => {
    const token = userData.access_token;
    verCargandoSpinner.value = true;

    try {
        const response = await axios.get(URL + 'ver-grados', {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });

        console.log('grados: ', response);

        grados.value = response.data.data;
        verCargandoSpinner.value = false;
    } catch (err) {
        console.error(err);
        verCargandoSpinner.value = false;
        toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los grados.', life: 5000 });
        console.log('Error al consultar grados:', err.message);
    }
};

// Función para abrir el modal de creación de grado
function abrirModalCrearGrado() {
    submitted.value = false;
    verModalCrearGrado.value = true;
    headerModalGrado.value = 'Crear grado';
    grado.value = null;
    salon.value = null;
}

// Función para ocultar el modal de grado
function ocultarModalCrearGrado() {
    verModalCrearGrado.value = false;
    submitted.value = false;
    salon.value = null;
    grado.value = null;
}

function guardarGrado() {
    submitted.value = true;

    if (!salon.value || !grado.value) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Campos requeridos.', life: 5000 });
        return;
    }

    console.log('guardar');

    // Confirmar antes de enviar la solicitud
    confirm.require({
        message: '¿Estás seguro de crear el grado?',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            guardarGradoServidor();
        },
        reject: () => {}
    });
}

// Función para guardar el grado en el servidor
const guardarGradoServidor = async () => {
    const token = userData.access_token;
    const formData = new FormData();
    formData.append('grado', grado.value);
    formData.append('salon', salon.value);

    try {
        verCargandoSpinner.value = true;
        const response = await axios.post(URL + 'crear-grado', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            }
        });

        toast.add({ severity: 'success', summary: 'Éxito', detail: 'Grado creado exitosamente.', life: 5000 });
        verCargandoSpinner.value = false;
        ocultarModalCrearGrado();
        consultarGrados();
    } catch (error) {
        verCargandoSpinner.value = false;
        const errorMessage = error?.response?.data?.msg || 'Error desconocido';
        toast.add({ severity: 'error', summary: 'Error', detail: `Error al crear: ${errorMessage}`, life: 10000 });
    }
};

// Función para eliminar un grado
function confirmarEliminarGrado(grado) {
    idGrado.value = grado.id;

    confirm.require({
        message: '¿Estás seguro de eliminar este grado?',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        rejectProps: {
            label: 'Cancelar',
            severity: 'info',
            outlined: true
        },
        acceptProps: {
            label: 'Eliminar',
            severity: 'danger',
        },
        accept: () => {
            eliminarGradoServidor();
        },
        reject: () => {}
    });
}

// Función para eliminar el grado en el servidor
const eliminarGradoServidor = async () => {
    const token = userData.access_token;
    try {
        verCargandoSpinner.value = true;
        await axios.delete(URL + 'eliminar-grado/' + idGrado.value, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        toast.add({ severity: 'success', summary: 'Éxito', detail: 'Grado eliminado exitosamente.', life: 5000 });
        verCargandoSpinner.value = false;
        consultarGrados();
    } catch (error) {
        verCargandoSpinner.value = false;
        toast.add({ severity: 'error', summary: 'Error', detail: 'Error al eliminar el grado.', life: 5000 });
        console.log('Error al eliminar grado:', error);
    }
};
</script>

<template>
    <div>
        <Cargando v-if="verCargandoSpinner" />

        <Button label="Agregar grado" icon="pi pi-plus" class="my-2" @click="abrirModalCrearGrado" />

        <DataTable
            v-if="grados.length > 0"
            ref="dt"
            :value="grados"
            dataKey="id"
            :paginator="true"
            :rows="10"
            :filters="filters"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            :rowsPerPageOptions="[5, 10, 25]"
            currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} grados"
            size="small"
        >
            <template #header>
                <div class="flex flex-wrap gap-2 items-center justify-between">
                    <h4 class="m-0">Registro de grados</h4>
                    <InputText v-model="filters['global'].value" placeholder="Buscar..." />
                </div>
            </template>

            <Column field="id" header="ID" sortable style="min-width: 2rem"></Column>
            <Column field="grado" header="Grado" sortable style="min-width: 12rem"></Column>
            <Column field="salon" header="Salón" sortable style="min-width: 12rem"></Column>
            <Toast />
            <Column :exportable="false" style="min-width: 12rem" header="Acciones">
                <template #body="slotProps">
                    <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmarEliminarGrado(slotProps.data)" />
                </template>
            </Column>
        </DataTable>

        <Dialog v-model:visible="verModalCrearGrado" :style="{ width: '600px' }" header="Configuración de Grado" :modal="true" :draggable="false" @hide="ocultarModalCrearGrado">
            <div class="flex flex-col gap-6">
                <div class="grid grid-cols-12 gap-4">
                    <div class="col-span-12">
                        <label for="grado" class="block font-bold mb-3">Grado</label>
                        <InputText id="grado" type="number" v-model.trim="grado" placeholder="Ingrese el grado" class="w-full" />
                        <small v-if="submitted && !grado" class="text-red-500">El grado es requerido</small>
                    </div>
                    <div class="col-span-12">
                        <label for="salon" class="block font-bold mb-3">Salón</label>
                        <InputText id="salon" type="number" v-model.trim="salon" placeholder="Ingrese el salón" class="w-full" />
                        <small v-if="submitted && !salon" class="text-red-500">El salón es requerido</small>
                    </div>
                </div>
            </div>

            <template #footer>
                <Toast />
                <Button label="Cancelar" icon="pi pi-times" text @click="ocultarModalCrearGrado" />
                <Button label="Guardar" icon="pi pi-check" @click="guardarGrado" />
            </template>
        </Dialog>
    </div>
</template>

<style scoped>
/* Estilos adicionales según sea necesario */
</style>
