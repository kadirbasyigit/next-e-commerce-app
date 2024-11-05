'use client';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const StripeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <Elements stripe={stripePromise}>{children}</Elements>;
};

export default StripeProvider;
