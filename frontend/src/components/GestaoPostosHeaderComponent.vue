<template>
    <v-app-bar color="yellow-darken-2" density="compact" height="80" class="py-3 px-5">
        <template v-slot:prepend>
            <!-- TODO: rever "style" inline -->
            <v-avatar size="60" variant="flat" color="red" style="border: 5px solid #B71C1C !important; rotate: 20deg;">
                <v-icon icon="mdi-gas-station" size="65" color="red-darken-4" class="mt-4" />
            </v-avatar>
        </template>

        <v-app-bar-title>
            <div class="text-end" style="width: 100px;">
                <span class="d-block text-red-darken-4 font-weight-bold" style="font-size: 12px; ">
                    GESTÃO DE

                </span>
                <span class="d-block text-red-darken-4 bebas-neue-regular" style="font-size: 40px; margin-top: -25px;
                
    line-height: 1.05;
">
                    <span class=" bebas-neue-regular" style="font-size: 60px; ">P</span>ostos</span>
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