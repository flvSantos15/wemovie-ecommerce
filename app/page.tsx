import { MovieList } from "@/components/MovieList";

const getMovies = async () => {
  const res = await fetch("https://wemovies-seven.vercel.app/api/movies")
  return res.json()
}

export default async function Home() {
  const movies = await getMovies()

  await new Promise(resolve => setTimeout(resolve, 2000));

  return (
    <div className="flex h-full relative top-[88px] z-10 justify-center max-w-[1080px] m-auto">
      <MovieList movies={movies.products} />
    </div>
  );
}
