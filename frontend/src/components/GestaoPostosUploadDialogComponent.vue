<template>
    <v-container>
        <v-dialog transition="dialog-bottom-transition" width="auto">
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
                    <v-toolbar title="Importe o relatório em arquivo CSV para atualizar a base de dados"></v-toolbar>

                    <v-card-text class="">
                        <!-- TODO: Melhorar texto e modal -->
                        <p>Loren ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat.
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                            fugiat nulla pariatur.
                        </p>
                        <v-file-upload v-model="file" class="mt-7" density="comfortable" variant="comfortable"
                            title="Importar arquivo"></v-file-upload>
                    </v-card-text>

                    <v-card-actions class="justify-end">
                        <v-btn text="Cancelar" @click="isActive.value = false" />

                        <v-btn text="Enviar" variant="flat" color="text-yellow"
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

</script>