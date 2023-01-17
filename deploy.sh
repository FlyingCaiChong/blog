#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生存静态文件
yarn docs:build

# 进入生成的文件夹
cd ./docs/.vuepress/dist

git init
git branch -M master
git remote add origin https://github.com/FlyingCaiChong/FlyingCaiChong.github.io.git
git add -A 
git commit -m "deploy"

git push -f origin master
