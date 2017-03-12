import React from 'react';

class Banner extends React.Component {

    render() {
        return (

            <div className="container-fluid banner">
                <div className="row">
                    <div className="col-md-12">

                        <iframe src={this.props.banner.url} width={this.props.banner.width} height={this.props.banner.height} frameBorder="0"></iframe>

                    </div>
                </div>
            </div>

        );
    }
}

export default Banner;