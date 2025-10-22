'use client'

import { useCart } from "@/hook/useCart";
import { MinusCircleIcon, PlusCircleIcon, TrashSimpleIcon } from "@phosphor-icons/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function CartContent() {
  const { getTotalItems, items, getTotalPrice, getItemTotal, removeAllFromCart, addToCart, removeFromCart, clearCart } = useCart()
  const quantity = getTotalItems()
  const totalPrice = getTotalPrice()
  const router = useRouter()

  if (quantity <= 0) {
    return null
  }

  const handleCheckout = async () => {
    router.push('/success')

    clearCart()
  }

  return (
    <div className="w-full max-w-[1080px] mx-auto px-4 py-6">
      <div className="bg-white rounded p-6">
        <div className="hidden sm:grid sm:grid-cols-[1fr_2fr_2fr_auto] gap-4">
          <div className="text-left uppercase font-bold text-sm text-gray-600">
            PRODUTO
          </div>
          <div className="text-left uppercase font-bold text-sm text-gray-600">
            QTD
          </div>
          <div className="text-left uppercase font-bold text-sm text-gray-600">
            SUBTOTAL
          </div>
          <div className="w-5"></div>
        </div>

        <div className="hidden sm:block">
          {items.map((item) => (
            <div
              key={item.movie.id}
              className="grid grid-cols-[1fr_2fr_2fr_auto] gap-4 pt-6 items-center"
            >
              <div className="flex gap-4 items-center">
                <Image
                  src={item.movie.image}
                  alt={`movie-${item.movie.title}`}
                  width={64}
                  height={82}
                  className="rounded"
                />
                <div className="flex flex-col gap-2">
                  <p className="font-bold text-sm text-background">
                    {item.movie.title}
                  </p>
                  <span className="font-bold text-base text-background">
                    R$ {item.movie.price.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-start gap-3">
                <button
                  type="button"
                  className="text-primary hover:text-secondary transition-colors"
                  onClick={() => removeFromCart(item.movie.id, 1)}
                >
                  <MinusCircleIcon size={18} />
                </button>

                <input
                  type="text"
                  value={item.quantity}
                  readOnly
                  className="w-16 text-center font-normal text-sm text-background py-1 px-2 rounded border border-gray-300"
                />

                <button
                  type="button"
                  className="text-primary hover:text-secondary transition-colors"
                  onClick={() => addToCart(item.movie, 1)}
                >
                  <PlusCircleIcon size={18} />
                </button>
              </div>

              <div className="text-left">
                <span className="font-bold text-base text-background">
                  R$ {getItemTotal(item.movie.id).toFixed(2)}
                </span>
              </div>

              <div>
                <button
                  type="button"
                  className="text-primary hover:text-secondary transition-colors"
                  onClick={() => removeAllFromCart(item.movie.id)}
                >
                  <TrashSimpleIcon size={18} weight="fill" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="block sm:hidden">
          {items.map((item) => (
            <div
              key={item.movie.id}
              className="flex gap-4 pt-6 items-center"
            >
              <Image
                src={item.movie.image}
                alt={`movie-${item.movie.title}`}
                width={64}
                height={82}
                className="rounded"
              />

              <div className="flex flex-col gap-4 w-full">
                <div className="flex gap-4 justify-between">
                  <p className="font-bold text-sm text-background">
                    {item.movie.title}
                  </p>

                  <div className="flex items-center justify-start gap-3">
                    <span className="font-bold text-base text-background">
                      R$ {item.movie.price.toFixed(2)}
                    </span>

                    <button
                      type="button"
                      className="text-primary hover:text-secondary transition-colors"
                      onClick={() => removeAllFromCart(item.movie.id)}
                    >
                      <TrashSimpleIcon size={18} weight="fill" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-start gap-3">
                    <button
                      type="button"
                      className="text-primary hover:text-secondary transition-colors"
                      onClick={() => removeFromCart(item.movie.id, 1)}
                    >
                      <MinusCircleIcon size={18} />
                    </button>

                    <input
                      type="text"
                      value={item.quantity}
                      readOnly
                      className="w-16 text-center font-normal text-sm text-background py-1 px-2 rounded border border-gray-300"
                    />

                    <button
                      type="button"
                      className="text-primary hover:text-secondary transition-colors"
                      onClick={() => addToCart(item.movie, 1)}
                    >
                      <PlusCircleIcon size={18} />
                    </button>
                  </div>

                  <div className="flex flex-col">
                    <span className="font-bold text-xs text-gray-600">
                      SUBTOTAL
                    </span>
                    <span className="font-bold text-base text-background">
                      R$ {getItemTotal(item.movie.id).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-gray-600 mt-6">
          <div className="flex justify-between items-center flex-col-reverse gap-4 sm:flex-row">
            <button
              className="rounded p-2 text-white font-bold text-sm uppercase bg-primary hover:bg-secondary transition-colors w-full sm:w-[173px]"
              onClick={handleCheckout}
            >
              FINALIZAR PEDIDO
            </button>

            <div className="flex gap-2 items-center justify-between w-full sm:w-[197px]">
              <span className="font-bold text-sm text-gray-600 uppercase">
                TOTAL
              </span>
              <span className="font-bold text-2xl text-background">
                R$ {totalPrice.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}
