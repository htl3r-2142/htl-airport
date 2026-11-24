<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useTastatur } from "@/composables/useTastatur.js";
import { reise, reiseZuruecksetzen } from "@/stores/reise.js";
import { kategorien } from "@/data/kategorien.js";

const router = useRouter();
const sitz = "23F";

const kategorie = kategorien.find((k) => k.id === reise.kategorie);
let unter = null;
if (kategorie) {
  unter = kategorie.unterkategorien.find((u) => u.id === reise.unterkategorie);
}

const boarding = new Date().toLocaleTimeString("de-AT", {
  hour: "2-digit",
  minute: "2-digit",
});
</script>
<template>
  <section v-if="unter">
    <div>
      <div>
        <h1>Deine Bordkarte</h1>

        <div>
          <p>{{ kategorie.code }}</p>
          <p>{{ kategorie.label }}</p>
        </div>
        <div>
          <div>
            <p>{{ reise.name }}</p>
          </div>
          <div>
            <p>{{ unter.label }}</p>
          </div>
          <div>
            <p>{{ unter.gate }}</p>
          </div>
          <div>
            <p>{{ boarding }}</p>
          </div>
          <div>
            <p>{{ sitz }}</p>
          </div>
        </div>
      </div>

      <div>
        <div>
          <img :src="reise.emoji.bild" :alt="reise.emoji.name" />
        </div>

        <p>{{ reise.name }}</p>

        <div>
          <div></div>
        </div>
      </div>
    </div>
  </section>
</template>
