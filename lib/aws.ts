import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

export async function getPresignedUploadUrl(
  fileName: string,
  contentType: string
): Promise<string> {
  const key = `vehicles/${Date.now()}-${fileName}`;

  const command = new PutObjectCommand({
    Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET,
    Key: key,
    ContentType: contentType,
  });

  const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
  return url;
}

export function getS3Url(key: string): string {
  return `https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET}.s3.${
    process.env.NEXT_PUBLIC_AWS_REGION || 'us-east-1'
  }.amazonaws.com/${key}`;
}

export default s3Client;
