import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import Aura from '@primevue/themes/aura';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';

import '@/assets/styles.scss';
import '@/assets/tailwind.css';

const app = createApp(App);

app.use(store);
app.use(router);
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: '.app-dark'
        }
    },
    locale: {
        startsWith: 'Comienza con',
        contains: 'Contiene',
        notContains: 'No contiene',
        endsWith: 'Termina con',
        equals: 'Igual a',
        notEquals: 'No igual a',
        noFilter: 'Sin filtro',
        lt: 'Menor que',
        lte: 'Menor o igual a',
        gt: 'Mayor que',
        gte: 'Mayor o igual a',
        dateIs: 'La fecha es',
        dateIsNot: 'La fecha no es',
        dateBefore: 'La fecha es anterior',
        dateAfter: 'La fecha es posterior',
        clear: 'Limpiar',
        apply: 'Aplicar',
        matchAll: 'Coincidir con todo',
        matchAny: 'Coincidir con alguno',
        addRule: 'Agregar regla',
        removeRule: 'Eliminar regla',
        accept: 'Sí',
        reject: 'No',
        choose: 'Elegir',
        upload: 'Subir',
        cancel: 'Cancelar',
        completed: 'Completado',
        pending: 'Pendiente',
        fileSizeTypes: ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
        dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
        dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
        monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
        chooseYear: 'Elegir año',
        chooseMonth: 'Elegir mes',
        chooseDate: 'Elegir fecha',
        prevDecade: 'Década anterior',
        nextDecade: 'Década siguiente',
        prevYear: 'Año anterior',
        nextYear: 'Año siguiente',
        prevMonth: 'Mes anterior',
        nextMonth: 'Mes siguiente',
        prevHour: 'Hora anterior',
        nextHour: 'Hora siguiente',
        prevMinute: 'Minuto anterior',
        nextMinute: 'Minuto siguiente',
        prevSecond: 'Segundo anterior',
        nextSecond: 'Segundo siguiente',
        am: 'am',
        pm: 'pm',
        today: 'Hoy',
        weekHeader: 'Sem',
        firstDayOfWeek: 1,
        showMonthAfterYear: false,
        dateFormat: 'dd/mm/yy',
        weak: 'Débil',
        medium: 'Medio',
        strong: 'Fuerte',
        passwordPrompt: 'Ingrese una contraseña',
        searchMessage: '{0} resultados disponibles',
        selectionMessage: '{0} ítems seleccionados',
        emptySelectionMessage: 'Ningún ítem seleccionado',
        emptySearchMessage: 'No se encontraron resultados',
        fileChosenMessage: '{0} archivos seleccionados',
        noFileChosenMessage: 'No se eligió ningún archivo',
        emptyMessage: 'No hay opciones disponibles',
        aria: {
            trueLabel: 'Verdadero',
            falseLabel: 'Falso',
            nullLabel: 'No seleccionado',
            star: '1 estrella',
            stars: '{star} estrellas',
            selectAll: 'Seleccionar todo',
            unselectAll: 'Deseleccionar todo',
            close: 'Cerrar',
            previous: 'Anterior',
            next: 'Siguiente',
            navigation: 'Navegación',
            scrollTop: 'Desplazar arriba',
            moveTop: 'Mover arriba',
            moveUp: 'Mover arriba',
            moveDown: 'Mover abajo',
            moveBottom: 'Mover al final',
            moveToTarget: 'Mover al objetivo',
            moveToSource: 'Mover al origen',
            moveAllToTarget: 'Mover todo al objetivo',
            moveAllToSource: 'Mover todo al origen',
            pageLabel: 'Página {page}',
            firstPageLabel: 'Primera página',
            lastPageLabel: 'Última página',
            nextPageLabel: 'Siguiente página',
            prevPageLabel: 'Página anterior',
            rowsPerPageLabel: 'Filas por página',
            jumpToPageDropdownLabel: 'Saltar a página desplegable',
            jumpToPageInputLabel: 'Saltar a página',
            selectRow: 'Fila seleccionada',
            unselectRow: 'Fila deseleccionada',
            expandRow: 'Fila expandida',
            collapseRow: 'Fila colapsada',
            showFilterMenu: 'Mostrar menú de filtros',
            hideFilterMenu: 'Ocultar menú de filtros',
            filterOperator: 'Operador de filtro',
            filterConstraint: 'Restricción de filtro',
            editRow: 'Editar fila',
            saveEdit: 'Guardar edición',
            cancelEdit: 'Cancelar edición',
            listView: 'Vista de lista',
            gridView: 'Vista de cuadrícula',
            slide: 'Diapositiva',
            slideNumber: 'Diapositiva {slideNumber}',
            zoomImage: 'Ampliar imagen',
            zoomIn: 'Acercar',
            zoomOut: 'Alejar',
            rotateRight: 'Rotar a la derecha',
            rotateLeft: 'Rotar a la izquierda'
        }
    }
});
app.use(ToastService);
app.use(ConfirmationService);
app.mount('#app');
