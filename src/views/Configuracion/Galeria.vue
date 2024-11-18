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
const galeria = ref([]);
const verModalCrearGaleria = ref(false);
const headerModalGaleria = ref('Crear Anuncio');
const galeriaSeleccionada = ref(null);
const nuevaGaleria = ref(null);
const submitted = ref(false);

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

onMounted(() => {
    // Validar token
    validarToken(userData);
    // Consultar galeria
    consultarGaleria();
});

// Función para consultar galeria
const consultarGaleria = async () => {
    const token = userData.access_token;
    verCargandoSpiner.value = true;

    try {
        const response = await axios.get(URL + 'galeria', {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });

        galeria.value = response.data.data;
        verCargandoSpiner.value = false;
    } catch (err) {
        console.error(err);
        verCargandoSpiner.value = false;
        toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los galeria.', life: 5000 });
    }
};

function abrirModalCrearGaleria(anuncio = null) {
    submitted.value = false;
    headerModalGaleria.value = anuncio ? 'Editar' : 'Crear';

    console.log('Anuncio: ', anuncio);

    if (anuncio.titulo) {
        galeriaSeleccionada.value = anuncio;
        // Si es para editar, asegurarnos de que `nuevaGaleria` siempre tenga datos válidos
        nuevaGaleria.value = {
            titulo: anuncio.titulo || '',
            descripcion: anuncio.descripcion || '',
            fecha_publicacion: anuncio.fecha_publicacion || '',
            tipo: anuncio.tipo || '',
            estado: anuncio.activo || '',
            imagen: anuncio.imagen || null
        };
    } else {
        galeriaSeleccionada.value = null;
        // Si es para crear un nuevo anuncio, aseguramos que `nuevaGaleria` esté vacío
        nuevaGaleria.value = {
            titulo: '',
            descripcion: '',
            fecha_publicacion: '',
            tipo: '',
            estado: '',
            imagen: null
        };
    }

    console.log(galeriaSeleccionada.value);
    verModalCrearGaleria.value = true;
}

// Función para guardar el anuncio en el servidor
const guardarGaleria = async () => {
    submitted.value = true;

    if (!nuevaGaleria.value.titulo || !nuevaGaleria.value.descripcion || !nuevaGaleria.value.fecha_publicacion || !nuevaGaleria.value.tipo || !nuevaGaleria.value.estado) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Campos requeridos.', life: 5000 });
        return;
    }

    try {
        const token = userData.access_token;
        const formData = new FormData();
        formData.append('titulo', nuevaGaleria.value.titulo);
        formData.append('descripcion', nuevaGaleria.value.descripcion);
        formData.append('fecha_publicacion', convertirAFechaMySQL(nuevaGaleria.value.fecha_publicacion));
        formData.append('tipo', nuevaGaleria.value.tipo);
        formData.append('activo', nuevaGaleria.value.estado);
        if (nuevaGaleria.value.imagen) {
            formData.append('imagen', nuevaGaleria.value.imagen);
        }

        verCargandoSpiner.value = true;
        console.log(nuevaGaleria.value);
        const response = galeriaSeleccionada.value
            ? await axios.post(URL + 'actualizar-galeria/' + galeriaSeleccionada.value.id, formData, {
                  headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` }
              })
            : await axios.post(URL + 'galeria', formData, {
                  headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` }
              });

        toast.add({ severity: 'success', summary: 'Éxito', detail: 'Guardado exitosamente.', life: 5000 });
        verCargandoSpiner.value = false;
        ocultarModalCrearGaleria();
        consultarGaleria();
    } catch (error) {
        verCargandoSpiner.value = false;
        toast.add({ severity: 'error', summary: 'Error', detail: 'Error al guardar', life: 5000 });
        console.log('Error al guardar anuncio:', error);
    }
};

// Función para eliminar un anuncio
function confirmarEliminarGaleria(anuncio) {
    confirm.require({
        message: '¿Estás seguro de eliminar?',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            eliminarGaleriaServidor(anuncio);
        },
        reject: () => {}
    });
}

// Función para eliminar el anuncio en el servidor
const eliminarGaleriaServidor = async (anuncio) => {
    const token = userData.access_token;
    try {
        verCargandoSpiner.value = true;
        await axios.delete(URL + 'galeria/' + anuncio.id, {
            headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
        });

        toast.add({ severity: 'success', summary: 'Éxito', detail: 'Eliminado exitosamente.', life: 5000 });
        verCargandoSpiner.value = false;
        consultarGaleria();
    } catch (error) {
        verCargandoSpiner.value = false;
        toast.add({ severity: 'error', summary: 'Error', detail: 'Error al eliminar', life: 5000 });
        console.log('Error al eliminar anuncio:', error);
    }
};

// Función para manejar el cambio de imagen
function onFileChange(event) {
    const file = event.target.files[0];
    if (file) {
        nuevaGaleria.value.imagen = file;
    }
}

// Función para cerrar el modal
function ocultarModalCrearGaleria() {
    verModalCrearGaleria.value = false;
    submitted.value = false;
    nuevaGaleria.value.imagen = null;
}

const convertirAFechaMySQL = (fechaISO) => {
    const fecha = new Date(fechaISO);

    // Obteniendo los componentes de la fecha
    const anio = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses son indexados desde 0
    const dia = String(fecha.getDate()).padStart(2, '0');

    // Obteniendo los componentes de la hora
    const horas = String(fecha.getHours()).padStart(2, '0');
    const minutos = String(fecha.getMinutes()).padStart(2, '0');
    const segundos = String(fecha.getSeconds()).padStart(2, '0');

    // Formateo final para MySQL
    return `${anio}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
};

</script>
<template>
    <div>
        <Cargando v-if="verCargandoSpiner" />

        <Button label="Agregar" icon="pi pi-plus" class="my-2" @click="abrirModalCrearGaleria" />

        <DataTable
            v-if="galeria.length > 0"
            ref="dt"
            :value="galeria"
            dataKey="id"
            :paginator="true"
            :rows="10"
            :filters="filters"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            :rowsPerPageOptions="[5, 10, 25]"
            currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} galeria"
            size="small"
        >
            <template #header>
                <div class="flex flex-wrap gap-2 items-center justify-between">
                    <h4 class="m-0">Registro de imágenes</h4>
                    <IconField>
                        <InputIcon>
                            <i class="pi pi-search" />
                        </InputIcon>
                        <InputText v-model="filters['global'].value" placeholder="Buscar..." />
                    </IconField>
                </div>
            </template>

            <Column field="titulo" header="Título" sortable style="min-width: 10rem"></Column>
            <Column field="tipo" header="Tipo" sortable style="min-width: 8rem"></Column>
            <Column header="Imagen" sortable style="min-width: 10rem">
                <template #body="slotProps">
                    <div class="card flex justify-center">
                        <Image :src="DOMINIO + slotProps.data.url_imagen" alt="Image" width="50" preview />
                    </div>
                </template>
            </Column>
            <Column field="estado" header="Estado" sortable style="min-width: 8rem">
                <template #body="slotProps">
                    <Tag v-if="slotProps.data.activo" value="Activo" severity="success" />
                    <Tag v-else value="Inactivo" severity="danger" />
                </template>
            </Column>
            <Column :exportable="false" style="min-width: 12rem" header="Acciones">
                <template #body="slotProps">
                    <Button icon="pi pi-pencil" outlined rounded severity="info" @click="abrirModalCrearGaleria(slotProps.data)" />
                    <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmarEliminarGaleria(slotProps.data)" />
                </template>
            </Column>
        </DataTable>
        <Dialog v-model:visible="verModalCrearGaleria" :style="{ width: '600px' }" header="Configuración de imagen" :modal="true" :draggable="false" @hide="ocultarModalCrearGaleria">
            <div class="flex flex-col gap-6">
                <div class="grid grid-cols-12 gap-4">
                    <!-- Título -->
                    <div class="col-span-12">
                        <label for="titulo" class="block font-bold mb-3">Título</label>
                        <input type="text" id="titulo" v-model="nuevaGaleria.titulo" required autofocus class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500" />
                        <small v-if="submitted && !nuevaGaleria.titulo" class="text-red-500">El título es requerido</small>
                    </div>

                    <!-- Descripción -->
                    <div class="col-span-12">
                        <label for="descripcion" class="block font-bold mb-3">Descripción</label>
                        <textarea id="descripcion" v-model="nuevaGaleria.descripcion" rows="5" required class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"></textarea>
                        <small v-if="submitted && !nuevaGaleria.descripcion" class="text-red-500">La descripción es requerida</small>
                    </div>

                    <!-- Fecha de Publicación -->
                    <div class="col-span-6">
                        <label for="fecha_publicacion" class="block font-bold mb-3">Fecha de Publicación</label>
                        <input type="date" id="fecha_publicacion" v-model="nuevaGaleria.fecha_publicacion" required class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500" />
                        <small v-if="submitted && !nuevaGaleria.fecha_publicacion" class="text-red-500">La fecha es requerida</small>
                    </div>

                    <!-- Tipo de Anuncio -->
                    <div class="col-span-6">
                        <label for="tipo" class="block font-bold mb-3">Tipo</label>
                        <select id="tipo" v-model="nuevaGaleria.tipo" required class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500">
                            <option value="" disabled>Seleccione un tipo</option>
                            <option value="noticia">Noticia</option>
                            <option value="evento">Evento</option>
                            <option value="anuncio">Anuncio</option>
                        </select>
                        <small v-if="submitted && !nuevaGaleria.tipo" class="text-red-500">El tipo es requerido</small>
                    </div>

                    <!-- Estado -->
                    <div class="col-span-6">
                        <label for="estado" class="block font-bold mb-3">Estado</label>
                        <select id="estado" v-model="nuevaGaleria.estado" required class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500">
                            <option value="" disabled>Seleccione un estado</option>
                            <option value="1">Activo</option>
                            <option value="0">Inactivo</option>
                        </select>
                        <small v-if="submitted && !nuevaGaleria.estado" class="text-red-500">El estado es requerido</small>
                    </div>

                    <!-- Imagen -->
                    <div class="col-span-12">
                        <label for="imagen" class="block font-bold mb-3">Imagen</label>
                        <input type="file" id="imagen" accept="image/*" @change="onFileChange" class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500" />
                        <small v-if="submitted && !nuevaGaleria.imagen" class="text-red-500">Debe seleccionar una imagen</small>
                    </div>
                </div>
            </div>

            <template #footer>
                <Toast />
                <button
                    type="button"
                    class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    @click="ocultarModalCrearGaleria"
                >
                    Cancelar
                </button>
                <Button :label="galeriaSeleccionada ? 'Actualizar' : 'Crear'" @click="guardarGaleria" />
            </template>
        </Dialog>
    </div>
</template>
