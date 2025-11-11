import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacidad | Kérdos Markets",
  description:
    "Política de privacidad de Kérdos Markets. Conocé cómo protegemos tu información y qué derechos tenés como usuario.",
};

const sections = [
  {
    title: "1. Información que recopilamos",
    paragraphs: [
      "Kérdos recopila solo la información necesaria para ofrecer el servicio y brindarte soporte.",
    ],
    bullets: [
      "Datos de cuenta: nombre, correo electrónico y contraseña cifrada.",
      "Preferencias y configuraciones que guardás en la app.",
      "Interacciones dentro del producto, como historial de acceso o acciones recientes para ayudarte a retomar tu actividad.",
      "Información técnica básica (IP aproximada, tipo de dispositivo, idioma) para mejorar rendimiento y prevenir abuso automático.",
    ],
  },
  {
    title: "2. Cómo usamos tus datos",
    paragraphs: [
      "Tu información se usa únicamente para operar y mejorar Kérdos. Nunca la vendemos.",
    ],
    bullets: [
      "Brindar acceso a la plataforma y guardar tus preferencias.",
      "Enviar comunicaciones operativas (por ejemplo, confirmaciones o alertas de seguridad).",
      "Mejorar la experiencia de producto mediante análisis agregados.",
      "Prevenir usos indebidos, bots o intentos de ataque.",
    ],
  },
  {
    title: "3. Almacenamiento y seguridad",
    paragraphs: [
      "Aplicamos cifrado en tránsito, control de accesos y monitoreo interno para detectar actividades sospechosas. Solo el personal autorizado puede acceder a la información estrictamente necesaria.",
      "Conservamos los datos mientras tengas una cuenta activa o cuando sea imprescindible para resolver incidencias y cumplir requisitos contables básicos.",
    ],
  },
  {
    title: "4. Compartir información",
    paragraphs: [
      "No vendemos tus datos ni los liberamos al público. Solo compartimos información con terceros que nos ayudan a operar el servicio y que ofrecen garantías de seguridad equivalentes.",
    ],
    bullets: [
      "Proveedores de hosting, mensajería o analítica agregada.",
      "Servicios que nos permiten detectar abuso o mantener registros de actividad.",
      "Autoridades cuando exista un requerimiento legal válido.",
    ],
  },
  {
    title: "5. Cookies y analítica",
    paragraphs: [
      "Utilizamos cookies esenciales para mantener tu sesión y cookies opcionales para analítica agregada. Podés administrar tus preferencias desde la configuración del navegador o a través del banner de consentimiento cuando esté disponible.",
    ],
  },
  {
    title: "6. Tus derechos",
    paragraphs: [
      "Podés escribirnos para ejercer tus derechos sobre la información que almacenamos.",
    ],
    bullets: [
      "Acceder o corregir datos inexactos.",
      "Solicitar una copia exportable de tu información.",
      "Limitar u oponerte a usos concretos cuando corresponda.",
      "Cerrar tu cuenta y solicitar que eliminemos la información restante salvo obligaciones mínimas de conservación.",
    ],
    footer:
      "Es posible que solicitemos información adicional para verificar tu identidad antes de procesar la solicitud.",
  },
  {
    title: "7. Cambios a esta política",
    paragraphs: [
      "Podemos actualizar esta política cuando haya cambios significativos en el producto o en la forma en que manejamos tus datos. Siempre indicaremos la fecha de la última actualización en esta misma página.",
    ],
    footer:
      "Si los cambios son sustanciales, te notificaremos por correo o dentro de la aplicación con antelación razonable.",
  },
  {
    title: "8. Contacto",
    paragraphs: [
      "Para preguntas sobre privacidad o para ejercer tus derechos, escribinos a:",
      "hola@kerdoscompany.com (asunto: Privacidad) o presioná el botón de soporte dentro de la app.",
    ],
  },
];

export default function PrivacyPage() {
  const effectiveDate = "15 de enero de 2025";

  return (
    <main className="bg-background px-4 pb-16 pt-24 text-foreground md:px-8 lg:px-16">
      <div className="mx-auto w-full max-w-4xl space-y-10">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary">
            Privacidad
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Política de privacidad de Kérdos Markets
          </h1>
          <p className="text-base text-muted-foreground">
            Esta política describe cómo recopilamos, usamos y protegemos tu información
            personal cuando utilizás Kérdos Markets. Nos comprometemos a operar con
            transparencia y a brindarte control sobre tus datos.
          </p>
          <p className="text-sm text-muted-foreground">
            Última actualización: {effectiveDate}
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
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.bullets && (
                  <ul className="list-disc space-y-2 pl-5">
                    {section.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
                {section.footer && <p className="text-sm">{section.footer}</p>}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
