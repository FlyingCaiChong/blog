#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

echo "开始打包"

# 生存静态文件
yarn docs:build

echo "打包结束"

# # 进入生成的文件夹
cd ./docs/.vuepress/dist

echo "进入生成的文件夹"

git init
git branch -M master
git remote add origin git@github.com:FlyingCaiChong/FlyingCaiChong.github.io.git
git config user.email "951412526@qq.com"
git add -A
git commit -m "deploy"
echo "准备push代码"
git push -f origin master
# Enter passphrase for key '/Users/fangheng/.ssh/id_ed25519':
# 密码: 123456
