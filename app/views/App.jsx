import React from 'react';
import ReactDOM from 'react-dom';

import Banner from './components/banner';
import Header from './components/header';

class App extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            config: {},

            banners: [],
            currentID: 1,
            currentBanner: {}
        };

    }

    getConfig () {
        var url = '/api/get_config';

        $.ajax({
            url: url,
            dataType: 'json',
            cache: false,
            success: function(data) {

                this.setState({
                    config: data
                });
                
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(url, status, err.toString());
            }.bind(this)
        });
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

                this.init();

            }.bind(this),
            error: function(xhr, status, err) {
                console.error(url, status, err.toString());
            }.bind(this)
        });
    }
    
    loadBanner() {
        var currentBannerName = this.state.banners[this.state.currentID];

        var size = currentBannerName.split('_')[1],
            width = size.split('x')[0],
            height = size.split('x')[1];

        this.setState({
            currentBanner: {
                name: currentBannerName,
                size: size,
                width: width,
                height: height,
                url: '/banner/' + currentBannerName
            }
        });
    }

    componentDidMount() {
        this.getCreativeList();
        this.getConfig();
    }

    init() {
        this.loadBanner();
    }

    render() {
        return (

            <div>

                <Header title={this.state.config.name} />

                <Banner banner={this.state.currentBanner} />

            </div>

        );
    }

}

ReactDOM.render(<App />, document.getElementById('App'));