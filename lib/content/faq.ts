import type { LocalizedText } from "./types"

/**
 * EDITABLE CONTENT — Frequently Asked Questions.
 *
 * Shown as a compact accordion in the footer and (optionally) a full page.
 * To edit: add or update an entry with a bilingual question and answer.
 */

export type FaqItem = {
  id: string
  question: LocalizedText
  answer: LocalizedText
}

export const faqs: FaqItem[] = [
  {
    id: "opening",
    question: { en: "When will VISTAH Heredia open?", es: "¿Cuándo abrirá VISTAH Heredia?" },
    answer: {
      en: "VISTAH is scheduled to open in Q4 2027. You can follow construction progress on The Build page and pre-book rooms and events now.",
      es: "VISTAH tiene prevista su apertura en Q4 2027. Puedes seguir el progreso de la construcción en la página La Obra y pre-reservar habitaciones y eventos desde ya.",
    },
  },
  {
    id: "book-now",
    question: { en: "Can I book a room or event already?", es: "¿Ya puedo reservar una habitación o evento?" },
    answer: {
      en: "Yes — while confirmed reservations open closer to 2027, our sales team is taking pre-booking inquiries for room blocks and the sixth-floor ballroom. Start an inquiry on the Pre-Book page.",
      es: "Sí — aunque las reservas confirmadas se habilitarán cerca de 2027, nuestro equipo comercial recibe consultas de pre-reserva para bloques de habitaciones y el salón del sexto piso. Inicia una consulta en la página de Pre-Reserva.",
    },
  },
  {
    id: "location",
    question: { en: "Where is VISTAH located?", es: "¿Dónde se ubica VISTAH?" },
    answer: {
      en: "VISTAH is in the heart of Heredia, integrated with the Estadio Eladio Rosabal Cordero — about 20 minutes from Juan Santamaría International Airport and 25 minutes from downtown San José.",
      es: "VISTAH está en el corazón de Heredia, integrado con el Estadio Eladio Rosabal Cordero — a unos 20 minutos del Aeropuerto Internacional Juan Santamaría y a 25 minutos del centro de San José.",
    },
  },
  {
    id: "stadium",
    question: { en: "Is the hotel really connected to the stadium?", es: "¿El hotel está realmente conectado con el estadio?" },
    answer: {
      en: "Yes. VISTAH rises beside the new stadium, and many rooms plus the Skyroom and rooftop frame views over the pitch — making every match day part of the stay.",
      es: "Sí. VISTAH se eleva junto al nuevo estadio, y muchas habitaciones, además del Skyroom y la azotea, enmarcan vistas sobre la cancha — haciendo de cada día de partido parte de la estadía.",
    },
  },
  {
    id: "brand",
    question: { en: "What is the Tapestry Collection by Hilton?", es: "¿Qué es la Tapestry Collection by Hilton?" },
    answer: {
      en: "Tapestry Collection by Hilton is a portfolio of original, independent hotels. VISTAH is proudly part of it — combining local character with the trust and rewards of Hilton.",
      es: "Tapestry Collection by Hilton es un portafolio de hoteles originales e independientes. VISTAH forma parte con orgullo — combinando el carácter local con la confianza y los beneficios de Hilton.",
    },
  },
]
