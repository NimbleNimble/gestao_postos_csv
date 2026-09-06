<template>
    <v-app-bar color="yellow-darken-2" density="compact" height="120" class="py-5 px-5">
        <template v-slot:prepend>
            <v-avatar size="90" variant="flat" color="red" style="border: 8px solid #B71C1C !important; rotate: 20deg;">
                <v-icon icon="mdi-gas-station" size="95" color="red-darken-4" class="mt-5" />
            </v-avatar>
        </template>

        <v-app-bar-title>
            <div class="text-end" style="width: 130px;">
                <span class="d-block text-h5 text-red-darken-4 caacupe-one-regular">
                    Gestão de
                </span>
                <span class="d-block text-h3 text-red-darken-4 bebas-neue-regular text-h3" style="margin-top: -35px;">
                    <span class="bebas-neue-regular text-h1">P</span>ostos</span>
            </div>
        </v-app-bar-title>

        <template v-slot:append>
            <GestaoPostosUploadDialogComponent />
        </template>
    </v-app-bar>

    <v-toolbar color="primary" density="comfortable">
        <v-toolbar-title>
            <v-icon icon="mdi-gas-station" />
            Gestão de Postos
        </v-toolbar-title>

        <v-spacer />

        <v-btn icon="mdi-download" aria-label="Exportar CSV" />
    </v-toolbar>
</template>

<script setup>
import GestaoPostosUploadDialogComponent from './GestaoPostosUploadDialogComponent.vue'
</script>