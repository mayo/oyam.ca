---
type: post
title: Network conditioning in macOS
tags:
  - technology
  - unix
date: 2019-03-18T21:38:47-07:00
---
I've had the need to do some light network emulation and conditioning on macOS Mojave, but it seems most of the information out there is outdated, relies on unnecessary external software, or is just plain wrong.

There is the handy Network Link Conditioner Tool that comes with Xcode, but that affects the whole machine, rather than a limited setup or specific network interfaces. It turns out this is just a simple interface on top of generic tools that comes with the OS out of the box.

Most recent macOS versions ship with OpenBSD's `pf` firewall out of the box, however, quick check with `pfctl` will show that ALTQ (alternate queueing) is not supported. Instead of ALTQ support, macOS version of pf ships with [dummynet][1] support, controlled by `dnctl`.

[1]: https://www.freebsd.org/cgi/man.cgi?query=dummynet&sektion=4&manpath=freebsd-release-ports