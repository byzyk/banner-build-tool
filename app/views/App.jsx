import React from 'react';
import ReactDOM from 'react-dom';
import Banner from './components/banner';

class App extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            banners: [],
            currentID: 0
        };

    }
    
    getCreativeList() {

        var url = '/api/get_creative_list';

        $.ajax({
            url: url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({
                    banners: data
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(url, status, err.toString());
            }.bind(this)
        });
        
    }

    componentDidMount() {
        this.getCreativeList();
    }

    render() {
        return (

            <div>
                <Banner size={this.state.banner} />



                <div>
                    {this.state.banner}
                </div>

            </div>

        );
    }

}

ReactDOM.render(<App />, document.getElementById('App'));