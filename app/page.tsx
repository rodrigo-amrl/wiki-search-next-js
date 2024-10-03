import Link from "next/link";
export default function Home() {
  return (
    <div>
      <main >
        <h1>Hellow World!</h1>
        <Link href="/about">Go to about page</Link>
      </main>
    </div>
  );
}
