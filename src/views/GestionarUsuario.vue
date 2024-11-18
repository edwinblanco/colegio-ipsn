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
const sedeSeleccionada = ref(null);
const grados = ref([]);
const usuarios = ref([]);
const sedes = ref([]);
const verCargandoSpiner = ref(false);
const toast = useToast();
const confirm = useConfirm();
const dt = ref();
const selectedProducts = ref();
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});
const submitted = ref(false);
const idUsuario = ref(null);
const editarUsuario = ref(false);
const headerModalUsuario = ref('Crear usuario');

const verModalCrearUsuario = ref(false);
const primerNombre = ref(null);
const segundoNombre = ref(null);
const primerApellido = ref(null);
const segundoApellido = ref(null);
const numeroDocumento = ref(null);
const fechaNacimiento = ref(null);
const email = ref(null);
const estadoUsuario = ref(null);
const rolSeleccionado = ref(null);
const materias = ref([]);
const materiasSeleccionadas = ref(null);

const roles = ref([
    { name: 'profesor', code: 'profesor' },
    { name: 'estudiante', code: 'estudiante' },
    { name: 'administrador', code: 'admin' }
]);
onMounted(() => {
    // Validar el token
    validarToken(userData1);
    // Se cargan las grados del profesor
    consultarGrados();
    consultarSedes();
    consultarMaterias();
    consultarUsuarios();
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
        //verCargandoSpiner.value = false;
    } catch (err) {
        verCargandoSpiner.value = false;
        console.log('Error al obtener datos: ' + err.message); // Manejo de errores
    }
};

const consultarMaterias = async () => {
    const id = userData1.user.id; // Obtener el ID del usuario
    const token = userData1.access_token;
    verCargandoSpiner.value = true;

    try {
        const response = await axios.get(URL + `ver-materias`, {
            headers: {
                Authorization: `Bearer ${token}`, // Agregar el Bearer token
                Accept: 'application/json', // Tipo de respuesta aceptada
                'Content-Type': 'application/json' // Tipo de contenido
            }
        });

        let materiasList = [];

        response.data.data.map((num, index) => {
            let materia = { name: num.nombre, materia_id: num.id };
            materiasList.push(materia);
        });

        console.log('materias: ', response.data.data);

        materias.value = materiasList;
        //verCargandoSpiner.value = false;
    } catch (err) {
        verCargandoSpiner.value = false;
        console.log('Error al obtener datos: ' + err.message); // Manejo de errores
    }
};

const consultarSedes = async () => {
    const id = userData1.user.id; // Obtener el ID del usuario
    const token = userData1.access_token;
    verCargandoSpiner.value = true;

    try {
        const response = await axios.get(URL + `ver-sedes`, {
            headers: {
                Authorization: `Bearer ${token}`, // Agregar el Bearer token
                Accept: 'application/json', // Tipo de respuesta aceptada
                'Content-Type': 'application/json' // Tipo de contenido
            }
        });

        let sedesList = [];

        response.data.data.map((num, index) => {
            let grado = { name: num.nombre, code: num.id };
            sedesList.push(grado);
        });

        sedes.value = sedesList;
        //verCargandoSpiner.value = false;
    } catch (err) {
        verCargandoSpiner.value = false;
        console.log('Error al obtener datos: ' + err.message); // Manejo de errores
    }
};

const consultarUsuarios = async () => {
    // Obtener el token Bearer
    const token = userData1.access_token;
    verCargandoSpiner.value = true;
    usuarios.value = [];

    try {
        const response = await axios.get(URL + `ver-usuarios`, {
            headers: {
                Authorization: `Bearer ${token}`, // Agregar el Bearer token
                Accept: 'application/json', // Tipo de respuesta aceptada
                'Content-Type': 'application/json' // Tipo de contenido
            }
        });

        console.log('usuarios: ', response);
        usuarios.value = response.data.data;

        verCargandoSpiner.value = false;
    } catch (err) {
        console.log('Error al obtener datos: ', err); // Manejo de errores
        verCargandoSpiner.value = false;
    }
};

function abrirModalUsuarios() {
    submitted.value = false;
    verModalCrearUsuario.value = true;
}

function ocultarModalCrearUsuario() {
    editarUsuario.value = false;
    headerModalUsuario.value = 'Crear usuario';
    verModalCrearUsuario.value = false;
    submitted.value = false;

    primerNombre.value = null;
    segundoApellido.value = null;
    primerApellido.value = null;
    segundoNombre.value = null;
    numeroDocumento.value = null;
    email.value = null;
    estadoUsuario.value = null;
    gradoSeleccionado.value = null;
    sedeSeleccionada.value = null;
    fechaNacimiento.value = null;
    materiasSeleccionadas.value = null;
    rolSeleccionado.value = null;
}

function guardarUsuario() {
    submitted.value = true;

    // Verificar si alguno de los campos está vacío
    if (!rolSeleccionado.value || !primerNombre.value || !primerApellido.value || !segundoApellido.value || !numeroDocumento.value || !fechaNacimiento.value || !estadoUsuario.value) {
        console.log('Error: Todos los campos son obligatorios.');
        return; // No continuar si algún campo está vacío
    }

    if (rolSeleccionado.value.code === 'estudiante') {
        if (!gradoSeleccionado.value || !sedeSeleccionada.value) {
            console.log('Error: Todos los campos son obligatorios.');
            return; // No continuar si algún campo está vacío
        }
    }

    if (rolSeleccionado.value.code === 'profesor') {
        if (!materiasSeleccionadas.value) {
            console.log('Error: Todos los campos son obligatorios.');
            return; // No continuar si algún campo está vacío
        }
    }

    // Si todos los campos están llenos, proceder con la solicitud
    confirmarCreacionUsuario();
}

function editarUsuario2() {
    submitted.value = true;

    // Verificar si alguno de los campos está vacío
    if (!rolSeleccionado.value || !primerNombre.value || !primerApellido.value || !segundoApellido.value || !numeroDocumento.value || !fechaNacimiento.value || !estadoUsuario.value) {
        console.log('Error: Todos los campos son obligatorios.');
        return; // No continuar si algún campo está vacío
    }

    if (rolSeleccionado.value.code === 'estudiante') {
        if (!gradoSeleccionado.value || !sedeSeleccionada.value) {
            console.log('Error: Todos los campos son obligatorios.');
            return; // No continuar si algún campo está vacío
        }
    }

    if (rolSeleccionado.value.code === 'profesor') {
        if (!materiasSeleccionadas.value) {
            console.log('Error: Todos los campos son obligatorios.');
            return; // No continuar si algún campo está vacío
        }
    }

    confirmarEditarUsuario();
}

const confirmarCreacionUsuario = () => {
    confirm.require({
        message: '¿está seguro de crear el usuario?',
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
            guardarUsuarioServidor();
        },
        reject: () => {
            //toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
};

const guardarUsuarioServidor = async () => {
    try {
        verCargandoSpiner.value = true;
        const token = userData1.access_token;
        const response = await axios.post(
            URL + 'registro-usuario',
            {
                primer_nombre: primerNombre.value,
                segundo_nombre: segundoNombre.value,
                primer_apellido: primerApellido.value,
                segundo_apellido: segundoApellido.value,
                numero_documento: numeroDocumento.value,
                fecha_nacimiento: convertirAFechaMySQL(fechaNacimiento.value),
                email: email.value,
                password: numeroDocumento.value,
                estado: estadoUsuario.value,
                grado_id: rolSeleccionado.value.code == 'estudiante' ? gradoSeleccionado.value.code : null,
                sede_id: rolSeleccionado.value.code == 'estudiante' ? sedeSeleccionada.value.code : null,
                materias: rolSeleccionado.value.code == 'profesor' ? materiasSeleccionadas.value : null,
                rol: rolSeleccionado.value.code
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
        ocultarModalCrearUsuario();
        toast.add({ severity: 'info', summary: 'Confirmado', detail: 'Usuario creado', life: 6000 });
        consultarUsuarios();

        primerNombre.value = null;
        segundoApellido.value = null;
        primerApellido.value = null;
        segundoNombre.value = null;
        numeroDocumento.value = null;
        email.value = null;
        estadoUsuario.value = null;
        gradoSeleccionado.value = null;
        sedeSeleccionada.value = null;
        fechaNacimiento.value = null;
        materiasSeleccionadas.value = null;
        rolSeleccionado.value = null;
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

const confirmarEditarUsuario = () => {
    confirm.require({
        message: '¿está seguro de editar el usuario?',
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
            editarUsuarioServidor();
        },
        reject: () => {
            //toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
};

const editarUsuarioServidor = async () => {
    try {
        verCargandoSpiner.value = true;
        const token = userData1.access_token; // Reemplaza esto con tu token Bearer real
        const response = await axios.put(
            URL + 'actualizar-usuario/' + idUsuario.value,
            {
                primer_nombre: primerNombre.value,
                segundo_nombre: segundoNombre.value,
                primer_apellido: primerApellido.value,
                segundo_apellido: segundoApellido.value,
                numero_documento: numeroDocumento.value,
                fecha_nacimiento: convertirAFechaMySQL(fechaNacimiento.value),
                email: email.value,
                password: numeroDocumento.value,
                estado: estadoUsuario.value,
                grado_id: rolSeleccionado.value.code == 'estudiante' ? gradoSeleccionado.value.code : null,
                sede_id: rolSeleccionado.value.code == 'estudiante' ? sedeSeleccionada.value.code : null,
                materias: rolSeleccionado.value.code == 'profesor' ? materiasSeleccionadas.value : null,
                rol: rolSeleccionado.value.code
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
        ocultarModalCrearUsuario();
        toast.add({ severity: 'info', summary: 'Confirmado', detail: 'Usuario actualizado', life: 6000 });
        consultarUsuarios();

        primerNombre.value = null;
        segundoApellido.value = null;
        primerApellido.value = null;
        segundoNombre.value = null;
        numeroDocumento.value = null;
        email.value = null;
        estadoUsuario.value = null;
        gradoSeleccionado.value = null;
        sedeSeleccionada.value = null;
        fechaNacimiento.value = null;
        materiasSeleccionadas.value = null;
        rolSeleccionado.value = null;
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

const abrirModalEditarUsuario = (usuario) => {
    idUsuario.value = usuario.id;

    if (usuario.roles.some((obj) => obj.name === 'estudiante')) {
        rolSeleccionado.value = { name: 'estudiante', code: 'estudiante' };
        if (usuario.grado) {
            let grado = { name: usuario.grado.grado + ' - ' + usuario.grado.salon, code: usuario.grado.id };
            gradoSeleccionado.value = grado;
        }
        if (usuario.sede) {
            let sede = { name: usuario.sede.nombre, code: usuario.sede.id };
            sedeSeleccionada.value = sede;
        }
    }

    if (usuario.roles.some((obj) => obj.name === 'profesor')) {
        let materias = [];

        usuario.materias.forEach((element) => {
            materias.push({ name: element.nombre, materia_id: element.id });
        });

        materiasSeleccionadas.value = materias;
        rolSeleccionado.value = { name: 'profesor', code: 'profesor' };
    }

    if (usuario.roles.some((obj) => obj.name === 'admin')) {
        rolSeleccionado.value = { name: 'administrador', code: 'admin' };
    }

    editarUsuario.value = true;
    headerModalUsuario.value = 'Editar  usuario';
    primerNombre.value = usuario.primer_nombre;
    segundoApellido.value = usuario.segundo_apellido;
    primerApellido.value = usuario.primer_apellido;
    segundoNombre.value = usuario.segundo_nombre;
    numeroDocumento.value = usuario.numero_documento;
    fechaNacimiento.value = usuario.fecha_nacimiento;
    email.value = usuario.email;
    estadoUsuario.value = usuario.estado;

    verModalCrearUsuario.value = true;
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

const confirmarEliminarUsuario = (estudiante) => {
    idUsuario.value = estudiante.id;

    confirm.require({
        message: '¿está seguro de eliminar el usuario?',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        rejectProps: {
            label: 'Cancelar',
            severity: 'danger',
            outlined: true
        },
        acceptProps: {
            label: 'Eliminar',
            severity: 'danger'
        },
        accept: () => {
            eliminarUsuarioServidor();
        },
        reject: () => {
            //toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
};

const eliminarUsuarioServidor = async () => {
    verCargandoSpiner.value = true;

    try {
        const token = userData1.access_token;
        const response = await axios.delete(URL + 'eliminar-usuario/' + idUsuario.value, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        toast.add({ severity: 'success', summary: 'Eliminado con exito', detail: `Usuario eliminado con exito`, life: 10000 });
        verCargandoSpiner.value = false;
        consultarUsuarios();
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
        <div class="card" v-if="grados && sedes">
            <Toolbar class="mb-1">
                <template #start>
                    <Button label="Crear usuario" icon="pi pi-plus" severity="secondary" class="mr-2" @click="abrirModalUsuarios" />
                </template>
            </Toolbar>

            <DataTable
                v-if="usuarios.length > 0"
                ref="dt"
                v-model:selection="selectedProducts"
                :value="usuarios"
                dataKey="id"
                :paginator="true"
                :rows="10"
                :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[5, 10, 25]"
                currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} usuarios"
                size="small"
            >
                <template #header>
                    <div class="flex flex-wrap gap-2 items-center justify-between">
                        <h4 class="m-0">Registro de usuarios</h4>
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
                <Column field="roles_str" header="Rol" sortable style="min-width: 2rem"></Column>
                <Column field="created_at" header="Fecha Creación" sortable style="min-width: 2rem"></Column>
                <Column field="grado_str" header="Grado" sortable style="min-width: 2rem"></Column>
                <Column field="sede_str" header="Sede" sortable style="min-width: 2rem">
                    <template #body="slotProps">
                        {{ slotProps.data.sede_str }}
                    </template>
                </Column>
                <Column field="estado" header="Estado" sortable style="min-width: 12rem">
                    <template #body="slotProps">
                        <Tag v-if="slotProps.data.estado == 'activo'" :value="slotProps.data.estado" severity="success" />
                        <Tag v-else :value="slotProps.data.estado" severity="danger" />
                    </template>
                </Column>
                <Toast />
                <Column :exportable="false" style="min-width: 12rem" header="Acciones">
                    <template #body="slotProps">
                        <Button icon="pi pi-pencil" outlined rounded class="mr-2" v-tooltip="{ value: 'Editar usuario', showDelay: 0, hideDelay: 0 }" @click="abrirModalEditarUsuario(slotProps.data)" />
                        <Button icon="pi pi-trash" outlined rounded severity="danger" v-tooltip="{ value: 'Eliminar usuario', showDelay: 0, hideDelay: 0 }" @click="confirmarEliminarUsuario(slotProps.data)" />
                    </template>
                </Column>
            </DataTable>
        </div>

        <Dialog v-model:visible="verModalCrearUsuario" :style="{ width: '80%' }" :header="headerModalUsuario" :modal="true" :draggable="false" @hide="ocultarModalCrearUsuario">
            <div class="flex flex-col gap-6">
                <div class="grid grid-cols-12 gap-4">
                    <div class="col-span-6">
                        <label for="name" class="block font-bold mb-3">Rol</label>
                        <Select v-if="sedes" v-model="rolSeleccionado" :options="roles" optionLabel="name" placeholder="Seleccione un rol" fluid />
                        <small v-if="submitted && !rolSeleccionado" class="text-red-500">Debe seleccionar un rol</small>
                    </div>
                    <div v-if="rolSeleccionado && rolSeleccionado.code == 'profesor'" class="col-span-6">
                        <label for="materias" class="block font-bold mb-3">Materias</label>
                        <MultiSelect v-if="materias" v-model="materiasSeleccionadas" :options="materias" optionLabel="name" placeholder="Seleccione una o varias materias" class="w-full" />
                        <small v-if="submitted && (!materiasSeleccionadas || !materiasSeleccionadas.length)" class="text-red-500"> Debe seleccionar al menos una materia </small>
                    </div>
                    <div v-if="rolSeleccionado && rolSeleccionado.code == 'estudiante'" class="col-span-6">
                        <label for="name" class="block font-bold mb-3">Grado</label>
                        <Select v-if="grados" v-model="gradoSeleccionado" :options="grados" optionLabel="name" placeholder="Seleccione un grado" fluid />
                        <small v-if="submitted && !gradoSeleccionado" class="text-red-500">Debe seleccionar un grado</small>
                    </div>
                    <div v-if="rolSeleccionado && rolSeleccionado.code == 'estudiante'" class="col-span-6">
                        <label for="name" class="block font-bold mb-3">Sede</label>
                        <Select v-if="sedes" v-model="sedeSeleccionada" :options="sedes" optionLabel="name" placeholder="Seleccione una sede" fluid />
                        <small v-if="submitted && !sedeSeleccionada" class="text-red-500">Debe seleccionar una sede</small>
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
                                <RadioButton id="estadoActivo" v-model="estadoUsuario" name="estado" value="activo" />
                                <label for="estadoActivo">Activo</label>
                            </div>
                            <div class="flex items-center gap-2 col-span-6">
                                <RadioButton id="estadoInactivo" v-model="estadoUsuario" name="estado" value="inactivo" />
                                <label for="estadoInactivo">Inactivo</label>
                            </div>
                            <small v-if="submitted && !estadoUsuario" class="text-red-500">El estado es requerido</small>
                        </div>
                    </div>
                </div>
            </div>
            <template #footer>
                <Toast />
                <Button label="Cancelar" icon="pi pi-times" text @click="ocultarModalCrearUsuario" />
                <Button v-if="!editarUsuario" label="Guardar" icon="pi pi-check" @click="guardarUsuario" />
                <Button v-if="editarUsuario" label="Editar" icon="pi pi-check" @click="editarUsuario2" />
            </template>
        </Dialog>
    </div>
    <Cargando v-if="verCargandoSpiner" />

    <div v-if="usuarios.length == 0 && !verCargandoSpiner" class="card flex items-center justify-center my-4">
        <div class="p-card p-m-4">
            <p class="font-bold text-xl text-center">Sin información</p>
        </div>
    </div>
</template>
<style scoped></style>
