# OpenLive

[简体中文](README.md) | [繁體中文](README_ZHTW.md)

A completely open source single-player live broadcast platform, only needs one server, you can use RTMP to stream any content with it

⚠️ Note: The main functions of this project are still under development, please think carefully before using it in a production environment

## About OpenLive
The OpenLive server is developed using `NodeJS`, and the client contains different versions of multiple platforms. The first thing we need to improve is the version of the `Web` platform, which is developed using the `Vue` framework, and then we plan to use `Android` Develop a client with the `iOS` platform, using `Flutter`, but it will still take a while

Our reason for choosing to develop OpenLive is very simple. First of all, there are relatively few open source similar products on the market. More importantly, we believe that it is everyone’s right to **get out of platform supervision and broadcast any content freely**, especially in [ Internet censorship in the People's Republic of China](https://en.wikipedia.org/wiki/Internet_censorship_in_China) intensifies, a large number of games and content (such as the game [Rainbow Six series](https://en.wikipedia.org/wiki/Tom_Clancy%27s_Rainbow_Six_Siege), [Grand Theft Auto series](https://en.wikipedia.org/wiki/Grand_Theft_Auto)) are banned from live streaming, so having such a platform is even more important

## What is OpenLive
The original intention of OpenLive is to create a web application running on a private server, but we also have the idea of developing an APP for the mobile platform. OpenLive is a "single anchor + unlimited audience" live broadcast platform, that is to say, it only supports one anchor single-line push live broadcast, and allows an unlimited number of viewers to watch. We know that this may be relatively simple, but it also makes it light

## Build OpenLive
TODO: Improve the construction tutorial

Since OpenLive has not been fully developed, it is hard to say how to build it, but in short, it is a webpage that runs Server and deploys Web Client

## Development progress
(In the following table, 🟢 means that the function has been developed and can be used in a production environment, 🔵 means that the function has been developed, but there may be security holes, it is recommended to use it leisurely, 🟡 means that the function is under development, please do not use it in a serious situation, but You can also help us test or develop it, 🟣 means that the function is planned but not yet put into development, 🔴 means the function has no plan and has not been put into development but we want to try)

| Function Name | Server Development Status | Client Development Status |
| ---- | ---- | ---- |
| Live streaming push and pull (using RTMP+HTTP-FLV) | 🟢 | 🟢 |
| Live broadcast basic information display | 🟢 | 🟢 |
| Basic information display of anchor | 🟢 | 🟢 |
| Live account system | 🔵 | 🟡 |
| Live chat function (Chat) | 🟡 | 🟡 |
| Host home page functions (including live playback, etc.) | 🟣 | 🟣 |
| Live gift function (including the Gold and Exp mechanism of the account system) | 🟣 | 🟣 |
| Extremely low latency live streaming (using WebRTC) | 🔴 | 🔴 |