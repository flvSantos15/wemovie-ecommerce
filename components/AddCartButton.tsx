import { clsx } from "clsx"
import { ShoppingCartIconSVG } from "./ShoppingCartIconSVG"

interface IAddCartButtonProps {
  onAddToCart: () => void
  quantity: number
}

export function AddCartButton({ onAddToCart, quantity }: IAddCartButtonProps) {
  return (
    <button
      onClick={onAddToCart}
      type="button"
      className={clsx(
        "flex items-center justify-center rounded p-1 gap-3 h-10 w-full sm:w-full text-white transition-colors",
        {
          "bg-primary hover:bg-secondary": quantity === 0,
          "bg-tertiary hover:bg-tertiary": quantity > 0,
        }
      )}
    >
      <div className="flex gap-1 items-center">
        <ShoppingCartIconSVG />

        <span>{quantity > 0 ? quantity : 0}</span>
      </div>

      <span className="font-bold text-xs">
        ADICIONAR AO CARRINHO
      </span>
    </button>
  )
}