---
type: post
title: Windows VPN from FreeBSD
created: !!timestamp '2008-01-31 00:00:00 -8'
hashtag: mjwvpnbsd
---
While developing an application, I had the need to access Active Directory (AD) that was running on a remote machine with no access to AD from outside world. The only option to talk to the AD was via Window's VPN.

I found number of solutions that would let me connect my FreeBSD development machine to the Windows VPN (PPTP setup), and I initially chose Multilink PPP Daemon (mpd) version 5 as the tool to use. It seemed full featured and it had capability to open the VPN tunnel on demand and keep it connected and/or reconnect if it was disconnected for some reason.

No matter what I did, I could not get mpd to work. I've tried multiple configs I could find around, as well as using the supplied examples and writing a few of my own, unfortunately to no avail. It has always failed in initial stages when trying to negotiate authentication mechanisms with:

    [L1] LCP: state change Ack-Rcvd --> Opened
    [L1] LCP: auth: peer wants EAP, I want CHAP
    [L1] CHAP: sending CHALLENGE #1 len: 30
    [L1] LCP: LayerUp
    [L1] EAP: rec'd REQUEST #171 len: 5, type: Identity
    [L1] EAP: sending RESPONSE #171 len: 14, type: Identity
    [L1] LCP: rec'd Terminate Request #3 (Opened)

I've tried allowing basic CHAP (which should fail and not be used) as well as MS-CHAP v1, v2 and EAP with MD5, etc. All failed, while on the server side MS-CHAP v2 was selected as the protocol to use. I've also verified this with a Windows client hard-set to PPTP VPN with MS-CHAP v2 as the authentication method. On the server side, the mpd failures were reported as `You do not have permission to connect using the selected authentication protocol.` and `The user attempted to use an authentication method that is not enabled on the matching remote access policy.` at the same time. This is while the remote access policy specifically specifies MS-CHAP v2 as the only authentication method.

I then gave up on mpd and went on to search for other solutions and I found a [Creating a VPN using PPTP][fbsddiarypptp] post on [FreeBSD Diary][fbsddiary]. This setup uses pptpclient and a very simple config in the system's ppp.conf. The config ended up being:

    vpn:
      set authname <username>
      set authkey <password>
      set timeout 0
      set ifaddr 0 0
      add <remote iprange>/24 HISADDR
      alias enable yes
      disable dns

and it worked at the first go. Nice and simple. The only problem I have now is that the VPN connection sometime gets dropped I have to reconnect manually. Since this is a development server, it's not such a big issue, and in the worst case could be solved with a simple script of occasional ping and restart of pptpclient if necessary.

I'm not done with mpd and I would very much like to get it going, but don't have the time to figure out the configs. If somebody can provide me with hints for mpd version 5  config that works with Windows VPN, please do let me know. (mpd v5 specifically, as I've found tons of configs that are very outdated and don't work with mpd v5 and converting them to v5 config will result in the same errors as above.)

[fbsddiary]: http://www.freebsddiary.org
[fbsddiarypptp]: http://www.freebsddiary.org/pptp.php
