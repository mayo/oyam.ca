---
type: post
title: Back in the new digs
created: !!timestamp '2010-11-10 00:00:00'
---
After fumbling around with numerous redesigns using static pages, switching to wikis, blogs, and anything else you can think of, [Webby][wb], then hopping to [Tumblr][tmbl], and giving up, I made it a full circle back to statically generated pages using [Jekyll][jk].

I've been thinking about total redesign, and prompted by other people's recent  redesigns, I went back to the beginning, found [Jekyll][jk], and started over. Some old posts are ported here, and so are some [Tumblr][tmbl]. The old stuff is moved out of the way, but still reachable with the help of some rewrites and redirects.

I'm using [Mercurial][hg] to maintain the site, and got it setup with commit hooks, so pushing changes out will generate the necessary pages. The hooks were fairly simple. Just add the following to the server-side `.hg/hgrc` file:

    [hooks]
    changegroup.regenerate = hg up && jekyll
    
From there, just point the webserver to the  `repository/_site` directory. 

[wb]: http://webby.rubyforge.org/
[jk]: https://github.com/mojombo/jekyll "Jekyll"
[tmbl]: http://journal.oyam.ca
[hg]: http://mercurial.selenic.com/