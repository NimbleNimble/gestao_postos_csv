<template>
    <v-data-table-virtual :headers="dataHeaders" :items="dataContent" item-value="cnpj"
        fixed-header></v-data-table-virtual>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getData } from '../services/dataService'

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

onMounted(() => {
    getData().then(data => {
        dataContent.value = data.data
    })
});
</script>