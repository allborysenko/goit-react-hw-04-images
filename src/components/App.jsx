import Searchbar from 'components/Searchbar/Searchbar';
import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';

const API_KEY = '33375901-c67135e2a3aa56a314b6cff24';

export class App extends Component {
  state = {
    searchText: '',
    images: [],
    totalImages: null,
    isLoading: false,
    page: 1,
    modal: {
      isShowModal: false,
      largeImageURL: '',
    },
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchText !== this.state.searchText ||
      prevState.page !== this.state.page
    ) {
      this.setState({ isLoading: true });

      fetch(
        `https://pixabay.com/api/?q=${this.state.searchText}&page=${this.state.page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => res.json())
        .then(image => {
          if (!image.total) {
            toast.error('Вибачте, немає картинки з таким запитом!');
          }
          this.setState(prevState => ({
            images: [...prevState.images, ...image.hits],
            totalImages: image.total,
          }));
        })
        .finally(() => this.setState({ isLoading: false }));
    }
  }

  handleSearch = searchText => {
    if (this.state.searchText === searchText) {
      toast.error('Знайдено картинки за цим запитом, введіть новий запит!');
    }
    this.setState({
      searchText: searchText.toLowerCase(),
      images: [],
      page: 1,
    });
  };

  openModal = largeImageURL => {
    this.setState({ modal: { largeImageURL, isShowModal: true } });
  };

  closeModal = () => {
    this.setState({ modal: { largeImageURL: '', isShowModal: false } });
  };

  searchLoadMore = () => {
    this.setState(state => ({ page: state.page + 1 }));
  };

  render() {
    const { isLoading, images, modal, page, totalImages } = this.state;
    const totalPages = totalImages / 12;
    let loadMore = false;
    if (images.length >= 1 && page <= Math.ceil(totalPages)) {
      loadMore = true;
    }
    return (
      <div>
        <Searchbar handleSearch={this.handleSearch}></Searchbar>
        <ToastContainer autoClose={2000} theme="colored" />
        {isLoading && <Loader />}

        {modal.isShowModal && (
          <Modal
            largeImageURL={this.state.modal.largeImageURL}
            closeModal={this.closeModal}
          />
        )}

        {images.length > 0 && (
          <ImageGallery
            images={images}
            searchLoadMore={this.searchLoadMore}
            openModal={this.openModal}
          ></ImageGallery>
        )}
        {loadMore && (
          <Button searchLoadMore={this.searchLoadMore}>Load More...</Button>
        )}
      </div>
    );
  }
}
