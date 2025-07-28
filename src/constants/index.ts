export const SIGNER_URL_EXPIRY = 60 * 5; // 5 mn

import {
  Image,
  Video,
  Music,
  Archive,
  FileText,
  Cloud,
  Globe,
  CheckCircle,
  Settings,
  Shield,
  Eye,
  Key,
} from "lucide-react";
import { S3Object } from "@/types";

export const fileTypeMap: {
  [key: string]: { icon: React.ElementType; color: string };
} = {
  jpg: { icon: Image, color: "text-green-500" },
  jpeg: { icon: Image, color: "text-green-500" },
  png: { icon: Image, color: "text-green-500" },
  gif: { icon: Image, color: "text-green-500" },
  svg: { icon: Image, color: "text-green-500" },
  webp: { icon: Image, color: "text-green-500" },

  mp4: { icon: Video, color: "text-purple-500" },
  avi: { icon: Video, color: "text-purple-500" },
  mov: { icon: Video, color: "text-purple-500" },
  wmv: { icon: Video, color: "text-purple-500" },
  flv: { icon: Video, color: "text-purple-500" },

  mp3: { icon: Music, color: "text-pink-500" },
  wav: { icon: Music, color: "text-pink-500" },
  flac: { icon: Music, color: "text-pink-500" },
  aac: { icon: Music, color: "text-pink-500" },

  zip: { icon: Archive, color: "text-orange-500" },
  rar: { icon: Archive, color: "text-orange-500" },
  "7z": { icon: Archive, color: "text-orange-500" },
  tar: { icon: Archive, color: "text-orange-500" },
  gz: { icon: Archive, color: "text-orange-500" },

  txt: { icon: FileText, color: "text-red-500" },
  doc: { icon: FileText, color: "text-red-500" },
  docx: { icon: FileText, color: "text-red-500" },
  pdf: { icon: FileText, color: "text-red-500" },
};

export const regions = [
  "us-east-1", // N. Virginia
  "us-east-2", // Ohio
  "us-west-1", // N. California
  "us-west-2", // Oregon
  "ca-central-1", // Canada Central
  "eu-west-1", // Ireland
  "eu-west-2", // London
  "eu-west-3", // Paris
  "eu-central-1", // Frankfurt
  "eu-north-1", // Stockholm
  "ap-south-1", // Mumbai
  "ap-northeast-1", // Tokyo
  "ap-northeast-2", // Seoul
  "ap-northeast-3", // Osaka
  "ap-southeast-1", // Singapore
  "ap-southeast-2", // Sydney
  "sa-east-1", // São Paulo
  "me-south-1", // Bahrain
  "af-south-1", // Cape Town
  "eu-south-1", // Milan
  "me-central-1", // UAE
];

export const demoObjects: S3Object[] = [
  {
    key: "images/",
    size: 0,
    lastModified: new Date("2024-03-14"),
    etag: '"d41d8cd98f00b204e9800998ecf8427e"',
    storageClass: "STANDARD",
    isFolder: true,
    name: "Images",
    path: "images/",
  },
  {
    key: "videos/",
    size: 0,
    lastModified: new Date("2024-03-13"),
    etag: '"d41d8cd98f00b204e9800998ecf8427e"',
    storageClass: "STANDARD",
    isFolder: true,
    name: "Videos",
    path: "videos/",
  },
  {
    key: "presentation.pdf",
    size: 2457600,
    lastModified: new Date("2024-03-15"),
    etag: '"a1b2c3d4e5f6789012345678901234ab"',
    storageClass: "STANDARD",
    isFolder: false,
    name: "presentation.pdf",
    path: "presentation.pdf",
  },
  {
    key: "vacation-photo.jpg",
    size: 1048576,
    lastModified: new Date("2024-03-14"),
    etag: '"b2c3d4e5f6789012345678901234abc1"',
    storageClass: "STANDARD",
    isFolder: false,
    name: "vacation-photo.jpg",
    path: "vacation-photo.jpg",
  },
  {
    key: "song.mp3",
    size: 5242880,
    lastModified: new Date("2024-03-13"),
    etag: '"c3d4e5f6789012345678901234abc12d"',
    storageClass: "STANDARD",
    isFolder: false,
    name: "song.mp3",
    path: "song.mp3",
  },
  {
    key: "project.zip",
    size: 15728640,
    lastModified: new Date("2024-03-12"),
    etag: '"d4e5f6789012345678901234abc12de3"',
    storageClass: "STANDARD",
    isFolder: false,
    name: "project.zip",
    path: "project.zip",
  },
  {
    key: "demo-video.mp4",
    size: 52428800,
    lastModified: new Date("2024-03-11"),
    etag: '"e5f6789012345678901234abc12de34f"',
    storageClass: "STANDARD",
    isFolder: false,
    name: "demo-video.mp4",
    path: "demo-video.mp4",
  },
];

export const features = [
  {
    icon: Cloud,
    title: "Direct S3 Connection",
    description:
      "Connect directly to your AWS S3 bucket without any intermediary services.",
  },
  {
    icon: Globe,
    title: "Beautiful Interface",
    description:
      "Modern, intuitive design that makes file management a pleasure.",
  },
  {
    icon: CheckCircle,
    title: "Drag & Drop Upload",
    description:
      "Upload files easily with drag and drop functionality and progress tracking.",
  },
  {
    icon: Settings,
    title: "Folder Management",
    description:
      "Create, navigate, and organize folders with breadcrumb navigation.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description:
      "Your credentials stay in your browser. No server-side storage or logging.",
  },
  {
    icon: Eye,
    title: "File Preview",
    description:
      "View file metadata, sizes, and types with beautiful icons and layouts.",
  },
];

const corsPolicy = `[
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "GET",
            "PUT",
            "POST",
            "DELETE",
            "HEAD"
        ],
        "AllowedOrigins": [
           "${process.env.NEXT_PUBLIC_IAM_ORIGIN}"
        ],
        "ExposeHeaders": [
            "ETag"
        ],
        "MaxAgeSeconds": 3000
    }
]`;

const iamPolicy = `{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:GetObject",
                "s3:PutObject",
                "s3:ListBucket",
                "s3:DeleteObject"
            ],
            "Resource": [
                "arn:aws:s3:::your-bucket-name",
                "arn:aws:s3:::your-bucket-name/*"
            ]
        }
    ]
}`;

export const setupSteps = [
  {
    id: "cors",
    title: "Configure CORS Policy",
    icon: Settings,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    steps: [
      "Go to your AWS S3 Console",
      "Select your bucket → Permissions tab",
      'Find "Cross-origin resource sharing (CORS)"',
      "Click Edit and paste the JSON below",
      "Save changes",
    ],
    code: corsPolicy,
    codeId: "cors-policy",
  },
  {
    id: "iam",
    title: "Required IAM Permissions",
    icon: Shield,
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    steps: [
      "Go to AWS IAM Console",
      "Create a new user or select existing user",
      "Attach the policy below (inline or managed)",
      "Generate Access Keys for the user",
      'Replace "your-bucket-name" with your actual bucket name',
    ],
    code: iamPolicy,
    codeId: "iam-policy",
  },
  {
    id: "credentials",
    title: "Get AWS Credentials",
    icon: Key,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    steps: [
      "In AWS IAM Console, select your user",
      'Go to "Security credentials" tab',
      'Click "Create access key"',
      'Choose "Application running outside AWS"',
      "Copy the Access Key ID and Secret Access Key",
      "Use these credentials in the connection form",
    ],
  },
];
