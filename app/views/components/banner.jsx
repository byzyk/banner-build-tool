import React from 'react';

export default class Banner extends React.Component {
    render() {
        return (

            <div>
                Banner is here: {this.props.size}
            </div>

        );
    }
}