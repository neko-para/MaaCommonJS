#!/bin/sh

TARGET=$1

rm -r ./MaaCommonJS

mkdir -p MaaCommonJS

# 1999
cp -r ./1999 MaaCommonJS

# MaaFramework
cp -r ./bin MaaCommonJS

# JS core
cp -r dist/ MaaCommonJS/dist

# nodejs
cp package.json MaaCommonJS
if test "$TARGET" == "win-x64"; then
  cp -r node/fetched-v18.5.0-$TARGET MaaCommonJS/node.exe
else
  cp -r node/fetched-v18.5.0-$TARGET MaaCommonJS/node
fi

# config
cp preset.json MaaCommonJS

# start script
cp MaaCommonJS.bat MaaCommonJS.sh MaaCommonJS
