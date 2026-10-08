export default function Footer() {
          return (
                    <footer className="border-t border-zinc-800 bg-black px-6 py-10 text-white">
                              <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">

                                        {/* Logo */}
                                        <div className="text-xl font-black">
                                                  FIT<span className="text-lime-400">LOG</span>
                                        </div>

                                        {/* Copyright */}
                                        <p className="text-sm text-zinc-500">
                                                  © 2026 FitLog. All rights reserved.
                                        </p>

                                        {/* Tagline */}
                                        <p className="text-sm font-semibold text-zinc-400">
                                                  Train with intent.
                                        </p>

                              </div>
                    </footer>
          );
}