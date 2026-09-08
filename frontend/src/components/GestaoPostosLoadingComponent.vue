<template>
    <v-dialog :model-value="props.isLoading" transition="" fullscreen class="">
        <v-container class="align-center justify-center fill-height">
            <v-progress-circular color="yellow-darken-2" indeterminate :size="57" :width="11"></v-progress-circular>
        </v-container>
    </v-dialog>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
    isLoading: {
        type: Boolean,
        default: false
    }
})
</script>
