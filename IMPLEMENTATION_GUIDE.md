# Admin Implementation Guide — Steps 5-7

This walks through the remaining work to fully wire the admin and public site to Supabase. Steps 1-4 are already done — see [src/admin/api/properties.ts](src/admin/api/properties.ts) for the patterns to follow.

## Status

**Done**
- Supabase client + auth ([src/lib/supabaseClient.ts](src/lib/supabaseClient.ts), [src/admin/context/AuthContext.tsx](src/admin/context/AuthContext.tsx))
- Database schema, RLS, storage bucket
- Properties API + image storage helpers ([src/admin/api/properties.ts](src/admin/api/properties.ts))
- Inquiries API ([src/admin/api/inquiries.ts](src/admin/api/inquiries.ts))
- Admin properties list, create, edit, delete with image upload

**To do**
- Step 5 — Wire dashboard + inquiries pages to real data
- Step 6 — Rewire public property pages to Supabase
- Step 7 — Wire the contact form

---

## Step 5 — Dashboard + Inquiries

### 5a. AdminInquiries

**Goal:** Replace `mockInquiries` with real data, persist status changes to the database.

**File:** [src/admin/pages/AdminInquiries.tsx](src/admin/pages/AdminInquiries.tsx)

**API already built** (in [src/admin/api/inquiries.ts](src/admin/api/inquiries.ts)):
- `listInquiries()` — fetch all with linked property address
- `updateInquiryStatus(id, status)` — set `'new' | 'read' | 'closed'`
- `deleteInquiry(id)`

**Steps:**

1. Swap the import:
   ```ts
   // Remove
   import { mockInquiries, type AdminInquiry, type InquiryStatus } from "../data/mockData";

   // Add
   import type { AdminInquiry, InquiryStatus } from "../types";
   import { listInquiries, updateInquiryStatus } from "../api/inquiries";
   ```

2. Add state for the inquiries themselves plus loading/error:
   ```ts
   const [inquiries, setInquiries] = useState<AdminInquiry[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);
   ```

3. Add a `useEffect` that calls `listInquiries()` on mount. Pattern: copy the structure from [AdminProperties.tsx](src/admin/pages/AdminProperties.tsx) — look for the `useEffect` that loads properties (uses a `cancelled` flag and try/catch/finally).

4. Replace the `localStatuses` mock pattern with real API calls. The current code uses a local map to fake persistence — rip it out. Instead:
   - In `toggleExpand`, when auto-marking as read: call `await updateInquiryStatus(id, "read")`, then update local state.
   - In `setStatus`, do the same: call the API first, then update local state on success.
   - Wrap each in try/catch and surface failures via `setError` or `alert()`.

5. Update the `useMemo` filter to read from the new `inquiries` state instead of `mockInquiries`.

6. Add loading and error UI right above the inquiry list. Pattern:
   ```tsx
   {error && <div className="...error banner...">{error}</div>}
   {loading ? (
     <div>Loading…</div>
   ) : (
     <ul>...</ul>
   )}
   ```

**Verify:**
1. Insert a test inquiry directly in the Supabase SQL editor:
   ```sql
   insert into public.inquiries (name, email, phone, message)
   values ('Test User', 'test@test.com', '+44 7700 000000', 'Hello world');
   ```
2. Refresh `/admin/inquiries` — the test row should appear.
3. Click to expand → it should auto-mark as read in the database (verify by refreshing — the unread dot should be gone).
4. Click "Mark Closed" → refresh → status should persist.

---

### 5b. AdminDashboard

**Goal:** Replace mock data with real KPI calculations.

**File:** [src/admin/pages/AdminDashboard.tsx](src/admin/pages/AdminDashboard.tsx)

**Steps:**

1. Remove the mockData import. Add:
   ```ts
   import { listProperties } from "../api/properties";
   import { listInquiries } from "../api/inquiries";
   import type { AdminProperty, AdminInquiry } from "../types";
   ```

2. Replace the synchronous `mockProperties`/`mockInquiries` reads with state + a `useEffect` that fetches both in parallel:
   ```ts
   const [properties, setProperties] = useState<AdminProperty[]>([]);
   const [inquiries, setInquiries] = useState<AdminInquiry[]>([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
     let cancelled = false;
     Promise.all([listProperties(), listInquiries()])
       .then(([props, inqs]) => {
         if (cancelled) return;
         setProperties(props);
         setInquiries(inqs);
       })
       .catch((err) => console.error(err))
       .finally(() => !cancelled && setLoading(false));
     return () => { cancelled = true; };
   }, []);
   ```

3. The existing math (`totalProperties`, `publishedProperties`, etc.) already works on whatever array you point at it — just rename the variables to point at state instead of `mockProperties` / `mockInquiries`.

4. Show a loading skeleton while `loading === true`.

**Verify:** Create a few properties, mark some as published, submit a test inquiry. The dashboard counts should match what's actually in the database.

---

## Step 6 — Public site to Supabase

The public pages still use hardcoded arrays. We need to fetch from Supabase. **RLS already restricts public reads to `published = true`**, so the anon client automatically only sees live listings — no `.eq("published", true)` filter needed.

### 6a. Create a public properties API

**Why a separate file?** The admin API in [src/admin/api/properties.ts](src/admin/api/properties.ts) returns `AdminProperty`, but the public components consume different shapes — `Listing` (from [src/components/ListingCard.tsx](src/components/ListingCard.tsx)) and `PropertyDetail` (from [src/components/properties/PropertyDetailHero.tsx](src/components/properties/PropertyDetailHero.tsx)). Cleaner to have a dedicated public API that returns the right shapes.

**Create:** `src/lib/publicProperties.ts`

**Functions you'll need:**

```ts
import { supabase } from "./supabaseClient";
import type { Listing } from "../components/ListingCard";
import type { PropertyDetail } from "../components/properties/PropertyDetailHero";

export async function listPublicProperties(): Promise<Listing[]> { ... }
export async function getPublicPropertyBySlug(slug: string): Promise<PropertyDetail | null> { ... }
```

**Implementation hints:**

- Use the same query shape as the admin API:
  ```ts
  supabase
    .from("properties")
    .select("*, property_images(url, sort_order)")
    .order("updated_at", { ascending: false })
  ```
- For `getPublicPropertyBySlug`, use `.eq("slug", slug).single()` and handle the `PGRST116` "not found" error code by returning `null`. See `getProperty` in [src/admin/api/properties.ts](src/admin/api/properties.ts) for the exact pattern.
- Sort `property_images` by `sort_order` before extracting URLs.
- **Mapping gotcha:** The `Listing` type has a `sqMeters: number` field, but the database stores `dimensions` as a string like `"10 X 10"`. Either parse it (see [PropertyDetailPage.tsx](src/pages/PropertyDetailPage.tsx) for the existing parse pattern), or simpler: schema-update later to store width/length as numbers. For now, parsing is fine.
- The `Listing` type has `badge: "FOR LET" | "FOR SALE"` — derive from `status`: anything that isn't `"FOR SALE"` becomes `"FOR LET"`.

### 6b. PropertyPage

**File:** [src/pages/PropertyPage.tsx](src/pages/PropertyPage.tsx)

**Steps:**

1. Delete the hardcoded `sliderListings`, `topGridListings`, `bottomGridListings` arrays at the top of the file.

2. Add state and a fetch effect:
   ```ts
   const [allListings, setAllListings] = useState<Listing[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
     listPublicProperties()
       .then(setAllListings)
       .catch((err) => setError(err.message))
       .finally(() => setLoading(false));
   }, []);
   ```

3. Decide how to split the array into the three sections:
   - **Simplest:** slice — first 3 → top grid, next 3 → slider, rest → bottom grid.
   - **Better later:** add a `featured` column to the schema. For MVP, slicing is fine.

4. The existing filter `useMemo` already works on any array — just point it at the new state.

5. Show loading and error states above the sections.

**Verify:** Refresh `/properties` — should show only your published properties. Mark one as draft in the admin → refresh public page → it should disappear.

### 6c. PropertyDetailPage

**File:** [src/pages/PropertyDetailPage.tsx](src/pages/PropertyDetailPage.tsx)

**Steps:**

1. Delete the entire `mockProperties` Record at the top.

2. Replace the synchronous `mockProperties[slug]` lookup with an effect:
   ```ts
   const [property, setProperty] = useState<PropertyDetail | null>(null);
   const [loading, setLoading] = useState(true);
   const [notFound, setNotFound] = useState(false);

   useEffect(() => {
     if (!slug) return;
     setLoading(true);
     getPublicPropertyBySlug(slug)
       .then((p) => {
         if (!p) setNotFound(true);
         else setProperty(p);
       })
       .finally(() => setLoading(false));
   }, [slug]);
   ```

3. Render branches:
   - `loading` → centered "Loading…"
   - `notFound` → keep the existing "Property not found" UI
   - `property` → existing render

4. The "View More Listings" section currently filters `mockProperties` for the carousel of related properties. Easiest fix: also call `listPublicProperties()` once and `slice(0, 3)` excluding the current slug.

**Verify:** Click a property card on `/properties` → details page loads from Supabase with images. Try a bogus URL like `/properties/does-not-exist` → "Property not found" gracefully.

---

## Step 7 — Wire the contact form

**File:** [src/pages/ContactUsPage.tsx](src/pages/ContactUsPage.tsx)

**API already built:** `createInquiry()` in [src/admin/api/inquiries.ts](src/admin/api/inquiries.ts).

> ⚠️ Importing from `src/admin/...` into `src/pages/...` is a slight layering smell. If it bothers you, move `createInquiry` (and its types) to a new `src/lib/inquiries.ts` and have the admin API re-export from there. For MVP, importing directly is fine.

**Current state:** [ContactUsPage.tsx:101-172](src/pages/ContactUsPage.tsx#L101-L172) already has a styled form, but the inputs are **uncontrolled** and submit just calls `e.preventDefault()`. You need to make it controlled and wire it up.

**Steps:**

1. Add state at the top of the component:
   ```ts
   const [form, setForm] = useState({
     name: "",
     email: "",
     phone: "",
     enquiryType: "",
     message: "",
   });
   const [submitting, setSubmitting] = useState(false);
   const [submitted, setSubmitted] = useState(false);
   const [error, setError] = useState<string | null>(null);
   ```

2. Convert the three text inputs from uncontrolled to controlled. The current `.map(...)` at line 102 generates them from an array — easiest is to expand it back to three explicit `<div>` blocks with `value={form.name}` / `onChange={(e) => setForm({...form, name: e.target.value})}` etc. Same treatment for the textarea and the select.

3. Replace the `onSubmit={(e) => e.preventDefault()}` with a real handler:
   ```ts
   const handleSubmit = async (e: FormEvent) => {
     e.preventDefault();
     setSubmitting(true);
     setError(null);
     try {
       await createInquiry({
         name: form.name,
         email: form.email,
         phone: form.phone,
         message: `[${form.enquiryType || "General"}] ${form.message}`,
       });
       setSubmitted(true);
     } catch (err) {
       setError(err instanceof Error ? err.message : "Something went wrong.");
     } finally {
       setSubmitting(false);
     }
   };
   ```
   Note: the `inquiries` table doesn't have an `enquiryType` column — we prepend it to the message. If you want it as a real column, add it to the schema later.

4. Disable the submit button while `submitting`, and show a success message when `submitted === true`. Keep it simple — replace the form with a "Thanks, we'll be in touch within 24 hours" block.

5. Show the error inline above the submit button if `error` is set.

**Verify:** Fill out the contact form on `/contact` → submit → check `/admin/inquiries`. The new inquiry should appear at the top with status `new`.

> ℹ️ Notice that anonymous (logged-out) users can submit. That's intentional — the RLS policy `"anyone can submit inquiries"` allows `insert` for both `anon` and `authenticated` roles. Only `authenticated` users can read them back.

---

## Cleanup after all three steps

Once 5-7 are complete, the mock data file is no longer used. Verify and delete:

```bash
grep -r "data/mockData" src/
```

If no results, delete [src/admin/data/mockData.ts](src/admin/data/mockData.ts).

---

## Tips & gotchas

- **Restart the dev server** if you touch `.env` or the supabase client — Vite hot-reloads most things, but env changes don't pick up.
- **Check the browser console** for `PGRST` errors — those come from PostgREST and usually indicate an RLS policy issue or a typo in a column name.
- **Test logged-out access** by opening an incognito window — the public pages should still work, and `/admin/*` should redirect to login.
- **Debugging Supabase errors:** in any `.catch()`, log the full error object — `error.message`, `error.code`, and `error.details` are all useful.
- **Don't fight TypeScript** — if you see errors about `unknown` from `catch (err)`, use `err instanceof Error ? err.message : "..."`.

---

## Reference: where to find existing patterns

| Pattern | File |
|---|---|
| `useEffect` + cancellation flag + loading/error | [src/admin/pages/AdminProperties.tsx](src/admin/pages/AdminProperties.tsx) |
| Form submit with `saving` state | [src/admin/pages/AdminPropertyForm.tsx](src/admin/pages/AdminPropertyForm.tsx) |
| Mapping a Supabase row to an app type | `mapRow` in [src/admin/api/properties.ts](src/admin/api/properties.ts) |
| `.single()` with not-found handling | `getProperty` in [src/admin/api/properties.ts](src/admin/api/properties.ts) |
| Loading + error banner UI | [src/admin/pages/AdminProperties.tsx](src/admin/pages/AdminProperties.tsx) |
