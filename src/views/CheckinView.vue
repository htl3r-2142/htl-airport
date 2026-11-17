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

  // id merke
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
  <section class="screen checkin">
    <p class="passagier">
      <span class="emoji">{{ reise.emoji }}</span> {{ reise.name }}
    </p>

    <h1>Wähle deinen Zukunftsweg</h1>

    <div class="karten-raster">
      <button
        v-for="(kategorie, i) in kategorien"
        :key="kategorie.id"
        class="karte"
        :class="{ 'is-fokus': i === index }"
        @click="waehle(i)"
      >
        <span class="karte-icon emoji">{{ kategorie.icon }}</span>
        <span class="karte-titel">{{ kategorie.label }}</span>
        <span class="karte-text">{{ kategorie.beschreibung }}</span>
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
.checkin {
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

/* Hinweis ganz nach unten schieben */
.hinweis {
  margin-top: auto;
  font-size: var(--fs-gross2);
  color: var(--c-text-leise);
}
</style>