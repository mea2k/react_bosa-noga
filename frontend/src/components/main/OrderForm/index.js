import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { statusTypes } from '../../../store/storeTypes';
import { postActions, storageActions } from '../../../reducers';
import Loading from '../../shared/Loading';
import OrderMessage from './OrderMessage';
import ErrorBubble from '../../shared/Error';

import './main.css';

// форма отправки заказа
// PARAMS:
//   name - имя ветки reducers для получения информации о корзине (storageReducer[])
//   namePost - имя ветки reducers для POST-запросов (postReducers[])
const OrderForm = ({ name, namePost }) => {

    // проброс Storage из State и dispatch
    const cart = useSelector((state) => state[name].items);
    const cartStatus = useSelector((state) => state[name].status);

    // проброс POST ветки из State
    const postResult = useSelector((state) => state[namePost].result);
    const postStatus = useSelector((state) => state[namePost].status);

    const dispatch = useDispatch();

    // элементы формы
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [agreement, setAgreement] = useState(false);

    // Сохранение номера телефона (только цифры, скобки () и '+')
    const handleChangePhone = (e) => {
        setPhone(e.target.value.replace(/[^\+\(\)0-9]/g, ''));
    }

    // Сохранение адреса (с обрезкой пробелов)
    const handleChangeAddress = (e) => {
        setAddress(e.target.value.trimLeft());
    }

    // Сохранение статуса галочки (checkbox) о соглашении (agreement)
    const handleChangeAgreement = (e) => {
        setAgreement((prev) => !prev);
    }

    // Проверка, что все поля заполнены
    // иначе кнопка Submit - недоступа (disabled)
    const chekDisableSubmitButton = () => (
        phone && address && agreement ? false : true
    );

    // Отправка заказа на backend-сервер
    const handleSubmit = () => {
        // формирование POST-данных
        const data = {
            owner: {
                phone,
                address
            },
            items: cart

        }
        // формирование POST-запроса
        dispatch(postActions[namePost].postDataRequest(data, namePost));

        // помечаем в Storage, что заказ собран и отправлен (cartStatus: IDLE --> SUCCESS)
        dispatch(storageActions[name].setStatus(statusTypes.SUCCESS, name));
    }

    useEffect(() => {
        // в случае успеха загрузки данных(cartStatus === SUCCESS, postStatus === SUCCESS)
        // очищаем корзину
        if (postStatus === statusTypes.SUCCESS && cartStatus === statusTypes.SUCCESS && Object.keys(postResult).length) {
            dispatch(storageActions[name].clearItems(name));
        }

        // если заказ отправлен успешно, а уже собран новый (cartStatus: IDLE, postStatus: SUCCESS)
        // очищаем информацию о пердыдущем заказе
        // и сбрасываем postStatus SUCCESS --> IDLE
        if (postStatus === statusTypes.SUCCESS && cartStatus === statusTypes.IDLE && Object.keys(postResult).length) {
            dispatch(postActions[namePost].clearPostResult(namePost));
        }

    }, [postStatus, cartStatus])




    // Если postStatus===LOADING  - значит глобальная загрузка
    if (postStatus === statusTypes.LOADING)
        return <Loading />

    // Если postStatus===SUCCESS  - значит заказ отправлен - отображаются детали заказа
    if (postStatus === statusTypes.SUCCESS)
        return <OrderMessage order={postResult} />

    // Если postStatus====ERROR  - значит отображается ошибка
    if (postStatus === statusTypes.ERROR)
        return <ErrorBubble retry={handleSubmit} />

    // Если корзина не пустая - отображается форма заказа
    if (cart && cart.length)
        return (
            <section className="order">
                <h2 className="text-center">Оформить заказ</h2>
                <div className="card order-card" >
                    <form className="card-body">
                        <div className="form-group">
                            <label htmlFor="phone">
                                Телефон
                                <span title="Обязательное поле" className="text-red">*</span>
                            </label>
                            <input className="form-control" id="phone" name="phone" placeholder="Ваш телефон" value={phone} onChange={handleChangePhone} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">
                                Адрес доставки
                                <span title="Обязательное поле" className="text-red">*</span>
                            </label>
                            <input className="form-control" id="address" name="address" placeholder="Адрес доставки" value={address} onChange={handleChangeAddress} />
                        </div>
                        <div className="form-group form-check">
                            <input type="checkbox" className="form-check-input" id="agreement" name="agreement" value={agreement} onChange={handleChangeAgreement} />
                            <label className="form-check-label" htmlFor="agreement">
                                Согласен с правилами доставки
                                <span title="Обязательное поле" className="text-red">*</span>
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-outline-secondary"
                            disabled={chekDisableSubmitButton()}
                            onClick={(e) => { e.preventDefault(); handleSubmit() }}
                        >
                            Оформить
                        </button>
                    </form>
                </div>
            </section>
        )
    // иначе (корзина путая) - ничего не отображается
    else
        return (
            <section className="order"></section>
        );
};

OrderForm.propTypes = {
    name: PropTypes.string.isRequired,
    namePost: PropTypes.string.isRequired
};

OrderForm.defaultProps = {
    name: 'storage_cart',
    namePost: 'post_cart',
}


export default OrderForm;

