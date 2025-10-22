'use client'

import { ReloadSVG } from "@/components/ReloadSVG";
import { useCart } from "@/hook/useCart";
import Link from "next/link";

export function EmptyView() {
  const { getTotalItems } = useCart()
  const quantity = getTotalItems()

  if (quantity > 0) {
    return null
  }

  return (
    <div className="w-full max-w-[1080px] mx-auto px-4 pb-4">
      <div className="flex flex-col items-center justify-center gap-6 p-16 w-full bg-white rounded-[4px]">
        <h1 className="font-bold text-xl text-background">Parece que não há nada por aqui :(</h1>

        <div className="flex flex-col items-center justify-center w-[447px]">
          <ReloadSVG />
          <div className="w-full h-[1px] bg-background" />
        </div>

        <Link href="/">
          <button
            className="flex items-center justify-center rounded p-1 gap-3 h-10 w-full sm:w-[317px] text-white bg-primary hover:bg-secondary transition-colors"
          >
            Recarregar página
          </button>
        </Link>
      </div>
    </div>
  );
}
