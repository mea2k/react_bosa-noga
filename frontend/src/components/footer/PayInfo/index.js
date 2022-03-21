import PropTypes from 'prop-types'

import './main.css';


const PayInfo = ({ payData }) => (
    <section>
        <h5>Принимаем к оплате:</h5>
        <div className="footer-pay">
            {payData?.map((v) => (
                <div className={`footer-pay-systems footer-pay-systems-${v.name}`} key={`fp-${v.name}`}>
                    <img src={v.img} alt={v.title} title={v.title} />
                </div>
            ))}
        </div>
    </section>
);

PayInfo.propTypes = {
    payData: PropTypes.array
};



export default PayInfo;

