import { Component } from 'react';
import css from '../../styles.module.css';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handlekeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handlekeyDown = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  handleCloseModal = e => {
    if (e.currentTarget === e.target) {
      this.props.closeModal();
    }
  };

  render() {
    const { largeImageURL } = this.props;
    return (
      <div className={css.Overlay} onClick={this.handleCloseModal}>
        <div className={css.Modal}>
          <img className={css.ModalImage} src={largeImageURL} alt="" />
        </div>
      </div>
    );
  }
}

export default Modal;
