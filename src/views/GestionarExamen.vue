<script setup>
import { ProductService } from '@/service/ProductService';
import store from '@/store';
import { URL, validarToken } from '@/utils';
import { FilterMatchMode } from '@primevue/core/api';
import axios from 'axios';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref, watch } from 'vue';
import Cargando from './Componentes/Cargando.vue';
import PreguntasModal from './Componentes/PreguntasModal.vue';
import AsignarExamenGrado from './Componentes/AsignarExamenGrado.vue';

const userData1 = store.getters['auth/getUser'];
const isAuthenticated1 = store.getters['auth/isAuthenticated'];

const verModalPreguntas = ref(false);

// cargar materias
const materiaSeleccionada = ref(null);
const materias = ref([]);
const examenes = ref([]);
const descripcion = ref('');
const tituloExamen = ref('');
const fechaLimite = ref(null);
const estadoExamen = ref(null);
const verCargandoSpiner = ref(false);
const examenSeleccionado = ref(null);

const cargandoComponente = ref(true);
const esLocale = ref({
    firstDayOfWeek: 1,
    dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
    dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
    dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
    monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
    monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
    today: 'Hoy',
    clear: 'Limpiar'
});

// Track the active tab
const activeTab = ref('0');

// Watch for changes in the active tab
watch(activeTab, (newValue) => {
    console.log('Active tab changed to:', newValue);
});

onMounted(() => {
    ProductService.getProducts().then((data) => (products.value = data));

    // Validar el token
    validarToken(userData1);

    // Se cargan las materias del profesor
    consultarMaterias();

    cargandoComponente.value = false;
});

const toast = useToast();
const confirm = useConfirm();
const dt = ref();
const products = ref();
const verModalCrearExamen = ref(false);
const verModalAsginarExamenGrupo = ref(false);
const deleteProductsDialog = ref(false);
const product = ref({});
const selectedProducts = ref();
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});
const submitted = ref(false);

const consultarMaterias = async () => {
    const id = userData1.user.id; // Obtener el ID del usuario

    // Obtener el token Bearer
    const token = userData1.access_token;

    try {
        const response = await axios.get(URL + `materias-por-profesor/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Agregar el Bearer token
                Accept: 'application/json', // Tipo de respuesta aceptada
                'Content-Type': 'application/json' // Tipo de contenido
            }
        });

        let materiasList = [];

        response.data.data.map((num, index) => {
            let materia = { name: num.nombre, code: num.id, bg_color: num.bg_color };
            materiasList.push(materia);
        });

        materias.value = materiasList;
    } catch (err) {
        console.log('Error al obtener datos: ' + err.message); // Manejo de errores
    }
};

const consultarExamenes = async (materia) => {
    // Obtener el token Bearer
    const token = userData1.access_token;
    verCargandoSpiner.value = true;
    examenes.value = [];

    try {
        const response = await axios.get(URL + `examenes-materia/${materia}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Agregar el Bearer token
                Accept: 'application/json', // Tipo de respuesta aceptada
                'Content-Type': 'application/json' // Tipo de contenido
            }
        });

        console.log('examens: ', response);

        let examenesList = [];

        response.data.data.map((num, index) => {
            let severity = num.estado === 'activo' ? 'success' : 'danger';

            let examen = {
                titulo: num.titulo,
                code: num.id,
                fecha_limite: num.fecha_limite,
                estado: num.estado,
                descripcion: num.descripcion,
                severity: severity
            };
            examenesList.push(examen);
        });

        examenes.value = examenesList;
        verCargandoSpiner.value = false;
    } catch (err) {
        console.log('Error al obtener datos: ' + err.message); // Manejo de errores
        verCargandoSpiner.value = false;
    }
};

function abrirModalExamen() {
    product.value = {};
    submitted.value = false;
    verModalCrearExamen.value = true;
}

function abrirModalPreguntas(data) {
    examenSeleccionado.value = data;
    verModalPreguntas.value = true;
}

function abrirModalAsignarExamenGrado(data) {
    examenSeleccionado.value = data;
    verModalAsginarExamenGrupo.value = true;
}

function cerrarModalPreguntas() {
    examenSeleccionado.value = null;
    verModalPreguntas.value = false;
}

function cerrarModalAsignarExamenGrado() {
    examenSeleccionado.value = null;
    verModalAsginarExamenGrupo.value = false;
}

function hideDialog() {
    verModalCrearExamen.value = false;
    submitted.value = false;
}

function guardarExamen() {
    submitted.value = true;

    // Verificar si alguno de los campos está vacío
    if (!materiaSeleccionada.value || !tituloExamen.value || !fechaLimite.value || !estadoExamen.value) {
        console.log('Error: Todos los campos son obligatorios.');
        return; // No continuar si algún campo está vacío
    }

    // Si todos los campos están llenos, proceder con la solicitud
    confirm1();
}

const confirm1 = () => {
    confirm.require({
        message: '¿está seguro de crear el examen?',
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
            guardarExamenServidor();
        },
        reject: () => {
            //toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
};

const guardarExamenServidor = async () => {
    try {
        verCargandoSpiner.value = true;
        const token = userData1.access_token; // Reemplaza esto con tu token Bearer real
        const response = await axios.post(
            URL + 'crear-examen',
            {
                materia_id: materiaSeleccionada.value.code,
                profesor_id: userData1.user.id,
                descripcion: descripcion.value,
                titulo: tituloExamen.value,
                fecha_limite: convertirAFechaMySQL(fechaLimite.value),
                estado: estadoExamen.value
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
        hideDialog();
        toast.add({ severity: 'info', summary: 'Confirmado', detail: 'Examen creado', life: 6000 });
        consultarExamenes(materiaSeleccionada.value.code);
    } catch (error) {
        verCargandoSpiner.value = false;
        toast.add({ severity: 'error', summary: 'Error', detail: 'Error al crear el examen', life: 6000 });
        console.log('error creando el examen: ', error);
    }
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

function exportCSV() {
    dt.value.exportCSV();
}

function confirmDeleteSelected() {
    deleteProductsDialog.value = true;
}
</script>

<template>
    <div v-if="isAuthenticated1">
        <!--<p>Bienvenid@, {{ userData1.user.primer_nombre }} {{ userData1.user.primer_apellido }}</p>-->
    </div>
    <div v-else>
        <p>No estás autenticado.</p>
    </div>
    <div class="card" v-if="cargandoComponente">
        <div class="rounded border border-surface-200 dark:border-surface-700 p-6 bg-surface-0 dark:bg-surface-900">
            <div class="flex mb-4">
                <Skeleton shape="circle" size="4rem" class="mr-2"></Skeleton>
                <div>
                    <Skeleton width="10rem" class="mb-2"></Skeleton>
                    <Skeleton width="5rem" class="mb-2"></Skeleton>
                    <Skeleton height=".5rem"></Skeleton>
                </div>
            </div>
            <Skeleton width="100%" height="150px"></Skeleton>
            <div class="flex justify-between mt-4">
                <Skeleton width="4rem" height="2rem"></Skeleton>
                <Skeleton width="4rem" height="2rem"></Skeleton>
            </div>
        </div>
    </div>
    <div v-if="!cargandoComponente">
        <div class="card" v-if="materias">
            <Toolbar class="mb-1">
                <template #start>
                    <Button label="Crear examen" icon="pi pi-plus" severity="secondary" class="mr-2" @click="abrirModalExamen" />
                    <Button label="Delete" icon="pi pi-trash" severity="secondary" @click="confirmDeleteSelected" :disabled="!selectedProducts || !selectedProducts.length" />
                </template>

                <template #end>
                    <Button label="Export" icon="pi pi-upload" severity="secondary" @click="exportCSV($event)" />
                </template>
            </Toolbar>

            <Tabs>
                <TabList>
                    <Tab v-for="materia in materias" :key="materia.name" :value="String(materia.code)" @click="consultarExamenes(materia.code)">
                        <i class="pi pi-book mr-1" /> <span>{{ materia.name }}</span>
                    </Tab>
                </TabList>
            </Tabs>

            <DataTable
                v-if="examenes.length > 0"
                ref="dt"
                v-model:selection="selectedProducts"
                :value="examenes"
                dataKey="id"
                :paginator="true"
                :rows="10"
                :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[5, 10, 25]"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
            >
                <template #header>
                    <div class="flex flex-wrap gap-2 items-center justify-between">
                        <h4 class="m-0">Registro de examenes</h4>
                        <IconField>
                            <InputIcon>
                                <i class="pi pi-search" />
                            </InputIcon>
                            <InputText v-model="filters['global'].value" placeholder="Search..." />
                        </IconField>
                    </div>
                </template>

                <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
                <Column field="code" header="Código" sortable style="min-width: 2rem"></Column>
                <Column field="titulo" header="Título" sortable style="min-width: 16rem"></Column>
                <Column field="descripcion" header="Descripción" sortable style="min-width: 16rem"></Column>
                <Column field="fecha_limite" header="Fecha límite" sortable style="min-width: 8rem"></Column>
                <Column field="estado" header="Estado" sortable style="min-width: 12rem">
                    <template #body="slotProps">
                        <Tag :value="slotProps.data.estado" :severity="slotProps.data.severity" />
                    </template>
                </Column>
                <Column :exportable="false" style="min-width: 12rem" header="Acciones">
                    <template #body="slotProps">
                        <Button icon="pi pi-question" outlined rounded class="mr-2" @click="abrirModalPreguntas(slotProps.data)" v-tooltip="{ value: 'Gestionar preguntas del examen', showDelay: 0, hideDelay: 0 }" />
                        <Button icon="pi pi-users" outlined rounded class="mr-2" @click="abrirModalAsignarExamenGrado(slotProps.data)" v-tooltip="{ value: 'Asignar examen', showDelay: 0, hideDelay: 0 }" />
                        <Button icon="pi pi-pencil" outlined rounded class="mr-2" v-tooltip="{ value: 'Editar examen', showDelay: 0, hideDelay: 0 }" />
                        <Button icon="pi pi-trash" outlined rounded severity="danger" v-tooltip="{ value: 'Eliminar examen', showDelay: 0, hideDelay: 0 }" />
                    </template>
                </Column>
            </DataTable>
        </div>

        <PreguntasModal v-if="verModalPreguntas" :verModal="verModalPreguntas" :examen="examenSeleccionado" @ocultarModalPreguntas="cerrarModalPreguntas" />
        <AsignarExamenGrado v-if="verModalAsginarExamenGrupo" :verModal="verModalAsginarExamenGrupo" :examen="examenSeleccionado" @ocultarModalAsignarExamenGrado="cerrarModalAsignarExamenGrado" />

        <Dialog v-model:visible="verModalCrearExamen" :style="{ width: '750px' }" header="Crear examen" :modal="true" :draggable="false">
            <div class="flex flex-col gap-6">
                <img v-if="product.image" :src="`https://primefaces.org/cdn/primevue/images/product/${product.image}`" :alt="product.image" class="block m-auto pb-4" />

                <div class="grid grid-cols-12 gap-4">
                    <div class="col-span-6">
                        <label for="name" class="block font-bold mb-3">Materia</label>
                        <Select v-if="materias" v-model="materiaSeleccionada" :options="materias" optionLabel="name" placeholder="Seleccione una materia" fluid />
                        <small v-if="submitted && !materiaSeleccionada" class="text-red-500">Debe seleccionar una materia</small>
                    </div>
                    <div class="col-span-6">
                        <label for="name" class="block font-bold mb-3">Título</label>
                        <InputText id="name" v-model.trim="tituloExamen" required="true" autofocus :invalid="submitted && !tituloExamen" fluid />
                        <small v-if="submitted && !tituloExamen" class="text-red-500">El título es requerido</small>
                    </div>
                    <div class="col-span-6">
                        <label for="deadline" class="block font-bold mb-3">Fecha límite</label>
                        <DatePicker id="deadline" v-model="fechaLimite" showTime hourFormat="12" dateFormat="yy-mm-dd" :locale="esLocale" placeholder="Selecciona la fecha y hora" class="w-full" />
                        <small v-if="submitted && !fechaLimite" class="text-red-500">La fecha límite es requerida</small>
                    </div>
                    <div class="col-span-6">
                        <label for="descripcion" class="block font-bold mb-3">Descripción</label>
                        <Textarea id="descripcion" v-model="descripcion" required="true" rows="3" cols="20" fluid />
                    </div>
                </div>
                <div>
                    <span class="block font-bold mb-4">Estado</span>
                    <div class="grid grid-cols-6 gap-4">
                        <div class="flex items-center gap-2 col-span-6">
                            <RadioButton id="category1" v-model="estadoExamen" name="category" value="activo" />
                            <label for="category1">Activo</label>
                        </div>
                        <div class="flex items-center gap-2 col-span-6">
                            <RadioButton id="category3" v-model="estadoExamen" name="category" value="cerrado" />
                            <label for="category3">Cerrado</label>
                        </div>
                        <small v-if="submitted && !estadoExamen" class="text-red-500">El estado es requerido</small>
                    </div>
                </div>

                <!--<div class="grid grid-cols-12 gap-4">
                    <div class="col-span-6">
                        <label for="price" class="block font-bold mb-3">Price</label>
                        <InputNumber id="price" v-model="product.price" mode="currency" currency="USD" locale="en-US" fluid />
                    </div>
                    <div class="col-span-6">
                        <label for="quantity" class="block font-bold mb-3">Quantity</label>
                        <InputNumber id="quantity" v-model="product.quantity" integeronly fluid />
                    </div>
                </div>-->
            </div>
            <template #footer>
                <Toast />
                <ConfirmDialog></ConfirmDialog>
                <Button label="Cancelar" icon="pi pi-times" text @click="hideDialog" />
                <Button label="Guardar" icon="pi pi-check" @click="guardarExamen" />
            </template>
        </Dialog>
    </div>

    <Cargando v-if="verCargandoSpiner" />
</template>
<style scoped></style>
