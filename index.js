require("dotenv").config();
const NodeMediaServer = require("node-media-server");
const path = require("path");

const httpConfig = {
  port: process.env.PORT || 8000,
  allow_origin: "*",
  mediaroot: path.join(__dirname, "media"),
};

const rtmpConfig = {
  port: process.env.RTMP_PORT || 1935,
  chunk_size: 60000,
  gop_cache: true,
  ping: 10,
  ping_timeout: 60,
};

const transformationConfig = {
  ffmpeg: process.env.FFMPEG_PATH || "/usr/bin/ffmpeg",
  tasks: [
    {
      app: "live",
      hls: true,
      hlsFlags: "[hls_time=1:hls_list_size=3:hls_flags=delete_segments]", // Diminui a latência do HLS
      hlsKeep: false,
    },
  ],
  MediaRoot: path.join(__dirname, "media"),
};

const config = {
  http: httpConfig,
  rtmp: rtmpConfig,
  trans: transformationConfig,
};

const nms = new NodeMediaServer(config);
nms.run();

console.log(`Servidor RTMP rodando na porta ${config.rtmp.port}`);
console.log(`Servidor HTTP rodando na porta ${config.http.port}`);
