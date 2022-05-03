import React from 'react'

const CauseSidebar = (props) => {

    return (
        <div className="col col-lg-4 col-12">
            <div className="blog-sidebar">
                <div className="widget category-widget">
                <h3>Fund Status</h3>
                    <ul>
                        <li>Goal: ETH 50</li>
                        <li>Raised: ETH 10</li>
                        <li>Donors: 6</li>
                    </ul>
                </div>
            </div>
        </div>

    )
}

export default CauseSidebar;