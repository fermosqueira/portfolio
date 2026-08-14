import type { Content } from "./types";

export const en = {
  meta: {
    title: "Fernando Mosqueira — QA Analyst",
    description:
      "QA Analyst. Functional and API testing, automation with Playwright and TypeScript, and an AI-assisted workflow.",
    ogAlt: "Fernando Mosqueira — QA Analyst",
  },

  nav: {
    about: "About",
    skills: "Skills",
    experience: "Experience",
    education: "Education",
    certifications: "Certifications",
    ai: "AI",
    projects: "Projects",
    contact: "Contact",
  },

  common: {
    present: "Present",
    downloadCv: "Download CV",
    switchLanguage: "Switch language",
    skipToContent: "Skip to content",
  },

  hero: {
    role: "QA Analyst",
    tagline: "I break things on purpose so they don't break on their own.",
    chips: ["Playwright", "API Testing", "AI-Driven QA"],
    ctaContact: "Get in touch",
    ctaLinkedin: "LinkedIn",
  },

  about: {
    heading: "About",
    body: [
      "I spent five years auditing operational processes, costs and ERP data. That job left me with a genuinely useful obsession: finding where something breaks before it reaches anyone.",
      "I do the same thing with software now. I design test plans, validate APIs, automate regression and document defects with full traceability. And I get involved early in development, not once it's too late to fix anything.",
      "I use AI every day to speed up the tedious part of the job. The judgment is still mine.",
    ],
    languagesLabel: "Languages",
    languages: [
      { name: "Spanish", level: "Native" },
      { name: "English", level: "C1 · Advanced" },
    ],
  },

  skills: {
    heading: "Skills",
    groups: {
      testing: "Testing",
      tools: "Tools",
      methods: "Methodologies",
    },
  },

  experience: {
    heading: "Experience",
    items: {
      iconext: {
        role: "QA Analyst",
        kind: "Freelance",
        bullets: [
          "Designed and ran functional and non-functional test plans across frontend and backend, documenting critical defects with full traceability.",
          "Validated REST APIs with Postman and Swagger, verifying endpoint integrity, contracts and error handling.",
          "Built and maintained automated test suites with Playwright and TypeScript, cutting manual regression time.",
          "Ran exploratory and UX/UI testing, giving developers and designers actionable feedback.",
          "Managed the defect lifecycle in Trello, keeping traceability, SLAs and effective resolution on track.",
          "Took part in Agile ceremonies, bringing QA in from the early stages of development.",
        ],
      },
      naif: {
        role: "Process Control Analyst",
        kind: null,
        bullets: [
          "Monitored operational process compliance, costs and delivery times, spotting deviations and coordinating corrective action.",
          "Analysed KPIs and drove data-focused continuous improvement initiatives.",
          "Validated information and documentation in ERP systems, guaranteeing accuracy and consistency of critical data.",
          "Coordinated resolution of operational incidents across departments, improving process traceability.",
          "Reviewed and updated internal procedures for standardisation and documentation quality control.",
        ],
      },
    },
  },

  education: {
    heading: "Education",
    items: {
      untref: {
        title: "Diploma in Software Quality Control",
        detail:
          "Functional, API and automated testing · Test case design · Postman and Swagger · Agile methodologies · Traceability and continuous improvement.",
      },
      gcba: {
        title: "Java Programming Course",
        detail: "Object-oriented programming · Algorithms · Desktop application development.",
      },
    },
  },

  certifications: {
    heading: "Certifications",
    completedLabel: "Completed",
    inProgressLabel: "In progress",
    note: "Courses marked “in progress” are the ones I'm taking right now. The label changes when the certificate lands.",
  },

  ai: {
    heading: "How I work with AI",
    intro:
      "I don't use one tool for everything. I pick per task, which is exactly the criterion I apply to choosing any testing tool.",
    cards: {
      design: {
        title: "Test cases and requirements",
        body: "Breaking down user stories, spotting ambiguity in acceptance criteria and building edge-case matrices. I tried Gemini for the same work and stayed with ChatGPT: it holds the context of a long requirement better and returns less redundant cases.",
      },
      editor: {
        title: "In-editor assistance",
        body: "Inside VS Code, for writing and refactoring automation code. Autocomplete and scaffolding, not design decisions.",
      },
      build: {
        title: "Build and automation",
        body: "I built this site with Claude Code: architecture, components, the E2E suite and the CI pipeline. The result is the evidence — including the tests that verify the page doesn't break.",
      },
    },
    closing:
      "A concrete example: this site's content exists exactly once, and it's typed. Spanish and English validate against the same contract, so if one language is missing something, the build fails. Both PDF CVs are generated from that same source. It's quality control applied to my own information.",
  },

  projects: {
    heading: "Projects",
    items: {
      e2e: {
        title: "E2E suite with Page Object Model",
        body: "End-to-end automation against the-internet.herokuapp.com: successful and failed login, dynamic element handling and chained workflows. Page Objects on a shared BasePage, Playwright fixtures for dependency injection, and data-driven cases that cover several failure scenarios from a single test. Runs on GitHub Actions on every push and PR, with the HTML report as an artifact.",
      },
      api: {
        title: "REST API automation",
        body: "API tests against JSONPlaceholder using Playwright's request fixture: status code verification and response content validation on GET and POST. Work in progress — growing towards PUT and DELETE, resource-based organisation with an API client pattern, and combined UI + API testing.",
      },
      aplicador: {
        title: "Aplicador: job applications in one click",
        body: "A tool that solves a problem of my own: sending my CV to the openings that show up on LinkedIn, and knowing a month later which opening each reply belongs to. A Manifest V3 extension spots the addresses in the feed —including the ones LinkedIn turns into mailto links— and opens a panel with company, role and language prefilled from the post; a local Python server builds the email from bilingual templates, sends it over SMTP and labels the Gmail copy over IMAP. It stores the whole post, so a search finds it later by any word it contained, and a matcher pairs replies using Gmail's conversation id. Dependency-free backend, 79 tests with their own fixtures, and CI that also fails if a credential ever gets committed.",
      },
      site: {
        title: "This site",
        body: "Static bilingual site with typed content as the single source of truth, a Playwright E2E suite (language parity, accessibility, responsive) and CI running typecheck, build and tests on every push. Both PDF CVs come out of the same content.",
      },
    },
    viewLive: "View live",
    viewRepo: "View repository",
  },

  contact: {
    heading: "Contact",
    body: "I'm looking for QA work. If you have something in mind, drop me a line.",
    emailLabel: "Email",
    linkedinLabel: "LinkedIn",
    references: "References available on request.",
  },

  footer: {
    builtWith: "Built with Next.js and Claude Code. Tested with Playwright.",
    rights: "© 2026 Fernando Mosqueira",
  },

  cv: {
    summaryHeading: "Professional summary",
    skillsHeading: "Technical skills",
    experienceHeading: "Professional experience",
    educationHeading: "Education",
    certificationsHeading: "Certifications",
    languagesHeading: "Languages",
    referencesHeading: "References",
    inProgressPrefix: "In progress",
  },
} satisfies Content;
