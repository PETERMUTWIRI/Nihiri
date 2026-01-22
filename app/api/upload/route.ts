// /api/upload/route.ts  (same as before)
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { randomUUID } from 'crypto';

export async function POST(req: Request) {
  const data = await req.formData();
  const file: File = data.get('file') as File;
  const name = `${randomUUID()}-${file.name.replace(/\s/g, '-')}`;
  const pathDir = join(process.cwd(), 'public', 'uploads', 'blog');
  const pathFull = join(pathDir, name);
  await mkdir(pathDir, { recursive: true });
  await writeFile(pathFull, Buffer.from(await file.arrayBuffer()));
  return Response.json({ url: `/uploads/blog/${name}` });
}