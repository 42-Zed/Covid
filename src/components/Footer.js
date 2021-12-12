import React from 'react';

import Container from 'components/Container';

const Footer = () => {
  return (
    <footer>
      <Container>
        <p>&copy; { new Date().getFullYear() }, Colby Fayock. Modifications by 42-Zed</p>
      </Container>
    </footer>
  );
};

export default Footer;
