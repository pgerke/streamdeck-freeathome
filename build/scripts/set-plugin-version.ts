import { existsSync } from "fs";
import { readFileSync, writeFileSync } from "jsonfile";
import { join, relative } from "path";
import { manifestNs } from "./manifest";

const version = process.argv[2];
if (version === undefined) {
  console.error("\n❌ Usage: npm run set-plugin-version <VERSION>\n");
  process.exit();
}

let manifestPath: string = join(
  __dirname,
  "../../dist/" + manifestNs + ".sdPlugin/manifest.json"
);
if (!existsSync(manifestPath)) {
  manifestPath = join(
    __dirname,
    "../../dist/dev." + manifestNs + ".sdPlugin/manifest.json"
  );
}

if (!existsSync(manifestPath)) {
  console.error(
    "❌ could not find manifest.json in prod OR dev dist directories"
  );
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
