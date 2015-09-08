#!/usr/bin/env bash
#
set -e;

echo "  ___ _ _     Postman     _    ";
echo " | _ |_) |_ _ __  __ _ __| |__ ";
echo " | _ \ |  _| '  \/ _\` (_-< / /";
echo " |___/_|\__|_|_|_\__,_/__/_\_\ ";
echo -e "\033[0m\033[2m";
date;
echo "node `node -v`";
echo "npm  v`npm -v`";
which git &>/dev/null && git --version;
echo -e "\033[0m";

# ----------------------------------------------------------------------------------------------------------------------
# banner
echo -e "\033[93mLinting and style-checking...\033[0m";
echo -en "\033[0m\033[2m";
jshint -v;
echo -e "jscs v`jscs --version`\033[0m\n";

# run style checker
jscs index.js lib tests -x;

# run static linter
echo;
jshint index.js lib tests;

echo -e "No lint or style errors found.\n";

# ----------------------------------------------------------------------------------------------------------------------
# banner
echo -e "\033[93mRunning infrastructure tests...\033[0m";
# run mocha tests
mocha tests/infra/**/*.test.js --recursive;

# ----------------------------------------------------------------------------------------------------------------------
# run mocha tests
echo -e "\033[93mRunning istanbul/mocha unit tests...\033[0m";
echo -en "\033[0m\033[2mmocha `mocha --version`\033[0m";

istanbul cover --dir ./.coverage --print both _mocha -- tests/unit/**/*.test.js --recursive --prof;