var React = require('react');
var Banner = require('./components/banner');

var Homepage = React.createClass({
    render: function() {
        return (

            <html>

            <head>

                <title>{this.props.title}</title>
                <link href="a/styles/bootstrap.min.css" rel="stylesheet"/>

            </head>

            <body>

                <nav className="navbar navbar-default navbar-fixed-top">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <div className="navbar-brand">
                                {this.props.title}
                            </div>
                        </div>
                    </div>
                </nav>

                <div className="container-fluid">
                    <div className="row" style={{marginTop: 100}}>
                        <div class="col-md-12">

                            <Banner />

                        </div>
                    </div>
                </div>


            </body>

            </html>

        );
    }
});

module.exports = Homepage;