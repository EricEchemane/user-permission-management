import { EPermissions } from '@/constants/permissions';
import { prisma } from '@/prisma';
import { redirect } from 'next/navigation';

async function getReadData() {
  const user = await prisma.user.findUnique({
    where: {
      username: 'enginex',
      role: {
        permissions: { some: { name: EPermissions.BankRead } },
      },
    },
  });
  if (!user) redirect('/');
  return user;
}

export default async function ReadPage() {
  await getReadData();
  return <div>ReadPage</div>;
}
