import PropTypes from 'prop-types';


const ErrorPage = ({ text }) => (
    <section className="info-container">
        <h2 className="text-center">Страница не найдена</h2>
        <p>
            {text}
        </p>
    </section>
);

ErrorPage.propTypes = {
    text: PropTypes.string,

};

ErrorPage.defaultProps = {
    text: 'Извините, такая страница не найдена!'
}

export default ErrorPage;