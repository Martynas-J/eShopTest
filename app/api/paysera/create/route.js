import Paysera from "paysera-nodejs";

export async function POST(req) {
  try {
    const body = await req.json();
    const { amount, orderId, currency = "EUR", email } = body;

    // Paysera klientas
    const paysClient = new Paysera({
      projectid: process.env.PAYSERA_PROJECT_ID,
      sign_password: process.env.PAYSERA_PASSWORD,
      test: process.env.PAYSERA_TEST === "1" ? 1 : 0,
      accepturl: process.env.PAYSERA_RETURN_URL,
      cancelurl: process.env.PAYSERA_RETURN_URL,
      callbackurl: process.env.PAYSERA_CALLBACK_URL,
    });

    // Parametrai
    const params = {
      orderid: orderId,
      amount: Math.round(amount * 100),
      currency,
      payer_email: email,
      country: "LT",
    };

    // Paysera redirect URL
    const url = paysClient.buildRequestUrl(params);

    return new Response(JSON.stringify({ url }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (e) {
    console.error("Paysera create error:", e);
    return new Response(JSON.stringify({ error: "Paysera request failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
