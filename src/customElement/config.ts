import { z } from "zod";

export type Config = Readonly<Record<string, never>>;

export const configSchema: z.Schema<Config | null> = z.object({}).nullable();
