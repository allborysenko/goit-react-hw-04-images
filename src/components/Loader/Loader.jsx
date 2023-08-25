import { Component } from 'react';
import { Blocks } from 'react-loader-spinner';

class Loader extends Component {
  state = {};
  render() {
    return (
      <Blocks
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{
          display: 'block',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 'auto',
        }}
        wrapperclassName="blocks-wrapper"
      />
    );
  }
}

export default Loader;
