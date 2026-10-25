import { onMounted, onUnmounted } from 'vue'

const TASTEN = {
  ArrowLeft: 'LINKS',
  ArrowRight: 'RECHTS',
  Enter: 'BESTAETIGEN',
}

export function useTastatur(handler) {
  function onKeydown(event) {
    const aktion = TASTEN[event.key]
    if (!aktion) return

    const ziel = event.target
    const tipptGerade =
      ziel instanceof HTMLElement &&
      (ziel.tagName === 'INPUT' || ziel.tagName === 'TEXTAREA')

    if (tipptGerade && aktion !== 'BESTAETIGEN') return
    if (event.repeat && aktion === 'BESTAETIGEN') return

    event.preventDefault()
    handler(aktion)
  }

  onMounted(() => window.addEventListener('keydown', onKeydown))
  onUnmounted(() => window.removeEventListener('keydown', onKeydown))
}