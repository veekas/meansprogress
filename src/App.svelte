<script>
  import { fly } from 'svelte/transition';
  import { Router, Route } from 'svelte-routing';
  import Home from './routes/Home.svelte';
  // import About from "./routes/About.svelte";
  import Blog from './routes/Blog.svelte';

  export let url = '';

  const consoleQuote = `
“And now that you don't have to be perfect,
you can be good.”

                          ― John Steinbeck
                            'East of Eden'
`;
  console.log(consoleQuote);
</script>

<svelte:head>
  <link
    href="https://fonts.googleapis.com/css?family=Fira+Code:400,600&display=swap"
    rel="stylesheet" />
  <link
    href="https://fonts.googleapis.com/css?family=Lato&display=swap"
    rel="stylesheet" />
</svelte:head>

<Router>
  <!-- <Route path="blog/:id" component="{BlogPost}" /> -->
  <Route path="blog/*" component={Blog} />
  <!-- <Route path="about" component="{About}" /> -->
  <Route path="/" component={Home} />
</Router>
