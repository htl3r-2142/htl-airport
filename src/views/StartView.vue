<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useTastatur } from "@/composables/useTastatur.js";
import { reise } from "@/stores/reise.js";
import kategorienDaten from "@/data/kategorien.json";
import emojiDaten from "@/data/emojis.json";

const router = useRouter();

const kategorien = kategorienDaten.kategorien;
const emojis = emojiDaten.emojis;
const letzteAktion = ref("noch keine");

useTastatur((aktion) => {
  letzteAktion.value = aktion;
  if (aktion === "BESTAETIGEN") router.push("/pass");
});
</script>
<template>
  <section class="screen start">
    <h1>HTL Rennweg Airport</h1>
    <ul class="pruefung">
      <li>{{ kategorien.length }} Kategorien</li>
      <li>{{ emojis.length }} Emojis</li>
      <li>Store erreichbar, Name ist: „{{ reise.name || "leer" }}"</li>
    </ul>
    <p class="protokoll">
      Letzte Aktion: {{ letzteAktion }}
    </p>
    <p>← → drücken, Enter leitet zur Pass-Seite</p>
  </section>
</template>
<style scoped>

</style>
