# Next.js Paysera Demo (minimal)

This is a minimal demo showing Paysera BankLink integration with Next.js (App Router).

Steps:
1. Copy `.env.local.example` to `.env.local` and fill credentials.
2. `npm install`
3. `npm run dev`

Routes:
- Checkout page: http://localhost:3000/checkout
- API create: POST /api/paysera/create
- API callback: POST /api/paysera/callback

Note: This is a demo skeleton. Replace Paysera credentials and adapt DB logic in the callback.
