import { NextResponse } from 'next/server';
import { auth } from '../firebaseConfig/route';
import { signInWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

export async function POST(req: Request): Promise<Response> {
  const { email, password }: { email: string; password: string } =
    await req.json();

  try {
    const userCredential: UserCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return NextResponse.json({ user: userCredential.user });
  } catch (error) {
    console.error('Error logging in user:', error);

    if (error instanceof FirebaseError) {
      return NextResponse.json({ error: error.code }, { status: 400 });
    }

    return NextResponse.json(
      { error: 'Error logging in user' },
      { status: 500 }
    );
  }
}
