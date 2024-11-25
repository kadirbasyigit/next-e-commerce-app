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
    const session = await stripe.checkout.sessions.retrieve(
      event.data.object.id as string,
      {
        expand: ['line_items.data.price.product'],
      }
    );

    try {
      const lineItems = session.line_items?.data || [];

      const orderData = {
        userId: session.client_reference_id,
        items: lineItems.map((item: Stripe.LineItem) => {
          let productName = 'Unknown';

          if (item.price?.product && typeof item.price.product !== 'string') {
            if (!('deleted' in item.price.product)) {
              productName = item.price.product.name;
            }
          }

          return {
            name: productName,
            quantity: item.quantity ?? 0,
            price: (item.price?.unit_amount || 0) / 100,
          };
        }),
        totalAmount: (session.amount_total ?? 0) / 100,
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
