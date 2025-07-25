import { S3Client, ListObjectsV2Command, PutObjectCommand, DeleteObjectCommand, HeadBucketCommand } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { AWSCredentials, S3Object, UploadProgress } from '../types';

export class S3Service {
  private s3Client: S3Client;
  private bucketName: string;

  constructor(credentials: AWSCredentials) {
    this.s3Client = new S3Client({
      region: credentials.region,
      credentials: {
        accessKeyId: credentials.accessKeyId,
        secretAccessKey: credentials.secretAccessKey,
      },
    });
    this.bucketName = credentials.bucketName;
  }

  async testConnection(): Promise<void> {
    try {
      const command = new HeadBucketCommand({ Bucket: this.bucketName });
      await this.s3Client.send(command);
    } catch (error) {
      throw new Error('Failed to connect to S3 bucket');
    }
  }

  async listObjects(prefix: string = ''): Promise<S3Object[]> {
    const command = new ListObjectsV2Command({
      Bucket: this.bucketName,
      Prefix: prefix,
      Delimiter: '/',
    });

    const response = await this.s3Client.send(command);
    const objects: S3Object[] = [];

    // Add folders (common prefixes)
    if (response.CommonPrefixes) {
      for (const prefix of response.CommonPrefixes) {
        if (prefix.Prefix) {
          const name = prefix.Prefix.replace(/\/$/, '').split('/').pop() || '';
          objects.push({
            key: prefix.Prefix,
            size: 0,
            lastModified: new Date(),
            etag: '',
            storageClass: '',
            isFolder: true,
            name,
            path: prefix.Prefix,
          });
        }
      }
    }

    // Add files
    if (response.Contents) {
      for (const object of response.Contents) {
        if (object.Key && object.Key !== prefix) {
          const name = object.Key.split('/').pop() || '';
          if (name) { // Skip empty names (folder markers)
            objects.push({
              key: object.Key,
              size: object.Size || 0,
              lastModified: object.LastModified || new Date(),
              etag: object.ETag || '',
              storageClass: object.StorageClass || 'STANDARD',
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
  }

  async uploadFile(
    file: File,
    key: string,
    onProgress?: (progress: UploadProgress) => void
  ): Promise<void> {
    const upload = new Upload({
      client: this.s3Client,
      params: {
        Bucket: this.bucketName,
        Key: key,
        Body: file,
        ContentType: file.type,
      },
    });

    if (onProgress) {
      upload.on('httpUploadProgress', (progress) => {
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
  }

  async deleteObject(key: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });
    await this.s3Client.send(command);
  }

  async createFolder(folderPath: string): Promise<void> {
    const key = folderPath.endsWith('/') ? folderPath : `${folderPath}/`;
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: '',
    });
    await this.s3Client.send(command);
  }
}