import { reactive } from 'vue'

export const reise = reactive({
  name: 'reise',
  emoji: '',
  kategorie: null,
  unterkategorie: null,
})

export function reiseZuruecksetzen() {
  reise.name = ''
  reise.emoji = ''
  reise.kategorie = null
  reise.unterkategorie = null
}