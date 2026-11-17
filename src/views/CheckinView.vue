<script setup>
import { useRouter } from "vue-router";
import { useTastatur } from "@/composables/useTastatur.js";
import { useAuswahl } from "@/composables/useAuswahl.js";
import { reise } from "@/stores/reise.js";
import kategorienDaten from "@/data/kategorien.json";

const router = useRouter();
const kategorien = kategorienDaten.kategorien;
const { index, weiter, zurueck, waehle } = useAuswahl(kategorien.length);

function kategorieBestaetigen() {
  if (reise.name.trim() === "") {
    router.push("/");
    return;
  }

  // id merken
  reise.kategorie = kategorien[index.value].id;
  router.push("/unterkategorie");
}

useTastatur((aktion) => {
  if (aktion === "LINKS") zurueck();
  if (aktion === "RECHTS") weiter();
  if (aktion === "BESTAETIGEN") kategorieBestaetigen();
});
</script>

<template>
  <section>
    <p>
      <span>{{ reise.emoji }}</span> {{ reise.name }}
    </p>

    <h1>Wähle deinen Zukunftsweg</h1>

    <div>
      <button
        v-for="(kategorie, i) in kategorien"
        :key="kategorie.id"
        class="karte"
        :class="{ 'is-fokus': i === index }"
        @click="waehle(i)"
      >
        <span>{{ kategorie.icon }}</span>
        <span>{{ kategorie.label }}</span>
        <span>{{ kategorie.beschreibung }}</span>
      </button>
    </div>
  </section>
</template>

<style scoped>
</style>