import Link from "next/link";

export function Logo() {
  return (
    <Link href="/">
      <h1 className="font-bold text-xl text-white">WeMovie</h1>
    </Link>
  )
}