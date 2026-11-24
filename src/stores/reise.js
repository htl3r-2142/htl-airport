import { reactive } from 'vue'

export const reise = reactive({
  name: '',
  emoji: null,
  kategorie: null,
  unterkategorie: null,
})

export function reiseZuruecksetzen() {
  reise.name = ''
  reise.emoji = null
  reise.kategorie = null
  reise.unterkategorie = null
}