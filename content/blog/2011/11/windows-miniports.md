---
type: post
title: Broken WAN Miniports
created: !!timestamp '2011-11-13 17:24:00 -8'
---
Windows network stack uses "miniports" to handle different layers of the network. These can sometimes "break" and cause VPN and possibly other network level services to not work properly. Usually you can tell a miniport is not working when it has an exclamation sign icon next to it in the device manager. (The miniports are typically hidden too, so if they aren't broken, they won't show up at all.) To me, this problem manifested when I was creating a VPN, and despite choosing connection over network, the connection would try to dial the modem.

All it takes to fix them is uninstalling and re-installing the non-working miniport, but unfortunately there is no easy way to do it. Miniports can't be deleted/uninstalled, and their drivers are hidden from the user, so even re-installing them isn't easy.

Trying to avoid OS reinstall, I hunted around for a while and could not find a decent guide to fixing the problem. There are a lot of outdated posts that no longer work in Windows 7 (and probably Vista), and some that are just plain wrong. Having read number of forum posts, some KBs, and a bit of intuition and guessing, I've pieced together the following guide to uninstall and re-install the network miniports:

## Uninstall the non-working miniports

To do this, DO NOT edit the registries. There are number of other registry keys that depend on the miniports being present, and it is super easy to completely break the network stack, to a point where the base network card driver won't work. (If you did this already, let's hope your system has restore points -- you can restore to previous snapshot and try doing it the non-registry way outlined there.) When doing this, take a note of the miniports that you are removing, you'll need to know this later when reinstalling.

So, to remove each non-working miniport, do the following:

1. Right click on the non-working miniport, choose "Update Driver".
2. Choose "Browse my computer".
3. In the next window, choose "Let me pick driver from a list".
4. Uncheck "Show compatible hardware". From the "Manufacturer" list, choose "Microsoft", and from the "Network Adapter" list, choose "MAC Bridge Miniport". (It can be any device the user is allowed to uninstall.)
5. Back in the device manager, delete the device that just turned into the "MAC Bridge Miniport" device.

Once done removing the bad miniports, reboot. Don't skip this, it's important. Otherwise there is a change things will go bad again.

## Reinstall the miniports

This is the fun part. You'll need to do a few extra steps, as the miniport drivers aren't meant to be installed by users and are not visible. To avoid editing .inf files (which in lot of cases are protected and not easily editable), we'll do it the long way…

1. Get ahold of current `devcon.exe`. 32-bit version won't work on 64-bit systems. It runs, but won't do what it needs to. Old (XP/2000) versions don't work well wither. The easiest way to do this is to follow the steps outlined in "[How to Obtain the Current Version of Device Console Utility (DevCon.exe)][getdevcon]" on Microsoft's TechNet wiki. (It involved getting an ISO image of a developer CD and extracting the `devcon.exe` file out of there.)
2. Go to command prompt, go to the directory where you extracted `devcon.exe`
3. For each miniport that you have previously uninstalled, execute the command outlined below. **DO NOT** run all of them or run the command twice, as that will create second version of the existing miniport, which can cause problems again.

    If running the command reports "driver install" failure, don't pay much attention to it, it usually does. The only problem is when it complains about the inf file missing, or a missing class (in which case you most likely made a typo in the last part of the command).

    * IKEv2:  
      `devcon.exe install c:\Windows\inf\netavpna.inf MS_AgileVpnMiniport`
    * IP:  
      `devcon.exe install c:\Windows\inf\netrasa.inf MS_NdisWanIp`
    * IPv6:  
      `devcon.exe install c:\Windows\inf\netrasa.inf MS_NdisWanIpv6`
    * Network Monitor:  
      `devcon.exe install c:\Windows\inf\netrasa.inf MS_NdisWanBh`
    * L2TP:  
      `devcon.exe install c:\Windows\inf\netrasa.inf MS_L2tpMiniport`
    * PPPoE:  
      `devcon.exe install c:\Windows\inf\netrasa.inf MS_PppoeMiniport`
    * PPTP:  
      `devcon.exe install c:\Windows\inf\netrasa.inf MS_PptpMiniport`
    * SSTP:  
      `devcon.exe install c:\Windows\inf\netsstpa.inf MS_SstpMiniport`

Once done, reboot. Again, this is necessary. You can go to device manager and scan for new devices and some of the miniports will show up, but some will have wrong names and won't work properly without a reboot.

That's it, you should have working miniports again. If you had a VPN connection created while the miniports were still bad, you will most likely need to delete it, and re-create it. Otherwise, things should be back to normal. Enjoy.

[getdevcon]: http://social.technet.microsoft.com/wiki/contents/articles/182.aspx
