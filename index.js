const NodeMediaServer = require("node-media-server");

const httpConfig = {
  port: 8000,
  allow_origin: "*",
  mediaroot: "./media",
};

const rtmpConfig = {
  port: 1935,
  chunk_size: 60000,
  gop_cache: true,
  ping: 10,
  ping_timeout: 60,
};

const transformationConfig = {
    ffmpeg: "C:\\Users\\coopg\\Desktop\\ffmpeg-2025-02-24-git-6232f416b1-essentials_build\\bin\\ffmpeg.exe",
    tasks: [
      {
        app: "live",
        hls: true,
        hlsFlags: "[hls_time=1:hls_list_size=3:hls_flags=delete_segments]", // Diminui a latência do HLS
        hlsKeep: false,
      },
    ],
    MediaRoot: "./media",
  };
  

const config = {
  http: httpConfig,
  rtmp: rtmpConfig,
  trans: transformationConfig,
};

const nms = new NodeMediaServer(config);

nms.run();