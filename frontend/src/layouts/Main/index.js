import PropTypes from 'prop-types'
import Banner from '../../components/main/Banner';

const Main = ({ children }) => (
    <main className="container">
        <div className="row">
            <div className="col">

                <Banner  />

                {children}

            </div>
        </div>
    </main>
);


export default Main;