import React from 'react';

class MovieItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            watched: this.props.movie.watched,
            clicked: false
        }
        this.toggleWatch = this.toggleWatch.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState((p) => {
            return {
                clicked: !p.clicked
            }
        })
    }

    toggleWatch() {
        this.props.handleButtonPress(this.props.movie, this.props.movie.watched)
    }

    render() {
        const clickedState = this.state.clicked;
        let button;
        if (clickedState === false) {
            button = (
            <div onClick={this.handleClick}>
                <h3>
                    {this.props.movie.title} (click for info)
                </h3>
            </div>
            )
        }
        if (clickedState === true) {
            button = (
                <div onClick={this.handleClick}>
                    <h3>
                        {this.props.movie.title} (click to close)
                    </h3>
                    <img src={'http://image.tmdb.org/t/p/w185' + this.props.movie.poster_path} />
                    <ul>
                        <li>Release Date: {this.props.movie.release_date}</li>
                        <button onClick={this.toggleWatch}>{this.props.movie.watched === true ? 'Watched' : 'Watch'}</button>
                    </ul>
                </div>
                )
        }
        return (
            <div>
                {button}
            </div>
        );
    }
}

export default MovieItem;