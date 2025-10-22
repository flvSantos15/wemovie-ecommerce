'use client'
import React, { createContext, ReactNode, useEffect, useReducer } from 'react';

export type TMovie = {
  id: string;
  title: string;
  price: number;
  image: string;
}

export interface ICartItem {
  movie: TMovie;
  quantity: number;
}

interface ICartState {
  items: ICartItem[];
}

export interface ICartContextType {
  items: ICartItem[];
  addToCart: (movie: TMovie, quantity?: number) => void;
  removeFromCart: (movieId: string, quantity?: number) => void;
  removeAllFromCart: (movieId: string) => void;
  clearCart: () => void;
  getItemQuantity: (movieId: string) => number;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getItemTotal: (movieId: string) => number;
}

type TCartAction =
  | { type: 'ADD_TO_CART'; payload: { movie: TMovie; quantity: number } }
  | { type: 'REMOVE_FROM_CART'; payload: { movieId: string; quantity: number } }
  | { type: 'REMOVE_ALL_FROM_CART'; payload: { movieId: string } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: ICartItem[] };

// Reducer
const cartReducer = (state: ICartState, action: TCartAction): ICartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItemIndex = state.items.findIndex(
        item => item.movie.id === action.payload.movie.id
      );

      if (existingItemIndex > -1) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + action.payload.quantity
        };
        return { ...state, items: updatedItems };
      }

      return {
        ...state,
        items: [...state.items, { movie: action.payload.movie, quantity: action.payload.quantity }]
      };
    }

    case 'REMOVE_FROM_CART': {
      const existingItemIndex = state.items.findIndex(
        item => item.movie.id === action.payload.movieId
      );

      if (existingItemIndex === -1) return state;

      const updatedItems = [...state.items];
      const newQuantity = updatedItems[existingItemIndex].quantity - action.payload.quantity;

      if (newQuantity <= 0) {
        updatedItems.splice(existingItemIndex, 1);
      } else {
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: newQuantity
        };
      }

      return { ...state, items: updatedItems };
    }

    case 'REMOVE_ALL_FROM_CART': {
      return {
        ...state,
        items: state.items.filter(item => item.movie.id !== action.payload.movieId)
      };
    }

    case 'CLEAR_CART':
      return { ...state, items: [] };

    case 'LOAD_CART':
      return { ...state, items: action.payload };

    default:
      return state;
  }
};

export const CartContext = createContext<ICartContextType | undefined>(undefined);

interface ICartProviderProps {
  children: ReactNode;
  storageKey?: string;
}

export const CartProvider: React.FC<ICartProviderProps> = ({
  children,
  storageKey = 'movieCart'
}) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(storageKey);
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: parsedCart });
      }
    } catch (error) {
      console.error('Erro ao carregar carrinho:', error);
    }
  }, [storageKey]);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(state.items));
    } catch (error) {
      console.error('Erro ao salvar carrinho:', error);
    }
  }, [state.items, storageKey]);

  const addToCart = (movie: TMovie, quantity: number = 1) => {
    dispatch({ type: 'ADD_TO_CART', payload: { movie, quantity } });
  };

  const removeFromCart = (movieId: string, quantity: number = 1) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { movieId, quantity } });
  };

  const removeAllFromCart = (movieId: string) => {
    dispatch({ type: 'REMOVE_ALL_FROM_CART', payload: { movieId } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getItemQuantity = (movieId: string): number => {
    const item = state.items.find(item => item.movie.id === movieId);
    return item ? item.quantity : 0;
  };

  const getTotalItems = (): number => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = (): number => {
    return state.items.reduce((total, item) => total + (item.movie.price * item.quantity), 0);
  };

  const getItemTotal = (movieId: string): number => {
    const item = state.items.find(item => item.movie.id === movieId);
    return item ? item.movie.price * item.quantity : 0;
  };

  const value: ICartContextType = {
    items: state.items,
    addToCart,
    removeFromCart,
    removeAllFromCart,
    clearCart,
    getItemQuantity,
    getTotalItems,
    getTotalPrice,
    getItemTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};


// Exemplo de uso:
/*

// Em qualquer componente
import { useCart } from './CartContext';

function MovieCard({ movie }) {
  const { addToCart, getItemQuantity } = useCart();
  const quantity = getItemQuantity(movie.id);
  
  return (
    <div>
      <h3>{movie.title}</h3>
      <p>R$ {movie.price.toFixed(2)}</p>
      <button onClick={() => addToCart(movie)}>
        Adicionar ao Carrinho
      </button>
      {quantity > 0 && <span>Quantidade: {quantity}</span>}
    </div>
  );
}

function Cart() {
  const { 
    items, 
    removeFromCart, 
    removeAllFromCart, 
    getTotalItems, 
    getTotalPrice 
  } = useCart();
  
  return (
    <div>
      <h2>Carrinho ({getTotalItems()} itens)</h2>
      {items.map(item => (
        <div key={item.movie.id}>
          <h4>{item.movie.title}</h4>
          <p>Quantidade: {item.quantity}</p>
          <p>Subtotal: R$ {(item.movie.price * item.quantity).toFixed(2)}</p>
          <button onClick={() => removeFromCart(item.movie.id, 1)}>-</button>
          <button onClick={() => removeAllFromCart(item.movie.id)}>Remover</button>
        </div>
      ))}
      <h3>Total: R$ {getTotalPrice().toFixed(2)}</h3>
    </div>
  );
}
*/