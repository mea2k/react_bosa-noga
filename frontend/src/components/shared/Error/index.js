import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'

import './main.css';

const ErrorBubble = ({ text = 'Произошла ошибка!', info, retry = null }) => {
    const navigate = useNavigate();

    return (
        <div className="error" aria-label={text} title={text}>
            <span>{text}</span>
            <div className="error-content">
                {info}
            </div>
            <span
                className="error-link"
                onClick={(e) => {
                    e.preventDefault();
                    if (retry)
                        retry();
                    else
                        window.location.reload(false);
                }}>
                Попробовать еще раз
                    </span>
            <span> или </span>
            <span
                className="error-link"
                onClick={(e) => {
                    e.preventDefault();
                    navigate(-1);
                }}>
                вернуться
                    </span>

        </div>
    )
};

ErrorBubble.propTypes = {
    text: PropTypes.string,
    info: PropTypes.string,
    retry: PropTypes.func,
};

ErrorBubble.defaultProps = {
    text: 'Произошла ошибка!',
    retry: null
}

export default ErrorBubble;