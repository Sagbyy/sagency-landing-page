import { ActionError, defineAction } from "astro:actions";
import { z } from "astro/zod";
import { Resend } from "resend";
import { render } from "@react-email/render";
import { Notification } from "../emails/Notification";
import { Confirmation } from "../emails/Confirmation";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

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
      const [notificationHtml, confirmationHtml] = await Promise.all([
        render(Notification({ name, email, message, needs, budget, timeline })),
        render(Confirmation({ name })),
      ]);

      const [notification, confirmation] = await Promise.all([
        resend.emails.send({
          from: "Contact <contact@sagency.tech>",
          to: ["contact@sagency.tech"],
          replyTo: email,
          subject: `Nouveau message de ${name}`,
          html: notificationHtml,
        }),
        resend.emails.send({
          from: "Sagency <contact@sagency.tech>",
          to: [email],
          subject: "Nous avons bien reçu votre message 👋",
          html: confirmationHtml,
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
