import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Create a user
  const user = await prisma.user.upsert({
    where: { email: 'demo@tokenscope.io' },
    update: {},
    create: {
      email: 'demo@tokenscope.io',
      name: 'Demo User',
      portfolios: {
        create: {
          name: 'Demo Portfolio',
          holdings: {
            createMany: {
              data: [
                { symbol: 'BTC', amount: '0.5', chain: 'bitcoin' },
                { symbol: 'ETH', amount: '10', chain: 'ethereum' },
                { symbol: 'USDC', amount: '1000', chain: 'ethereum' },
              ],
            },
          },
        },
      },
    },
  });
  console.log('Seeded user with id:', user.id);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
