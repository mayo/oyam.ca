---
type: post
title: "Aperture Importer for Lightroom"
created: !!timestamp '2014-10-25 10:57:00'
---
After Apple announced they will stop developing Aperture, Adobe was nice enough to offer a Lightroom plugin to migrate Aperture libraries to Lightroom. I previously wrote some custom scripts around the Aperture library, and can appreciate how much pain they must have gone through to deciper the library Aperture (hopefully they had some help from Apple). The Aperture libraries aren't always consistent and can vary depending on how old they are, or how many times they crashed, so there were bound to be some bugs in the Aperture Importer plugins.

_**December 10, 2014 Update:** If you have (or upgraded to) Lightroom 5.7, it ships with plugin version 1.0.989918. This plugin version has the same issue as described below and will fail. The plugin is shipped as binary files, so you won't be able to change them. The solution to this is disabling the built-in plugin in the plugin manager (you can tell by looking at the location of the plugin), install the downloadable version of the plugin, and apply the patches._

The Aperture Imporer bugs I ran into were around keywords. There are others posted on the [Aperture Imporer](https://creative.adobe.com/addons/products/3213) page, but I don't have the ability to test against libraries with those issues. Any of the three keyword options would cause the plugin to fail on line 136 or 158 trying to address `kwdInf` when it's null. Here is a [diff](https://gist.github.com/mayo/ce524ed1205e67cb5945) with the fixes. The file in question is `Import.lua` inside of the `aperture_iphoto_importer.lrplugin` directory. I don't want to post the full file due to Adobe's confidentiality notice on top of the file. If anyone from Adobe reads this, would you consider open sourcing this plugin?

<figure>
  <a href="/media/images/blog/2014/10/aperture-importer/dialog.png"><img src="/media/images/blog/2014/10/aperture-importer/dialog.png" title="Aperture Importer Options" width="900"/></a>
  <figcaption>Aperture Importer Options dialog</figcaption>
</figure>

For the best results, I recommend running Aperture Library First Aid on the library before importing it into Lightroom. This can be triggered by holding down the Option+Command keys when launching Aperture. I would shoot straight for the rebuild option. Obviously make sure you have backups and all that. After the Library First Aid completes, open your library back up in Aperture, verify everything works, quit Aperture, and you can start importing.

If you are using the option of Aperture Importer that copies previews of adjusted images, you should consider regenerating some (or all) of the Aperture previews. The default in Aperture is an OK quality meant for previews, but after importing to Lightroom these will become your reference for all the adjustments. I changed the preview settings in Aperture preferences to "Photo Preview: Don't limit", and "Photo Preview Quality: 12" (highest setting), and then selected only the images I really cared about and regenerated previews for those. You can do this for all images (select all photos, right click, and Regenerate), but be prepared to get one huge Aperture library.

<script src="https://gist.github.com/mayo/ce524ed1205e67cb5945.js"></script>

