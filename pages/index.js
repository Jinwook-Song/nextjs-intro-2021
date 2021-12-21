import { useEffect, useState } from "react";
import HeadTitle from "../components/headTitle";
import Image from "next/image";

const BASE_URL = "https://api.themoviedb.org/3";

function Home() {
  const [movies, setMovies] = useState();

  const getPopularMovies = async () => {
    const response = await fetch("/api/movies");
    const { results } = await response.json();
    setMovies(results);
  };

  useEffect(() => {
    getPopularMovies();
  }, []);
  console.log(movies);

  return (
    <div className="container">
      <HeadTitle title={"Home"} />
      {!movies && <h4>Loading...</h4>}
      {movies?.map((movie) => (
        <div className="movie" key={movie.id}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <h4>{movie.original_title}</h4>
        </div>
      ))}
      {/* styles */}
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 20px;
          gap: 20px;
        }
        .movie img {
          max-width: 100%;
          border-radius: 12px;
          transition: transform 0.2s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
        .movie:hover img {
          transform: scale(1.05) translateY(-10px);
          cursor: pointer;
        }
        .movie h4 {
          font-size: 18px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}

export default Home;
