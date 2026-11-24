

"use client";


import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    displayName: "",
    handle: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function update(field: string) {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setSubmitting(false);

    if (!res.ok) {
      setError(data.error || "Something went wrong.");
      return;
    }

    router.push("/home");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen w-full bg-white text-black font-sans">
      <div className="hidden md:flex flex-1 items-center justify-center p-8">
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="w-full max-w-[380px] h-auto fill-current"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </div>

      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-20 max-w-xl mx-auto md:mx-0">
        <div className="md:hidden mb-8">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="w-8 h-8 fill-current">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-8">
          Create your account
        </h1>

        {error && (
          <div className="max-w-sm w-full mb-4 rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form className="flex flex-col gap-4 max-w-sm w-full" onSubmit={handleSubmit}>
          <div className="relative">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.displayName}
              onChange={update("displayName")}
              className="w-full px-4 py-3.5 rounded-md border border-gray-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none text-base placeholder-gray-500 transition"
              required
            />
          </div>

          <div className="relative">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.handle}
              onChange={update("handle")}
              className="w-full px-4 py-3.5 rounded-md border border-gray-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none text-base placeholder-gray-500 transition"
              required
            />
          </div>

          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={update("email")}
              className="w-full px-4 py-3.5 rounded-md border border-gray-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none text-base placeholder-gray-500 transition"
              required
            />
          </div>

          <div className="relative">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={update("password")}
              minLength={8}
              className="w-full px-4 py-3.5 rounded-md border border-gray-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none text-base placeholder-gray-500 transition"
              required
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full mt-4 py-3 px-4 bg-black hover:bg-gray-800 text-white font-bold rounded-full transition duration-200 shadow disabled:opacity-50"
          >
            {submitting ? "Creating account…" : "Create account"}
          </button>
        </form>

        <div className="mt-8 max-w-sm">
          <p className="text-gray-600 text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-sky-500 hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}