import { Component } from 'react';
import PropTypes from 'prop-types';

import css from '../../styles.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Searchbar extends Component {
  state = { value: '' };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.value.trim() === '') {
      toast.error('Введітьте слово для пошуку!');
      return;
    }
    this.props.handleSearch(this.state.value);
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ value });
  };

  render() {
    return (
      <>
        <header className={css.Searchbar}>
          <form className={css.SearchForm} onSubmit={this.handleSubmit}>
            <input
              className={css.SearchForminput}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              onChange={this.handleChange}
              value={this.state.value}
            />
            <button type="submit" className={css.SearchFormbutton}>
              <span className={css.SearchFormbuttonlabel}>Search</span>
            </button>
          </form>
        </header>
      </>
    );
  }
}

export default Searchbar;

Searchbar.propTypes = {
  handleSearch: PropTypes.func,
};
