---
type: post
title: Hugo, I want to like you
created: 2021-01-15 00:30:38-08:00
---
I really really want to like [Hugo][1]. I like the elegance of having a single binary, not having to worry about Python versions and dependencies, and most importantly not being responsible for maintaining the codebase. I've tried migrating my site to Hugo over the last couple of years, but I always run into some issues or major annoyances.

On my last attempt, I was *almost* there, and then realized I was creating specialized templates for half of the pages, because there is no way to extend or override part of the templates. I can't have a block in partial within another block? Why? Shortcodes seem just like bandaids, especially when used for templating. The templating in Hugo is abbysmal for anything other than the simplest sites. It really goes to show how well thought out [Jinja2][2] templating is.

And don't even get me started on `index` and `_index` files. The use of `_index` is overloaded from multiple concepts, which can clash and it's hard to work around, to a point when Hugo's own renderer will produce different results on subsequent runs.

This turned out to be more of a rant than intended, so I'll leave it here. Don't get me wrong, Hugo is great and has nice features, but for me falls very short at the job a *site* generator shouldn't, the actual site templating and generation.

Future me beware: don't try Hugo again until some of the major pain points are addressed. This is also to say, back to writing my own generator [Hana][3] and simplifying some of the concepts that got out of hand. And, first and foremost, push the latest code out, rather than hoarding it privately.

[1]: https://gohugo.io/
[2]: https://jinja2docs.readthedocs.io/en/stable/
[3]: https://github.com/mayo/hana