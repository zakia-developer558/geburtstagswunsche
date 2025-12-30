import React from "react";

export default function Footer() {
  return (
    <footer className="bg-zinc-50 pt-16 pb-8 text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Logos Section */}
        <div className="mb-16 flex flex-wrap items-center justify-between gap-8 opacity-60 grayscale filter">
          {/* Using text placeholders that look like logos */}
          <span className="text-xl font-bold uppercase tracking-wider text-red-600">GUTSCH VERLAG</span>
          <span className="text-xl font-bold lowercase tracking-tight text-green-500">cityproducts</span>
          <span className="font-serif text-2xl italic text-red-400">Skorpion</span>
          <span className="text-xl font-black uppercase tracking-tighter text-zinc-800 dark:text-zinc-200">TUSHITA</span>
          <span className="text-lg font-bold text-blue-700">Verlag Dominique</span>
        </div>

        {/* Links Grid */}
        <div className="mb-16 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          {/* Greeting Card Shop */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-zinc-900 dark:text-zinc-100">Greeting Card Shop</h3>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100">About us</a></li>
              <li><a href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100">Contact Now</a></li>
              <li><a href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100">FAQ</a></li>
              <li><a href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100">Guide</a></li>
              <li><a href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100">Become a reseller</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-zinc-900 dark:text-zinc-100">Legal</h3>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100">Imprint</a></li>
              <li><a href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100">GTC</a></li>
              <li><a href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100">Data protection</a></li>
              <li><a href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100">Cancellation policy</a></li>
              <li><a href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100">Payment and Shipping</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-zinc-900 dark:text-zinc-100">Categories</h3>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100">Farewell cards</a></li>
              <li><a href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100">Birthday Greeting Cards</a></li>
              <li><a href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100">Birth Greeting Cards</a></li>
              <li><a href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100">Birthday Cards</a></li>
              <li><a href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100">Anniversary Cards</a></li>
              <li><a href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100">Wedding Greeting Cards</a></li>
              <li><a href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100">Wedding Cards</a></li>
              <li><a href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100">Sympathy Cards</a></li>
              <li><a href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100">Postcards</a></li>
              <li><a href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100">Get well cards</a></li>
            </ul>
          </div>

          {/* Guide */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-zinc-900 dark:text-zinc-100">Guide</h3>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100">Writing a confirmation card</a></li>
              <li><a href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100">Writing a baptism card</a></li>
              <li><a href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100">Writing sympathy cards</a></li>
              <li><a href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100">Writing a Christmas Card</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between border-t border-zinc-200 pt-8 text-xs sm:flex-row dark:border-zinc-800">
          <p>© 2025 Grusskartenladen.de | All prices include VAT.</p>
          <div className="mt-4 flex gap-4 sm:mt-0">
            {/* Payment Icons Placeholders */}
            <span className="font-bold text-blue-800">VISA</span>
            <span className="font-bold text-red-600">Mastercard</span>
            <span className="font-bold text-blue-600">PayPal</span>
            <span className="font-bold text-orange-500">Klarna.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
