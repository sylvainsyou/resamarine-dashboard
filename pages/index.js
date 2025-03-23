import Head from 'next/head';
import ProDashboard from '../components/ProDashboard';

export default function Home() {
  return (
    <>
      <Head>
        <title>ResaMarine Dashboard</title>
      </Head>
      <main>
        <ProDashboard />
      </main>
    </>
  );
}
