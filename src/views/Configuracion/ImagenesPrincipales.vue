<script setup>
import store from '@/store';
import { DOMINIO, URL, validarToken } from '@/utils';
import { FilterMatchMode } from '@primevue/core/api';
import axios from 'axios';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref } from 'vue';
import Cargando from '../Componentes/Cargando.vue';
const userData = store.getters['auth/getUser'];
const isAuthenticated = store.getters['auth/isAuthenticated'];

const verCargandoSpiner = ref(false);
const toast = useToast();
const confirm = useConfirm();

const dt = ref();
const imagenes = ref([]);
const verModalCrearImagen = ref(false);
const headerModalImagen = ref('Crear imagen principal');
const imagenSeleccionada = ref(null);
const nuevaImagen = ref(null);
const idImagen = ref(null);
const submitted = ref(false);
const nombreImgaen = ref(null);
const estadoImagen = ref(null);

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

onMounted(() => {
    // Validar token
    validarToken(userData);
    // Consultar imágenes principales
    consultarImagenes();
});

// Función para consultar las imágenes principales
const consultarImagenes = async () => {
    const token = userData.access_token;
    verCargandoSpiner.value = true;

    try {
        const response = await axios.get(URL + 'config-imagenes-principal', {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });

        console.log('imagenes: ', response);

        imagenes.value = response.data.data;
        verCargandoSpiner.value = false;
    } catch (err) {
        console.error(err);
        verCargandoSpiner.value = false;
        toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar las imágenes.', life: 5000 });
        console.log('Error al consultar imágenes:', err.message);
    }
};

// Función para abrir el modal de creación de imagen
function abrirModalCrearImagen() {
    submitted.value = false;
    verModalCrearImagen.value = true;
    headerModalImagen.value = 'Crear imagen principal';
    imagenSeleccionada.value = null;
    nuevaImagen.value = null;
}

// Función para ocultar el modal de imagen
function ocultarModalCrearImagen() {
    verModalCrearImagen.value = false;
    submitted.value = false;
    nuevaImagen.value = null;
    imagenSeleccionada.value = null;
}

function guardarImagen() {
    submitted.value = true;

    if (!nuevaImagen.value || !nombreImgaen.value || !estadoImagen.value) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Campos requeridos.', life: 5000 });
        return;
    }

    console.log('guardar');

    // Confirmar antes de enviar la solicitud
    confirm.require({
        message: '¿Estás seguro de crear esta imagen principal?',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            guardarImagenServidor();
        },
        reject: () => {}
    });
}

// Función para guardar la imagen en el servidor
const guardarImagenServidor = async () => {
    const token = userData.access_token;
    const formData = new FormData();
    formData.append('imagen', nuevaImagen.value);
    formData.append('nombre', nombreImgaen.value);
    formData.append('estado', estadoImagen.value);

    try {
        verCargandoSpiner.value = true;
        const response = await axios.post(URL + 'config-imagenes-principal', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            }
        });

        toast.add({ severity: 'success', summary: 'Éxito', detail: 'Imagen creada exitosamente.', life: 5000 });
        verCargandoSpiner.value = false;
        ocultarModalCrearImagen();
        consultarImagenes();
    } catch (error) {
        verCargandoSpiner.value = false;
        toast.add({ severity: 'error', summary: 'Error', detail: 'Error al crear la imagen.', life: 5000 });
        console.log('Error al guardar imagen:', error);
    }
};

// Función para eliminar una imagen
function confirmarEliminarImagen(imagen) {
    idImagen.value = imagen.id;

    confirm.require({
        message: '¿Estás seguro de eliminar esta imagen?',
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
            eliminarImagenServidor();
        },
        reject: () => {}
    });
}

// Función para eliminar la imagen en el servidor
const eliminarImagenServidor = async () => {
    const token = userData.access_token;

    try {
        verCargandoSpiner.value = true;
        await axios.delete(URL + 'config-imagenes-principal/' + idImagen.value, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        toast.add({ severity: 'success', summary: 'Éxito', detail: 'Imagen eliminada exitosamente.', life: 5000 });
        verCargandoSpiner.value = false;
        consultarImagenes();
    } catch (error) {
        verCargandoSpiner.value = false;
        toast.add({ severity: 'error', summary: 'Error', detail: 'Error al eliminar la imagen.', life: 5000 });
        console.log('Error al eliminar imagen:', error);
    }
};

function onFileChange(event) {
    const file = event.target.files[0];
    if (file) {
        nuevaImagen.value = file;
    }
}
</script>

<template>
    <div>
        <Cargando v-if="verCargandoSpiner" />

        <Button label="Agregar Imagen" icon="pi pi-plus" class="my-2" @click="abrirModalCrearImagen" />

        <DataTable
            v-if="imagenes.length > 0"
            ref="dt"
            :value="imagenes"
            dataKey="id"
            :paginator="true"
            :rows="10"
            :filters="filters"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            :rowsPerPageOptions="[5, 10, 25]"
            currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} imagenes"
            size="small"
        >
            <template #header>
                <div class="flex flex-wrap gap-2 items-center justify-between">
                    <h4 class="m-0">Registro de imagenes</h4>
                    <IconField>
                        <InputIcon>
                            <i class="pi pi-search" />
                        </InputIcon>
                        <InputText v-model="filters['global'].value" placeholder="Buscar..." />
                    </IconField>
                </div>
            </template>

            <Column field="nombre" header="Documento" sortable style="min-width: 2rem"></Column>
            <Column header="Imagen" sortable style="min-width: 12rem">
                <template #body="slotProps">
                    <div class="card flex justify-center">
                        <Image :src="DOMINIO + slotProps.data.url" alt="Image" width="50" preview />
                    </div>
                </template>
            </Column>
            <Column field="estado" header="Estado" sortable style="min-width: 12rem">
                <template #body="slotProps">
                    <Tag v-if="slotProps.data.estado == 'activa'" :value="slotProps.data.estado" severity="success" />
                    <Tag v-else :value="slotProps.data.estado" severity="danger" />
                </template>
            </Column>
            <Toast />
            <Column :exportable="false" style="min-width: 12rem" header="Acciones">
                <template #body="slotProps">
                    <Button icon="pi pi-trash" outlined rounded severity="danger" v-tooltip="{ value: 'Eliminar estudiante', showDelay: 0, hideDelay: 0 }" @click="confirmarEliminarImagen(slotProps.data)" />
                </template>
            </Column>
        </DataTable>

        <Dialog v-model:visible="verModalCrearImagen" :style="{ width: '600px' }" header="Configuración de Imagen" :modal="true" :draggable="false" @hide="ocultarModalCrearImagen">
            <div class="flex flex-col gap-6">
                <div class="grid grid-cols-12 gap-4">
                    <div class="col-span-12">
                        <label for="imagen" class="block font-bold mb-3">Imagen</label>
                        <input type="file" id="imagen" ref="imagen" @change="onFileChange" class="p-inputtext p-component w-full" />
                        <small v-if="submitted && !nuevaImagen" class="text-red-500">Debe seleccionar una imagen</small>
                    </div>
                    <div class="col-span-12">
                        <label for="descripcion" class="block font-bold mb-3">Nombre</label>
                        <InputText id="descripcion" v-model.trim="nombreImgaen" placeholder="Ingrese una breve descripción de la imagen" class="w-full" />
                        <small v-if="submitted && !nombreImgaen" class="text-red-500">El nombre es requerido</small>
                    </div>
                    <div class="col-span-6">
                        <span class="block font-bold mb-4">Estado</span>
                        <div class="grid grid-cols-6 gap-4">
                            <div class="flex items-center gap-2 col-span-6">
                                <RadioButton id="estadoActivo" v-model="estadoImagen" name="estado" value="activa" />
                                <label for="estadoActivo">Activa</label>
                            </div>
                            <div class="flex items-center gap-2 col-span-6">
                                <RadioButton id="estadoInactivo" v-model="estadoImagen" name="estado" value="inactiva" />
                                <label for="estadoInactivo">Inactiva</label>
                            </div>
                            <small v-if="submitted && !estadoImagen" class="text-red-500">El estado es requerido</small>
                        </div>
                    </div>
                </div>
            </div>

            <template #footer>
                <Toast />
                <Button label="Cancelar" icon="pi pi-times" text @click="ocultarModalCrearImagen" />
                <Button label="Guardar" icon="pi pi-check" @click="guardarImagen" />
            </template>
        </Dialog>
    </div>
</template>

<style scoped>
/* Estilos adicionales según sea necesario */
</style>
