# VeekasMeansProgress.com

personal website

## TODO

- add give me a lever quote
- make transition from off-center gmal world to center before rising to header
- do I actually need react-tappable??? probably not, if I'm not doing a draggable platform anymore...
- should I change to a draggable platform?
- use staggered motion in content section

    ```html
    <StaggeredMotion
      defaultStyles={[{h: 0}, {h: 0}, {h: 0}]}
      styles={prevInterpolatedStyles => prevInterpolatedStyles.map((_, i) => {
        return i === 0
          ? {h: spring(100)}
          : {h: spring(prevInterpolatedStyles[i - 1].h)}
      })}>
      {interpolatingStyles =>
        <div>
          {interpolatingStyles.map((style, i) =>
            <div key={i} style={{border: '1px solid', height: style.h}} />)
          }
        </div>
      }
    </StaggeredMotion>
    ```
