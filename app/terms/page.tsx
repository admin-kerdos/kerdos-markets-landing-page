import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos de servicio | Kérdos Markets",
  description:
    "Condiciones de uso de Kérdos Markets. Conocé las reglas básicas para operar en la plataforma y cómo administramos tu cuenta.",
};

const sections = [
  {
    title: "1. Aceptación",
    content: [
      "Al crear una cuenta o utilizar Kérdos Markets aceptás estos términos, nuestra política de privacidad y cualquier aviso adicional publicado en la aplicación. Si no estás de acuerdo, no debés usar el servicio.",
    ],
  },
  {
    title: "2. Quién puede usar Kérdos",
    content: [
      "Debés tener la edad mínima legal en tu jurisdicción para celebrar contratos digitales y contar con capacidad plena para aceptar estos términos. Podemos limitar el acceso en ciertos países si la regulación local lo exige.",
    ],
    bullets: [
      "Te comprometés a proporcionar información verdadera y mantenerla actualizada.",
      "Sos responsable de mantener segura tu cuenta y credenciales.",
      "Tenés que notificarnos de inmediato si detectás uso no autorizado.",
    ],
  },
  {
    title: "3. Uso permitido",
    content: [
      "Kérdos es un mercado entre personas para comprar o vender posiciones sobre eventos públicos. Podés usar la plataforma únicamente con fines lícitos y siguiendo las reglas internas.",
    ],
    bullets: [
      "No intentes manipular precios, ejecutar bots maliciosos ni interferir con otros usuarios.",
      "Está prohibido publicar o compartir contenido que viole derechos de terceros o resulte ofensivo.",
      "Podemos suspender o cerrar cuentas que incumplan estas reglas o muestren actividad sospechosa.",
    ],
  },
  {
    title: "4. Riesgos",
    content: [
      "Operar mercados de predicción implica riesgo de pérdida total del monto invertido. No ofrecemos garantías de resultado ni recomendaciones financieras.",
      "Vos decidís cuándo abrir o cerrar posiciones y sos responsable de las consecuencias.",
    ],
  },
  {
    title: "5. Tarifas y transacciones",
    content: [
      "Podemos aplicar comisiones por trading, cierre anticipado o retiros. Siempre informaremos las tarifas vigentes dentro de la aplicación antes de que confirmes una operación.",
      "Todas las transacciones se consideran finales una vez ejecutadas, salvo que exista un error técnico evidente.",
    ],
  },
  {
    title: "6. Propiedad intelectual",
    content: [
      "Kérdos y sus elementos visuales, logotipos, código y contenido pertenecen a sus respectivos titulares. Te otorgamos una licencia limitada y revocable para usar la app según estos términos.",
    ],
  },
  {
    title: "7. Suspensión o cierre de cuenta",
    content: [
      "Podemos suspender o cancelar tu acceso si detectamos uso indebido, incumplimientos graves o requerimientos legales. En caso de cierre definitivo te informaremos cómo retirar cualquier saldo disponible.",
    ],
  },
  {
    title: "8. Limitación de responsabilidad",
    content: [
      "Kérdos ofrece la plataforma \"tal cual\". No garantizamos disponibilidad continua ni ausencia de errores. En la medida permitida por la ley, nuestra responsabilidad total se limita al monto que nos hayas pagado en los últimos 12 meses (si corresponde).",
    ],
  },
  {
    title: "9. Cambios a los términos",
    content: [
      "Podemos actualizar estos términos para reflejar ajustes de producto o nuevos requisitos legales. Publicaremos la versión vigente en esta página y, si el cambio es relevante, te lo notificaremos dentro de la app o por correo.",
    ],
  },
  {
    title: "10. Contacto",
    content: [
      "Si tenés preguntas sobre estos términos, escribinos a hola@kerdoscompany.com (asunto: Términos) o abrí un ticket desde el centro de ayuda.",
    ],
  },
];

export default function TermsPage() {
  const effectiveDate = "15 de enero de 2025";

  return (
    <main className="bg-background px-4 pb-16 pt-24 text-foreground md:px-8 lg:px-16">
      <div className="mx-auto w-full max-w-4xl space-y-10">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary">
            Términos
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Términos de servicio de Kérdos Markets
          </h1>
          <p className="text-base text-muted-foreground">
            Estas condiciones definen el marco legal entre vos y Kérdos al usar la plataforma.
            Te pedimos que las leas con atención antes de operar.
          </p>
          <p className="text-sm text-muted-foreground">
            Vigente desde: {effectiveDate}
          </p>
        </header>

        <div className="space-y-8">
          {sections.map((section) => (
            <section
              key={section.title}
              className="rounded-3xl border border-border/70 bg-card/50 p-6 shadow-[0_25px_70px_-35px_rgba(15,23,42,0.4)]"
            >
              <h2 className="text-2xl font-semibold text-foreground">{section.title}</h2>
              <div className="mt-4 space-y-4 text-base text-muted-foreground">
                {section.content.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.bullets && (
                  <ul className="list-disc space-y-2 pl-5">
                    {section.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
