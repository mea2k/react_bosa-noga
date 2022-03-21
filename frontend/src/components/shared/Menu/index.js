import { useState } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types'


import './main.css';

// Шаблонный объект отображения меню
// PARAMS:
//   menu - объект элементов меню ({home, menuitems: [ {id,title,link}, ... ]})
//   style - стиль меню
const Menu = ({ menu, style }) => {

    const [location, setLocation] = useState(window.location.href.split('/').pop());

    return (
        <ul className={style}>
            {menu.menuItems?.map((v) => (
                <li className="nav-item" key={v.id}>
                    <NavLink
                        className="nav-link"
                        activeclassname="nav-link active"
                        to={v.link}>
                        {v.title}
                    </NavLink>
                </li>
            ))}
        </ul>
    )
};

Menu.propTypes = {
    menu: PropTypes.shape({
        home: PropTypes.object,
        menuItems: PropTypes.array
    }),
    style: PropTypes.string
};


// Верхнее меню
export const HeadMenu = ({ menu, style = 'navbar-nav mr-auto' }) => Menu({ menu, style });

// Нижнее меню
export const FootMenu = ({ menu, style = 'nav flex-column' }) => Menu({ menu, style });


