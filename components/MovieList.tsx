import { TMovie } from "@/context/cart-context"
import { MovieCard } from "./MovieCard"

interface IMovieListProps {
  movies: TMovie[]
}

export function MovieList({ movies }: IMovieListProps) {
  return (
    <div className="w-full max-w-[1080px] mx-auto px-4 pb-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-4">
        {movies && movies?.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
          />
        ))}
      </div>
    </div>
  )
}