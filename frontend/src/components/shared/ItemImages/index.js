import PropTypes from 'prop-types'

import './main.css';


const ItemImages = ({ images, title }) => {

    const handleChangePhoto = (e) => {
        const curIndex = images.findIndex((v) => v === e.target.src);
        e.target.src = images[(curIndex + 1) % images.length];
    }

    const imgResult = images && images.length > 0 ? (
        <img
            src={images[0]}
            className="card-img-top img-fluid img-fit"
            alt={title}
            title={title}
            onMouseOver={(e) => handleChangePhoto(e)}
        />
    ) : (
        <img
            src="/img/nophoto.png"
            className="card-img-top img-fluid img-fit"
            alt={title}
        />
    )


    return (
        imgResult
    )
};


ItemImages.propTypes = {
    images: PropTypes.array,
    title: PropTypes.string
};



export default ItemImages;

