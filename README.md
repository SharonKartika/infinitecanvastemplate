### Template for infinitely scrolling canvas
- Uses native scrolling
- Can handle 100,000 (simple) elements with ease 
- 80 lines of js (30 lines of css)

### How it works
`scroll` event listener checks for when scroll happens at the edges. 
If top or left edge, the container div translated by a fixed amount (resulting in scroll bar extending in that direction).
If bottom or right edge, the position of ghost nodes placed at the edges (on page load) is incremented by a fixed amount (resulting in scrollbar extending in that direction).
