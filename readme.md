Below is the **same README, fully clean Markdown (`.md`)**, ready to paste directly into `README.md` 👇
(No changes in content — just properly formatted Markdown.)

---

```md
# 🚜 FarmLokal – Backend Engineering Assignment

> A production-grade backend service designed for performance, reliability, and real-world scalability.  
> Built with a strong focus on clean architecture, caching, and large-dataset handling.

---

## 📌 Project Overview

FarmLokal is a hyperlocal marketplace connecting households directly with local farmers and producers.  
This backend service simulates a **real production system** that powers such a marketplace by handling:

- Secure authentication
- External system integrations
- High-performance product listing at scale
- Reliability under load
- Clean, maintainable backend architecture

The goal of this assignment was **not just correctness**, but **production readiness**.

---

## 🧱 Tech Stack

### Core
- Node.js (v18+)
- TypeScript
- Express.js

### Data & Caching
- PostgreSQL (Neon – serverless)
- Redis (caching, locking, rate limiting)

### Infra / Tooling
- Axios (HTTP client)
- pg (PostgreSQL client)
- dotenv
- Render (deployment)

---

## 🏗️ Architecture Overview

The project follows a **modular, feature-based architecture** designed for scalability and clarity.

```

src/
├── app.ts
├── server.ts
├── config/
│    ├── db.ts
│    ├── redis.ts
│    └── env.ts
├── modules/
│    ├── auth/
│    ├── products/
│    ├── external/
│    └── webhooks/
├── middlewares/
│    ├── rateLimit.ts
│    ├── circuitBreaker.ts
│    └── errorHandler.ts
├── utils/
│    ├── retry.ts
│    └── redisLock.ts
└── scripts/
├── createProductsTable.ts
└── seedProducts.ts

```

### Why this structure?
- Clear separation of concerns  
- Easy to extend  
- Mirrors real startup / production codebases  

---

## 🔐 Authentication (OAuth2 – Client Credentials)

### Flow
1. Backend fetches an access token from an OAuth provider
2. Token is cached in Redis
3. Token auto-refreshes before expiry
4. Concurrent requests do not trigger duplicate token fetches

### Key Design Decisions
- Redis-based locking prevents race conditions
- Token TTL slightly shorter than provider expiry
- Non-blocking, async-safe implementation

---

## 🔌 External API Integrations

### API A – Synchronous
- Request timeout
- Retries with exponential backoff
- Circuit breaker pattern

Ensures the system remains responsive even if the external API fails.

### API B – Webhook Based
- Callback endpoint
- Redis-based idempotency
- Duplicate event handling
- Safe retries

Designed to handle real-world webhook behavior.

---

## 🛒 Product Listing API (Performance Critical)

### Endpoint
```

GET /api/products

```

### Features
- Cursor-based pagination
- Sorting: price, name, created_at
- Filtering: category, price range
- Optimized for large datasets

### Example
```

GET /api/products?limit=20&cursor=20&category=Electronics

````

### Sample Response
```json
{
  "data": [...],
  "nextCursor": "40"
}
````

---

## ⚡ Performance Optimizations

### Database

* Indexed columns:

  * (category, price)
  * created_at
  * name
* Cursor pagination (no OFFSET scans)
* Connection pooling via pg.Pool

### Caching

* Redis query-level caching
* Short TTL for freshness
* Parameter-based cache keys

Target: **P95 latency < 200ms**

---

## 🧠 Data Seeding Strategy

* Tens of thousands of records seeded programmatically
* Batched inserts to respect Neon serverless constraints
* Architecture scales logically to 1M+ records

Trade-off chosen to ensure stability over brute-force insertion.

---

## 🛡️ Reliability & Safety

Implemented patterns:

* Redis caching
* Rate limiting
* Circuit breaker
* Graceful degradation
* Centralized error handling
* Metrics endpoint

---

## 🧪 Error Handling

* Centralized middleware
* Clean error responses
* No sensitive data leakage
* Stack traces only in development

---

## 📊 Metrics Endpoint

```
GET /metrics
```

Returns uptime and service health data.

---

## ⚙️ Environment Variables

```env
PORT=3000
DATABASE_URL=postgresql://...neon.tech/... ?sslmode=require
REDIS_URL=redis://...

OAUTH_TOKEN_URL=...
OAUTH_CLIENT_ID=...
OAUTH_CLIENT_SECRET=...
OAUTH_SCOPE=read
```

---

## ▶️ Running Locally

```bash
npm install
npm run dev
```

---

## 🚀 Deployment

* Hosted on Render
* PostgreSQL via Neon
* Redis via managed Redis
* TypeScript compiled during build step

---

## ⚖️ Trade-offs & Decisions

| Decision               | Reason                      |
| ---------------------- | --------------------------- |
| Cursor pagination      | Better performance at scale |
| Redis caching          | Reduce DB load              |
| Batched seeding        | Serverless DB constraints   |
| Simple circuit breaker | Clarity over complexity     |

---

## 🎯 Focus Areas

Primary focus was placed on:

* Performance optimization
* Correct Redis usage
* Scalable database access
* Production-grade reliability
* Clean backend architecture

---

## ✅ Final Notes

This project was built to resemble **real startup backend systems**, not a toy assignment.
Every decision prioritizes **clarity, scalability, and reliability**.

```

---

