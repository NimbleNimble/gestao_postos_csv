<template>
  <v-app>
    <GestaoPostosHeaderComponent />
    <v-main>
      <v-container fluid class="mt-5 px-6">
        <div class="d-flex justify-space-between align-center mb-3">
          <span class="text-h5 font-weight-thin">Listagem de Postos</span>
          <v-btn title="Exportar relatório em .CSV" text="Baixar .CSV" variant="flat" color="red-darken-4"
            prepend-icon="mdi-download" class="font-weight-bold" @click="downloadCsv" />
        </div>
        <v-divider class="my-6"></v-divider>
        <GestaoPostosTableComponent />
      </v-container>

    </v-main>
  </v-app>
</template>

<script setup>
import GestaoPostosHeaderComponent from './components/GestaoPostosHeaderComponent.vue'
import GestaoPostosTableComponent from './components/GestaoPostosTableComponent.vue'


function downloadCsv() {
  // TODO: Revisar/Aprimorar isto
  window.location.href = "http://localhost:3000/list/export";
}
</script>
