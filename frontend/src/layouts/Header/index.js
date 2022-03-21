import PropTypes from 'prop-types';
import HeaderRow from "../HeaderRow";

const Header = ({ menu, searchUrl }) => (
    <header className="container">
        <div className="row">
            <div className="col">
                <HeaderRow menu={menu} searchUrl={searchUrl} />
            </div>
        </div>
    </header>
);

Header.propTypes = {
    linkTo: PropTypes.string,
    searchUrl: PropTypes.string
};

export default Header;