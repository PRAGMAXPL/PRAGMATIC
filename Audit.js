// npm i ethers axios
import { ethers } from "ethers";
import axios from "axios";

const RPC = "https://YOUR_RPC";
const ADDRESS = "0xYourContract";
const START_ID = 1;         // first token id to check
const END_ID = 666;         // last token id (or minted count)
const QUICK = true;         // true = local compute only (no RPC); false = read tokenURI on-chain

// === paste your deployed cumulative weights here ===
// Must end at 10000, strictly increasing. Example:
const WEIGHTS = [105, 510, 1516, 3514, 5511, 7508, 8709, 10000]; // tweak to match your deploy

const UNIXS   = ["USER","PR","NI","VIRT","RES","SHR","S","PID"];

// --- local trait picker (matches contract) ---
import { keccak256, toUtf8Bytes, solidityPacked } from "ethers";

function localTraitIndex(id) {
  // r = uint256(keccak256(abi.encodePacked("PRAGMA.UNIX", id))) % 10000
  const packed = solidityPacked(["string","uint256"], ["PRAGMA.UNIX", id]);
  const r = BigInt(keccak256(packed)) % 10000n;
  let idx = 0;
  for (let i = 0; i < WEIGHTS.length; i++) {
    if (r < BigInt(WEIGHTS[i])) { idx = i; break; }
  }
  return idx;
}

function b64decode(b64) {
  // Node 18+ has atob in web compat; but safer:
  return Buffer.from(b64, "base64").toString("utf8");
}

function extractUnixFromTokenURI(uri) {
  if (!uri.startsWith("data:application/json;base64,")) {
    throw new Error("Unexpected tokenURI format (not data: URI)");
  }
  const b64 = uri.split("base64,")[1];
  const json = JSON.parse(b64decode(b64));
  const attr = (json.attributes || []).find(a => a.trait_type === "UNIX");
  return { unix: attr?.value, json };
}

(async () => {
  const provider = new ethers.JsonRpcProvider(RPC);
  const abi = ["function tokenURI(uint256 id) view returns (string)"];
  const c = new ethers.Contract(ADDRESS, abi, provider);

  const tallies = Object.fromEntries(UNIXS.map(u => [u, 0]));
  const localTallies = Object.fromEntries(UNIXS.map(u => [u, 0]));

  for (let id = START_ID; id <= END_ID; id++) {
    // local expected (fast, no RPC)
    const idxLocal = localTraitIndex(id);
    localTallies[UNIXS[idxLocal]]++;

    if (!QUICK) {
      // on-chain read
      const uri = await c.tokenURI(id);
      const { unix } = extractUnixFromTokenURI(uri);
      tallies[unix] = (tallies[unix] || 0) + 1;
    }
  }

  const total = END_ID - START_ID + 1;
  console.log("=== Local expected (deterministic by id) ===");
  for (const u of UNIXS) {
    const n = localTallies[u];
    console.log(`${u.padEnd(4)}: ${String(n).padStart(3)}  (${(100*n/total).toFixed(2)}%)`);
  }

  if (!QUICK) {
    console.log("\n=== On-chain tokenURI observed ===");
    for (const u of UNIXS) {
      const n = tallies[u] || 0;
      console.log(`${u.padEnd(4)}: ${String(n).padStart(3)}  (${(100*n/total).toFixed(2)}%)`);
    }
  }

  console.log("\nWeights (bps cumulative):", WEIGHTS.join(", "));
})();
