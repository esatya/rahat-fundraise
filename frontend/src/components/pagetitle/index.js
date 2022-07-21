import React from 'react';
import { Link } from 'react-router-dom';

const PageTitle = (props) => {
  return (
    <div className="wpo-breadcumb-area">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="wpo-breadcumb-wrap py-4">
              <h2>{props.pageTitle}</h2>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <span className="ps-1">{props.pagesub?.slice(0, 20)}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageTitle;
