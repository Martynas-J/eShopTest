import Paysera from "paysera-nodejs";

export async function POST(req) {
  try {
    const rawBody = await req.text();

    const params = Object.fromEntries(new URLSearchParams(rawBody));

    // Paysera klientas
    const paysClient = new Paysera({
      projectid: process.env.PAYSERA_PROJECT_ID,
      sign_password: process.env.PAYSERA_PASSWORD,
    });

    // Tikrinam sign
    const isValid = paysClient.checkCallback(rawBody);

    if (!isValid) {
      console.warn("Invalid Paysera callback signature");
      return new Response("Invalid", { status: 400 });
    }

    console.log("Paysera callback received:", params);

    // TODO: update DB with params.orderid, params.status

    return new Response("OK", { status: 200 });

  } catch (e) {
    console.error("Callback error:", e);
    return new Response("ERROR", { status: 500 });
  }
}
