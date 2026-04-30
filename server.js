const express = require("express");
const { exec } = require("child_process");
const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Bode Radio, tu mejor elección 24/7</h1>");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en puerto ${PORT}`);

  const logoUrl = "https://i.imgur.com/8R7U7uX.jpg"; 
  
  const listaUrl = "https://raw.githubusercontent.com/JannethE-Matute/Bode---Radio/refs/heads/main/canciones.txt";

  // 3. El comando con la imagen añadida (-loop 1 -i "${logoUrl}")
  const comando = `ffmpeg -re -loop 1 -i "${logoUrl}" -f concat -safe 0 -protocol_whitelist file,http,https,tcp,tls -i "${listaUrl}" -c:v libx264 -preset veryfast -b:v 1000k -maxrate 1000k -bufsize 2000k -pix_fmt yuv420p -g 50 -c:a aac -b:a 128k -shortest -f flv "rtmp://live.twitch.tv/app/live_1489678025_u0KCUb4rSy0GwllQOhwdeg1SAOimfs"`;

  exec(comando, (err) => {
    if (err) {
      console.error("Error FFmpeg:", err);
    }
  });
});
