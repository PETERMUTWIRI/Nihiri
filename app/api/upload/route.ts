import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { randomUUID } from 'crypto';

export async function POST(req: Request) {
  try {
    const data = await req.formData();
    const file: File = data.get('file') as File;
    
    if (!file) {
      return Response.json({ error: 'No file provided' }, { status: 400 });
    }

    const name = `${randomUUID()}-${file.name.replace(/\s/g, '-')}`;
    const pathDir = join(process.cwd(), 'public', 'uploads', 'blog');
    const pathFull = join(pathDir, name);
    
    await mkdir(pathDir, { recursive: true });
    await writeFile(pathFull, Buffer.from(await file.arrayBuffer()));
    
    return Response.json({ url: `/uploads/blog/${name}` });
  } catch (error) {
    console.error('Upload error:', error);
    return Response.json({ error: 'Upload failed' }, { status: 500 });
  }
}