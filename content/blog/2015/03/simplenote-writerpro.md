---
type: post
title: So long Simplenote, and thanks for all the notes
created: !!timestamp '2015-03-02 22:46:00'
---
Simplenote has been my note taking app of choice for a while now, but recently I've been annoyed with missing features, weird UI, and lack of integration. [iA Writer Pro][writer-pro] (Writer Pro from here on) came as unlikely replacement, but I already owned the app and some of its features were perfect match for my needs. I've now been using the new setup for about a month, and so far so good.

## Ailing Champion 

I've used the app since it came out, even used to pay for the extra services and to remove ads back in the day. Lately, though, I feel like Simplenote no longer fulfills my needs and wants. 

First, I've been bugged by the lack of formatting in the notes. I don't need anything complex, but some sort of headings and emphasis for organizing and highlighting in notes would be nice. I use Markdown for most of my text documents and that could work, but Simplenote doesn’t render Markdown, and locating underlines or asterisks in a sea of text quickly, without the formatting actually applied, is hard and pointless.

My second gripe with Simplenote is the search bar in the Mac app. It's on the *bottom* of the app, and while that may look like a little thing, it drives me up the wall. Not only it goes against every other app that I’ve used, it's contrary to the iOS versions of Simplenote and, frankly, any logic. You have to travel to the bottom of the app to search, then go up the app to look at the first result, and back to bottom to clear search or update search terms... Nuts! I've reported and inquired about the design decision, but it seems it’s not a priority or the UI designers don’t see it as an issue. 

Last, the lack of integration. There isn't much to integrate on iOS, but on Mac it lacks Spotlight support or ability to read notes in other apps/programs (ie. storing notes in standalone files, using scripts on the notes, etc). 

I know some of these are addressed by third party apps, but didn’t have much luck with these. Some don't support tags (though I use use tags very little), others have sync issues, yet others have other UI issues, and the features and UI become inconsistent between OS X and iOS. 


<figure>
  <a href="/media/images/blog/2015/03/simplenote-writerpro/simplenote.png"><img src="/media/images/blog/2015/03/simplenote-writerpro/simplenote.png" title="Simplenote OS X user interface" width="900"/></a>
  <figcaption>Simplenote OS X user interface</figcaption>
</figure>

## Challengers

I've started to examine my use of Simplenote and what other apps I can use in its place with similar experience, consistency between mobile and desktop, and some simple formatting options.  The most promising apps that I’ve evaluated were [Writer Pro][writerpro], [Evernote][evernote], and [Vesper][vesper].

Vesper is nice, but doesn't support any formatting, one of my main requirements (it can attach images to notes, which would be a nice to have).

Evernote has it all, even though it doesn't support Markdown, and I've flirted with it on number of occasions, but it doesn’t store notes in individual files and the notes aren’t readable outside of the app.

Writer Pro was my next favourite choice, and since I already use it for writing, it seemed like a good candidate for the job. It stores notes as individual files stored as plain text, and all the apps render Markdown, and had a nice UI, covering all my main requirements.

## The Setup

Writer Pro already covers all my main requirements, and I found workarounds for a few things that I didn’t mind compromising on. 

I chose to use the iCloud store in Writer Pro and put all my notes in a Notes folder. I would have preferred DropBox, but DropBox folders in Writer Pro don't support search.

Markdown can be used in the notes where needed, rest of the notes as pure plain text notes with no problems. Thanks to Markdown, I can keep links on the bottom of the note, rather than riddling the text with long URLs and checkboxes are available for todos or shopping lists. 

One minor annoyance with the search in Writer Pro is that it searches globally, not just within the current folder, but so far it hasn't been an issue. 

Where Writer Pro lacks is web based editing and the lack of tags. I know I’ve used the Simplenote web editor a few times in the past, but honestly, I can’t remember the last time I used it. As for tags, I'm not a heavy tag user, so I don’t really miss them. For the few tags I have (about 6), I just append "tags:" line on the bottom of a note and type them out there.

Rest of the nuances are in OS X. Because the notes are files now, changes to the note "title" (ie. first line) won’t change  the note file name, but this is easily managed manually through Finder. So far it wasn’t really an issue, and it doesn’t really matter when opening notes through search. Which brings me to search — Writer Pro on OS X doesn’t have a dedicated filesystem browser, but rather relies on the standard OS X “Open Document” window which already includes a search bar. I just have a Notes shortcut in the sidebar, and have the Notes folder customized to only show Name, Date Modified, and Tags columns. Default order is by date modified, replicating the setup of Simplenote as well as Writer Pro on iOS. So far, this has worked great for me. I also have a shortcut to the Notes folder in the Dock, but I find I use the Open dialog more often. The Tags column is visible because I experimented with using system tags to tag notes, rather than the “tags:” line on the bottom of the note. This worked quite well, but Writer Pro on iOS doesn’t mirror the tags set on OS X, so for now this is limited to OS X only.

One of my favourite features of this setup, though, is having the notes stored as files. This lets me access them from any editor or command line when I need them, instead of switching apps back and forth. I can easily grep the notes from command line (when looking for command sequences, etc) or open them up in vim while coding. Another side benefit is ability to use mdfind (Spotlight command line interface) to search through the notes and/or use them in command chains. 

<figure>
  <a href="/media/images/blog/2015/03/simplenote-writerpro/writerpro.png"><img src="/media/images/blog/2015/03/simplenote-writerpro/writerpro.png" title="Writer Pro iOS user interface" width="900"/></a>
  <figcaption>Writer Pro iOS user interface</figcaption>
</figure>

## The Switch

Once I decided to do a full scale experiment, I ran into a problem getting my notes converted into plain text files so they could be opened in Writer Pro. There are a few third party Simplenote apps that claim the export capability, but none of them seemed to have an option for this in UI. I ended up using the [Simplenote Export][simplenote-export] (beta) web service, but the caveat is that it spits out single file (CSV or JSON) with all the notes in it. I went with JSON and wrote a [script] [json-convert-script] to convert the notes into Markdown files. 

It feels like an end of era, and I’m even a little sad to see it leave the first screen of my phone — reserved only for a handful of apps — but for now, Writer Pro took Simplenote’s place and I haven’t looked back. 

[json-convert-script]: https://gist.github.com/mayo/6d4ef8397948f77ffdea
[writerpro]: http://writer.pro
[evernote]: https://evernote.com
[vesper]: http://vesperapp.co
[simplenote-export]: https://simplenote-export.appspot.com
