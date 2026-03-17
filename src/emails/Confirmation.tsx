import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Section,
  Text,
  Link,
} from "@react-email/components";

const SITE = "https://www.sagency.tech";
const LOGO_WHITE = `${SITE}/logo-sagency-white.png`;
const LOGO_BLACK = `${SITE}/logo-sagency-black.png`;

interface Props {
  name: string;
}

export function Confirmation({ name }: Props) {
  return (
    <Html lang="fr">
      <Head>
        <style>{`
          .logo-white { display: block !important; }
          .logo-black { display: none !important; }
          @media (prefers-color-scheme: dark) {
            .logo-white { display: none !important; }
            .logo-black { display: block !important; }
          }
        `}</style>
      </Head>
      <Body style={styles.body}>
        <Container style={styles.container}>

          <Section style={styles.header}>
            <Text style={styles.headerLabel}>Sagency</Text>
            <Img src={LOGO_WHITE} height={28} alt="Sagency" className="logo-white" style={{ display: "block", margin: "10px auto 16px" }} />
            <Img src={LOGO_BLACK} height={28} alt="Sagency" className="logo-black" style={{ display: "none", margin: "10px auto 16px" }} />
            <Text style={styles.headerTitle}>Merci, {name} 👋</Text>
          </Section>

          <Section style={styles.body_section}>

            <Img
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96' viewBox='0 0 24 24'%3E%3Cpath fill='%2321883D' d='M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m4.2 8.3l-4.8 4.8c-.4.4-1 .4-1.4 0l-2.2-2.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l1.5 1.5l4.1-4.1c.4-.4 1-.4 1.4 0s.4 1 0 1.4'/%3E%3C/svg%3E"
              width={64}
              height={64}
              alt="✓"
              style={{ margin: "0 auto 24px", display: "block" }}
            />

            <Text style={styles.title}>Votre message a bien été reçu</Text>
            <Text style={styles.description}>
              Nous avons bien reçu votre demande et nous vous répondrons{" "}
              <strong>sous 1 jour ouvré</strong>. En attendant, n'hésitez pas
              à réserver un appel si vous souhaitez échanger plus rapidement.
            </Text>

            <Button href="https://calendar.app.google/DjdkoBZLrgx344AF7" style={styles.cta}>
              Réserver un appel de 30 min
            </Button>

            <Hr style={styles.divider} />

            <Text style={styles.contactLabel}>
              Une question urgente ? Écrivez-nous directement à
            </Text>
            <Link href="mailto:contact@sagency.tech" style={styles.contactLink}>
              contact@sagency.tech
            </Link>

          </Section>

          <Section style={styles.footer}>
            <Text style={styles.footerText}>
              © 2025 Sagency —{" "}
              <Link href={SITE} style={{ color: "#999" }}>
                sagency.tech
              </Link>
            </Text>
          </Section>

        </Container>
      </Body>
    </Html>
  );
}

const styles = {
  body: {
    margin: 0,
    padding: "40px 0",
    background: "#f4f4f5",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  container: {
    maxWidth: 600,
    margin: "0 auto",
  },
  header: {
    background: "#000",
    borderRadius: "16px 16px 0 0",
    padding: "32px 40px",
    textAlign: "center" as const,
    backgroundImage: `url(${SITE}/_astro/background-3.png)`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  headerLabel: {
    margin: 0,
    fontSize: 11,
    color: "rgba(255,255,255,0.5)",
    letterSpacing: 2,
    textTransform: "uppercase" as const,
  },
  headerTitle: {
    margin: 0,
    fontSize: 26,
    fontWeight: 700,
    color: "#fff",
  },
  body_section: {
    background: "#fff",
    padding: "40px",
    textAlign: "center" as const,
  },
  title: {
    margin: "0 0 12px",
    fontSize: 20,
    fontWeight: 700,
    color: "#000",
  },
  description: {
    margin: "0 auto 32px",
    maxWidth: 440,
    fontSize: 15,
    color: "#555",
    lineHeight: 1.7,
  },
  cta: {
    display: "inline-block",
    background: "#000",
    color: "#fff",
    fontSize: 14,
    fontWeight: 600,
    padding: "14px 28px",
    borderRadius: 100,
    textDecoration: "none",
    marginBottom: 32,
  },
  divider: {
    borderColor: "#f0f0f0",
    margin: "0 0 24px",
  },
  contactLabel: {
    margin: "0 0 4px",
    fontSize: 13,
    color: "#999",
  },
  contactLink: {
    fontSize: 14,
    fontWeight: 600,
    color: "#000",
  },
  footer: {
    background: "#f9f9f9",
    borderRadius: "0 0 16px 16px",
    padding: "24px 40px",
    borderTop: "1px solid #e5e5e5",
  },
  footerText: {
    margin: 0,
    fontSize: 12,
    color: "#999",
    textAlign: "center" as const,
  },
};
