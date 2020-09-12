# Summary

[Check out the demo](https://react-optimizations.netlify.app/)

This repository hosts the code for a
[video series on optimizing react applications.](https://www.youtube.com/playlist?list=PL4XlGi3lmbLFe8kizCgMrXUr3420_wmu7)

In this series we walk through:

- Hooking up the app to local state using `useReducer`
- Using `React.memo` to avoid extra re-renders
- Implementing immer to make our code more readable and avoid completely
  rewriting the entire state
- Hoisting state into a context to avoid prop-drilling and separate the dispatch
  from the state
- Adding recoil to separate our state tree from our view tree and subscribe only
  to the necessary components

**Disclaimer**

This is only a demo. The application in this repository is not meant to reflect
the complexity of an actual application. It is written is such a way to
highlight specific performance bottlenecks developers might encounter using
React, and propose different solutions to those problems.

As with every tutorial, blog, or video series, take every suggestion with a
grain of salt, try out the techniques demonstrated, and learn not only how to
apply these lessons, but also when to.

# Outline

The following is the outline of topics with the corresponding video and branch

- [Intro](https://www.youtube.com/watch?v=PAsrNit6HQk&list=PL4XlGi3lmbLFe8kizCgMrXUr3420_wmu7&index=2&t=0s)
- Simple state -
  [before](https://github.com/brookslybrand/react-optimizations/tree/start)/[after](https://github.com/brookslybrand/react-optimizations/tree/simple-state)
  code
  - [Part 1](https://www.youtube.com/watch?v=0bgsLttY6kY&list=PL4XlGi3lmbLFe8kizCgMrXUr3420_wmu7&index=3&t=2s)
  - [Part 2](https://www.youtube.com/watch?v=2j4yR3f8g40&list=PL4XlGi3lmbLFe8kizCgMrXUr3420_wmu7&index=3)
- [Memoization](https://www.youtube.com/watch?v=mCWFggmQFAI&list=PL4XlGi3lmbLFe8kizCgMrXUr3420_wmu7&index=4) -
  [before](https://github.com/brookslybrand/react-optimizations/tree/simple-state)/[after](https://github.com/brookslybrand/react-optimizations/tree/memoization)
  code
- [Immer](https://www.youtube.com/watch?v=9BBQnYG8sE8&list=PL4XlGi3lmbLFe8kizCgMrXUr3420_wmu7&index=6&t=0s) -
  [before](https://github.com/brookslybrand/react-optimizations/tree/memoization)/[after](https://github.com/brookslybrand/react-optimizations/tree/using-immer)
  code
- [React Context](https://www.youtube.com/watch?v=Uqsk6RcdtPw&list=PL4XlGi3lmbLFe8kizCgMrXUr3420_wmu7&index=6) -
  [before](https://github.com/brookslybrand/react-optimizations/tree/using-immer)/[after](https://github.com/brookslybrand/react-optimizations/tree/add-context)
  code
- Adding Recoil -
  [before](https://github.com/brookslybrand/react-optimizations/tree/add-context)/[after](https://github.com/brookslybrand/react-optimizations/tree/using-recoil)
  code
  - [Part 1](https://www.youtube.com/watch?v=RFIfJ-VzIv0&list=PL4XlGi3lmbLFe8kizCgMrXUr3420_wmu7&index=7)
  - [Part 2](https://www.youtube.com/watch?v=NszLWAL6Tjk&list=PL4XlGi3lmbLFe8kizCgMrXUr3420_wmu7&index=8)
- [Refactoring with Recoil Selectors](https://www.youtube.com/watch?v=-_IzPd_bFNk&list=PL4XlGi3lmbLFe8kizCgMrXUr3420_wmu7&index=9) -
  [before](https://github.com/brookslybrand/react-optimizations/tree/using-recoil)/[after](https://github.com/brookslybrand/react-optimizations/tree/using-selectors)
  code

# History of this repository

This is the repository for a video series I'm working on showing different
optimization strategies in React

This is a fork of another repository I used for a demo of the library
[immer](https://www.npmjs.com/package/immer) at
[Austin Downtown React Meetup](https://www.meetup.com/ReactJS-ATX/?_af_cid=ReactJS-ATX&_xtd=gatlbWFpbF9jbGlja9oAJDU5ZjIwZDRmLTFiNzItNGUyNC1iZWQ1LTNmYjY3ZTI5MGY2OQ&_af=chapter)
for the August, 2019 meetup.

You can view the
[original repo here](https://github.com/brookslybrand/immer-talk)

_Bootstraped with [create-react-app](https://create-react-app.dev)_

# Questions?

If you have any questions, suggestions, or edits, feel free to reach out to me
on [twitter](https://twitter.com/BrooksLybrand), or just
[leave an issue](https://github.com/brookslybrand/react-optimizations/issues) in
this repo.
