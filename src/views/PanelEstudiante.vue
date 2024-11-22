<script setup>
import store from '@/store';
import { URL, validarToken } from '@/utils';
import { FilterMatchMode } from '@primevue/core/api';
import axios from 'axios';
import { onMounted, ref, watch } from 'vue';
import Cargando from './Componentes/Cargando.vue';
import PresentarExamenModal from './Componentes/PresentarExamenModal.vue';

const userData1 = store.getters['auth/getUser'];
const isAuthenticated1 = store.getters['auth/isAuthenticated'];

const verModalPresentarExamen = ref(false);

const materias = ref([]);
const examenes = ref([]);
const verCargandoSpiner = ref(false);
const examenSeleccionado = ref(null);

const cargandoComponente = ref(true);
// Track the active tab
const activeTab = ref('0');

// Watch for changes in the active tab
watch(activeTab, (newValue) => {
    console.log('Active tab changed to:', newValue);
});

onMounted(() => {
    // Validar el token
    validarToken(userData1);

    // Se cargan las materias del profesor
    consultarMaterias();

    cargandoComponente.value = false;
});

const dt = ref();
const verModalAsginarExamenGrupo = ref(false);
const selectedProducts = ref();
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

const consultarMaterias = async () => {
    const id = userData1.user.id; // Obtener el ID del usuario

    // Obtener el token Bearer
    const token = userData1.access_token;
    verCargandoSpiner.value = true;

    try {
        const response = await axios.get(URL + 'materias', {
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
        verCargandoSpiner.value = false;
    } catch (err) {
        verCargandoSpiner.value = false;
        alert('Error al obtener datos: ' + err); // Manejo de errores
    }
};

const consultarExamenes = async (materia) => {
    // Obtener el token Bearer
    const token = userData1.access_token;
    verCargandoSpiner.value = true;
    examenes.value = [];

    try {
        const response = await axios.get(URL + `examenes-materia-estudiante/${materia}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Agregar el Bearer token
                Accept: 'application/json', // Tipo de respuesta aceptada
                'Content-Type': 'application/json' // Tipo de contenido
            }
        });

        //console.log('examens: ', response);

        let examenesList = [];

        response.data.data.map((num, index) => {
            let severity = num.estado === 'activo' ? 'success' : 'danger';

            let examen = {
                titulo: num.titulo,
                code: num.id,
                fecha_limite: num.fecha_limite,
                estado: num.estado_examen,
                estado_presentacion: num.estado_estudiante,
                descripcion: num.descripcion,
                severity: severity
            };
            examenesList.push(examen);
        });

        examenes.value = examenesList;
        verCargandoSpiner.value = false;
    } catch (err) {
        console.log('Error al obtener datos: ', err); // Manejo de errores
        verCargandoSpiner.value = false;
    }
};

function abrirModalPresentarExamen(data) {
    examenSeleccionado.value = data;
    verModalPresentarExamen.value = true;
}

function cerrarModalPresentarExamen() {
    examenSeleccionado.value = null;
    verModalPresentarExamen.value = false;
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
        <div v-if="materias">
            <div class="card p-0">
                <Tabs scrollable>
                    <TabList>
                        <Tab v-for="materia in materias" :key="materia.name" :value="String(materia.code)" @click="consultarExamenes(materia.code)">
                            <i class="pi pi-book mr-1" /> <span>{{ materia.name }}</span>
                        </Tab>
                    </TabList>
                </Tabs>
            </div>

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
                size="small"
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

                <Column field="code" header="Código" sortable style="min-width: 2rem"></Column>
                <Column field="titulo" header="Título" sortable style="min-width: 16rem"></Column>
                <!--<Column field="descripcion" header="Descripción" sortable style="min-width: 16rem"></Column>-->
                <Column field="fecha_limite" header="Fecha límite" sortable style="min-width: 8rem"></Column>
                <Column field="estado" header="Estado" sortable style="min-width: 12rem">
                    <template #body="slotProps">
                        <Tag :value="slotProps.data.estado" :severity="slotProps.data.severity" />
                    </template>
                </Column>
                <!---<Column field="estado_presentacion" header="Estado presentación" sortable style="min-width: 12rem">
                    <template #body="slotProps">
                        <Tag :value="slotProps.data.estado_presentacion" />
                    </template>
                </Column>-->
                <Column :exportable="false" style="min-width: 12rem" header="Acciones">
                    <template #body="slotProps">
                        <Tag v-if="slotProps.data.estado == 'cerrado'" value="No disponible" severity="warn" />
                        <div v-else>
                            <Button
                                v-if="slotProps.data.estado_presentacion == 'pendiente'"
                                icon="pi pi-play"
                                label="Presentar"
                                severity="contrast"
                                rounded
                                class="m-0 p-0"
                                @click="abrirModalPresentarExamen(slotProps.data)"
                                v-tooltip="{ value: 'Presentar examen', showDelay: 0, hideDelay: 0 }"
                            />
                            <Button
                                v-if="slotProps.data.estado_presentacion == 'en proceso'"
                                icon="pi pi-play"
                                label="Continuar"
                                severity="contrast"
                                rounded
                                class="m-0 p-0"
                                @click="abrirModalPresentarExamen(slotProps.data)"
                                v-tooltip="{ value: 'Presentar examen', showDelay: 0, hideDelay: 0 }"
                            />
                            <Button v-if="slotProps.data.estado_presentacion == 'completado'" icon="pi pi-play" label="Completado" disabled rounded class="m-0 p-0" />
                        </div>
                    </template>
                </Column>
            </DataTable>

            <p v-if="!verCargandoSpiner && examenes.length == 0" class="card text-center">Sin exámenes asignados</p>

        </div>

        <PresentarExamenModal v-if="verModalPresentarExamen" :verModal="verModalPresentarExamen" :examen="examenSeleccionado" @ocultarModalAsignarExamenGrado="cerrarModalPresentarExamen" />
    </div>

    <Cargando v-if="verCargandoSpiner" />
</template>
<style scoped></style>
