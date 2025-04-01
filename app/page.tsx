"use client";
import {useRouter} from "next/navigation";
import {useCurrentUser, useGoogleSignIn} from "@/firebase/auth";
import {auth, firestore} from "@/firebase/init";
import React from "react";
import {Button} from "@headlessui/react";

export default function Home() {
    const router = useRouter();

    const {signInWithGoogle, isLoading} = useGoogleSignIn(auth, firestore);
    const {profile} = useCurrentUser(auth);

    const handleSignIn = async () => {
        try {
            if (profile) {
                router.push("/dashboard/admin");
                return
            }
            await signInWithGoogle();
            router.push("/dashboard/admin");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="relative">
            <div className="sticky top-0 h-screen flex flex-col items-center justify-center bg-green-400">
                <h2 className="text-4xl">Sample Template</h2>
                <p>Scroll Down</p>
                <Button onClick={handleSignIn}
                        disabled={isLoading}
                        className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2">
                    <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                         fill="currentColor" viewBox="0 0 18 19">
                        <path fillRule="evenodd"
                              d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                              clipRule="evenodd"/>
                    </svg>
                    Sign in with Google
                </Button>
            </div>
            <div className="sticky top-0 h-screen flex flex-col items-center justify-center bg-indigo-600 text-white">
                <h2 className="text-4xl">The Second Title</h2>
                <p>Scroll Down</p>
            </div>
            <div className="sticky top-0 h-screen flex flex-col items-center justify-center bg-purple-600 text-white">
                <h2 className="text-4xl">The Third Title</h2>
                <p>Scroll Down</p>
            </div>
            <div className="sticky top-0 h-screen flex flex-col items-center justify-center bg-neutral-800 text-white">
                <h2 className="text-4xl">The Fourth Title</h2>
            </div>
        </div>
    );
}
