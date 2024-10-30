import React, { useMemo, useState } from 'react';
import Layout from '../Layout/Layout';
import Filters from '../Components/Filters';
import Movie from '../Components/Movie';
import { useMovies } from '../utils/SWR';
import { useSearchParams } from 'react-router-dom';

function toTitleCase(str) {
  return str.toLowerCase().split(' ').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}

const MoviesPage = () => {
  const { movies: allMovies } = useMovies(); // Destructure from SWR hook
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(4);


  // Extract genres as a unique tuple from all movies
  const genresTuple = useMemo(() => {
    if (!allMovies) return [];
    const genresList = allMovies.flatMap(movie => movie.genre);
    return [...new Set(genresList)];
  }, [allMovies]);

  // Parse search params into an object
  const params = useMemo(() => Object.fromEntries(searchParams.entries()), [searchParams]);


  // Filter movies based on search parameters
  const filteredMovies = useMemo(() => {
    if (!allMovies) return [];

    let movies = [...allMovies];

    if (params.category && !params.category.includes("Sort")) {
      movies = movies.filter(m => m.genre.includes(toTitleCase(params.category)));
    }
    if (params.rates && !params.rates.includes("Sort")) {
      movies = movies.filter(m => Math.ceil(m.rating.star / 2).toString() === params.rates);
    }
    if (params.year && !params.year.includes("Sort")) {
      movies = movies.filter(m => m.year.toString() === params.year);
    }
    if (params.times && !params.times.includes("Sort")) {
      const maxTime = parseFloat(params.times.replace('< ', ''));
      movies = movies.filter(m => {
        const movieTimeInHours = m.runtimeSeconds / 3600;
        return movieTimeInHours < maxTime && movieTimeInHours > maxTime - 1;
      });
    }

    return movies;
  }, [allMovies, params]);

  const handleLoadingMore = () => setPage(prevPage => prevPage + 4);

  document.title = 'All Movies';

  return (filteredMovies && genresTuple.length > 0) && (
    <Layout>
      <div className="min-height-screen container mx-auto px-2 my-3">
        <Filters categories={genresTuple} />

        <p className='text-lg font-medium my-6'>
          Total <span className='font-bold text-subMain'>{filteredMovies.length}</span>
        </p>
        <div className="grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 grid-cols-2 gap-6">
          {filteredMovies.slice(0, page).map((movie, idx) => (
            <Movie key={idx} movie={movie} />
          ))}
        </div>
        <div className="w-full flex-colo md:my-20 my-10">
          <button
            onClick={handleLoadingMore}
            className="flex-rows gap-3 text-white py-3 px-8 rounded font-semibold border-2 border-subMain"
          >
            Load More ?
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default MoviesPage;
