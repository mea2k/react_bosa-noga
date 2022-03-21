import { useState } from "react";
import PropTypes from 'prop-types';

import './main.css';

const SearchBar = ({searchUrl}) => {

    const [show, setShow] = useState(false);

    return (
        <div className="header-controls-pic header-controls-search">
            <form
                action={searchUrl}
                className={`header-controls-search-form form-inline ${show ? 'control-show' : 'invisible'}`}
            >
                <input
                    className={`form-control control-show`}
                    placeholder="Поиск"
                    name="q"
                />
            </form>
                <img
                    src="/img/search.png"
                    alt="Поиск"
                    title="Поиск"
                    onClick={() => setShow((prev) => !prev)}
                />
        </div>
    )
};

SearchBar.propTypes = {
    searchUrl: PropTypes.string.isRequired,
};



export default SearchBar;