# Summary

## Stop worrying and start mutating your state (Brooks Lybrand)

[Demo](https://start-mutating.netlify.com/)

Predictability, immutability, single source of truth — these are all concepts
that are absolutely essential to understand in order to have reasonable,
straightforward state management in your frontend applications. Unfortunately,
implementing these practices isn’t always so straightforward.

You may have heard of callback hell, or even async/await hell, but are you also
stuck inside of spread hell? Developers often find themselves in spread hell
when every update to their state means drilling down multiple levels to change
some value, and then spreading objects all the way back to ensure immutability.
At the least it’s ugly, and at the worst it’s a difficult to debug, complicated
headache.

What if you could save yourself the headache by simply mutating your state? In
this talk, we will explore a tiny, yet powerful library that will save you time
while resulting in cleaner code, more straightforward state management, and even
in some cases, better performance.

_Bootstraped with [create-react-app](https://create-react-app.dev)_
