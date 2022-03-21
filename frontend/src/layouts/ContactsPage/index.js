import PropTypes from 'prop-types';


const ContactsPage = ({ data }) => (
    <section className="info-container">
        <h2 className="text-center">
            Контакты
        </h2>

        <p>
            Наш головной офис расположен в <b>г.Москва</b>, по адресу: <span className="text-gray">Варшавское шоссе, д. 17, бизнес-центр W Plaza</span>.
        </p>

        <h5 className="text-center">
            Координаты для связи:
        </h5>

        {data.phone ? (
            <p>
                Телефон: <a href={`tel:${data.phone.replace(/[^\+0-9]/g, '')}`}>{data.phone} </a> (
                {data.workdays?.map((v, key) => (
                    <span key={`fc-${key}`}>
                        {v.day}:
                        с <span className="text-gray"> {v.hoursFrom} </span>
                        до <span className="text-gray"> {v.hoursTo} </span>
                    </span>
                ))}
            )</p>
        ) : ''}

            {data.email ? (
                <p>
                    Email: <a href={`mailto:${data.email}`}>{data.email}</a>
                </p>
            ) : ''}
    </section>
);

ContactsPage.propTypes = {
    data: PropTypes.object,

};



export default ContactsPage;