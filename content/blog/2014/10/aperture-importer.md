---
type: post
title: "Aperture Importer for Lightroom"
created: !!timestamp '2014-10-25 10:57:00'
---
After Apple announced they will stop developing Aperture, Adobe was nice enough to offer a Lightroom plugin to migrate Aperture libraries to Lightroom. I previously wrote some custom scripts around the Aperture library, and can appreciate how much pain they must have gone through to deciper the library Aperture (hopefully they had some help from Apple). The Aperture libraries aren't always consistent and can vary depending on how old they are, or how many times they crashed, so there were bound to be some bugs in the Aperture Importer plugins.

_**December 12, 2014 Update:** Separated content into multiple sections and added extra iformation about keywords. **There is some new important information in this section, please re-read. The attached patch should not be necessary!**_

The Aperture Imporer bugs I ran into were around keywords and metadata. There are others posted on the [Aperture Imporer](https://creative.adobe.com/addons/products/3213) page, but I don't have the ability to test against libraries with those issues.

## Keywords
Any of the three keyword options in the import dialog would cause the plugin to fail on line 136 or 158 trying to address `kwdInf` when it's null. I was quick to write a patch to fix this, as it seemed like an obvious error in the code, but now I tracked the source of the problem. When Aperture Importer has issues with importing the keywords, it won't report the error (UI or in `LibraryImport.txt`) and carry on. Because of this, some variables don't get initialized, and it crashes later on. The only way you can tell there is an issue with keywords is in the `LibraryImporter.log` file. At the beginnig of the import, if there is a line similar to the one below, you have a problem.
    
    INFO Failed to obtain keyword info from Aperture Library.aplibrary with error 'ascii' codec can't encode character u'\u0301' in position 32930: ordinal not in range(128)
    
<del>Here is a [diff](https://gist.github.com/mayo/ce524ed1205e67cb5945) with the fixes. The file in question is `Import.lua` inside of the `aperture_iphoto_importer.lrplugin` directory. I don't want to post the full file due to Adobe's confidentiality notice on top of the file. If anyone from Adobe reads this, would you consider open sourcing this plugin?</del>

So, what's the fix? Check your Keywords in Aperture. Visual check is not enough, though. It turns out my keywords had invisible (non-printable) characters in them. I have no idea how it happened, but the way I found out was to export the keyword list out of Aperture, open it in text editor and look there (I use vim. BB Edit, SubEthaEdit, TextMate, X Code, or any kind of developer editor should show you non-printable characters). Back in Aperture, find the offending keyword in the Keyword HUD, double click it to edit, press Command-A (select all), and re-type the keyword. Rinse and repeat with all keywords with bad characters. Now, this doesn't always update the Keywords.plist file inside of the Aperture database, and the Aperture Importer needs this to import the keywords. So, back to the Aperture Keyword HUD, and export the keyword list again, and you're set. You can delete the exported file, you don't need it.

<figure>
  <a href="/media/images/blog/2014/10/aperture-importer/dialog.png"><img src="/media/images/blog/2014/10/aperture-importer/dialog.png" title="Aperture Importer Options" width="900"/></a>
  <figcaption>Aperture Importer Options dialog</figcaption>
</figure>

## Metadata

The second problem I had was with Metadata. Some of my images in Aperture had titles and copyright notices with the copyright (&copy;) sign or accents. Aperture doesn't seem to like this, so I removed all copyright signs (go to all photos, search for the &copy; sign, select all, do batch metadata change), and replaced all accents with regular letters. I put the accents back in Lightroom after the import. All the copyright information was replaced with the metadata I have setup in Lightroom.

## Import workflow

For the best results, I recommend running Aperture Library First Aid on the library before importing it into Lightroom. This can be triggered by holding down the Option+Command keys when launching Aperture. I would shoot straight for the rebuild option. Obviously make sure you have backups and all that. After the Library First Aid completes, open your library back up in Aperture, verify everything works, quit Aperture, and you can start importing.

If you choose to import previews of adjusted images, you should consider regenerating some (or all) of the Aperture previews. The default in Aperture is an OK quality meant for previews, but after importing to Lightroom these will become your reference for all the adjustments. I changed the preview settings in Aperture preferences to "Photo Preview: Don't limit", and "Photo Preview Quality: 12" (highest setting), and then selected only the images I really cared about and regenerated previews for those. You can do this for all images (select all photos, right click, and Regenerate), but be prepared to get one huge Aperture library.

Once you start the import, do a quick check of `ApertureImporter.log` to see if there were any errors with keywords. Keep in mind that the Aperture Importer appends to this file, so you may need to scroll down to see the last import. I prefer to delete the file prior to every import. If there are problems with keywords, cancel the import, fix the keywords, and try again.

After the import, it's worth looking at the `LibraryImport.txt` file the importer generates in case of issues, as well as `LibraryImporter.log`, which is always created. The log file contains more details about errors during the import, like skipped preview imports (if you chose that option) when they aren't up-to-date in Aperture. I get a number of those, but I haven't found a reliable way of forcing Aperture to regenerate the previews. Right clicking on photo in Aperture and choosing Regenerate Preview (or Option click and Generate Preview) will work most of the time, but not in all cases. For these, I export versions of the photos manually, and import and group with photos in Lightroom. I do a quick check of the photo totals: Aperture photo count + number of adjusted photos = Lightroom photo count.

If you ever had iCloud, Flickr, Facebook or other services setup in Aperture, it's most likey that previews from those services will also be imported into Lightroom even if you have disabled or deleted them in Aperture. I don't know why this happens, but in Aperture this information stays attached in the database (and is hidden in the user interface), so Aperture Importer doesn't know any better.

Another important point about keywords is that they get globbed in Lightroom. For example, if you use keyword hierarchy and have two keywords *Vancouver*, one under *British Columbia*, the other under *Washington*, all the photos with *Vancouver* keyword will be under one of the two keywords, the other will have no photos under it (but it will be imported as well). The workaround here it to track the double keywords down, and give them different names (*Vancouver*, *Vancouver2*) and revert this change once you have photos imported in Lightroom.

