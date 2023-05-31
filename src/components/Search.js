import React from "react";
import axios from "axios";
import Image from "./Image";


class Search extends React.Component {
    state = {
        keyword: "",
        photos: [],
        loader: false
    };

    inputHandle = (e) => {
        this.setState({ keyword: e.target.value });
    };

    SearchImage = async (e) => {
        e.preventDefault();
        this.setState({ loader: true })

        const res = await axios.get(`https://api.pexels.com/v1/search?query=${this.state.keyword}&per_page=50&page=1`,
            {
                headers: {
                    Authorization: `HXLDJWvbvRY7yvhk5TZU6rQzTOpWZC3GbudwJHM17RJJbL9fWrXNZgaX`
                },
            }
        );
        this.setState({ loader: false });
        this.setState({ photos: res.data.photos });
        console.log(this.state.photos);
    }

    render() {
        return (
            <>
                <form onSubmit={this.SearchImage}>
                    <div className="form-group">
                        <input type="text" name="keyword" className="form-control" value={this.state.keyword} onChange={this.inputHandle} placeholder="Search Image...." />


                    </div>
                    <div className="form-group">
                        <input type="submit" className="btn btn-primary btn-block" value="Search Image" />
                    </div>

                </form>

                <div className="row">
                    {
                        !this.state.loader ? (
                            this.state.photos.map((img) => <Image image={img} key={img.id} />)
                        ) : (
                            <h1>Loading...</h1>
                        )

                    }

                </div>
            </>
        );
    }
}

export default Search;