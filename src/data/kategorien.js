import gluehbirne from "@/assets/pathIcons/09_gluehbirne.svg";
import doktorhut from "@/assets/pathIcons/10_doktorhut.svg";
import aktentasche from "@/assets/pathIcons/11_aktentasche.svg";
import rakete from "@/assets/pathIcons/12_rakete.svg";
import laptop from "@/assets/pathIcons/13_laptop.svg";
import buero from "@/assets/pathIcons/14_buero.svg";
import gebaeude from "@/assets/pathIcons/15_gebaeude.svg";
import mikroskop from "@/assets/pathIcons/16_mikroskop.svg";
import globus from "@/assets/pathIcons/17_globus.svg";
import computer from "@/assets/pathIcons/18_computer.svg";
import palette from "@/assets/pathIcons/19_palette.svg";
import schloss from "@/assets/pathIcons/20_schloss.svg";
import klemmbrett from "@/assets/pathIcons/21_klemmbrett.svg";

// alle Zukunftswege mit ihren Unterkategorien
export const kategorien = [
  {
    id: "selbststaendig",
    label: "Selbstständig",
    bild: gluehbirne,
    beschreibung: "Sei dein eigener Chef",
    unterkategorien: [
      { id: "startup", label: "Startup", bild: rakete, gate: "A1" },
      { id: "freelancer", label: "Freelancer", bild: laptop, gate: "A2" },
      { id: "agentur", label: "Eigene Agentur", bild: buero, gate: "A3" },
    ],
  },
  {
    id: "studieren",
    label: "Studieren",
    bild: doktorhut,
    beschreibung: "Nach der Matura weiterbilden",
    unterkategorien: [
      { id: "uni", label: "Universität", bild: gebaeude, gate: "B1" },
      { id: "fh", label: "Fachhochschule", bild: mikroskop, gate: "B2" },
      { id: "ausland", label: "Studium im Ausland", bild: globus, gate: "B3" },
    ],
  },
  {
    id: "angestellt",
    label: "Angestellt",
    bild: aktentasche,
    beschreibung: "In einer Firma arbeiten – im Team, mit fixem Gehalt.",
    unterkategorien: [
      { id: "softwareentwicklung", label: "Software\u00adentwicklung", bild: computer, gate: "C1" },
      { id: "webdesign-medien", label: "Webdesign & Medien", bild: palette, gate: "C2" },
      { id: "it-security", label: "IT-Security", bild: schloss, gate: "C3" },
      { id: "projektmanagement", label: "Projekt\u00admanagement", bild: klemmbrett, gate: "C4" },
    ],
  },
];