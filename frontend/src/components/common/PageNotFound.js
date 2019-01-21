import React from 'react';
import PropTypes from 'prop-types';


const PageNotFound = ({location}) => {
    return (
        <div className="jumbotron page-404">
            <div className="heading">404</div>
            <div className="lead">The Page you Requested Could Not Found</div>
            <div className="access-link">No match for the link <code>{location.pathname}</code></div>
        </div>
    );
};



PageNotFound.propTypes = {
    location: PropTypes.object.isRequired
};



export default PageNotFound;
