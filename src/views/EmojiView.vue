<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useTastatur } from "@/composables/useTastatur.js";
import { useAuswahl } from "@/composables/useAuswahl.js";
import { reise } from "@/stores/reise.js";
import { avatare } from "@/data/avatare.js";

const router = useRouter();
const { index, weiter, zurueck, waehle } = useAuswahl(avatare.length);

const zeigeHinweis = ref(false);

function weiterZumCheckin() {
  if (reise.name.trim() === "") {
    router.push("/pass");
    return;
  }
  reise.emoji = avatare[index.value];
  if (reise.emoji === null) {
    zeigeHinweis.value = true;
    return;
  }

  router.push("/checkin");
}

useTastatur((aktion) => {
  if (aktion === "LINKS") zurueck();
  if (aktion === "RECHTS") weiter();
  if (aktion === "BESTAETIGEN") weiterZumCheckin();
});
</script>
<template>
  <section class="screen emoji-seite">
    <h1>{{ reise.name }}, bitte wähle dein Emoji aus</h1>

    <div class="emoji-raster">
      <button
        v-for="(avatar, i) in avatare"
        :key="avatar.id"
        class="emoji-feld"
        :class="{ 'is-fokus': i === index }"
        @click="waehle(i)"
      >
        <img :src="avatar.bild" :alt="avatar.name" class="emoji-bild" />
      </button>
    </div>

    <p class="hinweis">
      ← → zum Auswählen <br />
      <strong>Enter</strong> zum Bestätigen
    </p>
    <p v-if="zeigeHinweis" class="fehler">Bitte wähle zuerst ein Emoji aus.</p>
  </section>
</template>
<style scoped>
.emoji-seite {
  align-items: center;
  text-align: center;
  justify-content: center;
}

h1 {
  font-size: var(--fs-h2);
  color: var(--c-accent);
}

.emoji-raster {
  display: grid;
  grid-template-columns: repeat(8, minmax(0, 1fr));
  gap: var(--sp-2);
  width: 100%;
}

/* Bild füllt das Feld fast ganz aus */
.emoji-bild {
  width: 70%;
  height: 70%;
}

.emoji-feld {
  aspect-ratio: 1;
  border: 0.2rem solid var(--c-border);
  border-radius: var(--radius);
  background-color: var(--c-surface);
  font-size: 6rem;
  cursor: pointer;
  transition: transform 0.15s;
}

/*Auswahlemoji wird größeR*/
.emoji-feld.is-fokus {
  transform: scale(1.1);
  background-color: var(--c-surface-hell);
}

.weiter-button {
  margin-top: var(--sp-3);
  padding: var(--sp-2) var(--sp-5);
  border: none;
  border-radius: var(--radius);
  background-color: var(--c-accent);
  color: var(--c-accent-text);
  font-family: var(--font-ui);
  font-size: var(--fs-gross);
  cursor: pointer;
}

.hinweis {
  font-size: var(--fs-gross2);
  color: var(--c-text-leise);
}

.fehler {
  color: var(--c-fehler);
  font-size: var(--fs-text);
}
</style>
