---
type: post
title: Decoding Magellan Map Files (Update)
created: !!timestamp '2012-12-18 00:06:00 -8'
hashtag: magimi
---
It's been a while since I have done this, but I still get the occasional request on the topic, so I decided to revisit. The old post was not complete, so here is a rewrite along with some new information I learned since. 

Unfortunately, I no longer have a working Magellan device (I had an Explorist, but it no longer works) and because Magellan never released non-windows software, I have switched to using Garmin. While I find Magellan's GPS hardware is better and more precise, Garmin offers their software on multiple platforms and supports custom built maps.

## IMI Archive

Magellan's .imi file is an archive with no compression. The structure of the archive consists of headers, table of contents (TOC), file data, and checksums. Numbers in the archives are in low-byte order. Here is an example of a file, with some of the TOC and most of data removed:

    line/byte:           4            8           12           16           20           24           28           32
     00000000: 80 00 00 00  80 00 00 00  30 30 62 72  65 6B 77 74  00 63 6C 74  00 00 00 00  28 0C 00 00  84 00 00 00    ........00brekwt.clt....(.......
         0030: 30 30 62 72  65 6B 77 74  00 6C 61 79  00 00 00 00  AC 0C 00 00  34 05 00 00                              00brekwt.lay........4...
     ...
         0C00: 6E 7F E8 0C  BB 00 00 00  9C C2 4D 41  47 45 4C 4C  41 4E 00 00  00 00 00 00  00 00 00 00  00 00 00 00    n.........MAGELLAN..............
         0C20: 00 00 00 00  00 00 00 00                                                                                  ........
     ...
     0CE88020: 30 74 30 2E  62 6C 78 0D  0A 00 4D 41  47 45 4C 4C  41 4E 42 3C                                           0t0.blx...MAGELLANB<

The first eight bytes hold the number of files in the archive. In this case, there are 128 files.

TOC starts with byte 9. Each TOC entry is 24 bytes long: 12 bytes for filename, 12 bytes for addressing. The filename is 8 bytes for name (with `0x00` fill bytes), 1 byte null (`0x00`) separator, and 3 bytes for an extension. The addressing portion consists of 4 unknown bytes, 4 bytes for file offset, and 4 bytes for file length.

Next, there is a 32 byte string, which I assume marks the end of TOC and beginning of the data section. This string contains "MAGELLAN" in it. After it follows file data, with the file terminated by an 11 byte string, which probably acts as end of file marker. It again contains "MAGELLAN" followed by two unknown bytes (probably a checksum).

## Archive Contents

The archive consists of some configuration files (.ini, .cfg), and lot of binary files which are mostly a database (.aux, .blx, .clp, .clt, .dat, .dax, .dbd, .dct, .dpo, .dsc, .dtx, .ext, .ics, .lay).

The configuration file `add_maps.cfg` seems to be there to let the device know which maps to load. It points to `00map.ini` file, which seems to store some information about the database, as well as the name of the database file `db00`.

The database `db00.dbd` (and most of the other binary files that are part of it) are a Raima database files, specifically Raima Database Manager 4.5 \[Build 17\] (from the file headers).

The remaining files are icons (.ico), and couple unknown files which don't seem to have any readable header (.lay, .blx).

## Raima Database

This is where the fun begins. It is a proprietary database and I could not find any free/open source tools that were able to open it up. I started reverse engineering the database format based on the database files from the .imi file and what I expected to be in the database (by looking at the data accessible to Explorist), as well as a sample Raima database I found for a more recent release. The main thing to note is that the database uses big endian format.

I got as far as parsing the database records (tables in SQL speak) and fields (columns in SQL speak) and how they get referenced from the main database. Right around this time is where my unit stopped working and I lost interest as I replaced it with a Garmin unit.

## Notes

The code is nowhere close to be consumed by public or documented. I'm sure those who are interested enough can get something out of it, so the code is posted in [imiexplorer] [imicode] repository at BitBucket.

I could not find documentation for the older 4.5 Raima Database Manager system, but the [documentation] [raimadocs] for a more recent 8.1 system was quite helpful.

If you have any ideas or suggestions, please let me know, but bear in mind I don't have a Magellan GPS unit anymore, so all I can work with is the old .imi files.

The place aggregating the most information on this and other Magallan file-format information seems to be the [OpenStreetMap Wiki] [osm].

[imicode]: https://bitbucket.org/mayo/imiexplorer/src
[raimadocs]: http://docs.raima.com/rdme/8_1/
[osm]: http://wiki.openstreetmap.org/wiki/OSM_Map_On_Magellan/Format
