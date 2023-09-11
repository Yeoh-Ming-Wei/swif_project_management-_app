import React from 'react';

const ProductBacklog = () => {
    return (
        <div className="product-backlog-container">
            <div className="sprint-view-menu">
                <h2>Sprint View</h2>
                <button>New Sprint</button>
            </div>
            <div className="main-content">
                {/* This is where you would add content that will display to the right of the menu */}
            </div>
        </div>
    );
}

export default ProductBacklog;