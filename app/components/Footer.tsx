import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-20 border-t border-white/5 mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-white/10 flex items-center justify-center border border-white/10 text-xs">
                ꦗ
              </div>
              <span className="font-bold">Javanese AI</span>
            </div>
            <p className="text-sm text-white/40 max-w-xs">
              Preserving Javanese language heritage through modern technology.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-12 text-sm">
            <div className="space-y-4">
              <h4 className="font-bold text-white">Project</h4>
              <ul className="space-y-2 text-white/40">
                <li>
                  <Link
                    href="/about"
                    className="hover:text-white transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs"
                    className="hover:text-white transition-colors"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="/changelog"
                    className="hover:text-white transition-colors"
                  >
                    Changelog
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-white">Social</h4>
              <ul className="space-y-2 text-white/40">
                <li>
                  <a
                    href="https://github.com/LearnWithSuryaa/analyzer-app.git"
                    target="_blank"
                    className="hover:text-white transition-colors"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Discord
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="pt-10 mt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/20">
          <p>© {new Date().getFullYear()} Javanese AI. All rights reserved.</p>
          <p>Crafted by LearnWithSuryaa</p>
        </div>
      </div>
    </footer>
  );
}
