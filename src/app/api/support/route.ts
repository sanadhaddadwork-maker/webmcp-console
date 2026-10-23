import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages, userPlan, userEmail } = await req.json();

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: `You are the lead AI support engineer for WebMCP, an agentic web infrastructure platform. 
            User Context:
            - Email: ${userEmail || 'Anonymous Visitor'}
            - Subscription Plan: ${userPlan || 'Free Tier'}
            
            Your job is to help developers configure Cloudflare Edge Proxies, set up /.well-known/mcp.json JSON manifests, manage mcp_live_ API keys, and resolve integration bugs. 
            If they ask about limits or features restricted to higher tiers, advise them to check the Plans & Pricing tab or upgrade. Provide precise, copy-pasteable code fixes.`
          },
          ...messages
        ],
        temperature: 0.3,
      })
    });

    const data = await response.json();
    const reply = data.choices[0].message.content;

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('AI Support Error:', error);
    return NextResponse.json({ reply: "I encountered a minor glitch connecting to my diagnostics engine. Please switch to the 'Contact Us' tab so our human engineering team can step in immediately!" }, { status: 500 });
  }
}
