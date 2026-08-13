import type { Content } from "./types";

export const es = {
  meta: {
    title: "Fernando Mosqueira — QA Analyst",
    description:
      "QA Analyst. Testing funcional y de APIs, automatización con Playwright y TypeScript, y un flujo de trabajo asistido por IA.",
    ogAlt: "Fernando Mosqueira — QA Analyst",
  },

  nav: {
    about: "Sobre mí",
    skills: "Skills",
    experience: "Experiencia",
    education: "Educación",
    certifications: "Certificaciones",
    ai: "IA",
    projects: "Proyectos",
    contact: "Contacto",
  },

  common: {
    present: "Presente",
    downloadCv: "Descargar CV",
    switchLanguage: "Cambiar idioma",
    switchTo: "English",
    skipToContent: "Saltar al contenido",
  },

  hero: {
    role: "QA Analyst",
    tagline: "Rompo cosas a propósito para que no se rompan solas.",
    chips: ["Playwright", "API Testing", "AI-Driven QA"],
    ctaContact: "Hablemos",
    ctaLinkedin: "LinkedIn",
  },

  about: {
    heading: "Sobre mí",
    body: [
      "Pasé cinco años controlando procesos, costos y datos en sistemas ERP. Ese trabajo me dejó una obsesión bastante útil: encontrar dónde algo se rompe antes de que le llegue a alguien.",
      "Hoy hago lo mismo con software. Diseño planes de prueba, valido APIs, automatizo regresión y documento defectos con trazabilidad completa. Y me meto desde el principio del desarrollo, no cuando ya es tarde para arreglar nada.",
      "Uso IA todos los días para acelerar la parte tediosa del trabajo. El criterio sigue siendo mío.",
    ],
    languagesLabel: "Idiomas",
    languages: [
      { name: "Español", level: "Nativo" },
      { name: "Inglés", level: "C1 · Advanced" },
    ],
  },

  skills: {
    heading: "Skills",
    groups: {
      testing: "Testing",
      tools: "Herramientas",
      methods: "Metodologías",
    },
  },

  experience: {
    heading: "Experiencia",
    items: {
      iconext: {
        role: "QA Analyst",
        kind: "Freelance",
        bullets: [
          "Diseñé y ejecuté planes de prueba funcionales y no funcionales en frontend y backend, documentando defectos críticos con trazabilidad completa.",
          "Validé APIs REST con Postman y Swagger, verificando integridad de endpoints, contratos y manejo de errores.",
          "Desarrollé y mantuve suites de pruebas automatizadas con Playwright y TypeScript, reduciendo el tiempo de regresión manual.",
          "Implementé pruebas exploratorias y de UX/UI, con feedback accionable para desarrollo y diseño.",
          "Gestioné el ciclo de vida de defectos en Trello, asegurando trazabilidad, SLA y resolución efectiva.",
          "Participé en ceremonias ágiles integrando QA desde etapas tempranas del desarrollo.",
        ],
      },
      naif: {
        role: "Analista de Control de Procesos",
        kind: null,
        bullets: [
          "Monitoreé cumplimiento de procesos operativos, costos y tiempos de entrega, detectando desvíos y coordinando acciones correctivas.",
          "Analicé KPIs e impulsé iniciativas de mejora continua con enfoque en datos.",
          "Validé información y documentación en sistemas ERP, garantizando precisión y consistencia de datos críticos.",
          "Coordiné la resolución de incidencias operativas entre áreas, mejorando la trazabilidad de procesos.",
          "Revisé y actualicé procedimientos internos para estandarización y control de calidad documental.",
        ],
      },
    },
  },

  education: {
    heading: "Educación",
    items: {
      untref: {
        title: "Diplomatura en Control de Calidad de Software",
        detail:
          "Testing funcional, de APIs y automatización · Diseño de casos de prueba · Postman y Swagger · Metodologías ágiles · Trazabilidad y mejora continua.",
      },
      gcba: {
        title: "Curso de Programación en Java",
        detail:
          "Programación orientada a objetos · Algoritmos · Desarrollo de aplicaciones de escritorio.",
      },
    },
  },

  certifications: {
    heading: "Certificaciones",
    completedLabel: "Completado",
    inProgressLabel: "En curso",
    note: "Los cursos marcados como «en curso» son los que estoy haciendo ahora. Cuando sale el certificado, cambia la etiqueta.",
  },

  ai: {
    heading: "Cómo trabajo con IA",
    intro:
      "No uso una sola herramienta para todo. Elijo según la tarea, que es exactamente el criterio que aplico para elegir cualquier herramienta de testing.",
    cards: {
      design: {
        title: "Casos de prueba y requerimientos",
        body: "Desgloso historias de usuario, detecto ambigüedades en los criterios de aceptación y armo matrices de casos borde. Probé Gemini para lo mismo y me quedé con ChatGPT: sostiene mejor el contexto de un requerimiento largo y devuelve casos menos redundantes.",
      },
      editor: {
        title: "Asistencia en el editor",
        body: "Dentro de VS Code, para escribir y refactorizar código de automatización. Autocompletado y andamiaje, no decisiones de diseño.",
      },
      build: {
        title: "Build y automatización",
        body: "Construí este sitio con Claude Code: arquitectura, componentes, la suite E2E y el pipeline de CI. El resultado es la evidencia, incluidos los tests que verifican que la página no se rompa.",
      },
    },
    closing:
      "Un ejemplo concreto: el contenido de este sitio existe una sola vez y está tipado. Español e inglés se validan contra el mismo contrato, así que si a un idioma le falta algo, el build falla. Los dos CVs en PDF se generan desde esa misma fuente. Es control de calidad aplicado a mi propia información.",
  },

  projects: {
    heading: "Proyectos",
    items: {
      e2e: {
        title: "Suite E2E con Page Object Model",
        body: "Automatización end-to-end sobre the-internet.herokuapp.com: login exitoso y fallido, manejo de elementos dinámicos y flujos encadenados. Page Objects con una BasePage compartida, fixtures de Playwright para inyectar dependencias y casos data-driven que recorren varios escenarios de error desde un mismo test. Corre en GitHub Actions en cada push y PR, con el reporte HTML como artefacto.",
      },
      api: {
        title: "Automatización de APIs REST",
        body: "Pruebas de API sobre JSONPlaceholder usando el request fixture de Playwright: verificación de códigos de estado y validación del contenido de las respuestas en GET y POST. Proyecto en construcción — sigue creciendo hacia PUT y DELETE, organización por recurso con patrón API client y pruebas integradas de UI + API.",
      },
      site: {
        title: "Este sitio",
        body: "Sitio bilingüe estático con el contenido tipado como fuente única de verdad, suite E2E en Playwright (paridad de idiomas, accesibilidad, responsive) y CI que corre typecheck, build y tests en cada push. Los dos CVs en PDF salen del mismo contenido.",
      },
    },
    viewLive: "Ver en vivo",
    viewRepo: "Ver repositorio",
  },

  contact: {
    heading: "Contacto",
    body: "Estoy buscando trabajo en QA. Si tenés algo en mente, escribime.",
    emailLabel: "Email",
    linkedinLabel: "LinkedIn",
    references: "Referencias disponibles a pedido.",
  },

  footer: {
    builtWith: "Hecho con Next.js y Claude Code. Testeado con Playwright.",
    rights: "© 2026 Fernando Mosqueira",
  },

  cv: {
    summaryHeading: "Perfil profesional",
    skillsHeading: "Habilidades",
    experienceHeading: "Experiencia profesional",
    educationHeading: "Educación",
    certificationsHeading: "Certificaciones",
    languagesHeading: "Idiomas",
    referencesHeading: "Referencias",
    inProgressPrefix: "En curso",
  },
} satisfies Content;
