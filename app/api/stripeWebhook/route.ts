import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/app/lib/firebaseConfig';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-10-28.acacia',
});

export async function POST(req: Request) {
  const sig = req.headers.get('stripe-signature')!;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;
  const body = await req.text();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook error:', err);
    return NextResponse.json({ error: 'Webhook error' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      const lineItems = session.line_items?.data || [];
      const amountTotal = session.amount_total ?? 0;

      const orderData = {
        userId: session.client_reference_id,
        items: lineItems.map((item: any) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.amount_total / 100,
        })),
        totalAmount: amountTotal / 100,
        status: session.payment_status,
        createdAt: new Date(),
      };

      await setDoc(doc(db, 'orders', session.id), orderData);

      console.log('Order saved to Firestore:', session.id);
    } catch (error) {
      console.error('Error saving order to Firestore:', error);
    }
  }

  return NextResponse.json({ received: true });
}
