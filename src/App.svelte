<script>
  import { fly } from 'svelte/transition';

  document.body.setAttribute('id', 'progress');

  let page = document.getElementById('progress'),
    ua = navigator.userAgent,
    iphone = ~ua.indexOf('iPhone') || ~ua.indexOf('iPod'),
    ipad = ~ua.indexOf('iPad'),
    ios = iphone || ipad,
    // Detect if this is running as a fullscreen app from the homescreen
    fullscreen = window.navigator.standalone,
    android = ~ua.indexOf('Android'),
    lastWidth = 0;

  if (android) {
    // Android's browser adds the scroll position to the innerHeight, just to
    // make this really fucking difficult. Thus, once we are scrolled, the
    // page height value needs to be corrected in case the page is loaded
    // when already scrolled down. The pageYOffset is of no use, since it always
    // returns 0 while the address bar is displayed.
    window.onscroll = function() {
      page.style.height = window.innerHeight + 'px';
    };
  }

  let setupScroll = (window.onload = function() {
    // Start out by adding the height of the location bar to the width, so that
    // we can scroll past it
    if (ios) {
      // iOS reliably returns the innerWindow size for documentElement.clientHeight
      // but window.innerHeight is sometimes the wrong value after rotating
      // the orientation
      let height = document.documentElement.clientHeight;
      // Only add extra padding to the height on iphone / ipod, since the ipad
      // browser doesn't scroll off the location bar.
      if (iphone && !fullscreen) height += 60;
      page.style.height = height + 'px';
    } else if (android) {
      // The stock Android browser has a location bar height of 56 pixels, but
      // this very likely could be broken in other Android browsers.
      page.style.height = window.innerHeight + 56 + 'px';
    }
    // Scroll after a timeout, since iOS will scroll to the top of the page
    // after it fires the onload event
    setTimeout(scrollTo, 0, 0, 1); // eslint-disable-line no-restricted-globals
  });

  (window.onresize = function() {
    let pageWidth = page.offsetWidth;
    // Android doesn't support orientation change, so check for when the width
    // changes to figure out when the orientation changes
    if (lastWidth === pageWidth) return;
    lastWidth = pageWidth;
    setupScroll();
  })();
</script>

<style>
  /* set width, height, & min/max properties to include content, padding, & border */
  *,
  *:before,
  *:after {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  /* remove default margin */
  :global(body) {
    height: 100%;
    display: flex;
    justify-content: center;
    margin: 0;
    padding: 0;
    background-color: #282f30;
    font-family: 'Fira Code', monospace;
  }

  a {
    color: #f9fbf9;
    font-size: 4vh;
  }

  main {
    text-align: center;
    padding: 0 10vmin 10vmin;
    color: #f9fbf9;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  h1 {
    color: #ecb600;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 13vmin;
    font-weight: 600;
    line-height: 1;
  }
  /*  */
  .shift-right {
    /* margin-top: 1.33em; */
    padding-left: 4ch;
  }

  .shift-left {
    padding-right: 4ch;
  }

  .footer-links {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .link {
    line-height: 1.5;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }

    /* h1 {
      margin-top: 0;
    } */
  }
</style>

<svelte:head>
  <link
    href="https://fonts.googleapis.com/css?family=Fira+Code:400,600&display=swap"
    rel="stylesheet" />
</svelte:head>

<main>
  <h1>
    <span class="shift-left">veekas</span>
    <span
      class="shift-right"
      transition:fly={{ y: -75, delay: 1000, duration: 2000 }}>
      ashoka
    </span>
  </h1>
  <div class="footer-links">
    <div class="link">
      <a href="mailto:veekas@veekasmeansprogress.com">email</a>
    </div>

    <div class="link">
      <a href="https://www.facebook.com/veekas">facebook</a>
    </div>

    <div class="link">
      <a href="https://www.github.com/veekas">github</a>
    </div>

    <div class="link">
      <a href="http://www.goodreads.com/veekas">goodreads</a>
    </div>

    <div class="link">
      <a href="http://www.instagram.com/veekas">instagram</a>
    </div>

    <div class="link">
      <a href="https://www.linkedin.com/in/veekas">linkedin</a>
    </div>

    <div class="link">
      <a href="https://tinyletter.com/veekas">newsletter</a>
    </div>

    <!-- <div class="link">
      <a href="https://veekas.github.io/react-resume/resume.pdf">Resume</a>
    </div> -->

    <div class="link">
      <a href="https://www.twitter.com/veekas">twitter</a>
    </div>
  </div>
</main>
