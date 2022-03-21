import PropTypes from 'prop-types'

import './main.css';

const Loading = ({ text = 'Загрузка...' }) => (
    <div className="preloader" title={text} alt={text}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>
);
  
Loading.propTypes = {
    text: PropTypes.string,
};

Loading.defaultProps = {
    text: 'Загрузка...'
}

export default Loading;