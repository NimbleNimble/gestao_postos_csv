<template>
    <v-container>
        <v-dialog transition="dialog-bottom-transition" fullscreen>
            <template v-slot:activator="{ props: activatorProps }">
                <v-btn title="Importe o relatório em arquivo CSV para atualizar a base de dados" v-bind="activatorProps"
                    text="Importe o relatório em arquivo CSV para atualizar a base de dados" color="red-darken-4"
                    variant="flat" prepend-icon="mdi-upload"
                    aria-label="Importe o relatório em arquivo CSV para atualizar a base de dados"
                    class="font-weight-bold">
                    Enviar .CSV
                </v-btn>
            </template>

            <template v-slot:default="{ isActive }">
                <v-card>
                    <v-toolbar color="red-darken-4" title="Importar arquivo CSV">
                        <v-spacer></v-spacer>
                        <v-btn icon @click="closeDialog(isActive)">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </v-toolbar>

                    <v-card-text class="pt-6">
                        <p class="text-subtitle-1 text-grey-darken-3 mb-2">
                            Selecione ou arraste a planilha de postos de combustíveis no formato <strong>.CSV</strong>
                            para atualizar a base de dados.
                        </p>

                        <v-file-upload clearable accept=".csv, text/csv" v-model="file" class="mt-4" density="default"
                            title="Arraste e solte o arquivo CSV aqui" browse-text="Procurar no computador"
                            divider-text="ou"></v-file-upload>
                    </v-card-text>

                    <v-card-actions class="justify-end pa-4">
                        <v-btn class="px-6" variant="outlined" color="grey-darken-1" text="Cancelar"
                            @click="closeDialog(isActive)" />

                        <!-- TODO: Pensar em outras cores para confirmar -->
                        <v-btn class="px-6" variant="flat" color="red-darken-2" text="Enviar"
                            :disabled="!file || !file.name.endsWith('.csv')"
                            @click="uploadFile(file); isActive.value = false" />
                    </v-card-actions>
                </v-card>
            </template>
        </v-dialog>
    </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { uploadFile } from '../services/dataService'

const file = ref(null)

const closeDialog = (isActive) => {
    file.value = null
    isActive.value = false
}
</script>