/**
 * Submit form data to Web3Forms so leads land in our inbox.
 * Returns true on success, false on failure. Never throws — UI flow
 * continues even if the backend is unreachable so the WhatsApp fallback
 * still fires.
 */
export async function submitToWeb3Forms(payload: Record<string, string>): Promise<boolean> {
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
  if (!accessKey || accessKey === "PLACEHOLDER") {
    // No key configured — silently skip (form still works via WhatsApp).
    if (process.env.NODE_ENV !== "production") {
      console.warn("[formSubmit] NEXT_PUBLIC_WEB3FORMS_KEY not set — skipping email capture.");
    }
    return false;
  }

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ access_key: accessKey, ...payload })
    });
    const json = (await res.json()) as { success?: boolean };
    return Boolean(json.success);
  } catch {
    return false;
  }
}
