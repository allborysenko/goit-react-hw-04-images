import PropTypes from 'prop-types';
import css from 'styles.module.css';

const ImageGalleryItem = ({ webformatURL, openModal, tag }) => {
  return (
    <li className={css.ImageGalleryItem} onClick={openModal}>
      <img src={webformatURL} alt={tag} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  tag: PropTypes.string,
};
export default ImageGalleryItem;
