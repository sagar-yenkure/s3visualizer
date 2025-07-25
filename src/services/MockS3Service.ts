import { S3Object, UploadProgress } from '../types';

export class MockS3Service {
  private mockData: S3Object[] = [
    // Root level folders
    {
      key: 'documents/',
      size: 0,
      lastModified: new Date('2024-01-15'),
      etag: '',
      storageClass: 'STANDARD',
      isFolder: true,
      name: 'documents',
      path: 'documents/',
    },
    {
      key: 'images/',
      size: 0,
      lastModified: new Date('2024-01-20'),
      etag: '',
      storageClass: 'STANDARD',
      isFolder: true,
      name: 'images',
      path: 'images/',
    },
    {
      key: 'videos/',
      size: 0,
      lastModified: new Date('2024-01-18'),
      etag: '',
      storageClass: 'STANDARD',
      isFolder: true,
      name: 'videos',
      path: 'videos/',
    },
    {
      key: 'projects/',
      size: 0,
      lastModified: new Date('2024-01-22'),
      etag: '',
      storageClass: 'STANDARD',
      isFolder: true,
      name: 'projects',
      path: 'projects/',
    },
    // Root level files
    {
      key: 'README.md',
      size: 2048,
      lastModified: new Date('2024-01-25'),
      etag: 'abc123',
      storageClass: 'STANDARD',
      isFolder: false,
      name: 'README.md',
      path: 'README.md',
    },
    {
      key: 'config.json',
      size: 512,
      lastModified: new Date('2024-01-24'),
      etag: 'def456',
      storageClass: 'STANDARD',
      isFolder: false,
      name: 'config.json',
      path: 'config.json',
    },
    // Documents folder contents
    {
      key: 'documents/reports/',
      size: 0,
      lastModified: new Date('2024-01-16'),
      etag: '',
      storageClass: 'STANDARD',
      isFolder: true,
      name: 'reports',
      path: 'documents/reports/',
    },
    {
      key: 'documents/contracts/',
      size: 0,
      lastModified: new Date('2024-01-17'),
      etag: '',
      storageClass: 'STANDARD',
      isFolder: true,
      name: 'contracts',
      path: 'documents/contracts/',
    },
    {
      key: 'documents/presentation.pptx',
      size: 5242880,
      lastModified: new Date('2024-01-23'),
      etag: 'ghi789',
      storageClass: 'STANDARD',
      isFolder: false,
      name: 'presentation.pptx',
      path: 'documents/presentation.pptx',
    },
    {
      key: 'documents/budget.xlsx',
      size: 1048576,
      lastModified: new Date('2024-01-21'),
      etag: 'jkl012',
      storageClass: 'STANDARD',
      isFolder: false,
      name: 'budget.xlsx',
      path: 'documents/budget.xlsx',
    },
    {
      key: 'documents/manual.pdf',
      size: 3145728,
      lastModified: new Date('2024-01-19'),
      etag: 'mno345',
      storageClass: 'STANDARD',
      isFolder: false,
      name: 'manual.pdf',
      path: 'documents/manual.pdf',
    },
    // Images folder contents
    {
      key: 'images/photos/',
      size: 0,
      lastModified: new Date('2024-01-20'),
      etag: '',
      storageClass: 'STANDARD',
      isFolder: true,
      name: 'photos',
      path: 'images/photos/',
    },
    {
      key: 'images/screenshots/',
      size: 0,
      lastModified: new Date('2024-01-21'),
      etag: '',
      storageClass: 'STANDARD',
      isFolder: true,
      name: 'screenshots',
      path: 'images/screenshots/',
    },
    {
      key: 'images/logo.png',
      size: 204800,
      lastModified: new Date('2024-01-22'),
      etag: 'pqr678',
      storageClass: 'STANDARD',
      isFolder: false,
      name: 'logo.png',
      path: 'images/logo.png',
    },
    {
      key: 'images/banner.jpg',
      size: 1572864,
      lastModified: new Date('2024-01-23'),
      etag: 'stu901',
      storageClass: 'STANDARD',
      isFolder: false,
      name: 'banner.jpg',
      path: 'images/banner.jpg',
    },
    {
      key: 'images/icon.svg',
      size: 8192,
      lastModified: new Date('2024-01-24'),
      etag: 'vwx234',
      storageClass: 'STANDARD',
      isFolder: false,
      name: 'icon.svg',
      path: 'images/icon.svg',
    },
    // Videos folder contents
    {
      key: 'videos/tutorials/',
      size: 0,
      lastModified: new Date('2024-01-18'),
      etag: '',
      storageClass: 'STANDARD',
      isFolder: true,
      name: 'tutorials',
      path: 'videos/tutorials/',
    },
    {
      key: 'videos/demo.mp4',
      size: 52428800,
      lastModified: new Date('2024-01-25'),
      etag: 'yza567',
      storageClass: 'STANDARD',
      isFolder: false,
      name: 'demo.mp4',
      path: 'videos/demo.mp4',
    },
    {
      key: 'videos/intro.mov',
      size: 31457280,
      lastModified: new Date('2024-01-24'),
      etag: 'bcd890',
      storageClass: 'STANDARD',
      isFolder: false,
      name: 'intro.mov',
      path: 'videos/intro.mov',
    },
    // Projects folder contents
    {
      key: 'projects/website/',
      size: 0,
      lastModified: new Date('2024-01-22'),
      etag: '',
      storageClass: 'STANDARD',
      isFolder: true,
      name: 'website',
      path: 'projects/website/',
    },
    {
      key: 'projects/mobile-app/',
      size: 0,
      lastModified: new Date('2024-01-23'),
      etag: '',
      storageClass: 'STANDARD',
      isFolder: true,
      name: 'mobile-app',
      path: 'projects/mobile-app/',
    },
    {
      key: 'projects/archive.zip',
      size: 10485760,
      lastModified: new Date('2024-01-20'),
      etag: 'efg123',
      storageClass: 'STANDARD',
      isFolder: false,
      name: 'archive.zip',
      path: 'projects/archive.zip',
    },
    // Nested folder contents
    {
      key: 'documents/reports/quarterly-report.pdf',
      size: 2097152,
      lastModified: new Date('2024-01-16'),
      etag: 'hij456',
      storageClass: 'STANDARD',
      isFolder: false,
      name: 'quarterly-report.pdf',
      path: 'documents/reports/quarterly-report.pdf',
    },
    {
      key: 'documents/reports/annual-summary.docx',
      size: 1572864,
      lastModified: new Date('2024-01-17'),
      etag: 'klm789',
      storageClass: 'STANDARD',
      isFolder: false,
      name: 'annual-summary.docx',
      path: 'documents/reports/annual-summary.docx',
    },
    {
      key: 'images/photos/vacation.jpg',
      size: 3145728,
      lastModified: new Date('2024-01-20'),
      etag: 'nop012',
      storageClass: 'STANDARD',
      isFolder: false,
      name: 'vacation.jpg',
      path: 'images/photos/vacation.jpg',
    },
    {
      key: 'images/photos/team.png',
      size: 2621440,
      lastModified: new Date('2024-01-21'),
      etag: 'qrs345',
      storageClass: 'STANDARD',
      isFolder: false,
      name: 'team.png',
      path: 'images/photos/team.png',
    },
    {
      key: 'videos/tutorials/getting-started.mp4',
      size: 41943040,
      lastModified: new Date('2024-01-18'),
      etag: 'tuv678',
      storageClass: 'STANDARD',
      isFolder: false,
      name: 'getting-started.mp4',
      path: 'videos/tutorials/getting-started.mp4',
    },
    {
      key: 'projects/website/index.html',
      size: 4096,
      lastModified: new Date('2024-01-22'),
      etag: 'wxy901',
      storageClass: 'STANDARD',
      isFolder: false,
      name: 'index.html',
      path: 'projects/website/index.html',
    },
    {
      key: 'projects/website/styles.css',
      size: 8192,
      lastModified: new Date('2024-01-23'),
      etag: 'zab234',
      storageClass: 'STANDARD',
      isFolder: false,
      name: 'styles.css',
      path: 'projects/website/styles.css',
    },
  ];

  async testConnection(): Promise<void> {
    // Simulate connection delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return Promise.resolve();
  }

  async listObjects(prefix: string = ''): Promise<S3Object[]> {
    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Filter objects based on prefix
    const filteredObjects = this.mockData.filter(obj => {
      if (!prefix) {
        // Root level - show only items that don't have additional path segments
        return !obj.key.includes('/') || (obj.key.endsWith('/') && obj.key.split('/').length === 2);
      } else {
        // Show items that start with the prefix and are direct children
        if (obj.key.startsWith(prefix)) {
          const relativePath = obj.key.substring(prefix.length);
          // Direct children have no additional slashes (for files) or only one slash at the end (for folders)
          return !relativePath.includes('/') || (relativePath.endsWith('/') && relativePath.split('/').length === 2);
        }
        return false;
      }
    });

    // Sort: folders first, then files, alphabetically
    return filteredObjects.sort((a, b) => {
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
    // Simulate upload progress
    const totalSteps = 10;
    for (let i = 0; i <= totalSteps; i++) {
      await new Promise(resolve => setTimeout(resolve, 200));
      const percentage = Math.round((i / totalSteps) * 100);
      onProgress?.({
        loaded: (file.size * i) / totalSteps,
        total: file.size,
        percentage,
      });
    }

    // Add the uploaded file to mock data
    const newFile: S3Object = {
      key,
      size: file.size,
      lastModified: new Date(),
      etag: Math.random().toString(36).substring(7),
      storageClass: 'STANDARD',
      isFolder: false,
      name: file.name,
      path: key,
    };

    this.mockData.push(newFile);
  }

  async deleteObject(key: string): Promise<void> {
    // Simulate deletion delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Remove from mock data
    this.mockData = this.mockData.filter(obj => obj.key !== key);
  }

  async createFolder(folderPath: string): Promise<void> {
    // Simulate creation delay
    await new Promise(resolve => setTimeout(resolve, 300));

    const newFolder: S3Object = {
      key: folderPath,
      size: 0,
      lastModified: new Date(),
      etag: '',
      storageClass: 'STANDARD',
      isFolder: true,
      name: folderPath.replace(/\/$/, '').split('/').pop() || '',
      path: folderPath,
    };

    this.mockData.push(newFolder);
  }
}