import React, { useState, useEffect, useRef, } from 'react';
import './sort-and-search.css';
import imageUrl from '../Model/Service/images';

export const SortAndSearch = (props) => {
    const [sort, setSort] = useState('newest');
    const [image, setImage] = useState(imageUrl.sortDown);

    const handleSort = (e) => {
        if (e.target.accessKey === 'newest') {
            setSort('oldest');
            setImage(imageUrl.sortUp);
            props.handleSortOnClick('newest');
        } else {
            setSort('newest');
            setImage(imageUrl.sortDown);
            props.handleSortOnClick('oldest');
        }
    }

    return (
        <>
            <div id="filterAndSearchRow" className="row sticky-top">
                <div className="input-group">
                    <img id="sortIcon" accessKey={ sort } onClick={ (e) => { handleSort(e) } } src={ image } alt="Hem" />
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="searchInputGroup">
                            <img id="searchIcon" src={imageUrl.search} alt="Hem" />
                        </span>
                    </div>
                    <input id="searchInput" type="text" className="form-control" placeholder="Sök..." aria-label="Username" aria-describedby="basic-addon1" />
                </div>
            </div>
            <hr className="rounded black" />
        </>
    );
}
export default SortAndSearch