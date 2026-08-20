# Final Folder Tree v1.0

This structure is frozen. New product work should add files inside an existing area instead of adding new root folders or moving established folders.

```text
ip-alive/
├── app/                    Expo Router screens and layouts
├── assets/                 Runtime images and replaceable art files
├── components/             Reusable React Native UI
├── constants/              App-wide presentation constants
├── data/                   Demo/static content records
├── features/               Product domain modules
│   ├── account/
│   ├── admin/
│   ├── art-assets/
│   ├── characters/
│   ├── companions/
│   ├── economy/
│   ├── events/
│   ├── mail/
│   ├── match3/
│   ├── persistence/
│   ├── progression/
│   ├── rewards/
│   ├── shop/
│   ├── travel/
│   ├── unlock/
│   └── wardrobe/
├── hooks/                  Reusable React hooks
├── utils/                  Domain-neutral pure helpers
├── ai-character-system/    AI behavior documentation
├── business/               Business documentation
├── design/                 Design documentation
├── docs/                   Product and technical documentation
├── ethics-and-safety/      Safety documentation
├── portfolio/              Portfolio material
├── product/                Product specifications
├── research/               Research material
└── scripts/                Developer scripts
```

## Dependency direction

- `app` may import `components`, `features`, `hooks`, and `constants`.
- `components` may import `features` and `utils`, but never route screens.
- A feature exposes its public API through its local `index.ts`.
- Features may depend on another feature's public API, not its internal files.
- `data` contains replaceable demo content; business rules live in `features`.
- Persistence, purchase, unlock, and art integrations use interfaces so a production provider can replace the demo implementation.
