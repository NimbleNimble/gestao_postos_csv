<template>
    <v-app-bar color="primary" density="compact" height="120">
        <template v-slot:prepend>
            <v-avatar size="70" color="white" variant="outlined" style="border: 5px solid white !important;">
                <v-icon icon="mdi-gas-station" size="40" />
            </v-avatar>
        </template>

        <v-app-bar-title>
            <div class="text-start">
                <span class="text-h6">Gestão de</span>
                <br />
                <span class="text-h3">Postos</span>
            </div>
        </v-app-bar-title>
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
