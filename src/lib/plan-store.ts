// Shared in-memory store using globalThis to survive module re-evaluation
const g = globalThis as typeof globalThis & {
  _planStore?: Map<string, { plan: unknown; status: string; offerType: string | null }>
}
if (!g._planStore) g._planStore = new Map()
const store = g._planStore

export function savePlan(id: string, plan: unknown) {
  store.set(id, { plan, status: 'ready', offerType: null })
}

export function getPlan(id: string) {
  return store.get(id) ?? null
}
