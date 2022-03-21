import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './layouts/Footer';
import Header from './layouts/Header';
import Main from './layouts/Main';
import MainPage from './layouts/MainPage';
import CatalogPage from './layouts/CatalogPage';
import CartPage from './layouts/CartPage';
import ItemPage from './layouts/ItemPage';
import AboutPage from './layouts/AboutPage';
import ContactsPage from './layouts/ContactsPage';
import ErrorPage from './layouts/ErrorPage';

import { MenuData } from './const/menu';
import { PayData } from './const/payData';
import { ContactsData } from './const/contacts';

import './main.css';





const App = () => (
    <div className="container">
        <Router>

            <Header menu={MenuData} searchUrl="/catalog" />

            <Main>
                <Routes>
                    <Route path="/">
                        <Route index element={<MainPage />} />
                        <Route path="/products/:id" element={<ItemPage />} />
                        <Route path="/catalog" element={<CatalogPage />} />
                        <Route path="/cart" element={<CartPage />} />
                       <Route path="/contacts" element={<ContactsPage data={ContactsData} />} />
                        <Route path="/about" element={<AboutPage data={ContactsData} />} />
                        <Route path="*" element={<ErrorPage />} />
                    </Route>
                </Routes>
            </Main>

            <Footer menu={MenuData} payData={PayData} contacts={ContactsData} />

        </Router>
    </div>
);


export default App;
