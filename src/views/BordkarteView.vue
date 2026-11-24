<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { reise } from "@/stores/reise.js";
import { kategorien } from "@/data/kategorien.js";

const router = useRouter();

const kategorie = kategorien.find((k) => k.id === reise.kategorie);
let unter = null;
if (kategorie) {
  unter = kategorie.unterkategorien.find((u) => u.id === reise.unterkategorie);
}

const boarding = new Date().toLocaleTimeString("de-AT", {
  hour: "2-digit",
  minute: "2-digit",
});

const sitz = "23F";

</script>

<template>
  <section v-if="unter" class="screen bordkarte-seite">
    <p class="passagier">
      <img v-if="reise.emoji" :src="reise.emoji.bild" :alt="reise.emoji.name" class="passbild" /> {{ reise.name }}
    </p>
    <div class="bordkarte">
      <div class="haupt">
        <h1 class="titel">Deine Bordkarte</h1>

        <div class="strecke">
          <div class="ort">
            <p class="code">HTL</p>
            <p class="stadt">Rennweg</p>
          </div>

          <span class="flugzeug">✈</span>

          <div class="ort ort-ziel">
            <p class="code">{{ kategorie.code }}</p>
            <p class="stadt">{{ kategorie.label }}</p>
          </div>
        </div>

        <div class="felder">
          <div>
            <p class="feld-titel">Passagier</p>
            <p class="feld-wert">{{ reise.name }}</p>
          </div>
          <div>
            <p class="feld-titel">Richtung</p>
            <p class="feld-wert">{{ unter.label }}</p>
          </div>
          <div>
            <p class="feld-titel">Gate</p>
            <p class="feld-wert">{{ unter.gate }}</p>
          </div>
          <div>
            <p class="feld-titel">Boarding</p>
            <p class="feld-wert">{{ boarding }}</p>
          </div>
          <div>
            <p class="feld-titel">Sitz</p>
            <p class="feld-wert">{{ sitz }}</p>
          </div>
        </div>
      </div>

      <div class="abriss">
        <img :src="reise.emoji.bild" :alt="reise.emoji.name" class="abriss-foto" />
        <p class="abriss-name">{{ reise.name }}</p>
        <div class="strichcode"></div>
      </div>
    </div>

  </section>
</template>

<style scoped>
/* Seite: Karte in der Mitte */
.bordkarte-seite {
  justify-content: center;
  align-items: center;
}

/* die ganze Karte: links Hauptteil, rechts Abriss */
.bordkarte {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 40rem;
  width: 100%;
  max-width: 160rem;
  border-radius: var(--radius);
  /* schneidet die Kerben zu Halbkreisen ab */
  overflow: hidden;
  background-color: var(--c-ticket);
  color: var(--c-ticket-text);
  box-shadow: 0 2rem 6rem rgba(0, 0, 0, 0.5);
}

/* ---------- linker Teil ---------- */
.haupt {
  display: flex;
  flex-direction: column;
  gap: var(--sp-5);
  padding: var(--sp-5);
}

.titel {
  font-size: var(--fs-h2);
  font-weight: bold;
}

/* HTL  ✈  SEL - drei gleich breite Spalten */
.strecke {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  align-items: center;
}

.ort-ziel {
  text-align: center;
}

.code {
  font-size: 10rem;
  font-weight: bold;
  letter-spacing: 0.1em;
  line-height: 1;
}

.stadt {
  font-size: var(--fs-text);
  color: var(--c-ticket-leise);
}

.flugzeug {
  justify-self: center;
  font-size: 12rem;
  color: var(--c-ticket-akzent);
}

/* Passagier, Richtung, Gate, Boarding, Sitz - immer in einer Zeile */
.felder {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.5fr) auto auto auto;
  gap: var(--sp-4);
}

.feld-titel {
  font-size: var(--fs-klein);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--c-ticket-leise);
}

.feld-wert {
  font-size: var(--fs-gross);
  font-weight: bold;
  /* sehr lange Wörter notfalls umbrechen statt hinausragen */
  overflow-wrap: break-word;
}

/* ---------- rechter Teil (Abriss) ---------- */
.abriss {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--sp-3);
  padding: var(--sp-4);
  background-color: var(--c-ticket-abriss);
  /* Perforation */
  border-left: 0.3rem dashed var(--c-ticket-leise);
}

/* Kerben oben und unten an der Perforation */
.abriss::before,
.abriss::after {
  content: "";
  position: absolute;
  /* Mitte des Kreises genau auf der gestrichelten Linie */
  left: -1.65rem;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: var(--c-bg);
}

.abriss::before {
  top: -1.5rem;
}

.abriss::after {
  bottom: -1.5rem;
}

.abriss-foto {
  display: block;
  width: 14rem;
  height: 14rem;
}

.abriss-name {
  font-size: var(--fs-gross);
  font-weight: bold;
}

/* Strichcode nur mit CSS: Streifen in verschiedenen Breiten */
.strichcode {
  width: 100%;
  height: 9rem;
  background: repeating-linear-gradient(
    90deg,
    var(--c-ticket-text) 0 0.4rem,
    transparent 0.4rem 0.8rem,
    var(--c-ticket-text) 0.8rem 1rem,
    transparent 1rem 1.6rem,
    var(--c-ticket-text) 1.6rem 2.2rem,
    transparent 2.2rem 2.6rem
  );
}

.hinweis {
  font-size: var(--fs-text);
  color: var(--c-text-leise);
}

.passagier {
  font-size: var(--fs-text);
  color: var(--c-text-leise);
}
</style>