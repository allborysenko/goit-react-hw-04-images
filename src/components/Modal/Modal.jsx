import { useEffect } from 'react';

import css from '../../styles.module.css';

const Modal = ({ largeImageURL, closeModal }) => {
  const handlekeyDown = e => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };
  const handleCloseModal = e => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', handlekeyDown);

    return () => {
      window.removeEventListener('keydown', handlekeyDown);
    };
  });

  return (
    <div className={css.Overlay} onClick={handleCloseModal}>
      <div className={css.Modal}>
        <img className={css.ModalImage} src={largeImageURL} alt="" />
      </div>
    </div>
  );
};

export default Modal;
