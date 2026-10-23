import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Call your preferred AI provider (e.g., OpenAI or Anthropic)
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // Fast, intelligent, and cost-effective
        messages: [
          {
            role: 'system',
            content: "You are the lead AI support engineer for WebMCP, an agentic web infrastructure platform. Your job is to help developers configure Cloudflare Edge Proxies, set up /.well-known/mcp.json JSON manifests, manage mcp_live_ API keys, and resolve integration bugs. Be concise, technical, and actionable."
          },
          ...messages
        ],
        temperature: 0.7,
      })
    });

    const data = await response.json();
    const reply = data.choices[0].message.content;

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('AI Support Error:', error);
    return NextResponse.json({ reply: "Sorry, I'm having trouble connecting to the support neural net. Please use the 'Contact Us' tab to submit a human ticket!" }, { status: 500 });
  }
}
