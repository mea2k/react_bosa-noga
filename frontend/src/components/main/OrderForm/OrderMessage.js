import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import './main.css';

// Информация об отправленно заказе
// PARAMS:
//   ORDER.order - номер заказа
//   ORDER.deliveryDate - дата доставки

const OrderMessage = ({ order }) => (
    <section className="order">
        <h2 className="text-center">Заказ оформлен</h2>
        <table className="table table-bordered">
            <tbody>
                <tr>
                    <th scope="col">Номер заказа</th>
                    <td scope="row">{order.order}</td>
                </tr>
                <tr>
                    <th scope="col">Дата доставки</th>
                    <td scope="row">{new Date(order.deliveryDate).toLocaleDateString('ru-RU', { day: '2-digit', month: 'long', year: 'numeric'})}</td>
                </tr>
            </tbody>
        </table>

        <div className="text-center">
            <NavLink to="/"> На главную</NavLink>
        </div>
    </section>
);

OrderMessage.propTypes = {
    order: PropTypes.shape({
        order: PropTypes.number,
        deliveryDate: PropTypes.string
    })
};


export default OrderMessage;

