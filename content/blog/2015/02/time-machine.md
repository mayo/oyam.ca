---
type: post
title: To improve reliability, Time Machine must create a new backup
created: 2015-02-01 22:10:00-08:00
---
Time Machine has been asking me to start new backups “to improve reliability” more and more frequently. Last instances were merely a week apart. I would typically go with the flow, as I have multiple backups, but as I found out, it may not be the best idea to blindly agree when prompted.

“Time Machine completed a verification of your backups. To improve reliability, Time Machine must create a new backup for you”, reads the dreaded message. Most of the time this is not an issue, except when your hard drive is dying or has a corrupted file system.

The message has been popping up with more frequency, but I wasn’t cluing in. My first thought was that the drive in my old Time Capsule was dying, and I figured I’ll replace it soon. This has happened to me before, so I was familiar with the scenario. Except that it wasn’t. Last time I got the above error, the new backup never finished. First time, it kept slowing down to bearable halt. Blaming my wireless network (new backup is about 600GB for me), I restarted the backup using a wired connection. I let this one run over night, and when I got to the machine in the morning, there was the dreaded dialog again: "Time Machine completed a verification of your backups.  To improve reliability, Time Machine must create a new backup for you”.

I started the backup again, only time time as the backup was progressing, things started to go bad. Programs started crashing to no apparent reasons, I would get BBOD (beach ball of death) a lot, and even using the terminal was getting painfully slow. What’s going on? Finally the window server crashed, forcing me to try and log in, except my username/password didn’t work. WTH? “Time for a reboot”, I thought. Except my machine didn’t start up, because the filesystem was corrupted.

I managed to repair the filesystem with only minor losses — OS X had to be reinstalled because some of the system files were damaged, and a few hours of work was gone — but the important lesson here is: Don’t blindly start a new backup just because Time Machine says so. Doing this will wipe all existing backups, and you’ll have no way to go back. If you have the option, start a new backup to a separate drive or a different partition, or at least investigate a little why you’re being prompted. Quick trip to Disk Utility and running Verify Disk can’t hurt.

I was pretty confident with starting new Time Machine backups, as I typically have three backups going on: primary Time Machine backup; secondary weekly Time Machine backup to a off-site drive; and tertiary manual backup of the most important stuff. Had I only had one backup using Time Machine, and the disk died or filesystem was corrupted beyond repair, Time Machine would have wiped my only backup and I would’ve lost everything.

After everything was recovered, I ran a few similar scenarios on a separate drive to see if I could replicate the problem when I corrupted the filesystem manually. I can’t replicate it 100% of the time, but it can definitely be replicated. Bug report filed with Apple.
