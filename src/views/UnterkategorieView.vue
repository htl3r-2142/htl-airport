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
  <section v-if="kategorie" class="screen unterkategorie">
    <p class="passagier">
      <img v-if="reise.emoji" :src="reise.emoji.bild" :alt="reise.emoji.name" class="passbild" /> {{ reise.name }}
    </p>

    <h1><span class="emoji">{{ kategorie.icon }}</span> {{ kategorie.label }}</h1>

    <div class="karten-raster">
      <button
        v-for="(unter, i) in kategorie.unterkategorien"
        :key="unter.id"
        class="karte"
        :class="{ 'is-fokus': i === index }"
        @click="waehle(i)"
      >
        <span class="karte-icon emoji">{{ unter.icon }}</span>
        <span class="karte-titel">{{ unter.label }}</span>
      </button>
    </div>

    <p class="hinweis">
      ← → zum Auswählen <br />
      <strong>Enter</strong> zum Bestätigen
    </p>
  </section>
</template>
<style scoped>
/* von oben beginnen, damit alle Auswahl-Seiten gleich aufgebaut sind */
.unterkategorie {
  text-align: center;
}

/* wer gerade eincheckt */
.passagier {
  font-size: var(--fs-text);
  color: var(--c-text-leise);
}

h1 {
  font-size: var(--fs-h1);
}

/* bei 4 Karten ist weniger Platz -> Titel etwas kleiner */
.karte-titel {
  font-size: var(--fs-gross);
}

/* Hinweis ganz nach unten schieben */
.hinweis {
  margin-top: auto;
  font-size: var(--fs-gross2);
  color: var(--c-text-leise);
}
</style>