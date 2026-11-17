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
/* Inhalt senkrecht in der Mitte */
.checkin {
  justify-content: center;
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

/* 3 gleich breite Spalten */
.karten-raster {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--sp-4);
}

.karte {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--sp-2);
  padding: var(--sp-4);
  border: var(--border-w) solid var(--c-border);
  border-radius: var(--radius);
  background-color: var(--c-surface);
  /* Buttons erben Schrift und Farbe nicht */
  color: var(--c-text);
  font-family: var(--font-ui);
  cursor: pointer;
  /* nicht ausgewählte Karten etwas blasser */
  opacity: 0.6;
  transition: transform 0.15s, opacity 0.15s;
}

/* ausgewählte Karte: größer, heller, voll sichtbar */
.karte.is-fokus {
  transform: scale(1.05);
  background-color: var(--c-surface-hell);
  opacity: 1;
}

.karte-icon {
  font-size: 12rem;
}

.karte-titel {
  font-size: var(--fs-h2);
  font-weight: bold;
}

.karte-text {
  font-size: var(--fs-text);
  color: var(--c-text-leise);
}

.hinweis {
  font-size: var(--fs-text);
  color: var(--c-text-leise);
}
</style>