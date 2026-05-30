import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL ?? "") as string;
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY ?? "") as string;

/** True when the build was given a working Supabase URL + anon key. */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

/** Deeply-proxying stub: any attribute access yields another stub; any call
 *  returns a Supabase-shaped `{ data: null, error }` so callers can `if (error)`
 *  exactly the same way they would against the real client. Keeps the site
 *  from white-screening on a fresh deploy that hasn't been wired to Supabase. */
function unconfiguredStub(): unknown {
  const err = {
    message:
      "Supabase isn't configured yet — set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your deploy environment.",
    name: "SupabaseNotConfigured",
  };
  const handler: ProxyHandler<object> = {
    get: () => new Proxy(() => Promise.resolve({ data: null, error: err }), handler),
    apply: () => Promise.resolve({ data: null, error: err }),
  };
  return new Proxy(function () {}, handler);
}

/** Real client when configured; otherwise the stub above. */
export const supabase: SupabaseClient = (
  isSupabaseConfigured
    ? createClient(supabaseUrl, supabaseAnonKey)
    : unconfiguredStub()
) as SupabaseClient;
