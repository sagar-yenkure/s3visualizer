export interface AWSCredentials {
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
  bucketName: string;
}

export interface S3Object {
  key: string;
  size: number;
  lastModified: Date;
  etag: string;
  storageClass: string;
  isFolder: boolean;
  name: string;
  path: string;
}

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export interface FileUploadItem {
  file: File;
  progress: UploadProgress;
  status: 'pending' | 'uploading' | 'completed' | 'error';
  error?: string;
}