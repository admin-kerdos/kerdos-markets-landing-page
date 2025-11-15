export type Language = "es" | "pt";

export type AnswerBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

type HowItWorksStep = {
  id: string;
  icon: "globe" | "layers" | "list" | "shield";
  title: string;
  description: string;
  benefits: string[];
};

type FAQItem = {
  id: string;
  question: string;
  answer: AnswerBlock[];
};

export type LanguageContent = {
  hero: {
    title: string;
    subtitle: string;
    ctaButton: string;
    emailPlaceholder: string;
    submitLabel: string;
    success: string;
    duplicate: string;
    invalid: string;
    error: string;
  };
  nav: {
    hero: string;
    how: string;
    faq: string;
  };
  languageToggle: {
    label: string;
    es: string;
    pt: string;
  };
  howItWorks: {
    heading: string;
    subheading?: string;
    steps: HowItWorksStep[];
  };
  faq: {
    title: string;
    intro: string;
    feedbackPrompt: string;
    helpful: {
      up: string;
      down: string;
    };
    items: FAQItem[];
  };
  footer: {
    mainLinks: { href: string; label: string }[];
    legalLinks: { href: string; label: string }[];
    copyright: string;
  };
};

export const content: Record<Language, LanguageContent> = {
  es: {
    hero: {
      title: "Apostá por lo que sabés.",
      subtitle: "Predicción en español y portugués, precio es probabilidad y sin casa en contra.",
    ctaButton: "Únete a la lista de espera",
    emailPlaceholder: "Correo electrónico",
    submitLabel: "Sumarme",
    success: "Listo, te avisamos cuando lancemos.",
    duplicate: "Ese correo ya está registrado.",
    invalid: "Ingresá un correo válido.",
    error: "No pudimos guardar tu correo. Probá de nuevo."
  },
    nav: {
      hero: "Inicio",
      how: "Qué es Kérdos Markets",
      faq: "FAQ"
    },
    languageToggle: {
      label: "Cambiar idioma",
      es: "ES",
      pt: "PT"
    },
    howItWorks: {
      heading: "Kérdos Markets",
      steps: [
        {
          id: "step-hero",
          icon: "globe",
          title: "Qué es Kérdos Markets",
          description:
            "El primer mercado de predicción en español y portugués, enfocado 100% en LATAM. Comprás y vendés posiciones sobre economía, elecciones y cultura.",
          benefits: [
            "Diseñado para comunidades hispanas y lusas",
            "Liquidez 24/7 sobre eventos regionales",
            "Entrá o salí cuando cambia la información"
          ]
        },
        {
          id: "step-market",
          icon: "layers",
          title: "Qué es un mercado de predicción",
          description:
            "Cada contrato paga $1 si acierta y $0 si falla. El precio refleja la probabilidad colectiva y cambia con los datos.",
          benefits: [
            "Si “Sí” vale $0.70, el mercado estima 70%",
            "Podés tomar ganancias o cortar pérdidas antes",
            "Operás contra personas, no contra una casa"
          ]
        },
        {
          id: "step-portfolio",
          icon: "list",
          title: 'Qué se puede "apostar"',
          description:
            "Economía, política, deportes y entretenimiento. Elegís el evento y operás tu lectura.",
          benefits: [
            "Economía: inflación, tipo de cambio, crecimiento",
            "Política: encuestas y resultados",
            "Deportes: campeones, partidos, rendimiento",
            "Entretenimiento y tendencias"
          ]
        },
        {
          id: "step-why",
          icon: "shield",
          title: "Por qué es mejor que lo que ya existe",
          description:
            "Más transparencia, sin conflicto de interés y control del riesgo con retiros instantáneos.",
          benefits: [
            "Kérdos gana por comisiones, no por tu pérdida",
            "Podés vender cuando querés",
            "Fondos siempre bajo tu control"
          ]
        }
      ]
    },
    faq: {
      title: "Preguntas frecuentes",
      intro: "Explorá cómo funciona el mercado, medios de pago y riesgos antes de tradear.",
      feedbackPrompt: "¿Te sirvió?",
      helpful: {
        up: "Sí, me ayudó",
        down: "No, necesito más info"
      },
      items: [
        {
          id: "difference",
          question: "¿Qué es Kérdos Markets y en qué se diferencia de una casa de apuestas?",
          answer: [
            {
              type: "paragraph",
              text:
                "Kérdos es un mercado de predicción: comprás y vendés posiciones contra otras personas, no contra la casa. Los precios reflejan probabilidad y Kérdos gana con comisiones por trading/cierre."
            },
            {
              type: "paragraph",
              text:
                "En mercados de predicción hasta ≈43% de usuarios resultan rentables vs ≈2% en sportsbooks, porque el incentivo está en aportar información y no en apostar contra una casa que controla las cuotas."
            }
          ]
        },
        {
          id: "pricing",
          question: "¿Cómo funciona el precio y qué significa que refleje probabilidad?",
          answer: [
            {
              type: "paragraph",
              text:
                "Cada posición paga $1 si acierta y $0 si falla. Si “Sí” cotiza a $0.70, el mercado estima 70% de probabilidad. El precio sube o baja según oferta, demanda y nueva información."
            }
          ]
        },
        {
          id: "enter-exit",
          question: "¿Puedo entrar y salir antes de que termine el evento? ¿Cómo vendo una posición?",
          answer: [
            {
              type: "paragraph",
              text:
                "Sí. Comprás “Sí/No” y podés vender al precio actual en cualquier momento. Ganancia/Pérdida ≈ (precio de venta − precio de compra) × cantidad, menos comisiones."
            }
          ]
        },
        {
          id: "topics",
          question: "¿Qué temas se pueden operar?",
          answer: [
            {
              type: "list",
              items: [
                "Economía: inflación, tipo de cambio, crecimiento.",
                "Política: encuestas y resultados.",
                "Deportes: campeones, partidos, rendimiento.",
                "Entretenimiento y tendencias."
              ]
            }
          ]
        },
        {
          id: "payments",
          question: "¿Cómo deposito y retiro? ¿Hay mínimos o comisiones? ¿Los retiros son instantáneos?",
          answer: [
            {
              type: "paragraph",
              text:
                "Podés usar wallets Phantom o Solflare o depositar USDC directo. Integraremos métodos locales pronto. Los retiros son instantáneos y sin comisión de Kérdos."
            }
          ]
        },
        {
          id: "countries",
          question: "¿En qué países está disponible y en qué idiomas puedo usar la plataforma?",
          answer: [
            {
              type: "paragraph",
              text: "Funciona globalmente en español y portugués. Priorizamos LATAM, pero podés operar desde cualquier lugar."
            }
          ]
        },
        {
          id: "resolution",
          question: "¿Cuándo se resuelve un mercado y qué pasa si el evento cambia o se cancela?",
          answer: [
            {
              type: "paragraph",
              text:
                "Cada mercado define reglas de resolución. Si se posterga puede extenderse; si cambia de forma sustancial, se ajusta o se declara inválido y se comunican devoluciones."
            }
          ]
        },
        {
          id: "fees",
          question: "¿Qué comisiones cobra Kérdos y por qué no apuesta contra mí?",
          answer: [
            {
              type: "paragraph",
              text:
                "Cobramos 1%–2% por trade. Kérdos no toma posiciones contra vos; su ingreso proviene de estas comisiones, eliminando el conflicto típico de sportsbooks."
            }
          ]
        }
      ]
    },
    footer: {
      mainLinks: [
        { href: "#how-it-works", label: "Cómo funciona" },
        { href: "#faq", label: "Preguntas frecuentes" },
        { href: "mailto:hola@kerdoscompany.com", label: "Contacto" }
      ],
      legalLinks: [
        { href: "/privacy", label: "Privacidad" },
        { href: "/terms", label: "Términos" }
      ],
      copyright: "© {year} Kérdos Markets. Hecho en LATAM."
    }
  },
  pt: {
    hero: {
      title: "Aposte no que você sabe.",
      subtitle: "Previsão em espanhol e português, preço é probabilidade e sem casa contra você.",
    ctaButton: "Entre na lista de espera",
    emailPlaceholder: "E-mail",
    submitLabel: "Quero entrar",
    success: "Perfeito! Avisaremos quando abrirmos.",
    duplicate: "Esse e-mail já está registrado.",
    invalid: "Digite um e-mail válido.",
    error: "Não conseguimos salvar o e-mail. Tente novamente."
  },
    nav: {
      hero: "Início",
      how: "O que é Kérdos Markets",
      faq: "Perguntas"
    },
    languageToggle: {
      label: "Trocar idioma",
      es: "ES",
      pt: "PT"
    },
    howItWorks: {
      heading: "Kérdos Markets",
      steps: [
        {
          id: "step-hero",
          icon: "globe",
          title: "O que é Kérdos Markets",
          description:
            "O primeiro mercado de previsão em espanhol e português, 100% focado na América Latina. Compre e venda posições sobre economia, eleições e cultura.",
          benefits: [
            "Pensado para comunidades ibero-latinas",
            "Liquidez 24/7 em eventos da região",
            "Entre ou saia quando novos dados surgirem"
          ]
        },
        {
          id: "step-market",
          icon: "layers",
          title: "Como funciona um mercado de previsão",
          description:
            "Cada contrato paga US$1 se acontecer e US$0 se falhar. O preço é a probabilidade coletiva e reage à oferta e à informação.",
          benefits: [
            "Se “Sim” vale US$0,70, o mercado estima 70%",
            "Você pode travar lucro ou reduzir perda antes",
            "Opera contra pessoas, não contra uma casa"
          ]
        },
        {
          id: "step-portfolio",
          icon: "list",
          title: 'O que dá para "apostar"',
          description:
            "Economia, política, esportes e entretenimento. Você escolhe o evento e opera sua leitura.",
          benefits: [
            "Economia: inflação, câmbio, crescimento",
            "Política: pesquisas e resultados",
            "Esportes: campeões, partidas, desempenho",
            "Entretenimento e tendências"
          ]
        },
        {
          id: "step-why",
          icon: "shield",
          title: "Por que é melhor que o modelo tradicional",
          description:
            "Mais transparência, zero conflito de interesse e controle total de risco com saques instantâneos.",
          benefits: [
            "Kérdos lucra com comissão, não com sua perda",
            "Venda quando quiser",
            "Seus fundos seguem sob seu controle"
          ]
        }
      ]
    },
    faq: {
      title: "Perguntas frequentes",
      intro: "Veja como o mercado funciona, quais meios de pagamento usamos e os riscos antes de operar.",
      feedbackPrompt: "Isso ajudou?",
      helpful: {
        up: "Sim, ajudou",
        down: "Não, falta info"
      },
      items: [
        {
          id: "difference",
          question: "O que é Kérdos Markets e como se diferencia de uma casa de apostas?",
          answer: [
            {
              type: "paragraph",
              text:
                "Kérdos é um mercado de previsão: você negocia posições com outras pessoas. Os preços refletem probabilidade e a Kérdos ganha comissões por trade/fechamento, nunca contra você."
            },
            {
              type: "paragraph",
              text:
                "Em mercados de previsão até ≈43% dos usuários são lucrativos vs ≈2% em sportsbooks, porque o incentivo é aportar informação, não apostar contra a casa."
            }
          ]
        },
        {
          id: "pricing",
          question: "Como o preço funciona e por que ele reflete probabilidade?",
          answer: [
            {
              type: "paragraph",
              text:
                "Cada contrato paga US$1 se acertar e US$0 se errar. Se “Sim” custa US$0,70, o mercado estima 70% de chance. O preço mexe conforme oferta, demanda e notícias."
            }
          ]
        },
        {
          id: "enter-exit",
          question: "Posso entrar e sair antes do fim? Como vendo uma posição?",
          answer: [
            {
              type: "paragraph",
              text:
                "Sim. Você compra “Sim/Não” e pode vender pelo preço atual a qualquer momento. Lucro/Prejuízo ≈ (venda − compra) × quantidade menos comissão."
            }
          ]
        },
        {
          id: "topics",
          question: "Quais temas posso operar?",
          answer: [
            {
              type: "list",
              items: [
                "Economia: inflação, câmbio, crescimento.",
                "Política: pesquisas e resultados.",
                "Esportes: campeões, partidas, performance.",
                "Entretenimento e cultura pop."
              ]
            }
          ]
        },
        {
          id: "payments",
          question: "Como deposito e retiro? Existem mínimos ou taxas?",
          answer: [
            {
              type: "paragraph",
              text:
                "Use wallets Phantom ou Solflare ou deposite USDC direto; em breve teremos métodos locais. Saques são instantâneos e sem taxa da Kérdos."
            }
          ]
        },
        {
          id: "countries",
          question: "Em quais países está disponível e quais idiomas posso usar?",
          answer: [
            {
              type: "paragraph",
              text: "Funciona globalmente em espanhol e português, com foco em LATAM. Pode operar de qualquer lugar."
            }
          ]
        },
        {
          id: "resolution",
          question: "Quando um mercado é resolvido e o que acontece se o evento muda?",
          answer: [
            {
              type: "paragraph",
              text:
                "Cada mercado traz regras claras. Se adiar, podemos estender; se mudar drasticamente, ajustamos ou anulamos e explicamos como os fundos são tratados."
            }
          ]
        },
        {
          id: "fees",
          question: "Quais comissões a Kérdos cobra e por que não aposta contra mim?",
          answer: [
            {
              type: "paragraph",
              text:
                "Cobramos 1%–2% por trade. A Kérdos não assume o lado oposto; vive das comissões, eliminando o conflito padrão das casas tradicionais."
            }
          ]
        }
      ]
    },
    footer: {
      mainLinks: [
        { href: "#how-it-works", label: "Como funciona" },
        { href: "#faq", label: "Perguntas frequentes" },
        { href: "mailto:hola@kerdoscompany.com", label: "Contato" }
      ],
      legalLinks: [
        { href: "/privacy", label: "Privacidade" },
        { href: "/terms", label: "Termos" }
      ],
      copyright: "© {year} Kérdos Markets. Feito na América Latina."
    }
  }
};
