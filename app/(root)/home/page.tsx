import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div>
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
      </div>
      <Link href="/recipes">Go to recipes page</Link>
    </>
  );
}
