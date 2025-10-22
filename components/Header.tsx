'use client'

import { useCart } from "@/hook/useCart";
import Link from "next/link";
import { CartIconSVG } from "./CartIconSVG";
import { Logo } from "./Logo";

export function Header() {
  const { getTotalItems } = useCart()
  const totalItems = getTotalItems()

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-[88px] max-w-[1080px] m-auto py-6 px-4 bg-background">
      <Logo />

      <div className="flex gap-2 h-10">
        <div className="flex flex-col items-end justify-center">
          <h3 className="hidden md:block font-semibold text-sm text-white">Meu carrinho</h3>
          <span className="font-semibold text-sm text-gray-600">
            {totalItems} {totalItems === 1 ? 'item' : 'itens'}
          </span>
        </div>

        <Link href="/cart">
          <CartIconSVG />
        </Link>
      </div>
    </div>
  )
}