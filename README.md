# PRAGMA Construct

![PRAGMA Logo](https://pragma.fail/assets/PRAGMA.gif)

**Precision-ready, adaptive, and minimalist.**

PRAGMA is the first **ERC404 hybrid on Plasma** – fusing fungible **$PRAGMA** tokens with **666 exclusive NFTs**. Spawn your construct, trade dust for form, and enter the unified liquidity pool. Born for Plasma's instant, low-fee reality.

---

## Links

* **Live**: [https://pragma.fail](https://pragma.fail)
* **Token (ERC20)**: `0x173dCc9E2ef2cBF5e88DDaD69e46F4d866eB24C9`
* **NFT (ERC404)**: `0x3c4232aea2c5589d326461281958d60a5acf8fed`
* **Chain**: Plasma **(Chain ID: 9745)**

> ⚡️ PRAGMA blends ERC20 liquidity with ERC721 identity through ERC404 mechanics. One pool. Two forms.

---

## Feature Matrix

| Feature               | Description                                                                                         |
| --------------------- | --------------------------------------------------------------------------------------------------- |
| **ERC404 Hybrid**     | Seamless fusion of ERC20 tokens and ERC721 NFTs – trade fractions without silos.                    |
| **Procedural NFTs**   | 666 unique constructs with deterministic traits (e.g., `USER`, `PR`, `NI`) via `keccak256` hashing. |
| **Instant Minting**   | Spawn via wallet connect → approve **200k $PRAGMA dust** → auto-mint NFT → fragment into shards.    |
| **Rarity Audit**      | Local simulation tool verifies trait distribution (e.g., **1.05%** `USER` rarity).                  |
| **Animated Modals**   | Interactive PRAGMA migration viz, docs, rarity grid, and NFT viewer.                                |
| **Unified Liquidity** | Uniswap V3 pool maintains **K-invariant** for token↔NFT swaps.                                      |

---

## Screenshots

> All PNGs are optimized for dark/light themes and mobile. Files are in `assets/`.

* **Hero Section with Mint Panel**
  *Animated typing + wallet connect*

  `assets/screens/hero-mint.png`

* **Rarity Modal**
  *Trait cards with GIF previews – 1.05% USER to 12.91% PID*

  `assets/screens/rarity-grid.png`

* **PRAGMA Animation Modal**
  *Dust particles → NFT birth → Liquidity unification*

  `assets/screens/migration-animation.png`

* **NFT Viewer Modal**
  *Loaded metadata with traits – e.g., "UNIX: VIRT"*

  `assets/screens/nft-display.png`

* **Audit Tool**
  *Local calc: USER: 7 (1.05%), PR: 27 (4.05%), etc.*

  `assets/screens/audit-result.png`

---

## How It Works (ERC404 on Plasma)

1. **Dust → Construct**: Users approve **200,000 $PRAGMA** ("dust"). Contract mints a construct (ERC404 NFT) representing a whole position.
2. **Construct → Shards**: Position can fragment into fungible shards (ERC20) for unified trading/liquidity.
3. **Unified Pool**: A single **Uniswap V3** pool provides routing for token↔NFT swaps while maintaining the **K-invariant**. No siloed liquidity.
4. **Deterministic Traits**: Each construct’s traits are derived via `keccak256(seed, tokenId)` for predictable on-chain rarity (e.g., `USER`, `PR`, `NI`, `PID`).

> Result: **identity + liquidity** without fragmentation.

---

## Contracts

```text
Chain: Plasma (Chain ID: 9745)
ERC20  : 0x173dCc9E2ef2cBF5e88DDaD69e46F4d866eB24C9  // $PRAGMA
ERC404 : 0x3c4232aea2c5589d326461281958d60a5acf8fed  // PRAGMA Construct
```

> Keep addresses in a single source of truth (see `.env` and `src/config/pragma.ts`).

---

## Quick Start

### Clone & Serve

```bash
# 1) Clone
git clone https://github.com/your-org/pragma-construct.git
cd pragma-construct

# 2) Install (choose one)
pnpm install
# or
yarn install
# or
npm install

# 3) Configure env
cp .env.example .env.local

# Required values (edit .env.local):
# NEXT_PUBLIC_CHAIN_ID=9745
# NEXT_PUBLIC_RPC_URL="https://rpc.plasma.network"    # your Plasma RPC endpoint
# NEXT_PUBLIC_TOKEN_ADDRESS=0x173dCc9E2ef2cBF5e88DDaD69e46F4d866eB24C9
# NEXT_PUBLIC_NFT_ADDRESS=0x3c4232aea2c5589d326461281958d60a5acf8fed
# NEXT_PUBLIC_UNISWAP_V3_POOL=0xPOOLADDRESS                # optional if auto-discovered
# NEXT_PUBLIC_SITE_URL=https://pragma.fail                 # used for SEO/OG

# 4) Dev server
pnpm dev
# or
npm run dev
# → http://localhost:3000
```

### Build & Export

```bash
pnpm build
pnpm start
# or with Next.js static export
pnpm build && pnpm export
```

### Deploy

* **Vercel**: connect repo → set env → deploy
* **Netlify**: set build cmd (`next build`) and publish dir (`.next`)
* **Docker**: use `Dockerfile` (see below) → `docker build -t pragma . && docker run -p 3000:3000 pragma`

---

## App Flow

1. **Connect Wallet** → detect Plasma (9745) → prompt switch if needed.
2. **Approve Dust** → request allowance for **200,000 $PRAGMA**.
3. **Spawn Construct** → contract mints ERC404 NFT.
4. **Fragment** (optional) → convert to shards for liquidity.
5. **Trade** → unified Uniswap V3 pool handles swaps.

All actions are reflected in the **animated modals** (mint, migration, rarity, viewer).

---

## Rarity Audit (Local Simulation)

Reproducible rarity math to validate distribution.

```bash
# Run trait distribution check
pnpm rarity:audit
# → outputs counts & percentages (e.g., USER: 7 (1.05%), PR: 27 (4.05%))

# Visualize grid with GIF previews
pnpm rarity:grid
# → generates assets at: assets/rarity/grid/*.png
```

> The audit uses deterministic seeds; results will match on re-run given same config.

---

## Project Structure

```
pragma-construct/
├─ assets/
│  ├─ PRAGMA.gif
│  └─ screens/
│     ├─ hero-mint.png
│     ├─ rarity-grid.png
│     ├─ migration-animation.png
│     ├─ nft-display.png
│     └─ audit-result.png
├─ src/
│  ├─ app/                    # Next.js routes
│  ├─ components/
│  │  ├─ mint/
│  │  ├─ modals/
│  │  └─ rarity/
│  ├─ lib/
│  │  ├─ erc20.ts
│  │  ├─ erc404.ts
│  │  └─ uniswap.ts
│  └─ config/
│     └─ pragma.ts            # addresses, chain, pool
├─ scripts/
│  ├─ audit.ts                # rarity audit script
│  └─ seed.ts                 # (optional) dev seed helpers
├─ public/
│  └─ favicon.ico
├─ .env.example
├─ package.json
├─ next.config.js
├─ README.md
└─ LICENSE
```

---

## Environment Variables

```ini
NEXT_PUBLIC_CHAIN_ID=9745
NEXT_PUBLIC_RPC_URL=https://rpc.plasma.network
NEXT_PUBLIC_TOKEN_ADDRESS=0x173dCc9E2ef2cBF5e88DDaD69e46F4d866eB24C9
NEXT_PUBLIC_NFT_ADDRESS=0x3c4232aea2c5589d326461281958d60a5acf8fed
NEXT_PUBLIC_SITE_URL=https://pragma.fail
```

> Add private keys only to your wallet, **never** to `.env`. Frontend uses **public** env vars for safe config.

---

## Uniswap V3 Integration

* Auto-discovers or reads configured pool for $PRAGMA liquidity.
* Displays price, TVL, and implied rarity floor in UI.
* Routes: token ↔ shards ↔ construct (when price impact is minimal) using the **K-invariant**.

---

## Design System

* Minimalist, adaptive, dark-first.
* **Animated typing** in hero.
* **Modal suite**: migration viz, rarity grid, NFT viewer.
* PNGs/GIF optimized for mobile & light/dark.

---

## Development Notes

* Uses EIP-1193 provider detection for Plasma (chainId `0x2611`).
* Interfaces: `ERC20`, `ERC404`, Uniswap V3.
* Deterministic trait generation via `keccak256`.

---

## Security

* Validate chain and addresses from a single config.
* Guard approvals; limit allowance to needed amounts (e.g., **200k $PRAGMA**).
* Display human-readable confirmations in modals.

---

## License

MIT © PRAGMA Contributors

---

## Credits

* ERC404 pioneers & open-source maintainers
* Plasma ecosystem
* Uniswap V3 researchers

> Have a feature request or found a bug? Open an issue or PR. PRAGMA evolves with the Construct.
