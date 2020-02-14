<script>
  import { Router, Link, Route } from 'svelte-routing';
  import { fade } from 'svelte/transition';

  function typewriter(node, { speed = 100 }) {
    const valid =
      node.childNodes.length === 1 && node.childNodes[0].nodeType === 3;

    if (!valid) {
      throw new Error(
        `This transition only works on elements with a single text node child`,
      );
    }

    const text = node.textContent;
    const duration = text.length * speed;

    return {
      duration,
      tick: t => {
        const i = ~~(text.length * t);
        node.textContent = text.slice(0, i);
      },
    };
  }
</script>

<style>
  .container {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .link {
    font-size: 5vmin;
  }

  main {
    align-items: center;
  }

  h1 {
    font-size: 8vmin;
    line-height: 1;
    text-align: center;
  }

  p {
    margin: 0;
    padding: 0;
  }

  .paper {
    font-family: 'Lato', sans-serif;
    line-height: 2em;
    padding: 37px 55px 27px;
    position: relative;
    border: 1px solid #b5b5b5;
    background: white;
    background: -webkit-linear-gradient(top, #dfe8ec 0%, white 8%) 0 0;
    background: -moz-linear-gradient(top, #dfe8ec 0%, white 8%) 0 0;
    background: linear-gradient(top, #dfe8ec 0%, white 8%) 0 0;
    -webkit-background-size: 100% 2em;
    -moz-background-size: 100% 2em;
    -ms-background-size: 100% 2em;
    background-size: 100% 2em;
  }

  .paper::after {
    content: '';
    position: absolute;
    width: 0px;
    top: 0;
    left: 39px;
    bottom: 0;
    border-left: 1px solid #f8d3d3;
  }

  .bottom-nav {
    margin: 10vmin;
    font-size: 5vmin;
  }

  @media (min-width: 640px) {
    h1 {
      font-size: 5vmin;
    }

    .paper {
      width: 80%;
    }

    .link,
    .bottom-nav {
      font-size: 3vmin;
    }
  }
</style>

<div class="container">
  <nav>
    <div class="link" in:fade>
      <Link to="/">← back</Link>
    </div>
  </nav>

  <main>
    <h1 in:typewriter>Year in Review: 28</h1>

    <div class="paper">
      I did something cool today. Lorem ipsum dolor sit amet, consectetur
      adipisicing elit. Quisquam rerum asperiores, ex animi sunt ipsum. Voluptas
      sint id hic. Vel neque maxime exercitationem facere culpa nisi, nihil
      incidunt quo nostrum, beatae dignissimos dolores natus quaerat! Quasi sint
      praesentium inventore quidem, deserunt atque ipsum similique dolores
      maiores expedita, qui totam. Totam et incidunt assumenda quas explicabo
      corporis eligendi amet sint ducimus, culpa fugit esse. Tempore dolorum sit
      perspiciatis corporis molestias nemo, veritatis, asperiores earum! Ex
      repudiandae aperiam asperiores esse minus veniam sapiente corrupti alias
      deleniti excepturi saepe explicabo eveniet harum fuga numquam nostrum
      adipisci pariatur iusto sint, impedit provident repellat quis?
    </div>
  </main>

  <div class="bottom-nav">
    <Link to="/">← back</Link>
  </div>
</div>

<!-- <Router>
  <h1>Blog</h1>

  <ul>
    <li>
      <Link to="first">Today I did something cool</Link>
    </li>
    <li>
      <Link to="second">I did something awesome today</Link>
    </li>
    <li>
      <Link to="third">Did something sweet today</Link>
    </li>
    <li>
      <Link to="fourth">wanna see an eggplant emoji?</Link>
    </li>
  </ul>

  <Route path="first">
    <p>
      I did something cool today. Lorem ipsum dolor sit amet, consectetur
      adipisicing elit. Quisquam rerum asperiores, ex animi sunt ipsum. Voluptas
      sint id hic. Vel neque maxime exercitationem facere culpa nisi, nihil
      incidunt quo nostrum, beatae dignissimos dolores natus quaerat! Quasi sint
      praesentium inventore quidem, deserunt atque ipsum similique dolores
      maiores expedita, qui totam. Totam et incidunt assumenda quas explicabo
      corporis eligendi amet sint ducimus, culpa fugit esse. Tempore dolorum sit
      perspiciatis corporis molestias nemo, veritatis, asperiores earum! Ex
      repudiandae aperiam asperiores esse minus veniam sapiente corrupti alias
      deleniti excepturi saepe explicabo eveniet harum fuga numquam nostrum
      adipisci pariatur iusto sint, impedit provident repellat quis?
    </p>
  </Route>
  <Route path="second">
    <p>
      I did something awesome today. Lorem ipsum dolor sit amet, consectetur
      adipisicing elit. Repudiandae enim quasi animi, vero deleniti dignissimos
      sapiente perspiciatis. Veniam, repellendus, maiores.
    </p>
  </Route>
  <Route path="third">
    <p>
      I did something sweet today. Lorem ipsum dolor sit amet, consectetur
      adipisicing elit. Modi ad voluptas rem consequatur commodi minima
      doloribus veritatis nam, quas, culpa autem repellat saepe quam deleniti
      maxime delectus fuga totam libero sit neque illo! Sapiente consequatur rem
      minima expedita nemo blanditiis, aut veritatis alias nostrum vel? Esse
      molestias placeat, doloribus commodi.
    </p>
  </Route>
  <Route path="fourth">
    <p>🍆🍆🍆🍆🍆🍆🍆🍆</p>
  </Route>
</Router> -->
