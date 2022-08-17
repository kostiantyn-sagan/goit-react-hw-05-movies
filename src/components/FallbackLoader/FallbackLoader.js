import { Code } from 'react-content-loader';

export default function FallbackLoader({ responsive }) {
  const styles = responsive
    ? {
        maxWidth: '1200px',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingLeft: '15px',
        paddingRight: '15px',
      }
    : {};

  return (
    <Code
      style={{
        width: '100%',
        marginTop: '10px',
        ...styles,
      }}
    />
  );
}
