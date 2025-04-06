#!/usr/bin/env bash
git submodule update --remote --recursive
astro build
hyperlink dist/ --sources src/ --check-anchors
npx stylelint "src/**/*.css"