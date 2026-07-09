import * as z from "zod";
import "dotenv/config";

const createEnv = () => {
  const EnvSchema = z.object({
    API_URL: z.string(),
    APP_URL: z.string().optional().default("http://localhost:3000"),
    APP_NAME: z.string(),
    APP_DESCRIPTION: z.string().optional().default("CSMJU Website"),
  });

  const envVars = {
    API_URL: process.env.NEXT_PUBLIC_API_URL,
    APP_URL: process.env.NEXT_PUBLIC_URL,
    APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    APP_DESCRIPTION: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
  };

  const parsedEnv = EnvSchema.safeParse(envVars);

  if (!parsedEnv.success) {
    throw new Error(
      `Invalid env provided.
  The following variables are missing or invalid:
  ${Object.entries(parsedEnv.error.flatten().fieldErrors)
    .map(([k, v]) => `- ${k}: ${v}`)
    .join("\n")}
  `
    );
  }

  return parsedEnv.data ?? {};
};

export const env = createEnv();
