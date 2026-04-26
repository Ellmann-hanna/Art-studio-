import React, { useState, useEffect } from 'react';
import {
  Menu, X, Palette, GraduationCap, Mail, MapPin,
  Star, Award, Layers, Users, BookOpen, ChevronDown,
  CheckCircle, ExternalLink, Code2, Gamepad2,
} from 'lucide-react';

// ─── Data ─────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    icon: Palette,
    title: 'Art Classes',
    description:
      'Personalized instruction covering fundamentals through advanced techniques. All skill levels welcome — from complete beginners to students looking to level up.',
    features: [
      'Drawing & Illustration',
      'Digital Art & Design',
      'Color Theory & Composition',
      'Character & Environment Art',
    ],
    price: 'Starting at $60/hr',
    cta: 'Book a Lesson',
  },
  {
    icon: GraduationCap,
    title: 'College Portfolio Coaching',
    description:
      'Tailored guidance for high school students building standout portfolios for top art, game design, and interactive media programs.',
    features: [
      'Portfolio Review & Critique',
      'Project Planning & Execution',
      'Artist Statement Writing',
      'School Selection Strategy',
    ],
    price: 'Starting at $80/hr',
    cta: 'Get Started',
  },
];

const PROJECTS = [
  {
    title: 'Unreal Engine 5 Level Design Collection',
    role: 'Level Designer',
    period: 'Jan 2024 – Present',
    description:
      'A collection of 3D levels made in Unreal Engine 5 — from detailed flow charts and blockouts to polished 3D geometry. Includes comprehensive playtesting cycles and iterative UX refinements.',
    tags: ['Unreal Engine 5', 'Level Design', 'Playtesting'],
    image: 'https://img.youtube.com/vi/isKXBcJgDtc/maxresdefault.jpg',
    link: 'https://www.youtube.com/watch?v=isKXBcJgDtc',
    linkLabel: 'Watch Video',
  },
  {
    title: 'The WereCleaner',
    role: 'Level Designer & Level Artist',
    period: 'June 2023 – May 2024',
    description:
      'Award-winning 3D stealth-cleaning sim about a werewolf janitor. Built the complete level blockout and set-dressing in Unity, iterating on layout through multidisciplinary playtests.',
    tags: ['Unity', 'Level Art', 'Set Dressing', 'Award-Winning'],
    image: 'https://img.youtube.com/vi/UXZ7PWtJC0c/maxresdefault.jpg',
    link: 'https://www.youtube.com/watch?v=UXZ7PWtJC0c&t=1s',
    linkLabel: 'Watch Trailer',
  },
  {
    title: 'Starweave',
    role: 'Design Lead · Level Designer · Level Artist',
    period: 'June 2022 – September 2023',
    description:
      'A 2.5D narrative squad RPG with novel command-refusal mechanics. Led design on 6+ non-combat maps from concept through final furnishing, coordinating with art and creative directors.',
    tags: ['Narrative Design', 'Production Pipeline', 'RPG', 'Design Lead'],
    image: 'https://img.youtube.com/vi/MBxScfVponM/maxresdefault.jpg',
    link: 'https://www.youtube.com/watch?v=MBxScfVponM&t=8s',
    linkLabel: 'Watch Trailer',
  },
];

const OTHER_PROJECTS = [
  {
    title: 'Run Me Up',
    role: 'Level Designer, Level Artist',
    description: 'A custom level made for Half-Life 2 in Hammer editor.',
    image: 'https://img.youtube.com/vi/QcBdJLpNS60/maxresdefault.jpg',
    link: 'https://www.youtube.com/watch?v=QcBdJLpNS60&t=1s',
    linkLabel: 'Watch Video',
  },
  {
    title: 'Shade Shift',
    role: 'Level Designer, Programmer',
    description: '2D platformer where each level consists of two shades of maps.',
    image: 'https://img.youtube.com/vi/HYXiAuuzzfw/maxresdefault.jpg',
    link: 'https://www.youtube.com/watch?v=HYXiAuuzzfw&t=1s',
    linkLabel: 'Watch Video',
  },
  {
    title: 'Super Soul Angel',
    role: 'Designer, Artist',
    description: '3D third-person action shooter — shoot demons and grapple to avoid them.',
    image: 'https://img.youtube.com/vi/RMC9C5U8YM4/maxresdefault.jpg',
    link: 'https://www.youtube.com/watch?v=RMC9C5U8YM4&t=1s',
    linkLabel: 'Watch Trailer',
  },
  {
    title: 'Fly Cook',
    role: 'Developer',
    description: 'An indie game available on itch.io.',
    image: 'https://images.unsplash.com/photo-1556438064-2d7646166914?w=800&auto=format&fit=crop&q=80',
    link: 'https://aylishtime.itch.io/fly-cook',
    linkLabel: 'Play on itch.io',
  },
];

const SKILLS = [
  { category: 'Game Engines', icon: Gamepad2, items: ['Unreal Engine 5', 'Unity'] },
  { category: '3D Software', icon: Layers, items: ['Maya', 'Blender'] },
  { category: 'Scripting', icon: Code2, items: ['Blueprint', 'C++', 'C#', 'Java'] },
  { category: 'Version Control', icon: ExternalLink, items: ['Perforce', 'GitHub'] },
];

const EDUCATION = [
  {
    degree: 'M.I.T. Digital Game Development',
    school: 'Southern Methodist University',
    location: 'Dallas, TX',
    period: '2025 – 2027 (Expected)',
    logo: 'SMU',
  },
  {
    degree: 'B.A. Interactive Media & Games',
    school: 'University of Southern California',
    location: 'Los Angeles, CA',
    period: '2020 – 2024',
    logo: 'USC',
  },
];

const FORMSPREE_URL = 'https://formspree.io/f/xreryrrb';
const CONTACT_INFO = {
  email: 'carolinelzhou@gmail.com',
  linkedin: 'https://www.linkedin.com/in/carolinelzhou/',
  location: 'Danville, CA',
};

// ─── Navbar ───────────────────────────────────────────────────────────────────

const NAV_LINKS = ['Services', 'Portfolio', 'About', 'Contact'];

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const textColor = scrolled ? 'text-stone-800' : 'text-white';
  const navBg = scrolled ? 'bg-white/95 backdrop-blur shadow-md' : 'bg-transparent';

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
        <a href="#" className="flex items-center gap-2.5">
          <Palette size={26} className="text-violet-500" />
          <div className="leading-tight">
            <div className={`font-display text-xl font-bold ${textColor}`}>Art Studio</div>
            <div className={`text-xs font-medium ${scrolled ? 'text-violet-500' : 'text-violet-300'}`}>
              Danville, CA
            </div>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(l => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className={`text-sm font-medium hover:text-violet-500 transition-colors ${textColor}`}
            >
              {l}
            </a>
          ))}
          <a
            href="#contact"
            className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-colors shadow-lg shadow-violet-500/25"
          >
            Book a Session
          </a>
        </div>

        <button onClick={() => setOpen(p => !p)} className={`md:hidden ${textColor}`} aria-label="Toggle menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-stone-100 shadow-xl">
          <div className="px-4 py-5 space-y-2">
            {NAV_LINKS.map(l => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                onClick={() => setOpen(false)}
                className="block py-2 text-stone-700 font-medium hover:text-violet-600 transition-colors"
              >
                {l}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="block mt-3 bg-violet-600 text-white text-center py-3 rounded-full font-semibold"
            >
              Book a Session
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

// ─── Hero ─────────────────────────────────────────────────────────────────────

const Hero: React.FC = () => (
  <section className="relative flex items-center justify-center min-h-screen overflow-hidden">
    <div
      className="absolute inset-0 bg-cover bg-center scale-105"
      style={{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1920&auto=format&fit=crop&q=85)',
      }}
    />
    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/75" />

    <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
      <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-5 py-2 text-sm font-medium mb-8">
        <Star size={14} className="text-amber-400 fill-amber-400" />
        USC & SMU Trained · Game Design & Digital Art
      </div>

      <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold mb-5 leading-tight drop-shadow-lg">
        Unlock Your<br />
        <span className="text-violet-400">Creative Potential</span>
      </h1>
      <p className="text-xl md:text-2xl text-white/85 font-light mb-3">
        Expert art instruction & college portfolio coaching
      </p>
      <p className="text-base md:text-lg text-white/70 mb-10 max-w-2xl mx-auto">
        One-on-one lessons tailored to your goals — from beginner art fundamentals
        to standout portfolios for top universities.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="#contact"
          className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all hover:-translate-y-0.5 hover:shadow-2xl shadow-lg"
        >
          Book a Free Consultation
        </a>
        <a
          href="#services"
          className="bg-white/15 hover:bg-white/25 backdrop-blur border border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all"
        >
          Explore Services
        </a>
      </div>
    </div>

    <a
      href="#services"
      className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-white animate-bounce transition-colors"
    >
      <ChevronDown size={32} />
    </a>
  </section>
);

// ─── Stats Bar ────────────────────────────────────────────────────────────────

const StatsBar: React.FC = () => (
  <div className="bg-violet-700 text-white py-10">
    <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
      {[
        { value: '2', label: 'Degrees in Game Design' },
        { value: '3+', label: 'Shipped Game Projects' },
        { value: '1-on-1', label: 'Personalized Lessons' },
        { value: '100%', label: 'Passion-Driven Teaching' },
      ].map(s => (
        <div key={s.label}>
          <div className="text-3xl font-bold font-display mb-1">{s.value}</div>
          <div className="text-violet-200 text-sm">{s.label}</div>
        </div>
      ))}
    </div>
  </div>
);

// ─── Services ─────────────────────────────────────────────────────────────────

const Services: React.FC = () => (
  <section id="services" className="py-24 md:py-32 bg-stone-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <span className="inline-block bg-violet-100 text-violet-700 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
          What I Offer
        </span>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-stone-900 mb-4">
          Services
        </h2>
        <p className="text-stone-500 max-w-xl mx-auto text-lg">
          Whether you're picking up a pencil for the first time or applying to your dream school,
          there's a path for you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {SERVICES.map(s => (
          <div
            key={s.title}
            className="bg-white rounded-3xl p-8 shadow-sm border border-stone-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="w-14 h-14 bg-violet-100 rounded-2xl flex items-center justify-center mb-6">
              <s.icon size={26} className="text-violet-600" />
            </div>
            <h3 className="text-2xl font-bold text-stone-900 mb-3">{s.title}</h3>
            <p className="text-stone-500 mb-6 leading-relaxed">{s.description}</p>
            <ul className="space-y-2.5 mb-8">
              {s.features.map(f => (
                <li key={f} className="flex items-center gap-2.5 text-stone-600 text-sm">
                  <CheckCircle size={15} className="text-violet-500 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between pt-6 border-t border-stone-100">
              <span className="text-violet-700 font-bold text-lg">{s.price}</span>
              <a
                href="#contact"
                className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-colors"
              >
                {s.cta}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─── Portfolio ────────────────────────────────────────────────────────────────

const Portfolio: React.FC = () => (
  <section id="portfolio" className="py-24 md:py-32 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <span className="inline-block bg-violet-100 text-violet-700 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
          Featured Work
        </span>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-stone-900 mb-4">
          Game Design Portfolio
        </h2>
        <p className="text-stone-500 max-w-xl mx-auto text-lg">
          Professional game projects that inform every lesson — real industry experience
          brought into the classroom.
        </p>
      </div>

      <div className="space-y-12">
        {PROJECTS.map((p, i) => (
          <div
            key={p.title}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${
              i % 2 === 1 ? 'lg:flex-row-reverse' : ''
            }`}
          >
            <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
              <div className="rounded-3xl overflow-hidden shadow-xl">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-72 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
              <div className="flex flex-wrap gap-2 mb-4">
                {p.tags.map(t => (
                  <span
                    key={t}
                    className="bg-violet-100 text-violet-700 text-xs font-semibold px-3 py-1 rounded-full"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <h3 className="text-2xl font-bold text-stone-900 mb-1">{p.title}</h3>
              <p className="text-violet-600 font-medium text-sm mb-4">
                {p.role} · {p.period}
              </p>
              <p className="text-stone-500 leading-relaxed mb-5">{p.description}</p>
              {'link' in p && p.link && (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-colors"
                >
                  <ExternalLink size={14} />
                  {(p as any).linkLabel}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Other Projects grid */}
      <div className="mt-20">
        <h3 className="font-display text-2xl font-bold text-stone-900 text-center mb-10">Other Projects</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {OTHER_PROJECTS.map(p => (
            <div key={p.title} className="bg-stone-50 rounded-2xl overflow-hidden border border-stone-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="relative overflow-hidden">
                <img src={p.image} alt={p.title} className="w-full h-44 object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5">
                <h4 className="font-bold text-stone-900 mb-1">{p.title}</h4>
                <p className="text-violet-600 text-xs font-medium mb-2">{p.role}</p>
                <p className="text-stone-500 text-sm mb-4 leading-relaxed">{p.description}</p>
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-violet-600 hover:text-violet-800 text-sm font-semibold transition-colors"
                >
                  <ExternalLink size={13} />
                  {p.linkLabel}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// ─── About ────────────────────────────────────────────────────────────────────

const About: React.FC = () => (
  <section id="about" className="py-24 md:py-32 bg-stone-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="inline-block bg-violet-100 text-violet-700 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">
            About the Instructor
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-stone-900 mb-2 leading-tight">
            Caroline "Taro" Zhou
          </h2>
          <p className="text-violet-600 font-semibold mb-6">Level Designer & Level Artist</p>
          <p className="text-stone-500 leading-relaxed mb-6 text-lg">
            Hi, I'm Caroline Zhou, also known by my nickname, Taro. I'm a recent graduate
            from the University of Southern California where I received my B.A. in
            Interactive Media and Game Design (USC IMGD). I am currently pursuing an
            M.I.T in Game Development at SMU (Guildhall).
          </p>
          <p className="text-stone-500 leading-relaxed mb-8">
            I'm drawn to creating games with emotional aspects to them, be it comedic and
            humorous or deep and heartfelt — the feel of the game. By focusing on player
            experience, I hope to bring a positive impact to players through my levels.
          </p>

          {/* Education */}
          <div className="space-y-4 mb-8">
            {EDUCATION.map(e => (
              <div
                key={e.school}
                className="flex items-start gap-4 bg-white rounded-2xl p-4 border border-stone-100 shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-violet-700 flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {e.logo}
                </div>
                <div>
                  <div className="font-semibold text-stone-800 text-sm">{e.degree}</div>
                  <div className="text-stone-500 text-xs">{e.school} · {e.location}</div>
                  <div className="text-violet-500 text-xs font-medium">{e.period}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div>
          <div className="bg-white rounded-3xl p-8 border border-stone-100 shadow-sm mb-6">
            <h3 className="font-bold text-stone-900 mb-6 flex items-center gap-2">
              <Award size={18} className="text-violet-600" /> Technical Skills
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {SKILLS.map(s => (
                <div key={s.category}>
                  <div className="flex items-center gap-2 mb-2">
                    <s.icon size={14} className="text-violet-500" />
                    <span className="text-xs font-semibold text-stone-400 uppercase tracking-wide">
                      {s.category}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {s.items.map(item => (
                      <span
                        key={item}
                        className="bg-stone-100 text-stone-700 text-xs px-2.5 py-1 rounded-lg font-medium"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: BookOpen, label: 'USC & SMU\nEducated' },
              { icon: Users, label: 'Award-Winning\nProjects' },
              { icon: Star, label: '1-on-1\nInstruction' },
            ].map(c => (
              <div
                key={c.label}
                className="bg-violet-700 text-white rounded-2xl p-4 text-center"
              >
                <c.icon size={22} className="mx-auto mb-2 text-violet-200" />
                <div className="text-xs font-medium leading-tight whitespace-pre-line text-violet-100">
                  {c.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ─── Contact ──────────────────────────────────────────────────────────────────

const Contact: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    const form = e.currentTarget;
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setStatus('sent');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <span className="inline-block bg-violet-100 text-violet-700 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">
              Get in Touch
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-stone-900 mb-6 leading-tight">
              Let's Start Your<br />Creative Journey
            </h2>
            <p className="text-stone-500 text-lg leading-relaxed mb-10">
              Book a free 30-minute consultation. We'll talk about your goals,
              current skill level, and how to build a plan that works for you.
            </p>

            <div className="space-y-5">
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 bg-violet-100 rounded-2xl flex items-center justify-center group-hover:bg-violet-600 transition-colors">
                  <Mail size={18} className="text-violet-600 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <div className="text-xs text-stone-400 font-medium">Email</div>
                  <div className="text-stone-800 font-semibold">{CONTACT_INFO.email}</div>
                </div>
              </a>

              <a
                href={CONTACT_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 bg-violet-100 rounded-2xl flex items-center justify-center group-hover:bg-violet-600 transition-colors">
                  <ExternalLink size={18} className="text-violet-600 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <div className="text-xs text-stone-400 font-medium">LinkedIn</div>
                  <div className="text-stone-800 font-semibold">linkedin.com/in/carolinelzhou</div>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-violet-100 rounded-2xl flex items-center justify-center">
                  <MapPin size={18} className="text-violet-600" />
                </div>
                <div>
                  <div className="text-xs text-stone-400 font-medium">Location</div>
                  <div className="text-stone-800 font-semibold">{CONTACT_INFO.location}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-stone-50 rounded-3xl p-8 border border-stone-100">
            {status === 'sent' ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <CheckCircle size={52} className="text-violet-500 mb-4" />
                <h3 className="text-2xl font-bold text-stone-900 mb-2">Message Sent!</h3>
                <p className="text-stone-500">
                  Thanks for reaching out — I'll be in touch within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-xl font-bold text-stone-900 mb-6">Book a Free Consultation</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400 bg-white"
                      placeholder="Jane"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400 bg-white"
                      placeholder="Smith"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400 bg-white"
                    placeholder="jane@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">Service Interest</label>
                  <select
                    name="service"
                    required
                    className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400 bg-white"
                  >
                    <option value="">Select a service...</option>
                    <option value="art-classes">Art Classes</option>
                    <option value="portfolio-coaching">College Portfolio Coaching</option>
                    <option value="both">Both</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">Tell me about your goals</label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400 bg-white resize-none"
                    placeholder="Current skill level, target schools, timeline, anything else..."
                  />
                </div>

                {status === 'error' && (
                  <p className="text-red-500 text-sm">Something went wrong. Please try emailing directly.</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full bg-violet-600 hover:bg-violet-700 disabled:opacity-60 text-white py-3.5 rounded-xl font-semibold text-sm transition-colors"
                >
                  {status === 'sending' ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Footer ───────────────────────────────────────────────────────────────────

const Footer: React.FC = () => (
  <footer className="bg-stone-900 text-stone-400 py-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <Palette size={20} className="text-violet-400" />
        <span className="text-white font-semibold">Art Studio · Danville, CA</span>
      </div>
      <p className="text-sm">© {new Date().getFullYear()} Art Studio. All rights reserved.</p>
      <div className="flex gap-6 text-sm">
        <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-white transition-colors">
          {CONTACT_INFO.email}
        </a>
        <a href={CONTACT_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
          LinkedIn
        </a>
      </div>
    </div>
  </footer>
);

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="font-sans">
      <Navbar />
      <Hero />
      <StatsBar />
      <Services />
      <Portfolio />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}
