<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import AppMenuItem from './AppMenuItem.vue';

const store = useStore();

const model = ref([
    {
        label: 'Inicio',
        items: [
            { label: 'Panel Estudiante', icon: 'pi pi-fw pi-home', to: '/panel-estudiante' },
            { label: 'Gestionar Examen', icon: 'pi pi-fw pi-file-edit', to: '/gestionar-examen' },
            { label: 'Gestionar Estudiantes', icon: 'pi pi-fw pi-users', to: '/gestionar-estudiantes' }
        ]
    },
    {
        label: 'Configuración',
        items: [
            { label: 'Imagenes principales', icon: 'pi pi-fw pi-id-card', to: '/conf-imagenes-principales' },
        ]
    }
]);

// Obtener los roles del usuario desde el store
const usuario = computed(() => store.getters['auth/getUser']?.roles || []);

// Filtrar los items según el rol
const filteredModel = computed(() => {
    return model.value
        .map((group) => {
            const filteredItems = group.items.filter((item) => {
                // permisos para administrador
                if (usuario.value.includes('admin') && item.label == 'Imagenes principales') return true; // El admin ve todo Imagenes principales
                if (usuario.value.includes('admin') && item.label == 'Gestionar Estudiantes') return true;
                //if (usuario.value.includes('profesor') && item.label == 'Gestionar Examen') return true;

                // permisos para profesor
                if (usuario.value.includes('profesor') && item.label == 'Gestionar Examen') return true;

                // permisos para estudiante
                if (usuario.value.includes('estudiante') && item.label == 'Panel Estudiante') return true;

                return false; // Otros roles no ven nada
            });

            return { ...group, items: filteredItems };
        })
        .filter((group) => group.items.length > 0); // Filtrar grupos vacíos
});
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in filteredModel" :key="item.label">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
