import { ref } from 'vue'

export function useAuswahl(anzahl) {
  const index = ref(0)

  function weiter() {
    let neu = index.value + 1
    if (neu >= anzahl) {
       neu = 0 
    }
    index.value = neu
  }

  function zurueck() {
    let neu = index.value - 1
    if (neu < 0) {
      neu = anzahl - 1 
    }
    index.value = neu
  }

  function waehle(neu) {
     index.value = neu
  }

  return { index, weiter, zurueck, waehle }
}