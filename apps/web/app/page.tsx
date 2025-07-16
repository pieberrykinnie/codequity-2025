import '@/styles/globals.css';
import TrpcProvider, { trpc } from './providers/trpc-provider';

async function Greeting() {
  const greeting = await trpc.hello.query({ name: 'TokenScope' });
  return <p className="mt-4 text-lg text-gray-600">{greeting.greeting}</p>;
}

export default function Home() {
  return (
    <TrpcProvider>
      <main className="flex min-h-screen flex-col items-center justify-center bg-slate-50">
        <h1 className="text-4xl font-bold">TokenScope</h1>
        {/* @ts-expect-error Async Server Component */}
        <Greeting />
      </main>
    </TrpcProvider>
  );
}
