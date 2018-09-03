import React, { Fragment } from 'react';

import './styles.css';

const GMAL_QUOTE_LINK = 'https://en.wikipedia.org/wiki/Archimedes';

const Quote = ({ showGMAL }) => {
  const showOrHide = showGMAL ? 'quote-hide' : 'quote-show';

  const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  const height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

  const quoteText = (
    width > height
    ? "Give me a lever and a place to stand, and I shall move the world."
    : (<Fragment>
        Give me a lever and a place to stand,<br />
        and I shall move the world."<br />
      </Fragment>)
  );

  return (
    <div className={`quote ${showOrHide} font-weight-light`}>
      <p className="quote-text">
        <i>{quoteText}</i>
      </p>
      <a className="source" href={GMAL_QUOTE_LINK}>
        Archimedes
      </a>
    </div>
  );
}

export default Quote;
