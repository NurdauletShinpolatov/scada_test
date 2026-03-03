# SCADA Test

A **SCADA Monitoring Web Interface** for viewing and managing electrical substations and grid control points. The app provides a dashboard, station list with filters, station details with live-like metrics and charts, and a system event logs viewer—all backed by simulated data for development and demonstration.

**Purpose:** Demonstrate a modern SCADA-style UI (dashboard, stations, logs) with search, filters, pagination, and edit flows.  
**Goal:** Serve as a test/demo frontend that can later be wired to a real backend or OPC/SCADA APIs.

---

## Features

- **Login** — Authenticate with username/password (simulated; no real backend).
- **Dashboard** — Overview with total stations, counts by status (online / warning / offline), and “attention needed” station cards; clickable stats link to the Stations page with status filter.
- **Stations page** — Table of all stations with:
  - **Search** — Filter by station name.
  - **Status filter** — All, Online, Warning, Offline (also supports `?status=...` in URL).
  - **Pagination** — Navigate through pages of results.
  - **Row click** — Open station detail page.
- **Station details** — Per-station view with:
  - **Edit station modal** — Update station name and location (in-memory; simulated).
  - **Metrics & charts** — Temperature, pressure, voltage with mini time-series charts (simulated data).
  - **Recent logs** — Event logs for that station.
- **Logs page** — System event logs table with:
  - **Search** — By message or station name.
  - **Level filter** — All, Info, Warning, Critical.
  - **Pagination** — Browse log pages.
- **Sidebar navigation** — Dashboard, Stations, Logs; user block and logout with confirmation modal.

---

## Technologies Used

| Category        | Stack |
|----------------|-------|
| **Framework**  | React 19, TypeScript |
| **Build**      | Vite 7 |
| **UI**         | Chakra UI, Framer Motion, Iconify |
| **Routing**    | React Router v7 |
| **State**      | Zustand (auth), Redux Toolkit, React Query (TanStack) |
| **Tables**     | TanStack React Table |
| **Charts**     | Recharts |
| **Forms**      | React Hook Form |
| **HTTP**       | Axios |
| **Utilities**  | dayjs, rc-pagination |

---

## Installation

### Prerequisites

- **Node.js** 18+ (recommended: 20+)
- **npm**, **yarn**, or **pnpm**

### Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd scada_test
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run locally**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

   The app will be available at **http://localhost:5173** (or the port shown in the terminal).

4. **Build for production**

   ```bash
   npm run build
   ```

5. **Preview production build**

   ```bash
   npm run preview
   ```

---

## Usage

### Login

- Open the app; you will be redirected to **Login** if not authenticated.
- **Demo credentials:** `admin` / `123` (simulated; see [Important notes](#important-notes)).

### Navigation

- **Dashboard** (`/`) — Summary and quick links to stations by status.
- **Stations** (`/stations`) — Full station list with search, status filter, and pagination.
- **Station details** (`/stations/:id`) — Open by clicking a row on the Stations page.
- **Logs** (`/logs`) — System event log viewer.

### Stations page

- **Search:** Type in the search box to filter stations by name.
- **Status filter:** Use the dropdown (All / Online / Warning / Offline). You can also open `/stations?status=online` (or `warning` / `offline`) to land with a filter applied.
- **Pagination:** Use the pagination controls below the table; page size is 10.
- **Open details:** Click a table row to go to that station’s detail page.

### Edit station

- On a **Station details** page, click the **Edit** (pencil) button in the header.
- In the modal, change **Name** and/or **Location**, then save. Changes are kept in memory only (simulated).

### Logs page

- **Search:** Filter by log message or by station name.
- **Level filter:** Restrict to Info, Warning, or Critical.
- **Pagination:** Navigate through log pages (page size 10).

---

## Screenshots

_Screenshots can be added here once captured._

| Screen        | Description                    |
|---------------|--------------------------------|
| **Login**     | Login form with logo            |
| **Dashboard** | Stats cards and station grid   |
| **Stations**  | Table with search and filters  |
| **Station details** | Metrics, charts, edit button |
| **Logs**      | Event log table with filters   |

**Placeholder:** You can add images like:

```markdown
### Login
![Login](docs/screenshots/login.png)

### Dashboard
![Dashboard](docs/screenshots/dashboard.png)
```

Create a `docs/screenshots/` folder and add your PNG/JPG files, then link them as above.

---

## Project Structure

```
scada_test/
├── src/
│   ├── app/              # App shell, router
│   ├── components/       # Reusable UI (layouts, CTable, Pagination, CustomModal)
│   ├── pages/            # Route-level pages (Login, Dashboard, Stations, StationDetails, Logs)
│   ├── simulation/       # Mock data and logic (stations, logs, login)
│   ├── store/            # Global state (e.g. auth with Zustand)
│   ├── theme/            # Chakra UI theme overrides
│   ├── types/            # TypeScript types (Station, LogItem, etc.)
│   └── utils/            # Constants, helpers
├── index.html
├── package.json
├── vite.config.ts
└── tsconfig.*.json
```

- **`simulation/`** — All “backend” behavior is simulated here (station list, logs, login). Replace or extend these with real API calls when integrating a backend.
- **`pages/`** — One folder per main route; each typically has an `index.tsx` and optionally column definitions or subcomponents (e.g. `StationDetails/MetricWithChart.tsx`).

---

## Important Notes

- **Simulated data & mock backend**  
  Stations, logs, and login use in-memory/simulated logic only. There is no persistent server or database. Edits (e.g. station name/location) and login state are lost on refresh. To use a real backend, replace or augment the modules in `src/simulation/` with API calls (e.g. using Axios or fetch).

- **Demo login**  
  Use **username:** `admin`, **password:** `123` to sign in. This is hardcoded in `src/simulation/login.ts` for demo purposes only.

- **Environment**  
  If the project uses env vars (e.g. `.env`), copy `.env.example` to `.env` and fill in values. Do not commit secrets.

---

## Scripts

| Command           | Description                |
|-------------------|----------------------------|
| `npm run dev`     | Start Vite dev server      |
| `npm run build`   | TypeScript check + build   |
| `npm run preview` | Serve production build     |
| `npm run lint`    | Run ESLint                 |

---

## License

Private / Unlicensed unless otherwise specified in the repository.
