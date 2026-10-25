<template>
    <h1>PassSeite</h1>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { useTastatur } from '@/composables/useTastatur.js'

const router = useRouter()

useTastatur((aktion) => {
  if (aktion === 'BESTAETIGEN') router.push('/')
})
</script>