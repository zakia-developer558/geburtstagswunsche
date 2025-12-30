import React from "react";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-zinc-900 p-8 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-800">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-serif font-bold text-zinc-900 dark:text-zinc-100">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Please log in to access your account.
          </p>
        </div>
        <form className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 placeholder-zinc-500 text-zinc-900 dark:text-zinc-100 rounded-md focus:outline-none focus:ring-accent focus:border-accent focus:z-10 sm:text-sm dark:bg-zinc-800"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 placeholder-zinc-500 text-zinc-900 dark:text-zinc-100 rounded-md focus:outline-none focus:ring-accent focus:border-accent focus:z-10 sm:text-sm dark:bg-zinc-800"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-accent focus:ring-accent border-zinc-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-zinc-900 dark:text-zinc-300">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link href="#" className="font-medium text-accent hover:text-accent/80">
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-zinc-900 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors"
            >
              Sign in
            </button>
          </div>
          
          <div className="text-center mt-4">
             <p className="text-sm text-zinc-600 dark:text-zinc-400">
               Don't have an account?{' '}
               <Link href="/sign-up" className="font-medium text-accent hover:text-accent/80">
                 Create one
               </Link>
             </p>
          </div>
        </form>
      </div>
    </div>
  );
}
