<script setup>
import { ref } from "vue";
import { useTastatur } from "@/composables/useTastatur.js";
import { reise } from "@/stores/reise.js";
import emojiDaten from "@/data/emojis.json";

const emojis = emojiDaten.emojis;
const index = ref(0);

function auswaehl(newIndex) {
  index.value = newIndex;
  reise.emoji = emojis[newIndex];
}
auswaehl(0);

function weiter() {
  let neu = index.value + 1;
  if (neu >= emojis.length) {
    neu = 0;
  }
  auswaehl(neu);
}

function zurueck() {
  let neu = index.value - 1;
  if (neu < 0) {
    neu = emojis.length - 1;
  }
  auswaehl(neu);
}

useTastatur((aktion) => {
  if (aktion === "LINKS") zurueck();
  if (aktion === "RECHTS") weiter();
});
</script>
<template>
      <section class="screen emoji-seite">
    <h1>{{ reise.name }}, bitte wähle dein Emoji aus</h1>

    <div class="emoji-raster">
      <button
        v-for="(emojiZeichen, i) in emojis"
        :key="i"
        class="emoji-feld emoji"
        :class="{ 'is-fokus': i === index }"
        @click="auswaehl(i)"
      >
        {{ emojiZeichen }}
      </button>
    </div>

    <p class="hinweis">← → zum Auswählen <br> <strong>Enter</strong> zum Bestätigen</p>
  </section>
</template>
<style>
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

.hinweis {
  font-size: var(--fs-klein);
  color: var(--c-text-leise);
}
</style>