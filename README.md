# audo-header
Keeping track of headers is hard and many web dev projects just don't bother. Using whatever heading level matches visually. This creates problems for screenreader users and those who navigate using the keyboard.

Auto-header fixes this problem by abstracting away the actual header levels. All you need to know is if you want to go down, up, or stay the same.

```html
<h-same>Heading lvl 1</h-same>
<h-down>Heading Level 2</h-down>
<h-down>Heading Level 3</h-down>
<h-same>Heading level 3 again</h-same>
<h-up>Heading Level 2 again</h-up>
```

- using the `<h-down>` component will set the heading one lower than it's predecessor.

- `<h-up>` will bring the heading one level up.
- and finally `<h-same>` will keep you at the same level.

## Heading limits

The [HTML5 spec](https://html.spec.whatwg.org/multipage/sections.html#the-h1,-h2,-h3,-h4,-h5,-and-h6-elements) outlines 6 heading levels. if you are already at heading level 6 and use a `<h-down>` it will behave the same way as if you had used an `<h-same>`.

```html
<h-down>Heading level 2</h-down>
<h-down>Heading level 3</h-down>
<h-down>Heading level 4</h-down>
<h-down>Heading level 5</h-down>
<h-down>Heading level 6</h-down>
<!-- Heading level remains at 6 -->
<h-down>Heading level 6</h-down>
```

Similarly if you are already at heading level 1, using an `<h-up>` will behave like an `<h-same>` this is done to prevent going outside the spec.

```html
<h-same>Heading level 1</h-same>

<!-- Heading level remains at 1 -->
<h-up>Heading level 1</h-up>
```


