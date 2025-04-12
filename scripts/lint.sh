#!/usr/bin/env bash
git submodule update --remote --recursive
astro build > /dev/null
echo "Hyperlink check: "
hyperlink dist/ --sources src/ --check-anchors
echo "Stylelint notes: "
npx stylelint "src/**/*.css"