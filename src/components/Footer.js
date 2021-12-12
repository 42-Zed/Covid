import React from "react";

import { useSiteMetadata } from "hooks";

import Container from "components/Container";

const Footer = () => {
  const { authorName, authorUrl } = useSiteMetadata();

  return (
    <footer>
      <Container>
        <p>
          &copy; {new Date().getFullYear()},{" "}
          <a href={authorUrl}>{authorName}</a>
          , alterations by 42-Zed.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
