import { neon, type NeonQueryFunction } from "@neondatabase/serverless"

// Lazy initializer — only throws when a query is actually executed,
// not at module load time. This lets Next.js build without DATABASE_URL.
let _db: NeonQueryFunction<false, false> | null = null

function getDb(): NeonQueryFunction<false, false> {
  if (!_db) {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL is not set. Add it to .env.local")
    }
    _db = neon(process.env.DATABASE_URL)
  }
  return _db
}

// Proxy keeps the tagged-template-literal `db\`...\`` call syntax intact.
export const db = new Proxy(
  (() => {}) as unknown as NeonQueryFunction<false, false>,
  {
    apply(_target, _thisArg, args) {
      return (getDb() as (...a: unknown[]) => unknown)(...args)
    },
    get(_target, prop) {
      return (getDb() as Record<string | symbol, unknown>)[prop]
    },
  }
)
