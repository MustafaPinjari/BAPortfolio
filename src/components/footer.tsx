import Link from "next/link";
import { DATA } from "@/data/resume";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0a0a0a] text-neutral-300 border-t border-neutral-800/80 relative overflow-hidden mt-24 pt-16 pb-24 sm:pb-32">
      <div className="w-full px-6 sm:px-10 md:px-16 lg:px-20 xl:px-24">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 sm:gap-10 pb-16">
          {/* Brand & Copyright Column */}
          <div className="col-span-2 sm:col-span-3 md:col-span-2 flex flex-col justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="size-9 rounded-lg bg-white text-black font-black flex items-center justify-center text-sm shadow-md tracking-tighter">
                  MP
                </div>
                <span className="font-bold text-lg text-white tracking-tight font-display">
                  Mustafa Pinjari
                </span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed max-w-xs">
                Business Analyst & Technical Product Builder. Turning complex business problems into clear, actionable digital solutions.
              </p>
            </div>
            <p className="text-xs text-neutral-500">
              © copyright Mustafa Pinjari {new Date().getFullYear()}. All rights reserved.
            </p>
          </div>

          {/* Column 1: Pages */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-200">
              Pages
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-neutral-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/#work" className="hover:text-white transition-colors">
                  Experience
                </Link>
              </li>
              <li>
                <Link href="/#projects" className="hover:text-white transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/#education" className="hover:text-white transition-colors">
                  Education
                </Link>
              </li>
              <li>
                <Link href="/#hackathons" className="hover:text-white transition-colors">
                  Hackathons
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Socials */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-200">
              Socials
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-neutral-400">
              <li>
                <Link
                  href={DATA.contact.social.LinkedIn.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  LinkedIn
                </Link>
              </li>
              <li>
                <Link
                  href={DATA.contact.social.GitHub.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  GitHub
                </Link>
              </li>
              <li>
                <Link
                  href={DATA.contact.social.email.url}
                  className="hover:text-white transition-colors"
                >
                  Email
                </Link>
              </li>
              <li>
                <Link
                  href="https://mustafa-pinjari.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Portfolio
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Focus */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-200">
              Focus
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-neutral-400">
              <li>
                <span className="hover:text-neutral-200 cursor-default">Business Analysis</span>
              </li>
              <li>
                <span className="hover:text-neutral-200 cursor-default">Technical BA</span>
              </li>
              <li>
                <span className="hover:text-neutral-200 cursor-default">BRD & FRD</span>
              </li>
              <li>
                <span className="hover:text-neutral-200 cursor-default">User Stories</span>
              </li>
              <li>
                <span className="hover:text-neutral-200 cursor-default">Process Mapping</span>
              </li>
              <li>
                <span className="hover:text-neutral-200 cursor-default">Agile / Scrum</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Projects */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-200">
              Projects
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-neutral-400">
              <li>
                <Link
                  href="https://bahub-official.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  BAHub
                </Link>
              </li>
              <li>
                <Link
                  href="/#projects"
                  className="hover:text-white transition-colors"
                >
                  NeuroCart
                </Link>
              </li>
              <li>
                <Link
                  href="/#projects"
                  className="hover:text-white transition-colors"
                >
                  WariMitra
                </Link>
              </li>
              <li>
                <Link
                  href="https://duplicatebin.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  DuplicateBin
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Big Signature Watermark Typography */}
        <div className="w-full flex justify-center items-center select-none pointer-events-none pt-8 overflow-hidden">
          <span className="font-extrabold text-[#191919] tracking-tighter text-[13.5vw] leading-none whitespace-nowrap block text-center w-full select-none font-display">
            MustafaPinjari
          </span>
        </div>
      </div>
    </footer>
  );
}
