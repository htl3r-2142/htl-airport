<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { reise } from "@/stores/reise.js";
import kategorienDaten from "@/data/kategorien.json";

const router = useRouter();
const kategorien = kategorienDaten.kategorien;
const kategorie = kategorien.find((k) => k.id === reise.kategorie);

onMounted(() => {
  if (!kategorie) {
    router.push("/");
  }
});
</script>

<template>
  <section v-if="kategorie">
    <p><span>{{ reise.emoji }}</span> {{ reise.name }}</p>
    <h1><span>{{ kategorie.icon }}</span> {{ kategorie.label }}</h1>
  </section>
</template>