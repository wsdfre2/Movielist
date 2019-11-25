import React from 'react';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.inputHandler = this.inputHandler.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            input: ''
        }
    }
    
    inputHandler(e) {
        e.preventDefault();
        this.setState({
            input: e.target.value
        })
    }

    handleClick(e) {
        e.preventDefault();
        console.log(this.state);
        this.props.handleSearch(this.state.input)
    }

    render() {
        return (
            <div>
                <form>
                    <input type="text" value={this.state.input} onChange={this.inputHandler} placeholder="Search new movies"></input>
                    <button onClick={this.handleClick}>Search</button>
                </form>
            </div>
        );
    }
}

export default SearchBar;