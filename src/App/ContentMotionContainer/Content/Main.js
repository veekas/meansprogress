import React from 'react';

const Main = () => (
  <div className="view-container">
    <h1 className="font-weight-bold">Veekas Shrivastava</h1>

    <div className="definition">
      <p className="font-weight-semibold no-margin-line">
        विकास (veekas)
        <span className="font-weight-regular"><i>, n</i> :</span>
      </p>
      <p className="no-margin-line">1. progress.&nbsp;&nbsp;2. growth.&nbsp;&nbsp;3. development.</p>
    </div>

    <div className="footer-links">
      <div className="link">
        <i className="fas fa-at"></i>&nbsp;
        <a href="mailto:veekas@veekasmeansprogress.com">
          Email
        </a>
      </div>

      <div className="link">
        <i className="fab fa-github"></i>&nbsp;
        <a href="https://www.github.com/veekas">
          Github
        </a>
      </div>

      <div className="link">
        <i className="fab fa-twitter"></i>&nbsp;
        <a href="https://www.twitter.com/veekas">
          Twitter
        </a>
      </div>

      <div className="link">
        <i className="fab fa-linkedin"> </i>&nbsp;
        <a href="https://www.linkedin.com/in/veekas">
          LinkedIn
        </a>
      </div>

      <div className="link">
        <i className="fas fa-file"></i>&nbsp;
        <a href="https://veekas.github.io/react-resume/resume.pdf">
          Resume
        </a>
      </div>

      <div className="link">
        <i className="fas fa-envelope"></i>&nbsp;
        <a href="https://tinyletter.com/veekas">
          Newsletter
        </a>
      </div>

      <div className="link">
        <i className="fas fa-book"></i>&nbsp;
        <a href="http://www.goodreads.com/veekas">
          Goodreads
        </a>
      </div>
    </div>
  </div>
);

export default Main;
