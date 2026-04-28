const express = require("express");
const { exec } = require("child_process");
const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Bode Radio Operativa 24/7</h1>");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en puerto ${PORT}`);

  //const comando = `ffmpeg -re -f concat -safe 0 -protocol_whitelist file,http,https,tcp,tls -i "TU_URL_DE_LISTA_TXT" -c:a aac -b:a 128k -f flv "RTMP_DE_TU_RADIO/TU_STREAM_KEY"`;
  const comando = `ffmpeg -re -f concat -safe 0 -protocol_whitelist file,http,https,tcp,tls -i "TU_URL_DE_LISTA_TXT" -loop 1 -c:a aac -b:a 128k -f flv "RTMP_DE_TU_RADIO/TU_STREAM_KEY"`;

  exec(comando, (err) => {
    if (err) console.error("Error FFmpeg:", err);
  });
});
