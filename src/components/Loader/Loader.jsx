import { Blocks } from 'react-loader-spinner';

export const Loader = () => {
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
};

export default Loader;
