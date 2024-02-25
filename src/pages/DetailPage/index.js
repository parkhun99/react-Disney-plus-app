import axios from '../../api/axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const DetailPage = () => {
  let {movieId} = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `/movie/${movieId}`
      )
      setMovie(response.data);
    }
    fetchData();
  }, [movieId]) //movieId가 바뀌면 다시 실행
  
  if(!movie) return null;

  return (
    <section>
      <img 
        className='modal__poster-img'
        src={`https://images.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt='img'
      />
    </section>
  )
}

export default DetailPage