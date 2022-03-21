import PropTypes from 'prop-types'

import './main.css';


const Contacts = ({ data }) => (
    <section className="footer-contacts">
        <h5>Контакты:</h5>
        {data.phone ? (<a className="footer-contacts-phone" href={`tel:${data.phone.replace(/[^\+0-9]/g, '')}`}>{data.phone}</a>) : ''}
        {data.workdays?.map((v, key) => (
            <div key={`fc-${key}`}>
                {v.day}:
                с <span className="footer-contacts-working-hours"> {v.hoursFrom} </span>
                до <span className="footer-contacts-working-hours"> {v.hoursTo} </span>
            </div>
        ))}
        {data.email ? (<a className="footer-contacts-email" href={`mailto:${data.email}`}>{data.email}</a>) : ''}
        <div className="footer-social-links">
            {data.social?.map((v) => (
                <div className={`footer-social-link footer-social-link-${v.name}`} key={v.name}>
                    <a href={v.link}>
                        <img src={v.img} alt={v.name} title={v.name} />
                    </a>
                </div>
            ))}
        </div>
    </section>
);

Contacts.propTypes = {
    data: PropTypes.object
};



export default Contacts;

