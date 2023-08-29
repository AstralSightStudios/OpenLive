#!/bin/bash
# 创建 build 文件夹
mkdir build
# 复制 Server 文件夹里的所有东西到 build 文件夹
cp -r Server build
# 进入 Client/Web 文件夹
cd Client/Web
# 运行 npm install 和 npm install -g vite
npm install
npm install -g vite
# 运行 vite build
vite build
# 复制 dist 文件夹里的所有东西到 build/www 文件夹
cp -r dist ../../build/www
# 返回上一级目录
cd ..
echo 构建脚本执行完毕