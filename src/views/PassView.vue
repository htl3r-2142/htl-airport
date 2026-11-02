<script setup>
import { ref, onMounted } from "vue";
import { useTastatur } from "@/composables/useTastatur.js";
import { reise } from "@/stores/reise.js";
import { useRouter } from "vue-router";

const eingabeFeld = ref(null);
const hinweis = ref(false);
const router = useRouter();

function nameBestaetigen() {
  if (reise.name.trim() === "") {
    hinweis.value = true;
    return;
  }

  hinweis.value = false;
  router.push("/emoji");
}

onMounted(() => {
  eingabeFeld.value.focus();
});

useTastatur((aktion) => {
  if (aktion === "BESTAETIGEN") {
    nameBestaetigen();
  }
});
</script>
<template>
  <section class="screen pass">
    <h1>Wie heißt du?</h1>

    <input
      ref="eingabeFeld"
      v-model="reise.name"
      class="namensfeld"
      type="text"
      maxlength="15"
      autocomplete="off"
      placeholder="Dein Vorname?"
      @input="hinweis = false"
    />

    <p v-if="hinweis" class="error">
      Bitte gib zuerst deinen Namen ein
    </p>

    <p class="hinweis">Enter</p>
  </section>
</template>
<style scoped>
.pass {
  align-items: center;
  justify-content: center;
  text-align: center;
}

h1 {
  font-size: var(--fs-h1);
}

.namensfeld {
  width: 60rem;
  padding: var(--sp-2) var(--sp-3);
  border: var(--border-w) solid var(--c-border);
  border-radius: var(--radius);
  background-color: var(--c-surface);
  color: var(--c-text);
  font-family: var(--font-ui);
  font-size: var(--fs-h2);
  text-align: center;
}

.namensfeld::placeholder {
  color: var(--c-text-leise);
}

.error {
  color: var(--c-fehler);
  font-size: var(--fs-text);
}

.hinweis {
  font-size: var(--fs-klein);
  color: var(--c-text-leise);
}
</style>