import css from '../../styles.module.css';
import PropTypes from 'prop-types';

export const Button = ({ searchLoadMore, children }) => {
  return (
    <button
      type="button"
      className={css.Button}
      onClick={() => {
        searchLoadMore();
      }}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  searchLoadMore: PropTypes.func.isRequired,
};

export default Button;
