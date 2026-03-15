import { ActionError, defineAction } from "astro:actions";
import { z } from "astro/zod";
import { Resend } from "resend";

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
      const { data, error } = await resend.emails.send({
        from: "Contact <onboarding@resend.dev>",
        to: ["contact@my-agency.io"],
        subject: `Nouveau message de ${name}`,
        html: `
          <h2>Nouveau message de contact</h2>
          <p><strong>Nom :</strong> ${name}</p>
          <p><strong>Email :</strong> ${email}</p>
          <p><strong>Message :</strong> ${message}</p>
          ${needs ? `<p><strong>Besoins :</strong> ${needs}</p>` : ""}
          ${budget ? `<p><strong>Budget :</strong> ${budget}</p>` : ""}
          ${timeline ? `<p><strong>Délai :</strong> ${timeline}</p>` : ""}
        `,
      });

      if (error) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: error.message,
        });
      }

      return data;
    },
  }),
};
