"use server";

import {
  ListObjectsV2Command,
  PutObjectCommand,
  DeleteObjectCommand,
  HeadBucketCommand,
} from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { AWSCredentials, S3Object, UploadProgress } from "../types";
import { createClient } from "@/lib/s3Client";

// ✅ Test S3 connection
export async function testS3Connection(
  credentials: AWSCredentials
): Promise<void> {
  try {
    const s3Client = createClient(credentials);
    const command = new HeadBucketCommand({ Bucket: credentials.bucketName });
    await s3Client.send(command);
  } catch (error) {
    console.error("Error testing S3 connection:", error);
    throw new Error("Failed to connect to S3 bucket");
  }
}

// ✅ List S3 objects
export async function listS3Objects(
  prefix: string = "",
  credentials: AWSCredentials
): Promise<S3Object[]> {
  try {
    const s3Client = createClient(credentials);
    const command = new ListObjectsV2Command({
      Bucket: credentials.bucketName,
      Prefix: prefix,
      Delimiter: "/",
    });

    const response = await s3Client.send(command);
    const objects: S3Object[] = [];
    console.log("response", response.Contents);

    if (response.CommonPrefixes) {
      for (const prefix of response.CommonPrefixes) {
        if (prefix.Prefix) {
          const name = prefix.Prefix.replace(/\/$/, "").split("/").pop() || "";
          objects.push({
            key: prefix.Prefix,
            size: 0,
            lastModified: new Date(),
            etag: "",
            storageClass: "",
            isFolder: true,
            name,
            path: prefix.Prefix,
          });
        }
      }
    }

    if (response.Contents) {
      for (const object of response.Contents) {
        if (object.Key && object.Key !== prefix) {
          const name = object.Key.split("/").pop() || "";
          if (name) {
            objects.push({
              key: object.Key,
              size: object.Size || 0,
              lastModified: object.LastModified || new Date(),
              etag: object.ETag || "",
              storageClass: object.StorageClass || "STANDARD",
              isFolder: false,
              name,
              path: object.Key,
            });
          }
        }
      }
    }

    return objects.sort((a, b) => {
      if (a.isFolder && !b.isFolder) return -1;
      if (!a.isFolder && b.isFolder) return 1;
      return a.name.localeCompare(b.name);
    });
  } catch (error) {
    console.error("Error listing S3 objects:", error);
    throw new Error("Failed to list S3 objects");
  }
}

// ✅ Upload file to S3
export async function uploadToS3(
  file: File,
  credentials: AWSCredentials,
  key: string,
  onProgress?: (progress: UploadProgress) => void
): Promise<void> {
  try {
    const s3Client = createClient(credentials);
    const upload = new Upload({
      client: s3Client,
      params: {
        Bucket: credentials.bucketName,
        Key: key,
        Body: file,
        ContentType: file.type,
      },
    });

    if (onProgress) {
      upload.on("httpUploadProgress", (progress) => {
        const loaded = progress.loaded || 0;
        const total = progress.total || file.size;
        onProgress({
          loaded,
          total,
          percentage: Math.round((loaded / total) * 100),
        });
      });
    }

    await upload.done();
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    throw new Error("Failed to upload file to S3");
  }
}

// ✅ Delete an object from S3
export async function deleteS3Object(
  key: string,
  credentials: AWSCredentials
): Promise<void> {
  try {
    const s3Client = createClient(credentials);
    const command = new DeleteObjectCommand({
      Bucket: credentials.bucketName,
      Key: key,
    });
    await s3Client.send(command);
  } catch (error) {
    console.error("Error deleting S3 object:", error);
    throw new Error("Failed to delete S3 object");
  }
}

// ✅ Create a folder in S3
export async function createS3Folder(
  folderPath: string,
  credentials: AWSCredentials
): Promise<void> {
  try {
    const s3Client = createClient(credentials);
    const key = folderPath.endsWith("/") ? folderPath : `${folderPath}/`;
    const command = new PutObjectCommand({
      Bucket: credentials.bucketName,
      Key: key,
      Body: "",
    });
    await s3Client.send(command);
  } catch (error) {
    console.error("Error creating S3 folder:", error);
    throw new Error("Failed to create S3 folder");
  }
}
