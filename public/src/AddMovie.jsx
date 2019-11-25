import React from 'react';


class AddMovie extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            title: '',
            watched: false
        }
    }
    
    handleChange(e) {
        e.preventDefault();
        this.setState({
            title: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.handleAdd(this.state.title)
    }


    render() {
        return (
            <div>
                <form>
                    <input type="text" onChange={this.handleChange} placeholder="Add new movies" value={this.state.input} />
                    <button onClick={this.handleSubmit}>Add Movie</button>
                </form>
            </div>
        );
    }
}



export default AddMovie;