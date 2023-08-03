const crypto = require("crypto");
const benchmark = require("benchmark");
const pico = require("picocolors");

const generateHashKey = (key, alg = "md5") => {
  return crypto.createHash(alg).update(key).digest("hex");
};

const key = "YourSampleKey"; // Replace this with the key you want to hash

console.log("md5", generateHashKey(key, "md5"));
console.log("sha1", generateHashKey(key, "sha1"));
console.log("sha224", generateHashKey(key, "sha224"));
console.log("sha256", generateHashKey(key, "sha256"));

const suite = new benchmark.Suite();

function formatNumber(number) {
  return String(number)
    .replace(/\d{3}$/, ",$&")
    .replace(/^(\d|\d\d)(\d{3},)/, "$1,$2");
}

suite
  .add("crypto.md5", () => {
    generateHashKey(key, "md5");
  })
  .add("crypto.sha1", () => {
    generateHashKey(key, "sha1");
  })
  .add("crypto.sha224", () => {
    generateHashKey(key, "sha224");
  })
  .add("crypto.sha256", () => {
    generateHashKey(key, "sha256");
  })
  .on("cycle", (event) => {
    let name = event.target.name.padEnd("async secure-random-string".length);
    let hz = formatNumber(event.target.hz.toFixed(0)).padStart(10);
    if (event.target.name === "nanoid/async") {
      name = "\nAsync:\n" + name;
    } else if (event.target.name === "uid") {
      name = "\nNon-secure:\n" + name;
    }
    process.stdout.write(`${name}${pico.bold(hz)}${pico.dim(" ops/sec")}\n`);
  })
  .run();
