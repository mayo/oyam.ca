---
type: post
title: From Simplenote to Jekyll
created: 2010-11-16 00:00:00-08:00
---
Does Mr. Jekyll have a new twin? Jekyll and statically generated pages are nice, but it would be nice to create some posts while on the road without the laptop. SSHing to the server is an option, but typing up a post in vim on phone is not exactly enjoyable. I use [Simplenote](http://simplenoteapp.com/) all the time, and I figured it would be nice to write posts in Simplenote. Using Simplenote's API, I wrote a quick and dirty [script][script] that pulls notes with a `blog` tag and writes a file that Jekyll can process.

The post in Simplenote looks somewhat like your regular Jekyll post, with first line being the "filename" with date, but without separating the words with dashes, and file extension (so Jekyll uses the right formatting). Then a minimal YAML front matter, where rest of it will get filled in when generating the actual file. Following that, it's a regular post. As an example, this post in Simplenote looks somwhat like:

    2010-11-16 From Simplenote to Jekyll.markdown
    ---
    layout: post
    short: sn2jk
    ---
    Does Mr. Jekyll have a new twin? [...]

The script on server-side can be run manually or in a cron job to automagically get the posts as they are written. I then have the script add and commit them to the site repository, triggering Mercurial hooks and regenerating the site with Jekyll.

Like I said, the [script][script] is quick and dirty and will be improved over time. I might consider spinning off the Simplenote API in a module of it's own, if Simperium doesn't mind and I'd like to make it more generic as well, but for now it does what it needs to.

[script]: https://bitbucket.org/mayo/simplenote_fetcher
