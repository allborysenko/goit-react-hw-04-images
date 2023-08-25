import { Component } from 'react';
import css from '../../styles.module.css';
import PropTypes from 'prop-types';

class Button extends Component {
  render() {
    const { searchLoadMore, children } = this.props;
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
  }
}

Button.propTypes = {
  searchLoadMore: PropTypes.func.isRequired,
};

export default Button;
