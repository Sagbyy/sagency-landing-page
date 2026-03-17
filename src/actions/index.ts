import { ActionError, defineAction } from "astro:actions";
import { z } from "astro/zod";
import { Resend } from "resend";
import backgroundHeader from "../assets/services/background/background-3.png";

const SITE = "https://www.sagency.tech";
const LOGO_URL = `${SITE}/logo-sagency-white.png`;
const BG_URL = `${SITE}${backgroundHeader.src}`;

const resend = new Resend(import.meta.env.RESEND_API_KEY);

const notificationHtml = (
  name: string,
  email: string,
  message: string,
  needs?: string,
  budget?: string,
  timeline?: string,
) => `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <tr><td style="background:#000;border-radius:16px 16px 0 0;padding:32px 40px;background-image:url(${BG_URL});background-size:cover;background-position:center;">
          <p style="margin:0;font-size:11px;color:#ffffff80;letter-spacing:2px;text-transform:uppercase;">Sagency</p>
          <img src="${LOGO_URL}" alt="Sagency" style="display:block;height:28px;width:auto;margin:10px 0 16px;" />
          <h1 style="margin:0;font-size:22px;font-weight:700;color:#fff;">Nouveau message de contact</h1>
        </td></tr>

        <tr><td style="background:#fff;padding:40px;">

          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
            <tr>
              <td style="padding:16px;background:#f9f9f9;border-radius:12px;border:1px solid #e5e5e5;">
                <p style="margin:0 0 4px;font-size:11px;color:#999;text-transform:uppercase;letter-spacing:1px;">Expéditeur</p>
                <p style="margin:0;font-size:16px;font-weight:600;color:#000;">${name}</p>
                <a href="mailto:${email}" style="font-size:14px;color:#555;text-decoration:none;">${email}</a>
              </td>
            </tr>
          </table>

          <p style="margin:0 0 8px;font-size:11px;color:#999;text-transform:uppercase;letter-spacing:1px;">Message</p>
          <div style="background:#f9f9f9;border-left:3px solid #000;border-radius:0 12px 12px 0;padding:16px 20px;margin-bottom:32px;">
            <p style="margin:0;font-size:15px;color:#333;line-height:1.7;">${message.replace(/\n/g, "<br>")}</p>
          </div>

          ${
            needs || budget || timeline
              ? `
          <p style="margin:0 0 16px;font-size:11px;color:#999;text-transform:uppercase;letter-spacing:1px;">Détails du projet</p>
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
            ${
              needs
                ? `<tr><td style="padding:10px 16px;border-bottom:1px solid #f0f0f0;">
                <span style="font-size:12px;color:#999;">Besoins</span><br>
                <span style="font-size:14px;font-weight:600;color:#000;">${needs}</span>
              </td></tr>`
                : ""
            }
            ${
              budget
                ? `<tr><td style="padding:10px 16px;border-bottom:1px solid #f0f0f0;">
                <span style="font-size:12px;color:#999;">Budget</span><br>
                <span style="font-size:14px;font-weight:600;color:#000;">${budget}</span>
              </td></tr>`
                : ""
            }
            ${
              timeline
                ? `<tr><td style="padding:10px 16px;">
                <span style="font-size:12px;color:#999;">Délai cible</span><br>
                <span style="font-size:14px;font-weight:600;color:#000;">${timeline}</span>
              </td></tr>`
                : ""
            }
          </table>`
              : ""
          }

          <a href="mailto:${email}" style="display:inline-block;background:#000;color:#fff;text-decoration:none;font-size:14px;font-weight:600;padding:14px 28px;border-radius:100px;">Répondre à ${name}</a>

        </td></tr>

        <tr><td style="background:#f9f9f9;border-radius:0 0 16px 16px;padding:24px 40px;border-top:1px solid #e5e5e5;">
          <p style="margin:0;font-size:12px;color:#999;text-align:center;">Ce mail a été envoyé via le formulaire de contact de <strong>sagency.tech</strong></p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

const confirmationHtml = (name: string) => `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <tr><td style="background:#000;border-radius:16px 16px 0 0;padding:32px 40px;text-align:center;background-image:url(${BG_URL});background-size:cover;background-position:center;">
          <p style="margin:0;font-size:11px;color:#ffffff80;letter-spacing:2px;text-transform:uppercase;">Sagency</p>
          <img src="${LOGO_URL}" alt="Sagency" style="display:block;height:28px;width:auto;margin:10px auto 16px;" />
          <h1 style="margin:0;font-size:26px;font-weight:700;color:#fff;">Merci, ${name} 👋</h1>
        </td></tr>

        <tr><td style="background:#fff;padding:40px;text-align:center;">

          <div style="width:56px;height:56px;background:#f0fdf4;border-radius:50%;margin:0 auto 24px;line-height:56px;text-align:center;font-size:28px;">✅</div>

          <h2 style="margin:0 0 12px;font-size:20px;font-weight:700;color:#000;">Votre message a bien été reçu</h2>
          <p style="margin:0 0 32px;font-size:15px;color:#555;line-height:1.7;max-width:440px;margin-left:auto;margin-right:auto;">
            Nous avons bien reçu votre demande et nous vous répondrons <strong>sous 1 jour ouvré</strong>.
            En attendant, n'hésitez pas à réserver un appel si vous souhaitez échanger plus rapidement.
          </p>

          <a href="https://calendar.app.google/DjdkoBZLrgx344AF7" style="display:inline-block;background:#000;color:#fff;text-decoration:none;font-size:14px;font-weight:600;padding:14px 28px;border-radius:100px;margin-bottom:32px;">Réserver un appel de 30 min</a>

          <div style="border-top:1px solid #f0f0f0;padding-top:24px;">
            <p style="margin:0;font-size:13px;color:#999;">Une question urgente ? Écrivez-nous directement à</p>
            <a href="mailto:contact@sagency.tech" style="font-size:14px;font-weight:600;color:#000;">contact@sagency.tech</a>
          </div>

        </td></tr>

        <tr><td style="background:#f9f9f9;border-radius:0 0 16px 16px;padding:24px 40px;border-top:1px solid #e5e5e5;">
          <p style="margin:0;font-size:12px;color:#999;text-align:center;">© 2025 Sagency — <a href="https://sagency.tech" style="color:#999;">sagency.tech</a></p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

export const server = {
  send: defineAction({
    accept: "form",
    input: z.object({
      name: z.string().min(1, "Le nom est requis"),
      email: z.email("Email invalide"),
      message: z.string().min(1, "Le message est requis"),
      needs: z.string().optional(),
      budget: z.string().optional(),
      timeline: z.string().optional(),
    }),
    handler: async ({ name, email, message, needs, budget, timeline }) => {
      const [notification, confirmation] = await Promise.all([
        resend.emails.send({
          from: "Contact <contact@sagency.tech>",
          to: ["contact@sagency.tech"],
          replyTo: email,
          subject: `Nouveau message de ${name}`,
          html: notificationHtml(name, email, message, needs, budget, timeline),
        }),
        resend.emails.send({
          from: "Sagency <contact@sagency.tech>",
          to: [email],
          subject: "Nous avons bien reçu votre message 👋",
          html: confirmationHtml(name),
        }),
      ]);

      if (notification.error) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: notification.error.message,
        });
      }

      if (confirmation.error) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: confirmation.error.message,
        });
      }

      return notification.data;
    },
  }),
};
