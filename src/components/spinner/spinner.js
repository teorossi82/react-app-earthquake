import React from 'react';

import './spinner.scss';

const Spinner = () => {
	return (
		<div className="custom-loader">
            <div className="custom-spinner">
            <div className="bounce1" />
              <div className="bounce2" />
              <div className="bounce3" />
            </div>
        </div>
	);
};

export default Spinner;

