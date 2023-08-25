import Searchbar from 'components/Searchbar/Searchbar';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';

const API_KEY = '33375901-c67135e2a3aa56a314b6cff24';

export const App = () => {
  const [searchText, setSearchText] = useState('');
  const [images, setImages] = useState([]);
  const [totalImages, setTotalImages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState({
    isShowModal: false,
    largeImageURL: '',
  });

  useEffect(() => {
    if (page === 0) return;
    searchText && fetchImages();
    searchText && setIsLoading(true);

    function fetchImages() {
      fetch(
        `https://pixabay.com/api/?q=${searchText}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => res.json())
        .then(image => {
          if (!image.total) {
            toast.error('Вибачте, немає картинки з таким запитом!');
          }

          setImages(prevState => [...prevState, ...image.hits]);
          setTotalImages(image.total);
        })
        .finally(() => setIsLoading(false));
    }
  }, [searchText, page]);

  const handleSearch = text => {
    if (searchText === text) {
      toast.error('Знайдено картинки за цим запитом, введіть новий запит!');
    }

    setSearchText(text.toLowerCase());
    setImages([]);
    setPage(1);
  };

  const openModal = largeImageURL => {
    setModal({ largeImageURL, isShowModal: true });
  };

  const closeModal = () => {
    setModal({ largeImageURL: '', isShowModal: false });
  };

  const searchLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const totalPages = totalImages / 12;
  let loadMore = false;
  if (images.length >= 1 && page <= Math.ceil(totalPages)) {
    loadMore = true;
  }

  return (
    <div>
      <Searchbar handleSearch={handleSearch}></Searchbar>
      <ToastContainer autoClose={2000} theme="colored" />
      {isLoading && <Loader />}

      {modal.isShowModal && (
        <Modal largeImageURL={modal.largeImageURL} closeModal={closeModal} />
      )}

      {images.length > 0 && (
        <ImageGallery
          images={images}
          searchLoadMore={searchLoadMore}
          openModal={openModal}
        ></ImageGallery>
      )}
      {loadMore && (
        <Button searchLoadMore={searchLoadMore}>Load More...</Button>
      )}
    </div>
  );
};
