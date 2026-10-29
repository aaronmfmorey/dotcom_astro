#!/usr/bin/env zsh

SCRIPT_DIR="${0:A:h}"

cd $SCRIPT_DIR/../dist

find . -iname "*.html" >../.validations/accessibility-checker/html_files.txt

cd ../.validations/accessibility-checker/

sed -i -E 's/^./http:\/\/localhost:4321/g' html_files.txt

npx achecker html_files.txt
