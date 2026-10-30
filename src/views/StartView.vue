<script setup>
import { useRouter } from "vue-router";
import { useTastatur } from "@/composables/useTastatur.js";

const router = useRouter();

function checkinStarten() {
  router.push("/pass");
}
useTastatur((aktion) => {
  if (aktion === "BESTAETIGEN") {
    checkinStarten();
  }
});

</script>
<template>
  <section class="screen start">
    <h1>HTL Rennweg Airport</h1>

    <p class="intro">
      Willkommen! Hier siehst du, welche Wege nach der HTL möglich sind.
    </p>

    <button class="checkin-btn" @click="checkinStarten">
      Check-in starten
    </button>

    <p class="hinweis">Drücke Enter</p>
  </section>
</template>
<style scoped>
.start {
  align-items: center;
  justify-content: center;
  text-align: center;
}

h1 {
  font-family: var(--font-display);
  font-size: var(--fs-h1);
  color: var(--c-accent);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.intro {
  font-size: var(--fs-gross);
  color: var(--c-text-leise);
}

.checkin-btn {
  margin-top: var(--sp-4);
  padding: var(--sp-2) var(--sp-5);
  border: none;
  border-radius: var(--radius);
  background-color: var(--c-accent);
  color: var(--c-accent-text);
  font-family: var(--font-ui);
  font-size: var(--fs-h2);
  cursor: pointer;
}

.hinweis {
  font-size: var(--fs-klein);
  color: var(--c-text-leise);
}
</style>