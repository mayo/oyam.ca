---
title: Yet Another Static Site Generator
date: 2024-06-19 00:22:07-08:00
taxonomies:
  tags:
    - sitebuild
  type: [article]
extra:
  show_related:
  - kind: tags
    term: sitebuild
---
I haven't updated this site in a while, and as is my custom every few years, I tinkered more with redesign and the site generators than with actual content. The site is now generated with [Zola][z]. I enjoyed working on Hana, but maintaining a custom built site generator and number of plugins just for a handful of sites was getting too time consuming. Plus, there is always the chore of dealing with Python dependencies. Zola is a small, quick, and self-contained generator written in Rust, and has a nice community around it.

With Hana, I feel like it was too easy for me to jump in and write a custom plugin for just about anything, rather than focusing on the design and intention behind what I want to publish. Switching to Zola, I reviewed all the odd plugins I've created over time and reflected on the intention behind them. Some were handling special cases for old content ported from previous site generators, others were serving as a catch all for pure lazyness (adding tags, etc based on sections) -- nothing that really needed plugins, just some elbow grease and will to fix the content (Zola has stricter metadata checks than Hana did). Handful were actually useful and adapted to work within the bounds of Zola (for eg. categorization/taxonomies). The last few, I could do without and just abandoned.

The templates needed slight adjustment as well, as some of the content variables are exposed differently or with different names. One thing led to another and I spruced up the old design. The overall look is very similar, but I worked on unifying and reusing design components. Typefaces were updated (from old outdated 3rd party system) to directly loading files from a CDN. The new typeface is [IBM Plex][plex].

The last part that needed addressing was the publishing side. With Hana, I wrote plugins that took care of the publishing as part of the site building. With Zola, the act of publishing is a separate task (as it should be). I wrote some light standalone tools to take care of the publishing (the tools sync to S3 only updated files, while not relying on filesystem timestamps to figure out what has changed), and everything is set.

[z]: https://www.getzola.org
[plex]: https://www.ibm.com/plex/