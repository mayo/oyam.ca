---
taxonomies:
  type: [article]
title: Mercurial Atoms
date: 2011-02-15 00:00:00-08:00
---
Building blocks that matter. At least to some of us... [Atoms](http://hgatoms.com) is a paste-like service implemented on top of [Mercurial](http://mercurial.selenic.com/) as a backend. The idea was inspired and heavily influenced by [GitHub](http://github.com/)'s [Gists](http://gist.github.com/).

For a while now I looked for Gist-like implementation that ran on Mercurial. Wanting to explore the [Mercurial API](http://mercurial.selenic.com/wiki/MercurialApi) a bit and hopefully learn a bit more about Mercurial's internals, I decided it was time to dive in. It's running on the [Pylons](http://pylonshq.com/) framework with an extra WSGI handler for serving up the repositories to hg clients using Mercurial's hgweb.

The feature set is fairly basic, mostly focusing on what was necessary for it to be usable. More features are coming, as is code cleanup after my newb hacking at Pylons I'm also interested to see where others take it. The source is at [Bitbucket](http://bitbucket.org/mayo/atoms/src) and it's licensed under the [MIT](http://www.opensource.org/licenses/mit-license.php). Go check it out, and have fun!
