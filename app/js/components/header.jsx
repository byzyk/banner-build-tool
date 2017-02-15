import React from 'react';

class Header extends React.Component {
    
    render() {
        
        return(
            <nav className="navbar navbar-default navbar-fixed-top">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <div className="navbar-brand">
                            {this.props.title}
                        </div>
                    </div>
                </div>
            </nav>   
        )
        
    }
    
}

export default Header;