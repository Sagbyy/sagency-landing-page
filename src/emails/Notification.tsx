import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Row,
  Column,
  Section,
  Text,
  Link,
} from "@react-email/components";

const SITE = "https://www.sagency.tech";
const LOGO_WHITE = `${SITE}/logo-sagency-white.png`;
const LOGO_BLACK = `${SITE}/logo-sagency-black.png`;

interface Props {
  name: string;
  email: string;
  message: string;
  needs?: string;
  budget?: string;
  timeline?: string;
}

export function Notification({
  name,
  email,
  message,
  needs,
  budget,
  timeline,
}: Props) {
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
            <Img
              src={LOGO_WHITE}
              height={28}
              alt="Sagency"
              className="logo-white"
              style={{ display: "block", margin: "10px 0 16px" }}
            />
            <Img
              src={LOGO_BLACK}
              height={28}
              alt="Sagency"
              className="logo-black"
              style={{ display: "none", margin: "10px 0 16px" }}
            />
            <Text style={styles.headerTitle}>Nouveau message de contact</Text>
          </Section>

          <Section style={styles.body_section}>
            <Section style={styles.senderBox}>
              <Text style={styles.label}>Expéditeur</Text>
              <Text style={styles.senderName}>{name}</Text>
              <Link href={`mailto:${email}`} style={styles.senderEmail}>
                {email}
              </Link>
            </Section>

            <Text style={styles.label}>Message</Text>
            <Section style={styles.messageBox}>
              <Text style={styles.messageText}>{message}</Text>
            </Section>

            {(needs || budget || timeline) && (
              <>
                <Text style={styles.label}>Détails du projet</Text>
                <Section style={styles.detailsBox}>
                  {needs && (
                    <Row style={styles.detailRow}>
                      <Column>
                        <Text style={styles.detailKey}>Besoins</Text>
                        <Text style={styles.detailValue}>{needs}</Text>
                      </Column>
                    </Row>
                  )}
                  {budget && (
                    <Row style={styles.detailRow}>
                      <Column>
                        <Text style={styles.detailKey}>Budget</Text>
                        <Text style={styles.detailValue}>{budget}</Text>
                      </Column>
                    </Row>
                  )}
                  {timeline && (
                    <Row>
                      <Column>
                        <Text style={styles.detailKey}>Délai cible</Text>
                        <Text style={styles.detailValue}>{timeline}</Text>
                      </Column>
                    </Row>
                  )}
                </Section>
              </>
            )}

            <Button href={`mailto:${email}`} style={styles.cta}>
              Répondre à {name}
            </Button>
          </Section>

          <Section style={styles.footer}>
            <Text style={styles.footerText}>
              Ce mail a été envoyé via le formulaire de contact de{" "}
              <strong>sagency.tech</strong>
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
    fontSize: 22,
    fontWeight: 700,
    color: "#fff",
  },
  body_section: {
    background: "#fff",
    padding: "40px",
  },
  senderBox: {
    padding: 16,
    background: "#f9f9f9",
    borderRadius: 12,
    border: "1px solid #e5e5e5",
    marginBottom: 32,
  },
  label: {
    margin: "0 0 8px",
    fontSize: 11,
    color: "#999",
    textTransform: "uppercase" as const,
    letterSpacing: 1,
  },
  senderName: {
    margin: "4px 0 0",
    fontSize: 16,
    fontWeight: 600,
    color: "#000",
  },
  senderEmail: {
    fontSize: 14,
    color: "#555",
    textDecoration: "none",
  },
  messageBox: {
    background: "#f9f9f9",
    borderLeft: "3px solid #000",
    borderRadius: "0 12px 12px 0",
    padding: "16px 20px",
    marginBottom: 32,
  },
  messageText: {
    margin: 0,
    fontSize: 15,
    color: "#333",
    lineHeight: 1.7,
  },
  detailsBox: {
    marginBottom: 32,
    border: "1px solid #f0f0f0",
    borderRadius: 12,
    overflow: "hidden",
  },
  detailRow: {
    borderBottom: "1px solid #f0f0f0",
  },
  detailKey: {
    margin: "10px 16px 2px",
    fontSize: 12,
    color: "#999",
  },
  detailValue: {
    margin: "0 16px 10px",
    fontSize: 14,
    fontWeight: 600,
    color: "#000",
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
