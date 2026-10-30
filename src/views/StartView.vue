<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useTastatur } from "@/composables/useTastatur.js";
import SplitFlap from "@/components/SplitFlap.vue";

const router = useRouter();
const alleFluege = [
  { zeit: "08:15", flug: "HTL01", ziel: "WIEN", gate: "A1", status: "Boarding" },
  { zeit: "08:40", flug: "HTL02", ziel: "GRAZ", gate: "B2", status: "Pünktlich" },
  { zeit: "09:05", flug: "HTL03", ziel: "LINZ", gate: "A3", status: "Check-in" },
  { zeit: "09:30", flug: "HTL04", ziel: "BERLIN", gate: "C1", status: "Pünktlich" },
  { zeit: "10:00", flug: "HTL05", ziel: "ZÜRICH", gate: "B1", status: "Verspätet" },
  { zeit: "10:25", flug: "HTL06", ziel: "SALZBURG", gate: "A2", status: "Boarding" },
  { zeit: "10:50", flug: "HTL07", ziel: "AMSTERDAM", gate: "C3", status: "Pünktlich" },
  { zeit: "11:15", flug: "HTL08", ziel: "MÜNCHEN", gate: "B3", status: "Check-in" },
  { zeit: "11:40", flug: "HTL09", ziel: "STOCKHOLM", gate: "C2", status: "Pünktlich" },
  { zeit: "12:05", flug: "HTL10", ziel: "INNSBRUCK", gate: "A4", status: "Boarding" },
  { zeit: "12:30", flug: "HTL11", ziel: "KOPENHAGEN", gate: "C4", status: "Verspätet" },
  { zeit: "12:55", flug: "HTL12", ziel: "LISSABON", gate: "B4", status: "Pünktlich" },
];

const zeilen = ref(alleFluege.slice(0, 8));

let naechsterFlug = 8;
let timer = null;

function zeileWechseln() {
  const zufallsZeile = Math.floor(Math.random() * zeilen.value.length);

  zeilen.value[zufallsZeile] = alleFluege[naechsterFlug % alleFluege.length];
  naechsterFlug++;
}

onMounted(() => {
  timer = setInterval(zeileWechseln, 2500);
});

onUnmounted(() => {
  clearInterval(timer);
});

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

    <div class="tafel">
      <div class="zeile kopfzeile">
        <span>Zeit</span>
        <span>Flug</span>
        <span>Ziel</span>
        <span>Gate</span>
        <span>Status</span>
      </div>

      <div v-for="(flug, index) in zeilen" :key="index" class="zeile">
        <SplitFlap :text="flug.zeit" :laenge="5" />
        <SplitFlap :text="flug.flug" :laenge="5" class="flugnummer" />
        <SplitFlap :text="flug.ziel" :laenge="10" />
        <SplitFlap :text="flug.gate" :laenge="2" />
        <SplitFlap
          :text="flug.status"
          :laenge="10"
          :class="'status status-' + flug.status"
        />
      </div>
    </div>

    <button class="checkin-button" @click="checkinStarten">
      Check-in starten
    </button>

    <p class="hinweis">Drücke Enter</p>
  </section>
</template>

<style scoped>
.start {
  align-items: center;
  text-align: center;
}

h1 {
  font-family: var(--font-display);
  font-size: var(--fs-h1);
  color: var(--c-accent);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.tafel {
  width: calc(100% + var(--sp-5) * 2);
  margin-left: calc(var(--sp-5) * -1);
  margin-right: calc(var(--sp-5) * -1);
  padding: var(--sp-3) var(--sp-5);
}

.zeile {
  display: grid;
  grid-template-columns:
    minmax(0, 1fr)
    minmax(0, 1fr)
    minmax(0, 2fr)
    minmax(0, 0.6fr)
    minmax(0, 2fr);
  gap: var(--sp-3);
  padding: 0.5rem 0;
  font-family: var(--font-display);
  font-size: 3.2rem;
  color: var(--c-accent);
  text-align: left;
}

.kopfzeile {
  padding-bottom: 0.8rem;
  border-bottom: 0.2rem solid var(--c-border);
  color: var(--c-text-leise);
  font-size: 1.8rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
}

.flugnummer {
  color: var(--c-accent-hell);
}

.status {
  color: var(--c-text-leise);
}

.status-Boarding {
  color: #3ddc84;
}

.status-Verspaetet {
  color: var(--c-fehler);
}

.checkin-button {
  margin-top: var(--sp-3);
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