# AaronMorey.com Template
This template is built from the Astro starter template, and updated with my own design. To separate content from design elements,
I include my content files as git submodule from a separate repository. Since you won't have access to my content repo,
you'll need to include your own with the following setup steps:

1. Include the content project as a submodule
```bash
git submodule add <THE_URL_FOR_YOUR_REPO.git>
git submodule init
git submodule update --remote
```
1. Link your data as needed. For my own purposes I use
```bash
ln -s <path_to_submodule_folder>/posts src/pages/posts
ln -s <path_to_submodule_folder>/data src/data/contentdata 
```
1. 