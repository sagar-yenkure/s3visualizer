import { AWSCredentials } from "@/types";
import { S3Client } from "@aws-sdk/client-s3";

export const createClient = (credentials: AWSCredentials) => {
  return new S3Client({
    endpoint: `https://s3.${credentials.region}.amazonaws.com`,
    forcePathStyle: false,
    region: credentials.region,
    credentials: {
      accessKeyId: credentials.accessKeyId,
      secretAccessKey: credentials.secretAccessKey,
    },
  });
};
