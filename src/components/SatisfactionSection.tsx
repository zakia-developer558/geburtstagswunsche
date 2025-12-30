import React from "react";

export default function SatisfactionSection() {
  return (
    <section className="bg-zinc-50 py-16 dark:bg-zinc-900/50">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <h2 className="mb-8 text-2xl font-medium text-zinc-900 dark:text-zinc-100">
          Your satisfaction is important to us!
        </h2>
        
        <div className="space-y-6 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          <p>
            We want you to feel completely comfortable with us! Your opinion counts and helps us to make our offer even better. That's why we are happy about every review - be it a short feedback or a detailed review.
          </p>
          
          <p>
            Do you have any questions about our cards or wishes that we can fulfill? Then get in touch with us at any time! Our team is available for you by phone and e-mail and is available to help and advise you. Because only if you are satisfied, we are too!
          </p>
        </div>
      </div>
    </section>
  );
}
