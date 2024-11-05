import { NextResponse } from 'next/server';
import { auth } from '../firebaseConfig/route';
import { signOut } from 'firebase/auth';

export async function POST(): Promise<Response> {
  try {
    await signOut(auth);
    return NextResponse.json({ message: 'User logged out successfully' });
  } catch (error) {
    console.error('Error logging out user:', error);
    return NextResponse.json(
      { error: 'Error logging out user' },
      { status: 500 }
    );
  }
}
