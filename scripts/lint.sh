#!/usr/bin/env bash
git submodule update --remote --recursive
astro build > /dev/null
echo "Hyperlink check: "
hyperlink dist/ --sources src/ --check-anchors | grep -v "pagefind" | grep -v "dist/" | grep -v "^$"
echo "Stylelint notes: "
npx stylelint "src/**/*.css"