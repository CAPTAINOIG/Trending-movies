import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

const Similarmovie = () => {
  let navigate = useNavigate();
  const id1 = JSON.parse(localStorage.getItem('myId'));

  const [similarMovie, setSimilarMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);
  const Key = import.meta.env.VITE_APP_MY_KEY;
  const imgBaseUrl = 'https://image.tmdb.org/t/p';

  let url2 = `https://api.themoviedb.org/3/movie/${id1}/similar?language=en-US&page=1&api_key=${Key}`;
  let url3 = `https://api.themoviedb.org/3/tv/${id1.e}/similar?language=en-US&page=1&api_key=${Key}`;

  const similarMoviesPerPage = 10;

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
// pagesVisited is 0, pageCount is 2
// acc to d calc pageNumber is 0 multiply similarMoviesPerPage which is 10 it will always b 0
  const pagesVisited = pageNumber * similarMoviesPerPage;
  const pageCount = Math.ceil(similarMovie.length / similarMoviesPerPage);
// console.log(similarMovie.slice(0,similarMoviesPerPage))

  useEffect(() => {
    const url = id1.media ? url3 : url2;
    axios
      .get(url)
      .then((response) => {
        setLoading(false);
        setSimilarMovie(response.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id1, Key, url2, url3]);

  const seriesId = (e, media) => {
    if (media === 'tv') {
      localStorage.setItem('myId', JSON.stringify({ e, media }));
      navigate('/detail');
    } else {
      localStorage.setItem('myId', JSON.stringify(e));
      navigate('/detail');
    }
  };

  return (
    <div className="bg-black text-white">
      <h1 className="font-bold p-5 text-2xl">Similar</h1>
      <div className="grid lg:grid-cols-7 text-sm grid-cols-3 p-5 gap-10">
        {loading ? (
          <div className="lg:col-span-7 col-span-3 text-center text-orange-600 font-bold">
            Loading.....
          </div>
        ) : similarMovie.length > 0 ? (
          similarMovie.slice(pagesVisited, pagesVisited + similarMoviesPerPage).map((item, i) => (
            <div key={i}>
              <div onClick={() => seriesId(item.id, id1.media)}>
                <img
                  src={`${imgBaseUrl}/original/${item.poster_path}`}
                  className="w-full h-[70px] w-[130px] hover:scale-110 rounded"
                  alt=""
                />
                <div className="text-center me-5 text-sm">{item.title || item.name}</div>
              </div>
            </div>
          ))
        ) : (
          <div className="lg:col-span-7 col-span-3 text-center font-bold text-white">No similar items found.</div>
        )}
      </div>
      <ReactPaginate className='flex lg:ms-[43%] ms-[24%] gap-3 mt-7 font-bold'
      nextLabel="next >"
        previousLabel="< previous"
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName="pagination"
        pageLinkClassName="page-link"
        previousLinkClassName="page-link"
        nextLinkClassName="page-link"
        activeClassName="active"
        />
        </div>
  );
};

export default Similarmovie;
