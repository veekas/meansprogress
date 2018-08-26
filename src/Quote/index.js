import React from 'react';

const GMAL_QUOTE_LINK = 'https://en.wikipedia.org/wiki/Archimedes';

const Quote = ({ showGMAL }) => {
  const showOrHide = showGMAL ? 'quote-hide' : 'quote-show';

  return (
    <div className={`quote ${showOrHide}`}>
      <i>
        <p>"Give me a lever</p>
        <p>and a place to stand,</p>
        <p>and I shall move the world."</p>
      </i>
      <br />
      <p>
          <a href={GMAL_QUOTE_LINK}>Archimedes</a>
      </p>
    </div>
  );
}

export default Quote;
