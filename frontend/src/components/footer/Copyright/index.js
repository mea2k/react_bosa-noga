import PropTypes from 'prop-types'



const Copyright = ({ link }) => (
    <section>
        <div className="footer-copyright">
            2009-2022 © <a href={link ? link : '/'}>BosaNoga.ru</a> — модный интернет-магазин обуви и аксессуаров.
            Все права защищены.
            <br />
            Доставка по всей России!
        </div>
    </section>
);

Copyright.propTypes = {
    link: PropTypes.string
};



export default Copyright;

