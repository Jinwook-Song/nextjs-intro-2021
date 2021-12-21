import HeadTitle from "../components/headTitle";

function Home({ results: movies }) {
  return (
    <div className="container">
      <HeadTitle title={"Home"} />
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

// getServerSideProps 함수명 변경 불가
// Every in this codes, run on server (never client)
// -> 이곳에서 API_KEY를 숨길 수 있음
// 1. `getServerSideProps()` is called in the server
// 2. Anything returned from `getServerSideProps()` is passed to the Page's Props.
export async function getServerSideProps() {
  const { results } = await (
    await fetch(`http://localhost:3000/api/movies`)
  ).json();
  return {
    props: {
      results,
    },
  };
}

export default Home;
