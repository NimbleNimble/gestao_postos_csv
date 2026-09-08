<template>
    <v-container>
        <GestaoPostosLoadingComponent :isLoading="isLoading" />
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
                <v-card class="bg-grey-lighten-4">
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
                        <v-alert v-if="errorMessage" type="error" variant="tonal" class="mb-4" closable
                            @click:close="errorMessage = ''">
                            {{ errorMessage }}
                        </v-alert>

                        <v-file-upload v-if="!file" accept=".csv, text/csv" v-model="file" class="mt-4"
                            density="default" title="Arraste e solte o arquivo CSV aqui"
                            browse-text="clique para localizar" divider-text="ou"
                            @change="selectFile(file)"></v-file-upload>

                        <v-card v-else class="mt-4" variant="outlined" elevation="0"
                            style="border: solid 2px #E0E0E0; background: #ffffff;">
                            <v-card-text class="d-flex align-center px-6 py-3">
                                <v-icon class="mr-6" size="25" color="grey-darken-1">
                                    mdi-file-document
                                </v-icon>
                                <div class="file-details">
                                    <div class="text-body-1">{{ file?.name }}</div>
                                    <div class="text-caption">
                                        {{ file?.type || 'text/csv' }}{{ formatFileSize(file?.size) }}
                                    </div>
                                </div>
                                <v-btn class="ml-auto mt-1" icon="mdi-close-circle" variant="text"
                                    aria-label="Remover arquivo" title="Remover arquivo" :disabled="isLoading"
                                    @click="file = null" />
                            </v-card-text>
                        </v-card>
                    </v-card-text>

                    <v-card-actions class="justify-end pa-4">
                        <v-btn class="px-6" variant="outlined" color="grey-darken-1" text="Cancelar"
                            @click="closeDialog(isActive)" />

                        <v-btn class="px-6" variant="flat" color="red-darken-4" text="Enviar" :disabled="!isCsvValid"
                            @click="sendFile(isActive);" />
                    </v-card-actions>
                </v-card>
            </template>
        </v-dialog>
    </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import { uploadFile } from '../services/dataService'
import GestaoPostosLoadingComponent from './GestaoPostosLoadingComponent.vue'
import { dataStore } from '../stores/dataStore.js'
const { loadDataContent } = dataStore()

const file = ref(null)
const errorMessage = ref('')
const isLoading = ref(false)

const isCsvValid = computed(() => {
    if (!file.value) return false
    const fileName = file.value.name || ''
    return fileName.toLowerCase().endsWith('.csv')
})

const selectFile = (newFile) => {
    errorMessage.value = ''
    if (newFile) {
        const fileName = newFile.name || ''
        if (!fileName.toLowerCase().endsWith('.csv')) {
            errorMessage.value = 'Formato inválido! Por favor, selecione apenas arquivos com extensão .csv.'
            file.value = null
        }
    }
}

const closeDialog = (isActive) => {
    file.value = null
    errorMessage.value = ''
    isActive.value = false
}

const sendFile = async (isActive) => {
    if (!file.value) return
    isLoading.value = true
    try {
        const response = await uploadFile(file.value);
        if (response.status === 'error') throw new Error(response.message);
        else {
            closeDialog(isActive)
            loadDataContent();
        }
    } catch (error) {
        errorMessage.value = error.message
    } finally {
        isLoading.value = false
    }
}

const formatFileSize = (size) => {
    if (typeof size !== 'number' || size <= 0) return ''
    const units = ['B', 'KB', 'MB', 'GB', 'TB']
    let unitIndex = 0
    let adjustedSize = size
    while (adjustedSize >= 1024 && unitIndex < units.length - 1) {
        adjustedSize /= 1024
        unitIndex++
    }
    return ` (${adjustedSize.toFixed(2)} ${units[unitIndex]})`
}
</script>