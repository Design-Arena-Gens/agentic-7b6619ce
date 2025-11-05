import { z } from "zod";
import { resolveDomains } from "@/lib/courts";
import { searchAcrossDomains } from "@/lib/search";

const BodySchema = z.object({
  query: z.string().min(2),
  groups: z.array(z.enum(["STF","STJ","TST","TRFs","TRTs","TJs","ALL"]).nullable()).optional().transform((v) => (v?.filter(Boolean) as any) ?? ["ALL"]),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const { query, groups } = BodySchema.parse(json);
    const domains = resolveDomains(groups as any);
    const results = await searchAcrossDomains(domains, query, 4);
    return Response.json({ results });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err?.message ?? "Invalid request" }), { status: 400 });
  }
}
