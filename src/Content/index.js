import React from 'react';

export default class Content extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.style.transform !== this.props.style.transform;
  }

  render() {
    const { style } = this.props;

    return (
    <div className="content-container" style={style}>
      <h1>Veekas Shrivastava</h1>

      <div className="definition">
        <div className="semibold">
          विकास (veekas)
          <span className="regular"><i>, n</i> :</span>
        </div>
        1. progress.&nbsp;&nbsp;2. growth.&nbsp;&nbsp;3. development.
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
          <a href="/resume.pdf">
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
  }
}

// export default Content;
