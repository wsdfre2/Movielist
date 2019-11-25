import React from 'react';
import MovieItem from './MovieItem.jsx';
import SearchBar from './SearchBar.jsx';
import AddMovie from './AddMovie.jsx';
import {ajax} from 'jquery';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.handleSearch = this.handleSearch.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.showToWatch = this.showToWatch.bind(this);
        this.showWatched = this.showWatched.bind(this);
        this.handleButtonPress = this.handleButtonPress.bind(this);
        this.getMovieData = this.getMovieData.bind(this);
        this.showAll = this.showAll.bind(this);
        this.state = {
            hiddenWatchedMovies: [],
            hiddenToWatchMovies: [],
            watched: [],
            toWatch: [],
            viewWatched: false,
            viewToWatch: true,
        }
    }

    componentDidMount() {
        this.getMovieData();
    }

    handleButtonPress(movie, state) {
        if (state === 0) {
            let index = this.state.toWatch.indexOf(movie)
            let newArr = this.state.toWatch
            this.state.toWatch.splice(index, 1);
            console.log('newArr :', newArr);
            console.log('this.state.watched :', this.state.watched)
            let pushArr = this.state.watched
            movie.watched = 1;
            pushArr.push(movie)
            console.log('pushArr', pushArr);
            this.setState((p) => {
                return {
                    toWatch: newArr,
                    watched: pushArr
                }
            })
        }
        if (state === 1) {
            let index = this.state.watched.indexOf(movie)
            let newArr = this.state.watched;
            this.state.watched.splice(index, 1);
            console.log('newArr :', newArr);
            console.log('this.state.toWatch :', this.state.toWatch)
            let pushArr = this.state.toWatch
            movie.watched = 0;
            pushArr.push(movie);
            console.log('pushArr :', pushArr);
            this.setState((p) => {
                return {
                    toWatch: pushArr,
                    watched: newArr
                }
            })
        }
    }

    getMovieData() {
        ajax({
            url: '/search',
            method: 'GET',
            success: (data) => {
                this.setState((p) => {
                    return {
                        toWatch: data
                    }
                })
            }
        })
    }

    handleAdd(arg) {
        ajax({
            url: '/search',
            method: 'POST',
            data: { search: arg } || null,
            success: this.getMovieData
        })
    }

    showToWatch(e) {
        e.preventDefault();
        this.setState((p) => {
            return {
                viewWatched: false,
                viewToWatch: true
            }
        })
    }

    showWatched(e) {
        e.preventDefault();
        this.setState((p) => {
            return {
                viewWatched: true,
                viewToWatch: false      
            }
        })
    }
    
    showAll() {
        if (this.state.viewWatched === true) {
            const newMovie = this.state.watched
            for (let i = 0; i < this.state.hiddenWatchedMovies.length; i++) {
                newMovie.push(this.state.hiddenWatchedMovies[i])
            }
            this.setState((p) => {
              return {
                watched: newMovie,
                hiddenWatchedMovies: []
              }
            })
        } else {
            const newaMovie = this.state.toWatch
                for (let i = 0; i < this.state.hiddenToWatchMovies.length; i++) {
                    newaMovie.push(this.state.hiddenToWatchMovies[i])
                }
                this.setState((p) => {
                  return {
                    toWatch: newaMovie,
                    hiddenToWatchMovies: []
                  }
                })
        }
    }

    handleSearch(arg) {
        if (this.state.viewWatched === true) {
            const newMovie = [];
            const newHiddenMovie = [];
            const string = arg.toLowerCase()
            for (let i = 0; i < this.state.watched.length; i++) {
                if (this.state.watched[i].title.toLowerCase().includes(string)) {
                    newMovie.push(this.state.watched[i]);
                } else {
                    newHiddenMovie.push(this.state.watched[i])
                }
            }
            for (let j = 0; j < this.state.hiddenWatchedMovies.length; j++) {
                if (this.state.hiddenWatchedMovies[j].title.toLowerCase().includes(string)) {
                    newMovie.push(this.state.hiddenWatchedMovies[j]);
                } else {
                    newHiddenMovie.push(this.state.hiddenWatchedMovies[j])
                }
            }
            this.setState((p) => {
                return {
                    watched: newMovie,
                    hiddenWatchedMovies: newHiddenMovie
                }
            })
        } else {
          const newMovie = [];
          const newHiddenMovie = [];
          const string = arg.toLowerCase()
          for (let i = 0; i < this.state.toWatch.length; i++) {
              if (this.state.toWatch[i].title.toLowerCase().includes(string)) {
                  newMovie.push(this.state.toWatch[i]);
              } else {
                  newHiddenMovie.push(this.state.toWatch[i])
              }
          }
          for (let j = 0; j < this.state.hiddenToWatchMovies.length; j++) {
              if (this.state.hiddenToWatchMovies[j].title.toLowerCase().includes(string)) {
                  newMovie.push(this.state.hiddenToWatchMovies[j]);
              } else {
                  newHiddenMovie.push(this.state.hiddenToWatchMovies[j])
              }
          }
          this.setState((p) => {
              return {
                  toWatch: newMovie,
                  hiddenToWatchMovies: newHiddenMovie
              }
          })
        }
    }

    render() {
        console.log(this.state)
        if(this.state.viewToWatch === true) {
            return (
                <div>
                    <h1>Movie List</h1> 
                    <AddMovie handleAdd={this.handleAdd}/>
                    <div>
                        <SearchBar handleSearch={this.handleSearch}/>
                        <button onClick={this.showToWatch}>To Watch</button>
                        <button onClick={this.showWatched}>Watched</button>
                    </div>
                    <div>
                        {this.state.toWatch.map((movie) => 
                            <MovieItem handleButtonPress={this.handleButtonPress} movie={movie} />
                            )}
                            <button onClick={this.showAll}>Show All</button>
                    </div>
                </div>
            );
        }
        return (
            <div>
                <h1>Movie List</h1> 
                <AddMovie handleAdd={this.handleAdd}/>
                <div>
                    <SearchBar handleSearch={this.handleSearch}/>
                    <button onClick={this.showToWatch}>To Watch</button>
                    <button onClick={this.showWatched}>Watched</button>
                </div>
                <div>
                    {this.state.watched.map((movie) => 
                        <MovieItem handleButtonPress={this.handleButtonPress} movie={movie} />
                        )}
                        <button onClick={this.showAll}>Show All</button>
                </div>
            </div>
        );
    }
}

export default App;