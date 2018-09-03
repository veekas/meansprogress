import React from 'react';

import './styles.css';

const GMAL_QUOTE_LINK = 'https://en.wikipedia.org/wiki/Archimedes';

const Quote = ({ showGMAL }) => {
  const showOrHide = showGMAL ? 'quote-hide' : 'quote-show';

  return (
    <div className={`quote ${showOrHide} font-weight-light`}>
      <p className="quote-text">
        <i>
          "Give me a lever<br />
          and a place to stand,<br />
          and I shall move the world."<br />
        </i>
      </p>
      <a className="source" href={GMAL_QUOTE_LINK}>
        Archimedes
      </a>
    </div>
  );
}

export default Quote;
