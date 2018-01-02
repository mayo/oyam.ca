---
type: post
title: Another Year, Another Static Site Generator
created: !!timestamp '2018-01-01 21:35:00 -8'
collection:
  - articles
  - sitebuild
---
Recently, I’ve switch to using Hana, a new static site generator I’m working on, instead of Metalsmith. Metalsmith worked well, but I’ve been getting tired of the constant `nom` package changes. I don’t touch the site for few months, go build, and suddenly some small non-critical `nom` package is renamed, missing, or no longer does what it used to. PITA.

I’ve been working on and off my own static site generator for a while, always finding some alternative that worked well enough to postpone the work. Finally I decided to dive in and do it. It Works™, but I would not recommend it for anyone else to use… yet. That is, unless you want to get down and dirty and debug things as they come up.

## Why not X

I've used Jekyll in the past, and it's a great system. I've always had issues with it's templating system, and ended up creating workarounds the templating more than actually doing anything with my site. I'm also not a fan of it's plugin system. There is no determinate order of plugin execution, and can have issues around that. Jekyll is great for simple stuff, not so much for more complex sites.

Hyde is pretty much dead at this point. Jinja2 is great templating language, but Hyde's plugin system was abysmal.

There are countless other static site generators, but I was never happy with the ones I found, and always had to change my workflow to make them work for me, rather than making the generators integrate in my workflow.

## Hana

Hana is fairly simple thing – it's basically a pipeline that executes steps in a given order. Each step executes a plugin, giving it list of files matching given patterns. You can run plugins multiple times, etc. Loading files is a plugin on its own, Hana has no knowledge of reading files (but it comes out of the box with Hana). So is parsing of front matter, templating, or writing files to disk. 

The hard part is the lack of plugins, but I'm working on that. There are enough plugins to be able to generate this site, and more are planned as I add features to the site.

Feel free to contact me with questions about Hana, tell me that I'm crazy for doing this, yell at me that the world doesn't need another static site generator. Or if you're interested and want to help out.

