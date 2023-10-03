import { prisma } from '@/prisma';
import Sidebar from './Sidebar';

async function getPermissions(): Promise<string[]> {
  const user = await prisma.user.findUnique({
    where: { username: 'enginex' },
    include: {
      permissions: true,
    },
  });
  if (!user) return [];

  return user.permissions.map((permission) => permission.name);
}

export default async function Home() {
  const permissions = await getPermissions();

  return (
    <div className='flex'>
      <Sidebar permissions={permissions} />
      <main className='p-4 h-screen'>main content</main>
    </div>
  );
}
