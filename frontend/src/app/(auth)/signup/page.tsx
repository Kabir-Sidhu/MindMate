"use client"; // This directive ensures the component is treated as a client component

import { useState } from "react";
import { useRouter } from "next/navigation"; // Use next/navigation for Next.js 13 and above
import { Button } from "@/components/ui/button"; // Adjust the import path based on your project structure
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function SignupPage() {
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("http://localhost:3030/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    name: name,
                    password: password
                }),
            });

            if (!response.ok) {
                console.log(response);
                throw new Error("Signup failed");
            }

            const data = await response.json();
            console.log("Signup successful: ", data);
            router.push("/");
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="flex flex-col space-y-10">
            <main className="min-w-1/4 space-y-5 flex flex-col items-center justify-center">
                <h1>Signup to MentalMate</h1>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
                <label>
                        <Input
                            placeholder="Enter your username"
                            type="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        <Input
                            placeholder="Enter your full name"
                            type="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </label>
                    
                    <label>
                        <Input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                    {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
                    <Button type="submit">Signup</Button>
                </form>
            </main>
            <Link href="/signup">Don't have an account? Sign up instead</Link>
        </div>
    );
}1