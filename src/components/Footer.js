import React from 'react';

import Container from 'components/Container';

const Footer = () => {
  return (
    <footer>
      <Container>
        <p>&copy; { new Date().getFullYear() }, <a href="https://github.com/colbyfayock/my-coronavirus-map" target="_blank">Colby Fayock</a>. Modifications by <a href="https://github.com/42-Zed/Coldsnap/wiki" target="_blank">42-Zed</a></p>
      </Container>
    </footer>
  );
};

export default Footer;
