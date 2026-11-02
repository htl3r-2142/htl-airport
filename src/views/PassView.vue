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
  <section>
    <h1>Wie heißt du?</h1>

    <input
      ref="eingabeFeld"
      v-model="reise.name"
      type="text"
      maxlength="15"
      autocomplete="off"
      placeholder="Dein Vorname?"
      @input="hinweis = false"
    />

    <p v-if="hinweis">
      Bitte gib zuerst deinen Namen ein
    </p>

  </section>
</template>
<style scoped>
</style>