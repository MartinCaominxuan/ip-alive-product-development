const fs = require("fs");
const path = require("path");

const output = path.join(__dirname, "..", "assets", "audio");
fs.mkdirSync(output, { recursive: true });

function writeTone(name, notes) {
  const rate = 44100;
  const samples = [];
  for (const { frequency, duration, volume = 0.28 } of notes) {
    const count = Math.floor(rate * duration);
    for (let i = 0; i < count; i += 1) {
      const envelope = Math.min(1, i / 220) * Math.max(0, 1 - i / count);
      samples.push(Math.sin((2 * Math.PI * frequency * i) / rate) * volume * envelope);
    }
  }
  const dataSize = samples.length * 2;
  const buffer = Buffer.alloc(44 + dataSize);
  buffer.write("RIFF", 0); buffer.writeUInt32LE(36 + dataSize, 4); buffer.write("WAVE", 8);
  buffer.write("fmt ", 12); buffer.writeUInt32LE(16, 16); buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(1, 22); buffer.writeUInt32LE(rate, 24); buffer.writeUInt32LE(rate * 2, 28);
  buffer.writeUInt16LE(2, 32); buffer.writeUInt16LE(16, 34); buffer.write("data", 36); buffer.writeUInt32LE(dataSize, 40);
  samples.forEach((sample, index) => buffer.writeInt16LE(Math.round(sample * 32767), 44 + index * 2));
  fs.writeFileSync(path.join(output, name), buffer);
}

writeTone("swap.wav", [{ frequency: 520, duration: 0.055 }, { frequency: 690, duration: 0.06 }]);
writeTone("match.wav", [{ frequency: 740, duration: 0.07 }, { frequency: 980, duration: 0.09 }]);
writeTone("special.wav", [{ frequency: 620, duration: 0.06 }, { frequency: 930, duration: 0.07 }, { frequency: 1320, duration: 0.13 }]);
writeTone("complete.wav", [{ frequency: 660, duration: 0.09 }, { frequency: 880, duration: 0.09 }, { frequency: 1100, duration: 0.18 }]);
