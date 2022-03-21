import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types'
import { statusTypes } from '../../../store/storeTypes';
import { listActions } from '../../../reducers';
import Loading from '../../shared/Loading';
import ItemCard from '../../shared/ItemCard';
import ErrorBubble from '../../shared/Error';



const TopSales = ({ name }) => {
    // проброс state из ветки state[name] и dispatch 
    const { items, status } = useSelector((state) => state[name]);
    const dispatch = useDispatch();


    // загружаем список работ - один раз при загрузке компонента
    useEffect(() => {
        // вызов события requestItems из ветки reducers[name]
        dispatch(listActions[name].requestItems(name));
    }, [])


    return (
        <section className="top-sales">
            <h2 className="text-center">Хиты продаж!</h2>
            {status === statusTypes.LOADING ? (
                <Loading />
            ) :
                status === statusTypes.ERROR ? (
                    <ErrorBubble />
                ) : (
                        <div className="row">
                            {items.map((v) => (
                                <div className="col-4" key={`ts_col_${v.id}`}>
                                    <ItemCard item={v} key={`ts_item_${v.id}`} />
                                </div>
                            ))}
                        </div>
                    )}
        </section>
    )
};

TopSales.propTypes = {
    name: PropTypes.string.isRequired,
    data: PropTypes.object
};

TopSales.defaultProps = {
    name: 'topSales'
}


export default TopSales;

