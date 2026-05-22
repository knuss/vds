import { getPresignedUploadUrl } from '@/lib/aws';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { fileName, contentType } = await request.json();

    if (!fileName || !contentType) {
      return NextResponse.json(
        { error: 'fileName and contentType are required' },
        { status: 400 }
      );
    }

    const presignedUrl = await getPresignedUploadUrl(fileName, contentType);

    return NextResponse.json({ presignedUrl });
  } catch (error) {
    console.error('Error creating presigned URL:', error);
    return NextResponse.json(
      { error: 'Error creating presigned URL' },
      { status: 500 }
    );
  }
}
