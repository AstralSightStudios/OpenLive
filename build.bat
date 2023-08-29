@echo off
rem 创建 build 文件夹
mkdir build
rem 复制 Server 文件夹里的所有东西到 build 文件夹
xcopy Server build /e /y
rem 进入 Client/Web 文件夹
cd Client\Web
rem 运行 npm install 和 npm install -g vite
call npm install
call npm install -g vite
rem 运行 vite build
call vite build
rem 复制 dist 文件夹里的所有东西到 build/www 文件夹
xcopy dist ..\..\build\www\ /e /y
rem 返回上一级目录
cd ..
echo 构建脚本执行完毕