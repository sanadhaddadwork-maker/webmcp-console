import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name } = await request.json();
    if (!name) {
      return NextResponse.json({ error: "Key name is required" }, { status: 400 });
    }

    // Generate high-entropy API key
    const randomHex = Array.from(crypto.getRandomValues(new Uint8Array(20)))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    const fullKey = `ak_live_${randomHex}`;
    const keyPreview = `${fullKey.substring(0, 10)}••••••••${fullKey.substring(fullKey.length - 4)}`;

    // TODO: Hash the fullKey using crypto.subtle or bcrypt before saving to Supabase table `api_keys`
    // For now, we return the structure ready for database wiring.

    return NextResponse.json({
      success: true,
      key: {
        id: Date.now().toString(),
        name,
        keyPreview,
        fullKey, // Returned ONLY once upon creation
        createdAt: "Just now",
        lastUsed: "Never",
      }
    });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
