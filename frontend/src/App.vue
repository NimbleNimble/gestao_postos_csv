<template>
  <v-app>
    <GestaoPostosHeader />
    <v-main>
      <v-container>
        <v-file-upload v-model="file" @change="handleFileUpload(file)" class="mt-7" density="comfortable"
          variant="comfortable" title="Importar arquivo"></v-file-upload>
      </v-container>
      <v-container>
        <v-divider class="mt-0 mb-6"></v-divider>
      </v-container>
      <v-container>
        <v-card class="pa-4" elevation="2">
          <v-card-title>
            <span class="mdi mdi-gas-station"></span>
            Listagem de postos
          </v-card-title>
          <v-card-text>
            <v-data-table-virtual :headers="dataHeaders" :items="dataContent" height="400" item-value="cnpj"
              fixed-header></v-data-table-virtual>
          </v-card-text>
        </v-card>
      </v-container>
      <v-container>
        <v-btn prepend-icon="$vuetify" variant="plain" @click="downloadCsv">
          Download CSV
        </v-btn>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { uploadFile, getData } from './services/dataService'
import GestaoPostosHeader from './components/GestaoPostosHeader.vue'

const file = ref(null)

const dataHeaders = [
  { title: 'CNPJ', align: 'start', key: 'cnpj' },
  { title: 'Nome Posto', align: 'start', key: 'nome_posto' },
  { title: 'Nome Fantasia', align: 'start', key: 'nome_fantasia' },
  { title: 'Bandeira', align: 'start', key: 'bandeira' },
  { title: 'Logradouro', align: 'start', key: 'logradouro' },
  { title: 'Número', align: 'start', key: 'numero' },
  { title: 'Complemento', align: 'start', key: 'complemento' },
  { title: 'Bairro', align: 'start', key: 'bairro' },
  { title: 'Município', align: 'start', key: 'municipio' },
  { title: 'UF', align: 'start', key: 'uf' },
  { title: 'CEP', align: 'start', key: 'cep' },
  { title: 'CPF Responsável', align: 'start', key: 'cpf_responsavel' },
  { title: 'Responsável', align: 'start', key: 'nome_responsavel' },
  { title: 'Email Responsável', align: 'start', key: 'email_responsavel' },
  { title: 'Cargo Responsável', align: 'start', key: 'cargo_responsavel' },
  { title: 'Combustíveis', align: 'start', key: 'combustiveis' },
  { title: 'Status', align: 'start', key: 'status' },
  { title: 'Data da inauguração', align: 'start', key: 'data_inauguracao' },
  { title: 'Número de Bicos', align: 'start', key: 'numero_bicos' },
  { title: 'Número de Pistas', align: 'start', key: 'numero_pistas' },
  { title: 'Observações', align: 'start', key: 'observacoes' }
]

const dataContent = ref([])

function handleFileUpload(file) {
  uploadFile(file)
}

function downloadCsv() {
  // TODO: Revisar/Aprimorar isto
  window.location.href = "http://localhost:3000/list/export";
}

onMounted(() => {
  getData().then(data => {
    dataContent.value = data.data
  })
});
</script>
