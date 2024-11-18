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
const materias = ref([]);
const verModalCrearMateria = ref(false);
const headerModalMateria = ref('Crear materia');
const nombre = ref(null);
const descripcion = ref(null);
const idMateria = ref(null);
const submitted = ref(false);
const materia = ref(null);

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

onMounted(() => {
    // Validar token
    validarToken(userData);
    // Consultar materias
    consultarMaterias();
});

// Función para consultar las materias
const consultarMaterias = async () => {
    const token = userData.access_token;
    verCargandoSpinner.value = true;

    try {
        const response = await axios.get(URL + 'ver-materias', {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });

        console.log('materias: ', response);

        materias.value = response.data.data;
        verCargandoSpinner.value = false;
    } catch (err) {
        console.error(err);
        verCargandoSpinner.value = false;
        toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar las materias.', life: 5000 });
        console.log('Error al consultar materias:', err.message);
    }
};

// Función para abrir el modal de creación de materia
function abrirModalCrearMateria() {
    submitted.value = false;
    verModalCrearMateria.value = true;
    headerModalMateria.value = 'Crear materia';
    materia.value = null;
    nombre.value = null;
    descripcion.value = null;
}

// Función para ocultar el modal de materia
function ocultarModalCrearMateria() {
    verModalCrearMateria.value = false;
    submitted.value = false;
    nombre.value = null;
    descripcion.value = null;
}

// Función para guardar la materia
function guardarMateria() {
    submitted.value = true;

    if (!nombre.value) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Campos requeridos.', life: 5000 });
        return;
    }

    console.log('guardar');

    // Confirmar antes de enviar la solicitud
    confirm.require({
        message: '¿Estás seguro de crear esta materia?',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            guardarMateriaServidor();
        },
        reject: () => {}
    });
}

// Función para guardar la materia en el servidor
const guardarMateriaServidor = async () => {
    const token = userData.access_token;
    const formData = new FormData();
    formData.append('nombre', nombre.value);
    formData.append('descripcion', descripcion.value);

    try {
        verCargandoSpinner.value = true;
        const response = await axios.post(URL + 'crear-materia', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            }
        });

        toast.add({ severity: 'success', summary: 'Éxito', detail: 'Materia creada exitosamente.', life: 5000 });
        verCargandoSpinner.value = false;
        ocultarModalCrearMateria();
        consultarMaterias();
    } catch (error) {
        verCargandoSpinner.value = false;
        const errorMessage = error?.response?.data?.msg || 'Error desconocido';
        toast.add({ severity: 'error', summary: 'Error', detail: `Error al crear: ${errorMessage}`, life: 10000 });
    }
};

// Función para eliminar una materia
function confirmarEliminarMateria(materia) {
    idMateria.value = materia.id;

    confirm.require({
        message: '¿Estás seguro de eliminar esta materia?',
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
            eliminarMateriaServidor();
        },
        reject: () => {}
    });
}

// Función para eliminar la materia en el servidor
const eliminarMateriaServidor = async () => {
    const token = userData.access_token;
    try {
        verCargandoSpinner.value = true;
        await axios.delete(URL + 'eliminar-materia/' + idMateria.value, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        toast.add({ severity: 'success', summary: 'Éxito', detail: 'Materia eliminada exitosamente.', life: 5000 });
        verCargandoSpinner.value = false;
        consultarMaterias();
    } catch (error) {
        verCargandoSpinner.value = false;
        toast.add({ severity: 'error', summary: 'Error', detail: 'Error al eliminar la materia.', life: 5000 });
        console.log('Error al eliminar materia:', error);
    }
};
</script>

<template>
    <div>
        <Cargando v-if="verCargandoSpinner" />

        <Button label="Agregar materia" icon="pi pi-plus" class="my-2" @click="abrirModalCrearMateria" />

        <DataTable
            v-if="materias.length > 0"
            ref="dt"
            :value="materias"
            dataKey="id"
            :paginator="true"
            :rows="10"
            :filters="filters"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            :rowsPerPageOptions="[5, 10, 25]"
            currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} materias"
            size="small"
        >
            <template #header>
                <div class="flex flex-wrap gap-2 items-center justify-between">
                    <h4 class="m-0">Registro de materias</h4>
                    <InputText v-model="filters['global'].value" placeholder="Buscar..." />
                </div>
            </template>

            <Column field="id" header="ID" sortable style="min-width: 2rem"></Column>
            <Column field="nombre" header="Nombre" sortable style="min-width: 12rem"></Column>
            <Column field="descripcion" header="Descripción" sortable style="min-width: 12rem"></Column>
            <Toast />
            <Column :exportable="false" style="min-width: 12rem" header="Acciones">
                <template #body="slotProps">
                    <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmarEliminarMateria(slotProps.data)" />
                </template>
            </Column>
        </DataTable>

        <Dialog v-model:visible="verModalCrearMateria" :style="{ width: '600px' }" header="Configuración de Materia" :modal="true" :draggable="false" @hide="ocultarModalCrearMateria">
            <div class="flex flex-col gap-6">
                <div class="grid grid-cols-12 gap-4">
                    <div class="col-span-12">
                        <label for="nombre" class="block font-bold mb-3">Nombre</label>
                        <InputText id="nombre" type="text" v-model.trim="nombre" placeholder="Ingrese el nombre de la materia" class="w-full" />
                        <small v-if="submitted && !nombre" class="text-red-500">El nombre es requerido</small>
                    </div>
                    <div class="col-span-12">
                        <label for="descripcion" class="block font-bold mb-3">Descripción</label>
                        <InputText id="descripcion" type="text" v-model.trim="descripcion" placeholder="Ingrese la descripción" class="w-full" />
                    </div>
                </div>
            </div>

            <template #footer>
                <Toast />
                <Button label="Cancelar" icon="pi pi-times" text @click="ocultarModalCrearMateria" />
                <Button label="Guardar" icon="pi pi-check" @click="guardarMateria" />
            </template>
        </Dialog>
    </div>
</template>

<style scoped>
/* Estilos adicionales según sea necesario */
</style>
