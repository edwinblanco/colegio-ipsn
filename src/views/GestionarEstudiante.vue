<script setup>
import store from '@/store';
import { URL, validarToken } from '@/utils';
import { FilterMatchMode } from '@primevue/core/api';
import axios from 'axios';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref } from 'vue';
import Cargando from './Componentes/Cargando.vue';

const userData1 = store.getters['auth/getUser'];
const isAuthenticated1 = store.getters['auth/isAuthenticated'];

// cargar grados
const gradoSeleccionado = ref(null);
const grados = ref([]);
const estudiantes = ref([]);
const verCargandoSpiner = ref(false);
const toast = useToast();
const confirm = useConfirm();
const dt = ref();
const selectedProducts = ref();
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});
const submitted = ref(false);
const idEstudiante = ref(null);
const editarEstudiante = ref(false);
const headerModalEstudiante = ref('Crear estudiante');

const verModalCrearEstudiante = ref(false);
const primerNombre = ref(null);
const segundoNombre = ref(null);
const primerApellido = ref(null);
const segundoApellido = ref(null);
const numeroDocumento = ref(null);
const fechaNacimiento = ref(null);
const email = ref(null);
const estadoEstudiante = ref(null);

onMounted(() => {
    // Validar el token
    validarToken(userData1);
    // Se cargan las grados del profesor
    consultarGrados();
    consultarEstudiantes();
});

const consultarGrados = async () => {
    const id = userData1.user.id; // Obtener el ID del usuario
    const token = userData1.access_token;
    verCargandoSpiner.value = true;

    try {
        const response = await axios.get(URL + `ver-grados`, {
            headers: {
                Authorization: `Bearer ${token}`, // Agregar el Bearer token
                Accept: 'application/json', // Tipo de respuesta aceptada
                'Content-Type': 'application/json' // Tipo de contenido
            }
        });

        let gradosList = [];

        response.data.data.map((num, index) => {
            let grado = { name: num.grado + ' - ' + num.salon, code: num.id };
            gradosList.push(grado);
        });

        grados.value = gradosList;
        verCargandoSpiner.value = false;
    } catch (err) {
        verCargandoSpiner.value = false;
        console.log('Error al obtener datos: ' + err.message); // Manejo de errores
    }
};

const consultarEstudiantes = async () => {
    // Obtener el token Bearer
    const token = userData1.access_token;
    verCargandoSpiner.value = true;
    estudiantes.value = [];

    try {
        const response = await axios.get(URL + `ver-estudiantes`, {
            headers: {
                Authorization: `Bearer ${token}`, // Agregar el Bearer token
                Accept: 'application/json', // Tipo de respuesta aceptada
                'Content-Type': 'application/json' // Tipo de contenido
            }
        });

        console.log('estudiantes: ', response);
        estudiantes.value = response.data.data;

        verCargandoSpiner.value = false;
    } catch (err) {
        console.log('Error al obtener datos: ', err); // Manejo de errores
        verCargandoSpiner.value = false;
    }
};

function abrirModalEstudiante() {
    submitted.value = false;
    verModalCrearEstudiante.value = true;
}

function ocultarModalCrearEstudiante() {
    editarEstudiante.value = false;
    headerModalEstudiante.value = 'Crear estudiante';
    verModalCrearEstudiante.value = false;
    submitted.value = false;

    primerNombre.value = null;
    segundoApellido.value = null;
    primerApellido.value = null;
    segundoNombre.value = null;
    numeroDocumento.value = null;
    email.value = null;
    estadoEstudiante.value = null;
    gradoSeleccionado.value = null;
}

function guardarEstudiante() {
    submitted.value = true;

    // Verificar si alguno de los campos está vacío
    if (!primerNombre.value || !primerApellido.value || !segundoApellido.value || !numeroDocumento.value || !fechaNacimiento.value || !gradoSeleccionado.value || !estadoEstudiante.value) {
        console.log('Error: Todos los campos son obligatorios.');
        return; // No continuar si algún campo está vacío
    }

    // Si todos los campos están llenos, proceder con la solicitud

    confirmarCreacionEstudiante();
}

function editarEstudiante2() {
    submitted.value = true;

    // Verificar si alguno de los campos está vacío
    if (!primerNombre.value || !primerApellido.value || !segundoApellido.value || !numeroDocumento.value || !fechaNacimiento.value || !gradoSeleccionado.value || !estadoEstudiante.value) {
        console.log('Error: Todos los campos son obligatorios.');
        return; // No continuar si algún campo está vacío
    }

    confirmarEditarEstudiante();
}

const confirmarCreacionEstudiante = () => {
    confirm.require({
        message: '¿está seguro de crear el estudiante?',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        rejectProps: {
            label: 'Cancelar',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: 'Guardar'
        },
        accept: () => {
            guardarEstudianteServidor();
        },
        reject: () => {
            //toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
};

const guardarEstudianteServidor = async () => {
    try {
        verCargandoSpiner.value = true;
        const token = userData1.access_token;
        const response = await axios.post(
            URL + 'registro-estudiante',
            {
                primer_nombre: primerNombre.value,
                segundo_nombre: segundoNombre.value,
                primer_apellido: primerApellido.value,
                segundo_apellido: segundoApellido.value,
                numero_documento: numeroDocumento.value,
                fecha_nacimiento: convertirAFechaMySQL(fechaNacimiento.value),
                email: email.value,
                password: numeroDocumento.value,
                estado: estadoEstudiante.value,
                grado_id: gradoSeleccionado.value.code
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
        );

        console.log('respuesta: ', response);
        verCargandoSpiner.value = false;
        ocultarModalCrearEstudiante();
        toast.add({ severity: 'info', summary: 'Confirmado', detail: 'estudiante creado', life: 6000 });
        consultarEstudiantes();

        primerNombre.value = null;
        segundoApellido.value = null;
        primerApellido.value = null;
        segundoNombre.value = null;
        numeroDocumento.value = null;
        email.value = null;
        estadoEstudiante.value = null;
        gradoSeleccionado.value = null;
    } catch (error) {
        verCargandoSpiner.value = false;
        console.log(error);
        let errorMessage = error?.response?.data?.msg || 'Error desconocido'; // Mensaje por defecto
        if (error.status == 422) {
            errorMessage = error.response.data.message;
        }
        toast.add({ severity: 'error', summary: 'Error', detail: `Error al guardar: ${errorMessage}`, life: 10000 });
    }
};

const confirmarEditarEstudiante = () => {
    confirm.require({
        message: '¿está seguro de editar el estudiante?',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        rejectProps: {
            label: 'Cancelar',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: 'Editar'
        },
        accept: () => {
            editarEstudianteServidor();
        },
        reject: () => {
            //toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
};

const editarEstudianteServidor = async () => {
    try {
        verCargandoSpiner.value = true;
        const token = userData1.access_token; // Reemplaza esto con tu token Bearer real
        const response = await axios.put(
            URL + 'actualizar-estudiante/' + idEstudiante.value,
            {
                primer_nombre: primerNombre.value,
                segundo_nombre: segundoNombre.value,
                primer_apellido: primerApellido.value,
                segundo_apellido: segundoApellido.value,
                numero_documento: numeroDocumento.value,
                fecha_nacimiento: convertirAFechaMySQL(fechaNacimiento.value),
                email: email.value,
                password: numeroDocumento.value,
                estado: estadoEstudiante.value,
                grado_id: gradoSeleccionado.value.code
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
        );

        console.log('respuesta editar: ', response);
        verCargandoSpiner.value = false;
        ocultarModalCrearEstudiante();
        toast.add({ severity: 'info', summary: 'Confirmado', detail: 'Estudiante actualizado', life: 6000 });
        consultarEstudiantes();

        primerNombre.value = null;
        segundoApellido.value = null;
        primerApellido.value = null;
        segundoNombre.value = null;
        numeroDocumento.value = null;
        email.value = null;
        estadoEstudiante.value = null;
        gradoSeleccionado.value = null;
    } catch (error) {
        const errorMessage = error?.response?.data?.msg || 'Error desconocido'; // Mensaje por defecto
        if (error.status == 422) {
            errorMessage = error.response.data.message;
        }
        toast.add({ severity: 'error', summary: 'Error', detail: `Error: ${errorMessage}`, life: 10000 });
        console.log('error editando el estudiante: ', error);
        verCargandoSpiner.value = false;
    }
};

const abrirModalEditarExamen = (estudiante) => {
    idEstudiante.value = estudiante.id;
    let grado = { name: estudiante.grado.grado + ' - ' + estudiante.grado.salon, code: estudiante.grado.id };
    gradoSeleccionado.value = grado;
    editarEstudiante.value = true;
    headerModalEstudiante.value = 'Editar  estudiante';
    primerNombre.value = estudiante.primer_nombre;
    segundoApellido.value = estudiante.segundo_apellido;
    primerApellido.value = estudiante.primer_apellido;
    segundoNombre.value = estudiante.segundo_nombre;
    numeroDocumento.value = estudiante.numero_documento;
    fechaNacimiento.value = estudiante.fecha_nacimiento;
    email.value = estudiante.email;
    estadoEstudiante.value = estudiante.estado;

    verModalCrearEstudiante.value = true;
};

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

const confirmarEliminarEstudiante = (estudiante) => {
    idEstudiante.value = estudiante.id;
    gradoSeleccionado.value = { name: estudiante.grado.grado+' - '+estudiante.grado.salon, code: estudiante.grado.id};

    confirm.require({
        message: '¿está seguro de eliminar el estudiante?',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        rejectProps: {
            label: 'Cancelar',
            severity: 'danger',
            outlined: true
        },
        acceptProps: {
            label: 'Eliminar'
        },
        accept: () => {
            eliminarEstudianteServidor();
        },
        reject: () => {
            //toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
};

const eliminarEstudianteServidor = async () => {
    verCargandoSpiner.value = true;

    try {
        const token = userData1.access_token;
        const response = await axios.delete(URL + 'eliminar-estudiante/' + idEstudiante.value, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        toast.add({ severity: 'success', summary: 'Eliminado con exito', detail: `Estudiante eliminado con exito`, life: 10000 });
        verCargandoSpiner.value = false;
        consultarEstudiantes();
    } catch (error) {
        console.log(error);
        const errorMessage = error?.response?.data?.msg || 'Error desconocido'; // Mensaje por defecto
        verCargandoSpiner.value = false;
        toast.add({ severity: 'error', summary: 'Error', detail: `Error al eliminar: ${errorMessage}`, life: 10000 });
    }
};
</script>

<template>
    <div>
        <div class="card" v-if="grados">
            <Toolbar class="mb-1">
                <template #start>
                    <Button label="Crear estudiante" icon="pi pi-plus" severity="secondary" class="mr-2" @click="abrirModalEstudiante" />
                </template>
            </Toolbar>

            <DataTable
                v-if="estudiantes.length > 0"
                ref="dt"
                v-model:selection="selectedProducts"
                :value="estudiantes"
                dataKey="id"
                :paginator="true"
                :rows="10"
                :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[5, 10, 25]"
                currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} exámenes"
                size="small"
            >
                <template #header>
                    <div class="flex flex-wrap gap-2 items-center justify-between">
                        <h4 class="m-0">Registro de estudiantes</h4>
                        <IconField>
                            <InputIcon>
                                <i class="pi pi-search" />
                            </InputIcon>
                            <InputText v-model="filters['global'].value" placeholder="Buscar..." />
                        </IconField>
                    </div>
                </template>

                <Column field="numero_documento" header="Documento" sortable style="min-width: 2rem"></Column>
                <Column field="primer_apellido" header="Primer Apellido" sortable style="min-width: 2rem"></Column>
                <Column field="segundo_apellido" header="Segundo Apellido" sortable style="min-width: 2rem"></Column>
                <Column field="primer_nombre" header="Primer Nombre" sortable style="min-width: 2rem"></Column>
                <Column field="segundo_nombre" header="Primer Apellido" sortable style="min-width: 2rem"></Column>
                <Column field="created_at" header="Fecha Creación" sortable style="min-width: 2rem"></Column>
                <Column header="Grado" sortable style="min-width: 2rem">
                    <template #body="slotProps"> {{ slotProps.data.grado.grado }}° - {{ slotProps.data.grado.salon }} </template>
                </Column>
                <Column field="estado" header="Estado" sortable style="min-width: 12rem">
                    <template #body="slotProps">
                        <Tag v-if="slotProps.data.estado == 'activo'" :value="slotProps.data.estado" severity="success" />
                        <Tag v-else :value="slotProps.data.estado" severity="danger" />
                    </template>
                </Column>
                <Toast />
                <ConfirmDialog></ConfirmDialog>
                <Column :exportable="false" style="min-width: 12rem" header="Acciones">
                    <template #body="slotProps">
                        <Button icon="pi pi-pencil" outlined rounded class="mr-2" v-tooltip="{ value: 'Editar estudiante', showDelay: 0, hideDelay: 0 }" @click="abrirModalEditarExamen(slotProps.data)" />
                        <Button icon="pi pi-trash" outlined rounded severity="danger" v-tooltip="{ value: 'Eliminar estudiante', showDelay: 0, hideDelay: 0 }" @click="confirmarEliminarEstudiante(slotProps.data)" />
                    </template>
                </Column>
            </DataTable>
        </div>

        <Dialog v-model:visible="verModalCrearEstudiante" :style="{ width: '750px' }" :header="headerModalEstudiante" :modal="true" :draggable="false" @hide="ocultarModalCrearEstudiante">
            <div class="flex flex-col gap-6">
                <div class="grid grid-cols-12 gap-4">
                    <div class="col-span-6">
                        <label for="name" class="block font-bold mb-3">Grado</label>
                        <Select v-if="grados" v-model="gradoSeleccionado" :options="grados" optionLabel="name" placeholder="Seleccione un grado" fluid />
                        <small v-if="submitted && !gradoSeleccionado" class="text-red-500">Debe seleccionar un grado</small>
                    </div>
                    <div class="col-span-6">
                        <label for="primerNombre" class="block font-bold mb-3">Primer Nombre</label>
                        <InputText id="primerNombre" v-model.trim="primerNombre" required :invalid="submitted && !primerNombre" fluid />
                        <small v-if="submitted && !primerNombre" class="text-red-500">El primer nombre es requerido</small>
                    </div>
                    <div class="col-span-6">
                        <label for="segundoNombre" class="block font-bold mb-3">Segundo Nombre</label>
                        <InputText id="segundoNombre" v-model.trim="segundoNombre" fluid />
                    </div>
                    <div class="col-span-6">
                        <label for="primerApellido" class="block font-bold mb-3">Primer Apellido</label>
                        <InputText id="primerApellido" v-model.trim="primerApellido" required :invalid="submitted && !primerApellido" fluid />
                        <small v-if="submitted && !primerApellido" class="text-red-500">El primer apellido es requerido</small>
                    </div>
                    <div class="col-span-6">
                        <label for="segundoApellido" class="block font-bold mb-3">Segundo Apellido</label>
                        <InputText id="segundoApellido" v-model.trim="segundoApellido" fluid />
                        <small v-if="submitted && !segundoApellido" class="text-red-500">El segundo apellido es requerido</small>
                    </div>
                    <div class="col-span-6">
                        <label for="numeroDocumento" class="block font-bold mb-3">Número de Documento</label>
                        <InputText id="numeroDocumento" type="number" v-model.trim="numeroDocumento" required :invalid="submitted && !numeroDocumento" fluid />
                        <small v-if="submitted && !numeroDocumento" class="text-red-500">El número de documento es requerido</small>
                    </div>
                    <div class="col-span-6">
                        <label for="fechaNacimiento" class="block font-bold mb-3">Fecha de Nacimiento</label>
                        <DatePicker id="fechaNacimiento" v-model="fechaNacimiento" dateFormat="yy-mm-dd" placeholder="Selecciona la fecha" class="w-full" />
                        <small v-if="submitted && !fechaNacimiento" class="text-red-500">La fecha de nacimiento es requerida</small>
                    </div>
                    <div class="col-span-6">
                        <label for="email" class="block font-bold mb-3">Email</label>
                        <InputText id="email" v-model.trim="email" fluid />
                    </div>
                    <div class="col-span-6">
                        <span class="block font-bold mb-4">Estado</span>
                        <div class="grid grid-cols-6 gap-4">
                            <div class="flex items-center gap-2 col-span-6">
                                <RadioButton id="estadoActivo" v-model="estadoEstudiante" name="estado" value="activo" />
                                <label for="estadoActivo">Activo</label>
                            </div>
                            <div class="flex items-center gap-2 col-span-6">
                                <RadioButton id="estadoInactivo" v-model="estadoEstudiante" name="estado" value="inactivo" />
                                <label for="estadoInactivo">Inactivo</label>
                            </div>
                            <small v-if="submitted && !estadoEstudiante" class="text-red-500">El estado es requerido</small>
                        </div>
                    </div>
                </div>
            </div>
            <template #footer>
                <Toast />
                <Button label="Cancelar" icon="pi pi-times" text @click="ocultarModalCrearEstudiante" />
                <Button v-if="!editarEstudiante" label="Guardar" icon="pi pi-check" @click="guardarEstudiante" />
                <Button v-if="editarEstudiante" label="Editar" icon="pi pi-check" @click="editarEstudiante2" />
            </template>
        </Dialog>
    </div>
    <Cargando v-if="verCargandoSpiner" />

    <div v-if="!estudiantes.length && !verCargandoSpiner" class="card flex items-center justify-center my-4">
        <div class="p-card p-m-4">
            <p class="font-bold text-xl text-center">Sin información</p>
        </div>
    </div>
</template>
<style scoped></style>
