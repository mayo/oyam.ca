---
type: post
title: Mobile Publishing Workflow with Metalsmith and Travis CI
created: !!timestamp '2015-12-24 8:50:00'
---
I like the simplicity of having a static site — it reduces the overhead of maintaining the server and software running it, copes with larger loads better, and opens up a myriad options for hosting that would otherwise not be available. The drawback, however, is publishing on the go, especially if computer access is limited. My criteria for a mobile workflow are similar to one on a computer: being able to work offline and publish once online, use Git to maintain the site, avoid having to SSH to edit or publish, and limit manual interaction with remote services as much as possible. 

This site is generated with [Metalsmith][metalsmith] and a few plugins, but this workflow is not specific to This tool. [Travis CI][travis] builds and deploys the site. All, of the source is maintained in Git, which is the first building block and the first hurdle in my workflow. [Working Copy][workingcopy], a full-fledged iOS Git client, to the rescue! This, combined with the inter-app sharing options introduced in iOS 8, makes for a smooth workflow that allows me to maintain my site just about everywhere.

![Workflow diagram][diagram]

The process usually starts with composing a markdown file using [iA Writer][writer]. Once finished writing, I go to Working Copy, update the repository for my site, and import the file from iA Writer including any photos or assets to the appropriate folders. Once done, I review everything, commit the change, and push to a `draft` branch. 

From here, Travis CI takes over and as it detects changes to the repository it will build a new site and deploy it to a draft location, where I can review and make sure everything is rendered as expected. I go back if necessary and repeat. When happy, I will merge the `draft` branch into a `public` branch, essentially triggering the same process again, but this time publishing to the live copy of the site.

After publishing the live copy, I remove the file from iA Writer library, as it is now managed in The git repository as part of my site. If modifications are required later on, I open the file in iA Writer directly from Working Copy using iOS actions/sharing, or for small edits just edit in Working Copy.

And there it is. Simple, fairly generic and relatively easy to adapt to different toolset. The only real cost was purchasing Working Copy, but that was well worth it, for this and other uses. The one quibble I have is having to commit and re-commit on the draft branch if something needs to be fixed, but it doesn't happen all that often, so I'm willing to live with it. Maybe one day Working Copy will be able to squash commits.

[metalsmith]: http://metalsmith.io
[travis]: http://travis-ci.org
[workingcopy]: http://workingcopyapp.com
[writer]: https://ia.net/writer
[diagram]: /media/images/blog/2015/12/mobile-workflow/workflow.png