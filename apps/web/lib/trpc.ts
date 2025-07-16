import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { prisma } from './prisma';

const t = initTRPC.create();

const portfolioInput = z.object({
  name: z.string(),
  userId: z.string(),
});
const portfolioIdInput = z.object({ id: z.string() });
const holdingInput = z.object({
  portfolioId: z.string(),
  symbol: z.string(),
  amount: z.string(), // Decimal as string for transport
  chain: z.string().optional(),
});
const holdingIdInput = z.object({ id: z.string() });

export const appRouter = t.router({
  hello: t.procedure
    .input(z.object({ name: z.string().optional() }))
    .query(({ input }) => {
      return { greeting: `Hello ${input.name ?? 'world'}!` };
    }),

  // Portfolio CRUD
  getPortfolios: t.procedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      return prisma.portfolio.findMany({
        where: { userId: input.userId },
        include: { holdings: true },
      });
    }),
  getPortfolioById: t.procedure
    .input(portfolioIdInput)
    .query(async ({ input }) => {
      return prisma.portfolio.findUnique({
        where: { id: input.id },
        include: { holdings: true },
      });
    }),
  createPortfolio: t.procedure
    .input(portfolioInput)
    .mutation(async ({ input }) => {
      return prisma.portfolio.create({
        data: input,
      });
    }),
  updatePortfolio: t.procedure
    .input(z.object({ id: z.string(), name: z.string() }))
    .mutation(async ({ input }) => {
      return prisma.portfolio.update({
        where: { id: input.id },
        data: { name: input.name },
      });
    }),
  deletePortfolio: t.procedure
    .input(portfolioIdInput)
    .mutation(async ({ input }) => {
      return prisma.portfolio.delete({
        where: { id: input.id },
      });
    }),

  // Holding CRUD
  getHoldings: t.procedure
    .input(z.object({ portfolioId: z.string() }))
    .query(async ({ input }) => {
      return prisma.holding.findMany({
        where: { portfolioId: input.portfolioId },
      });
    }),
  getHoldingById: t.procedure
    .input(holdingIdInput)
    .query(async ({ input }) => {
      return prisma.holding.findUnique({
        where: { id: input.id },
      });
    }),
  createHolding: t.procedure
    .input(holdingInput)
    .mutation(async ({ input }) => {
      return prisma.holding.create({
        data: {
          ...input,
          amount: input.amount, // Prisma will coerce string to Decimal
        },
      });
    }),
  updateHolding: t.procedure
    .input(z.object({ id: z.string(), amount: z.string() }))
    .mutation(async ({ input }) => {
      return prisma.holding.update({
        where: { id: input.id },
        data: { amount: input.amount },
      });
    }),
  deleteHolding: t.procedure
    .input(holdingIdInput)
    .mutation(async ({ input }) => {
      return prisma.holding.delete({
        where: { id: input.id },
      });
    }),
});

export type AppRouter = typeof appRouter;
