import { z } from "zod";

export const awsCredentialsSchema = z.object({
  accessKeyId: z
    .string({
      error: "Access Key ID is required",
    })
    .min(10, "Access Key ID must be at least 10 characters"),

  secretAccessKey: z
    .string({
      error: "Secret Access Key is required",
    })
    .min(10, "Secret Access Key must be at least 10 characters"),

  bucketName: z
    .string({
      error: "Bucket name is required",
    })
    .min(3, "Bucket name must be at least 3 characters"),

  region: z.string({
    error: "Region is required",
  }),

  expireDays: z
    .number({
      error: "Expire days must be a number",
    })
    .min(1, "Expire days must be at least 1")
    .max(60, "Expire days must be less than or equal to 60"),
});

export type AwsCredentialsSchema = z.infer<typeof awsCredentialsSchema>;
