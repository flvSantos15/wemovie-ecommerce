'use client'

import { TMovie } from "@/context/cart-context";
import { useCart } from "@/hook/useCart";
import Image from "next/image";
import { AddCartButton } from "./AddCartButton";

interface IMovieCardProps {
  movie: TMovie
}

export function MovieCard({ movie }: IMovieCardProps) {
  const { id, title, image, price } = movie
  const { addToCart, getItemQuantity } = useCart();
  const quantity = getItemQuantity(id)

  const handleAddToCart = () => {
    addToCart(movie)
  }

  return (
    <div className="flex h-[324px] w-[338px] sm:w-[338px] rounded p-4 gap-4 bg-white">
      <div className="flex flex-col gap-2 h-[292px] w-full sm:w-[317px]">
        <div className="flex flex-col items-center w-full h-[244px] gap-1">
          <Image src={image} alt={`movie-${title}`} width={147} height={188} />

          <p className="font-bold text-xs text-gray-800 my-1">{title}</p>

          <span className="font-bold text-base text-background mb-4">
            R$ {price.toFixed(2)}
          </span>
        </div>

        <AddCartButton quantity={quantity} onAddToCart={handleAddToCart} />
      </div>
    </div>
  )
}