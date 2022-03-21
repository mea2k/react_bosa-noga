import PropTypes from 'prop-types';
import Contacts from '../../components/footer/Contacts';
import Copyright from '../../components/footer/Copyright';
import PayInfo from '../../components/footer/PayInfo';
import { FootMenu } from '../../components/shared/Menu';

import './main.css';


const Footer = ({ menu, payData, contacts }) => (
    <footer className="container bg-light footer">
        <div className="row">
            <div className="col">
                <section>
                    <h5>Информация</h5>
                    <FootMenu menu={menu} />
                </section>
            </div>
            <div className="col">

                <PayInfo payData={payData} />

                <Copyright />
                
            </div>
            <div className="col text-right">
                <Contacts data={contacts} />

               
            </div>
        </div>
    </footer>);

Footer.propTypes = {
    linkTo: PropTypes.string
};

export default Footer;