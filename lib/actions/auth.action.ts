'use server'

import { db, auth } from "@/firebase/admin";
import { Sign } from "crypto";
import { cookies } from "next/headers";


const ONE_WEEK_IN_MS = 60 * 60 * 24 * 7 * 1000;

export async function signUp(params: SignUpParams){
    const { uid, name, email } = params;
    try {
        const userRecord = await db.collection('users').doc(uid).get();

        if (userRecord.exists) {
            return {
                success: false,
                message: "User already exists"
            };
        }

        await db.collection('users').doc(uid).set({
            name,
            email
        });

        return {
            success: true,
            message: "User signed up successfully"
        };
        
    } catch (e: any) {
        console.error("Error signing up user:", e);
        if (e.code === 'auth/email-already-exists') {
            return {
                success: false,
                message: "Email already in use"
            };
        }
        return {
            success: false,
            message: "Failed to create an account"
        };
    }
}

export async function signIn(params: SignInParams) {
    const { email, idToken } = params;
    try {
        const userRecord = await auth.getUserByEmail(email);
        if (!userRecord) {
            return {
                success: false,
                message: "User not found"
            };
        }

        await setSessionCookie(idToken);
    } catch (e: any) {
        console.error("Error signing in user:", e);
        return {
            success: false,
            message: "Failed to Log In"
        };
    }
}

export async function setSessionCookie(idToken: string) {
    const cookieStore = await cookies();
    const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn: ONE_WEEK_IN_MS });
    cookieStore.set("session", sessionCookie, {
        maxAge: ONE_WEEK_IN_MS,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax'
    });
    return cookieStore;
}

export async function getCurrentUser(): Promise<User | null> {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;
    if (!sessionCookie) {
        return null;
    }
     
    try {
        const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
        const userRecord = await db.collection('users').doc(decodedClaims.uid).get();
        if (!userRecord.exists) {
            return null;
        }
        return {
            ...userRecord.data(),
            id: userRecord.id
           
        } as User;
    } catch (error) {
        console.error("Error getting current user:", error);
        return null;
    }

    
}

export async function isAuthenticated(){
    const user = await getCurrentUser();
    return !!user;
}

export async function getInterviewByUserId(userId: string): Promise<Interview[] | null> {
    const interview = await db
    .collection('interviews')
    .where('userId', '==', userId)
    .orderBy('createdAt', 'desc')
    .get();

    return interview.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    })) as Interview[];
}

export async function getLatestInterviews(params: GetLatestInterviewsParams): Promise<Interview[] | null> {
    const { userId, limit = 20 } = params;
    const interviews = await db
    .collection('interviews')
    .orderBy('createdAt', 'desc')
    .where('finalized', '==', true)
    .where('userId', '!=', userId)
    .limit(limit)
    .get();

    return interviews.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    })) as Interview[];
}
