import { z } from "zod";

export const insertLeadSchema = z.object({
  email: z.string().email("Invalid email address"),
  twitchUsername: z.string().min(1, "Twitch username is required"),
  followersRange: z.enum(
    ["0-50", "51-500", "501-5000", "5001-50000", "50000+"],
    { required_error: "Please select a follower range" }
  ),
  streamingDuration: z.string().min(1, "Streaming duration is required"),
  streamingSoftware: z.enum(["obs", "streamlabs", "autre", "nostream"], {
    required_error: "Please select a streaming software",
  }),
  language: z.enum(["fr", "en"]).default("fr"),
});

export type InsertLead = z.infer<typeof insertLeadSchema>;
