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
const sedes = ref([]);
const verModalCrearSede = ref(false);
const headerModalSede = ref('Crear sede');
const nombreSede = ref(null);
const direccionSede = ref(null);
const telefonoSede = ref(null);
const descripcionSede = ref(null);
const idSede = ref(null);
const submitted = ref(false);

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

onMounted(() => {
    // Validar token
    validarToken(userData);
    // Consultar sedes
    consultarSedes();
});

// Función para consultar las sedes
const consultarSedes = async () => {
    const token = userData.access_token;
    verCargandoSpinner.value = true;

    try {
        const response = await axios.get(URL + 'ver-sedes', {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });

        console.log('sedes: ', response);

        sedes.value = response.data.data;
        verCargandoSpinner.value = false;
    } catch (err) {
        console.error(err);
        verCargandoSpinner.value = false;
        toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar las sedes.', life: 5000 });
        console.log('Error al consultar sedes:', err.message);
    }
};

// Función para abrir el modal de creación de sede
function abrirModalCrearSede() {
    submitted.value = false;
    verModalCrearSede.value = true;
    headerModalSede.value = 'Crear sede';
    nombreSede.value = null;
    direccionSede.value = null;
    telefonoSede.value = null;
    descripcionSede.value = null;
}

// Función para ocultar el modal de sede
function ocultarModalCrearSede() {
    verModalCrearSede.value = false;
    submitted.value = false;
    nombreSede.value = null;
    direccionSede.value = null;
    telefonoSede.value = null;
    descripcionSede.value = null;
}

function guardarSede() {
    submitted.value = true;

    if (!nombreSede.value) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'El nombre es requerido.', life: 5000 });
        return;
    }

    console.log('guardar');

    // Confirmar antes de enviar la solicitud
    confirm.require({
        message: '¿Estás seguro de crear esta sede?',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            guardarSedeServidor();
        },
        reject: () => {}
    });
}

// Función para guardar la sede en el servidor
const guardarSedeServidor = async () => {
    const token = userData.access_token;
    const formData = new FormData();
    formData.append('nombre', nombreSede.value);
    formData.append('direccion', direccionSede.value);
    formData.append('telefono', telefonoSede.value);
    formData.append('descripcion', descripcionSede.value);

    try {
        verCargandoSpinner.value = true;
        const response = await axios.post(URL + 'crear-sede', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            }
        });

        toast.add({ severity: 'success', summary: 'Éxito', detail: 'Sede creada exitosamente.', life: 5000 });
        verCargandoSpinner.value = false;
        ocultarModalCrearSede();
        consultarSedes();
    } catch (error) {
        verCargandoSpinner.value = false;
        const errorMessage = error?.response?.data?.msg || 'Error desconocido';
        toast.add({ severity: 'error', summary: 'Error', detail: `Error al crear: ${errorMessage}`, life: 10000 });
    }
};

// Función para eliminar una sede
function confirmarEliminarSede(sede) {
    idSede.value = sede.id;

    confirm.require({
        message: '¿Estás seguro de eliminar esta sede?',
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
            eliminarSedeServidor();
        },
        reject: () => {}
    });
}

// Función para eliminar la sede en el servidor
const eliminarSedeServidor = async () => {
    const token = userData.access_token;
    try {
        verCargandoSpinner.value = true;
        await axios.delete(URL + 'eliminar-sede/' + idSede.value, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        toast.add({ severity: 'success', summary: 'Éxito', detail: 'Sede eliminada exitosamente.', life: 5000 });
        verCargandoSpinner.value = false;
        consultarSedes();
    } catch (error) {
        verCargandoSpinner.value = false;
        toast.add({ severity: 'error', summary: 'Error', detail: 'Error al eliminar la sede.', life: 5000 });
        console.log('Error al eliminar sede:', error);
    }
};

function validarLetra(value) {
    // Asegurarse de que el valor sea una letra mayúscula
    nombreSede.value = value.toUpperCase(); // Convierte la letra a mayúscula
}
</script>

<template>
    <div>
        <Cargando v-if="verCargandoSpinner" />

        <Button label="Agregar sede" icon="pi pi-plus" class="my-2" @click="abrirModalCrearSede" />

        <DataTable
            v-if="sedes.length > 0"
            ref="dt"
            :value="sedes"
            dataKey="id"
            :paginator="true"
            :rows="10"
            :filters="filters"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            :rowsPerPageOptions="[5, 10, 25]"
            currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} sedes"
            size="small"
        >
            <template #header>
                <div class="flex flex-wrap gap-2 items-center justify-between">
                    <h4 class="m-0">Registro de sedes</h4>
                    <InputText v-model="filters['global'].value" placeholder="Buscar..." />
                </div>
            </template>

            <Column field="id" header="ID" sortable style="min-width: 2rem"></Column>
            <Column field="nombre" header="Nombre" sortable style="min-width: 12rem"></Column>
            <Column field="direccion" header="Dirección" sortable style="min-width: 12rem"></Column>
            <Column field="telefono" header="Teléfono" sortable style="min-width: 12rem"></Column>
            <Column field="descripcion" header="Descripción" sortable style="min-width: 12rem"></Column>
            <Toast />
            <Column :exportable="false" style="min-width: 12rem" header="Acciones">
                <template #body="slotProps">
                    <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmarEliminarSede(slotProps.data)" />
                </template>
            </Column>
        </DataTable>

        <Dialog v-model:visible="verModalCrearSede" :style="{ width: '600px' }" header="Configuración de Sede" :modal="true" :draggable="false" @hide="ocultarModalCrearSede">
            <div class="flex flex-col gap-6">
                <div class="grid grid-cols-12 gap-4">
                    <div class="col-span-12">
                        <label for="nombre" class="block font-bold mb-3">Nombre</label>
                        <InputText id="nombre" @input="validarLetra(nombreSede)"  v-model.trim="nombreSede" maxlength="1" placeholder="Ingrese el nombre de la sede" class="w-full" />
                        <small v-if="submitted && !nombreSede" class="text-red-500">El nombre es requerido</small>
                    </div>
                    <div class="col-span-12">
                        <label for="direccion" class="block font-bold mb-3">Dirección</label>
                        <InputText id="direccion" v-model.trim="direccionSede" placeholder="Ingrese la dirección" class="w-full" />
                    </div>
                    <div class="col-span-12">
                        <label for="telefono" class="block font-bold mb-3">Teléfono</label>
                        <InputText id="telefono" v-model.trim="telefonoSede" placeholder="Ingrese el teléfono" class="w-full" />
                    </div>
                    <div class="col-span-12">
                        <label for="descripcion" class="block font-bold mb-3">Descripción</label>
                        <InputText id="descripcion" v-model.trim="descripcionSede" placeholder="Ingrese una descripción" class="w-full" />
                    </div>
                </div>
                <div class="flex justify-end gap-4">
                    <Button label="Cancelar" icon="pi pi-times" outlined severity="secondary" @click="ocultarModalCrearSede" />
                    <Button label="Guardar" icon="pi pi-save" severity="success" @click="guardarSede" />
                </div>
            </div>
        </Dialog>
    </div>
</template>

