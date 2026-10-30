<script setup>
import { ref, watch, onUnmounted } from "vue";

const props = defineProps({
  text: String,
  laenge: { type: Number, default: 10 },
});

const ZEICHEN = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 :-";

const zellen = ref([]);
let timer = null;

function starten() {
  const ziel = (props.text || "")
    .toUpperCase()
    .padEnd(props.laenge, " ")
    .slice(0, props.laenge);
  zellen.value = ziel.split("").map((zeichen, i) => {
    return {
      zeichen: " ",
      ziel: zeichen,
      rest: 4 + i * 2,
    };
  });

  clearInterval(timer);
  timer = setInterval(schritt, 50);
}

function schritt() {
  let alleFertig = true;

  for (const zelle of zellen.value) {
    if (zelle.rest > 0) {
      zelle.zeichen = ZEICHEN[Math.floor(Math.random() * ZEICHEN.length)];
      zelle.rest--;
      alleFertig = false;
    } else {
      zelle.zeichen = zelle.ziel;
    }
  }
  if (alleFertig) {
    clearInterval(timer);
  }
}

watch(() => props.text, starten, { immediate: true });

onUnmounted(() => {
  clearInterval(timer);
});
</script>

<template>
  <span class="splitflap">
    <span v-for="(zelle, i) in zellen" :key="i" class="klappe">
      {{ zelle.zeichen }}
    </span>
  </span>
</template>

<style scoped>
.splitflap {
  display: inline-flex;
  gap: 0.2rem;
  white-space: pre;
}

.klappe {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  width: 0.9em;
  height: 1.3em;
  overflow: hidden;
  border-radius: 0.3rem;
  background-color: #11161f;
  background-image: linear-gradient(
    to bottom,
    transparent 48%,
    rgba(0, 0, 0, 0.7) 48%,
    transparent 53%
  );
  color: inherit;
}
</style>