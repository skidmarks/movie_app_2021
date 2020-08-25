import React from 'react';
import axios from 'axios';
import Movie from '../components/Movie';
import './Home.css';


// 함수가 아니라 클래스라서 return문을 사용하여 jsx를 반환할 수 없기 때문에 component 클래스의 render() 함수를 사용함
// 함수형 컴포넌트와 클래스형 컴포넌트의 차이
class Home extends React.Component {

  state = {
    isLoading: true,
    movies: [], // 여기 movies와 아래 getMovies 함수의 movies와는 다른 변수임..
  }

  getMovies = async () => {
    const { data: { data: { movies }, }, } = await axios.get("https://yts-proxy.now.sh/list_movies.json?sort_by=rating");
    // 구조 분해 할당
    this.setState({ movies, isLoading: false }); // ES6에서는 객체의 키와 대입할 변수의 이름이 같다면 축약할 수 있음 그래서 {movies:movies}를 {movies}로 축약
  }

  componentDidMount() {
    this.getMovies();
  }

  render() {

    const { isLoading, movies } = this.state;

    return (
      <section className="container">
        {isLoading ? (
          <div className="loader">
            <span className="loader_text">Loading...</span>
          </div>
        ) : (
            <div className="movies">
            {movies.map(
              movie=> (
                <Movie
                  key={movie.id}
                  id={movie.id}
                  year={movie.year}
                  title={movie.title}
                  summary={movie.summary}
                  poster={movie.medium_cover_image}
                  genres={movie.genres}
                />
            ))}
             </div> 
          )}
      </section>
    );
  }
}

export default Home;
