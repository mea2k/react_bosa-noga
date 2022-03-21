import { NavLink } from "react-router-dom";
import ItemImages from "../ItemImages";


const ItemCard = ({ item }) => (
    <div className="card">
        <ItemImages
            images={item.images}
            title={item.title}
        />
        <div className="card-body">
            <p className="card-text">{item.title}</p>
            <p className="card-text">{item.price.toLocaleString()} руб.</p>
            <NavLink to={`/products/${item.id}`} className="btn btn-outline-primary">Заказать</NavLink>
        </div>
    </div>
);


export default ItemCard;

