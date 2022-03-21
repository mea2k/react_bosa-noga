import { useState } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types'
import Cart from "../../components/header/Cart";
import SearchBar from "../../components/header/SearchBar";
import { HeadMenu } from "../../components/shared/Menu";


import './main.css';

const HeaderRow = ({ menu, searchUrl }) => {

    const [location, setLocation] = useState(window.location.href.split('/').pop());

    return (
        <nav className="navbar navbar-expand-sm navbar-light bg-light">

            <NavLink className="navbar-brand" to={menu.home.link}>
                <img src={menu.home.img} alt={menu.home.title} />
            </NavLink>

            <div className="collapase navbar-collapse" id="navbarMain">
                <HeadMenu menu={menu} />

                <div className="header-controls-pics bg-light">

                    <SearchBar searchUrl={searchUrl} />
                    <Cart />

                </div>


            </div>
        </nav>

    )
};

HeaderRow.propTypes = {
    menu: PropTypes.shape({
        home: PropTypes.object,
        menuItems: PropTypes.array
    }).isRequired,
    searchUrl: PropTypes.string
};



export default HeaderRow;