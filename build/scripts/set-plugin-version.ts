import { existsSync } from "fs";
import { readFileSync, writeFileSync } from "jsonfile";
import { join, relative } from "path";
import { manifestNs } from "./manifest";

let version = process.argv[2];
if (version === undefined) {
  const pkg: { version: string } = readFileSync(join(__dirname, "../../package.json")) as {
    version: string;
  };
  console.error("⚠️ No version supplied, extracting version from package.json");
  version = pkg.version.substring(0, pkg.version.indexOf("-"));
}

let manifestPath: string = join(__dirname, "../../dist/" + manifestNs + ".sdPlugin/manifest.json");
if (!existsSync(manifestPath)) {
  manifestPath = join(__dirname, "../../dist/dev." + manifestNs + ".sdPlugin/manifest.json");
}

if (!existsSync(manifestPath)) {
  console.error("❌ could not find manifest.json in prod OR dev dist directories");
  process.exit(1);
}

console.info("📦 setting version to " + version + " ...");
let json: { Version: string } = readFileSync(manifestPath) as {
  Version: string;
};
json.Version = version;
writeFileSync(manifestPath, json, { spaces: 2 });

json = readFileSync(manifestPath) as { Version: string };
if (json.Version !== version) {
  console.error("❌ unknown error on writing version to file " + manifestPath);
  process.exit(1);
}
console.info("✅ version set in file " + relative(process.cwd(), manifestPath));
