<template>
  <v-app>
    <v-app-bar color="primary" title="Gestão de Postos" />
    <v-main>
      <v-container>
        <v-file-upload v-model="file"
         @change="handleFileUpload(file)"
         class="mt-7" density="comfortable"  variant="comfortable" title="Importar arquivo"></v-file-upload>
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
            <v-data-table-virtual
                :headers="mock_headers"
                :items="mock_data"
                height="400"
                item-value="name"
                fixed-header
            ></v-data-table-virtual>
          </v-card-text>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { uploadFile } from './services/dataService'

const file = ref(null)

const mock_headers = [
    { title: 'Boat Type', align: 'start', key: 'name' },
    { title: 'Speed(knots)', align: 'end', key: 'speed' },
    { title: 'Length(m)', align: 'end', key: 'length' },
    { title: 'Price($)', align: 'end', key: 'price' },
    { title: 'Year', align: 'end', key: 'year' },
]

const mock_data = [
    {
    name: 'Speedster',
    speed: 35,
    length: 22,
    price: 300000,
    year: 2021,
    },
    {
    name: 'OceanMaster',
    speed: 25,
    length: 35,
    price: 500000,
    year: 2020,
    },
    {
    name: 'Voyager',
    speed: 20,
    length: 45,
    price: 700000,
    year: 2019,
    },
    {
    name: 'WaveRunner',
    speed: 40,
    length: 19,
    price: 250000,
    year: 2022,
    },
    {
    name: 'SeaBreeze',
    speed: 28,
    length: 31,
    price: 450000,
    year: 2018,
    },
    {
    name: 'HarborGuard',
    speed: 18,
    length: 50,
    price: 800000,
    year: 2017,
    },
    {
    name: 'SlickFin',
    speed: 33,
    length: 24,
    price: 350000,
    year: 2021,
    },
    {
    name: 'StormBreaker',
    speed: 22,
    length: 38,
    price: 600000,
    year: 2020,
    },
    {
    name: 'WindSail',
    speed: 15,
    length: 55,
    price: 900000,
    year: 2019,
    },
    {
    name: 'FastTide',
    speed: 37,
    length: 20,
    price: 280000,
    year: 2022,
    },
]

function handleFileUpload(file) {
    uploadFile(file)
}
</script>
