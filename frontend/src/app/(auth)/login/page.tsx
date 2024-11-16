"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Input } from "../../../components/ui/input";
import Link from "next/link";
import { Button } from "../../../components/ui/button";

export default function SignupPage() {
    const [address, setAddress] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            // Connect to the wallet here
            console.log("Login successful: ");
            router.push("/");
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="flex flex-col space-y-10">
            <main className="min-w-1/4 space-y-5 flex flex-col items-center justify-center">
                <h1>Login to MentalMate</h1>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
                <label>
                        <Input
                            placeholder="Enter your wallet address"
                            type="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </label>
                    {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
                    <Button type="submit">Signup</Button>
                </form>
            </main>
        </div>
    );
}1