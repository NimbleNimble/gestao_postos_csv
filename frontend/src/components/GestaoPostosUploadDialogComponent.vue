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

                        <v-file-upload clearable accept=".csv, text/csv" v-model="file" class="mt-4" density="default"
                            title="Arraste e solte o arquivo CSV aqui" browse-text="clique para localizar"
                            divider-text="ou" @change="onFileChange(file)"></v-file-upload>
                    </v-card-text>

                    <v-card-actions class="justify-end pa-4">
                        <v-btn class="px-6" variant="outlined" color="grey-darken-1" text="Cancelar"
                            @click="closeDialog(isActive)" />

                        <!-- // TODO: recarregar listagem -->
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

const file = ref(null)
const errorMessage = ref('')
const isLoading = ref(false)

const isCsvValid = computed(() => {
    if (!file.value) return false
    const fileName = file.value.name || ''
    return fileName.toLowerCase().endsWith('.csv')
})

const onFileChange = (newFile) => {
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
        else closeDialog(isActive)
    } catch (error) {
        errorMessage.value = error.message
    } finally {
        isLoading.value = false
    }
}
</script>