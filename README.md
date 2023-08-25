# OpenLive

[繁體中文](README_ZHTW.md) | [English](README_EN.md)

一个完全开源的单人直播平台，只需要一台服务器，你可以使用RTMP推流用其直播任何内容

⚠️ 注意：该项目的主要功能仍在开发中，用于生产环境前请先深思熟虑

## 关于OpenLive
OpenLive的服务端是使用`NodeJS`开发的，客户端含有多个平台的不同版本，我们首先要完善的就是`Web`平台的版本，它使用`Vue`框架开发，然后我们计划为`Android`和`iOS`平台开发一个客户端，使用`Flutter`，但这仍需一段时间

我们选择开发OpenLive的想法很简单，首先是市面上开源的类似产品比较少，更重要的是我们相信能**脱离平台监管并自由的直播任何内容是每个人的权力**，特别是在[中华人民共和国网络审查](https://zh.wikipedia.org/zh-hans/%E4%B8%AD%E5%8D%8E%E4%BA%BA%E6%B0%91%E5%85%B1%E5%92%8C%E5%9B%BD%E7%BD%91%E7%BB%9C%E5%AE%A1%E6%9F%A5)愈演愈烈的情况下，大批游戏与内容（如游戏[彩虹六号系列](https://zh.wikipedia.org/zh-hans/%E8%99%B9%E5%BD%A9%E5%85%AD%E8%99%9F%EF%BC%9A%E5%9C%8D%E6%94%BB%E8%A1%8C%E5%8B%95)、[Grand Theft Auto系列](https://zh.wikipedia.org/zh-hans/%E4%BF%A0%E7%9B%9C%E7%8D%B5%E8%BB%8A%E6%89%8B%E7%B3%BB%E5%88%97)）被禁止直播，因此拥有这样一个平台显得更为重要

## 什么是OpenLive
OpenLive的初衷是打造为一个运行在私人服务器上的一个网页应用程序，但我们目前也有为移动端平台开发APP的想法。OpenLive是`单主播+无限观众`的直播平台，也就是说，它只支持一个主播单线推流直播，并让无限数量的观众去收看，我们知道这可能比较简陋，但同时也让它变得轻便

## 搭建OpenLive
TODO: 完善搭建教程

由于OpenLive并没有完全开发完成，所以具体怎么搭建也不好说，但总之就是运行Server和部署Web Client的网页

## 开发进度
（以下表格中，🟢代表功能开发完成，已经可以投入生产环境使用，🔵代表功能开发完成，但可能存在安全漏洞，建议悠着点用，🟡代表功能正在开发，请勿在正经情况下使用，不过你也可以帮我们测试下或是开发下，🟣代表功能有计划但还未投入开发，🔴代表功能无计划也没投入开发但我们想试试）

|  功能名称   | 服务端开发状态  | 客户端开发状态  |
|  ----  | ----  | ----  |
| 直播的推流与拉流（使用RTMP+HTTP-FLV）   | 🟢 | 🟢 |
| 直播基本信息显示  | 🟢 | 🟢 |
| 主播基本信息显示  | 🟢 | 🟢 |
| 直播站账号系统 | 🔵 | 🔵 |
| 直播聊天功能（Chat） | 🟡 | 🟡 |
| 主播主页功能（包含直播回放等） | 🟣 | 🟣 |
| 直播礼物功能（包含账号系统的Gold与Exp机制） | 🟣 | 🟣 |
| 极低延迟的直播（使用WebRTC） | 🔴 | 🔴 |