<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuswahl } from "@/composables/useAuswahl.js";
import { reise } from "@/stores/reise.js";
import kategorienDaten from "@/data/kategorien.json";
import { useTastatur } from "@/composables/useTastatur.js";

const router = useRouter();
const kategorien = kategorienDaten.kategorien;
const kategorie = kategorien.find((k) => k.id === reise.kategorie);


let anzahl = 0;
if (kategorie) {
  anzahl = kategorie.unterkategorien.length;
}
const { index, weiter, zurueck, waehle } = useAuswahl(anzahl);
onMounted(() => {
  if (!kategorie) {
    router.push("/");
  }
});

function unterkategorieBestaetigen() {
  if (!kategorie) {
    return;
  }
  reise.unterkategorie = kategorie.unterkategorien[index.value].id;
  router.push("/druck");
}

useTastatur((aktion) => {
  if (aktion === "LINKS") zurueck();
  if (aktion === "RECHTS") weiter();
  if (aktion === "BESTAETIGEN") unterkategorieBestaetigen();
});
</script>

<template>
  <section v-if="kategorie">
    <p><span> {{ reise.emoji }}</span> {{ reise.name }}</p>
    <h1><span>{{ kategorie.icon }}</span> {{ kategorie.label }}</h1>

    <div>
    <button
        v-for="(unter, i) in kategorie.unterkategorien"
        :key= "unter.id"
        class="karte"
        :class="{ 'is-fokus': i === index }"
        @click="waehle(i)"
      >
        <span>{{ unter.icon }}</span>
        <span>{{ unter.label }}</span>
      </button>
    </div>
  </section>
</template>