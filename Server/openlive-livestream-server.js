// 导入node-media-server模块
import NodeMediaServer from 'node-media-server'

export function runLiveStreamServer(rtmp_port, http_flv_port) {
    // 配置参数
    const config = {
        // RTMP相关参数
        rtmp: {
            port: rtmp_port, // RTMP监听端口
            chunk_size: 60000, // RTMP数据块大小
            gop_cache: true, // 是否缓存关键帧
            ping: 30, // RTMP心跳间隔
            ping_timeout: 60 // RTMP心跳超时时间
        },
        // HTTP相关参数
        http: {
            port: http_flv_port, // HTTP监听端口
            mediaroot: './media', // 媒体文件根目录
            allow_origin: '*' // 允许跨域访问
        }
    };

    // 创建node-media-server实例
    var nms = new NodeMediaServer(config);

    // 启动服务
    nms.run();

    nms.on('prePublish', (id, StreamPath, args) => {
        console.log('[NodeEvent on prePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);

        if (global.is_living) {
            var session = nms.getSession(id);
            session.reject();
            session.sendStatusMessage(session.publishStreamId, 'error', 'NetStream.Publish.BadName', 'Maximum connections exceeded');
        }
    });

    nms.on('postPublish', (id, StreamPath, args) => {
        global.is_living = true
    });

    nms.on('donePublish', (id, StreamPath, args) => {
        global.is_living = false
    });
}