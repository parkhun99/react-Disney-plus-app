import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../../api/axios'
import { useDebounce } from '../../hooks/useDebounce';
import './SearchPage.css'

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]); //searchResults: 타이핑하여 찾은 값이 들어가는 요소
  //useLocation().search를 통해 '?q=타이핑값' 추출한 것을 URLSearchParams을 통해 타이핑 값만 추출하기 위한 작업
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);   
  }

  let query = useQuery();
  const searchTerm = query.get('q'); // 최종적으로 이 작업을 통해 타이핑 값만 추출 가능
  const navigate = useNavigate();
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if(debouncedSearchTerm) { //searchTerm(타이핑 값)이 있을 경우에만 fetchSearchMovie을 호출
      fetchSearchMovie(debouncedSearchTerm)
    }
  }, [debouncedSearchTerm]) //타이핑 값이 바뀔 때마다 재호출

  // 비동기 요청으로 보내는 작업
  const fetchSearchMovie = async (searchTerm) => {
    try {
      const response = await axios.get(`/search/multi?include_adult=false&query=${searchTerm}`);
      setSearchResults(response.data.results); //검색창에 검색한 값을 보내서 값을 받아오는 작업
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  // if 타이핑 된 값의 길이가 0보다 크면 
  if(searchResults.length > 0) {
    return (
      <section className='search-container'>
        {searchResults.map((movie) => {
          if(movie.backdrop_path !== null && movie.media_type !== "person") {
            const movieImageUrl = 'https://image.tmdb.org/t/p/w500' + movie.backdrop_path;
            return (
              <div className='movie' key={movie.id}>
                <div className='movie__column-poster' onClick={() => navigate(`/${movie.id}`)}>
                  <img src={movieImageUrl} alt='movie' className='movie__poster' />
                </div>
              </div>
            )
          }
        })}
      </section>
    )
  } else {
    return (
      <section className='no-results'>
        <div className='no-result__text'>
          <p>찾고자하는 검색어 "{searchTerm}" 에 맞는 영화가 없습니다.</p>
        </div>
      </section>
    )
  }
}

export default SearchPage