<template>
  <v-app>
    <GestaoPostosHeaderComponent />
    <v-main>
      <v-container fluid class="fill-height flex-column justify-center px-6 text-center" v-if="!dataContent.length">
        <p class="text-h5">
          Não há dados disponíveis.
        </p>
        <p class="text-subtitle-1 my-5">
          Para alimentar o sistema faça o upload<br />
          da planilha de postos de combustiveis<br />
          clicando no botão abaixo.
        </p>
        <GestaoPostosUploadDialogComponent />

      </v-container>
      <v-container fluid class="mt-5 px-6" v-else>
        <div class="d-flex justify-space-between align-center mb-3">
          <span class="text-h5 font-weight-thin">Listagem de Postos</span>
          <v-btn title="Exportar relatório em .CSV" text="Baixar .CSV" variant="flat" color="red-darken-4"
            prepend-icon="mdi-download" class="font-weight-bold" @click="downloadCsv" />
        </div>
        <v-divider class="my-6"></v-divider>
        <GestaoPostosTableComponent :data-content="dataContent" />
      </v-container>

    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import GestaoPostosHeaderComponent from './components/GestaoPostosHeaderComponent.vue'
import GestaoPostosTableComponent from './components/GestaoPostosTableComponent.vue'
import { getData } from './services/dataService'
import GestaoPostosUploadDialogComponent from './components/GestaoPostosUploadDialogComponent.vue'

const dataContent = ref([])

onMounted(() => {
  getData().then(data => {
    dataContent.value = data.data
  })
});

function downloadCsv() {
  // TODO: Revisar/Aprimorar isto
  window.location.href = "http://localhost:3000/list/export";
}
</script>
