---
type: post
title: "Aperture Importer for Lightroom"
created: !!timestamp '2014-10-25 10:57:00'
---
After Apple announced they will stop developing Aperture, Adobe was nice enough to offer a Lightroom plugin to migrate Aperture libraries to Lightroom. I previously wrote some custom scripts around the Aperture library, and can appreciate how much pain they had to deciper the library Aperture uses to get this plugin done (Hopefully they had some help from Apple). The Aperture libraries aren't always consistent and can vary depending on how old they are, how many times they crashed, so there were bound to be some bugs in the Aperture Importer plugins.

The Aperture Imporer bugs I ran into were around keywords. There are others posted on the [Aperture Imporer](https://creative.adobe.com/addons/products/3213) page, but I don't have the ability to test against libraries with those issues. Any of the three keyword options would cause the plugin to fail on line 136 or 158 trying to address `kwdInf` when it's null. Here is a [diff](https://gist.github.com/mayo/ce524ed1205e67cb5945) with the fixes. I don't want to post the full file due to Adobe's confidentiality notice on top of the file. If anyone from Adobe reads this, would you consider open sourcing this plugin?

For the best results, I recommend running Aperture Library First Aid on the library before importing it into Lightroom. This can be triggered by holding down the Option+Command keys when launching Aperture. I would shoot straight for the rebuild option. Obviously make sure you have backups and all that.

Second, if you are using the option of Aperture Importer that copies previews of adjusted images, you should consider regenerating some (or all) of the Aperture previews. The default in Aperture is not the highest quality previews, which makes sense when they are used for previews. I changed the settings in Aperture preferences to "Photo Preview: Don't limit", and "Photo Preview Quality: 12" (highest setting), and then selected all the images I really cared about and regenerated previews for those. You can do this for all images (select all photos, right click, and Regenerate P), but be prepared to get one huge Aperture library.

