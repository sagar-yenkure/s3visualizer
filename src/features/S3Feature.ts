"use client";

import {
  createS3Folder,
  deleteS3Object,
  downloadFile,
  listS3Objects,
  testS3Connection,
  uploadToS3,
} from "@/services/S3Service";
import { AWSCredentials, S3Object, UploadProgress } from "@/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// test S3 connection
export function useTestS3Connection(credentials: AWSCredentials) {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: () => testS3Connection(credentials),
    onSuccess: () => {
      toast.success("connection with s3 approved");
      localStorage.setItem("aws-s3-credentials", JSON.stringify(credentials));
      queryClient.invalidateQueries({ queryKey: ["s3-objects"] });
      router.push("/gallery");
    },
    onError: () => toast.error("error while connection with s3"),
  });
}

// Get all objects (folders/files)
export function useListS3Objects(
  prefix: string = "",
  credentials: AWSCredentials
) {
  return useQuery<S3Object[], Error>({
    queryKey: ["s3-objects", prefix],
    queryFn: () => listS3Objects(prefix, credentials),
  });
}

// Upload file to S3
export function useUploadToS3(onProgress?: (progress: UploadProgress) => void) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      file,
      key,
      credentials,
    }: {
      file: File;
      key: string;
      credentials: AWSCredentials;
    }) => uploadToS3(file, credentials, key, onProgress),
    onSuccess: () => {
      toast.success("file uploaded to s3 successfully");
      queryClient.invalidateQueries({ queryKey: ["s3-objects"] });
    },
    onError: () => toast.error("error while uploading file to s3"),
  });
}

// Delete object from S3
export function useDeleteS3Object() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      key,
      credentials,
    }: {
      key: string;
      credentials: AWSCredentials;
    }) => deleteS3Object(key, credentials),
    onSuccess: () => {
      toast.success("file deleted from s3 successfully");
      queryClient.invalidateQueries({ queryKey: ["s3-objects"] });
    },
    onError: () => toast.error("error while deleting file from s3"),
  });
}

// Create folder in S3
export function useCreateS3Folder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      folderPath,
      credentials,
    }: {
      folderPath: string;
      credentials: AWSCredentials;
    }) => createS3Folder(folderPath, credentials),
    onSuccess: () => {
      toast.success("folder created in s3 successfully");
      queryClient.invalidateQueries({ queryKey: ["s3-objects"] });
    },
    onError: () => toast.error("error while creating folder in s3"),
  });
}

//download File
export function useDownloadFile() {
  return useMutation({
    mutationFn: ({
      key,
      credentials,
    }: {
      key: string;
      credentials: AWSCredentials;
    }) => downloadFile(key, credentials),
    onSuccess: (res) => window.open(res.signedUrl, "_blank"),
    onError: () => toast.error("error while downloading file, try again"),
  });
}
