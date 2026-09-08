<template>
    <v-data-table-virtual :headers="dataHeaders" :items="dataContent" item-value="cnpj" fixed-header>
        <template #item.cnpj="{ item }">
            {{ formatCnpj(item.cnpj) }}
        </template>
        <template #item.cep="{ item }">
            {{ formatCep(item.cep) }}
        </template>
        <template #item.cpf_responsavel="{ item }">
            {{ formatCpf(item.cpf_responsavel) }}
        </template>
        <template #item.combustiveis="{ item }">
            <ul class="combustiveis-list">
                <li v-for="combustivel in formatCombustiveis(item.combustiveis)" :key="combustivel">
                    {{ combustivel }}
                </li>
            </ul>
        </template>
    </v-data-table-virtual>
</template>

<script setup>
import { defineProps } from 'vue'

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

const props = defineProps({
    dataContent: {
        type: Array,
        required: true
    }
})

const formatCnpj = (value) => {
    const rawValue = String(value ?? '').trim().replace(',', '.')
    const numericValue = Number(rawValue)
    const normalizedValue = Number.isFinite(numericValue)
        ? numericValue.toFixed(0)
        : rawValue
    const digits = normalizedValue.replace(/\D/g, '').slice(0, 14)

    if (digits.length !== 14) return value ?? ''

    return digits.replace(
        /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
        '$1.$2.$3/$4-$5'
    )
}

const formatCep = (value) => {
    const digits = String(value ?? '').replace(/\D/g, '')

    if (digits.length !== 8) return value ?? ''

    return digits.replace(/^(\d{5})(\d{3})$/, '$1-$2')
}

const formatCpf = (value) => {
    const digits = String(value ?? '').replace(/\D/g, '')

    if (digits.length !== 11) return value ?? ''

    return digits.replace(
        /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
        '$1.$2.$3-$4'
    )
}

const formatCombustiveis = (value) => {
    if (Array.isArray(value)) return value

    return String(value ?? '')
        .split(',')
        .map((combustivel) => combustivel.trim())
        .filter(Boolean)
}
</script>