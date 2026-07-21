import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

// --- Subcomponents ---

interface SocialCardProps {
  number: string;
  category: string;
  title: string;
  description: string;
  iconName: string;
  href: string;
}

const SocialCard: React.FC<SocialCardProps> = ({ number, category, title, description, iconName, href }) => {
  const iconRef = useRef<HTMLSpanElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!iconRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPct = (x / rect.width - 0.5) * 20;
    const yPct = (y / rect.height - 0.5) * 20;

    iconRef.current.style.transform = `translate(${xPct}px, ${yPct}px)`;
  };

  const handleMouseLeave = () => {
    if (!iconRef.current) return;
    iconRef.current.style.transform = `translate(0, 0)`;
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative overflow-hidden bg-surface-container border-glow p-card-padding rounded-3xl flex flex-col justify-between h-[300px] social-link-hover"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex justify-between items-start">
        <span className="font-label-mono text-label-mono uppercase text-on-surface-variant">
          {number} / {category}
        </span>
        <span className="material-symbols-outlined text-stark-white arrow-icon transition-transform duration-300">
          north_east
        </span>
      </div>
      <div>
        <h2 className="font-headline-md text-headline-md text-stark-white uppercase">{title}</h2>
        <p className="font-body-md text-body-md text-on-surface-variant mt-2">{description}</p>
      </div>
      <div className="absolute -right-8 -bottom-8 opacity-[0.05] group-hover:opacity-10 transition-opacity">
        <span
          ref={iconRef}
          className="material-symbols-outlined text-[160px] transition-transform duration-75"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          {iconName}
        </span>
      </div>
    </a>
  );
};

// --- Main Component ---

export default function Portfolio() {
  // State for form input labels
  const [activeInput, setActiveInput] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: 'Portfolio Inquiry',
      message: formData.get('message')
    };

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitSuccess(true);
        form.reset();
      } else {
        console.error('Submission failed:', result.message);
        alert(result.message || 'Something went wrong.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to connect to the server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="font-body-md text-body-md bg-pure-black text-on-background overflow-x-hidden min-h-screen">


      <main className="relative pt-32">
        {/* Background Decorative Text */}
        <div className="text-overlap absolute top-20 left-[-5%] font-display-2xl text-display-2xl opacity-[0.03] text-stark-white z-0 select-none pointer-events-none whitespace-nowrap">
          CONNECTION • COLLABORATION • NETWORK
        </div>

        {/* Hero Section */}
        <section className="intersect-target transition-all duration-1000 opacity-0 translate-y-10 relative pt-24 px-gutter max-w-container-max mx-auto mb-section-gap overflow-visible">
          <div className="relative z-10 flex flex-col md:flex-row items-end justify-between gap-12">
            <div className="max-w-2xl">
              <span className="font-label-mono text-label-mono text-neon-lime uppercase tracking-widest block mb-4">
                Get in touch
              </span>
              <h1 className="font-headline-lg text-headline-lg md:text-display-2xl md:font-display-2xl text-stark-white uppercase leading-none">
                Let's build <br />
                <span className="text-neon-lime">Future</span> together.
              </h1>
            </div>
            <div className="md:pb-6">
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-sm">
                Currently open to new projects, creative partnerships, and digital experiments. Reach out via any of the
                channels below.
              </p>
            </div>
          </div>
        </section>

        {/* Social & Contact Grid (Bento Style) */}
        <section className="intersect-target transition-all duration-1000 opacity-0 translate-y-10 px-gutter max-w-container-max mx-auto mb-section-gap">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Large Social Links */}
            <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <SocialCard
                number="01"
                category="Professional"
                title="LinkedIn"
                description="Professional networking and career updates."
                iconName="hub"
                href="https://linkedin.com/in/adithyan-b-r"
              />
              <SocialCard
                number="02"
                category="Visual"
                title="Instagram"
                description="Behind the scenes and visual explorations."
                iconName="camera"
                href="https://instagram.com/adianandhu"
              />
              <SocialCard
                number="03"
                category="Code"
                title="GitHub"
                description="Open source contributions and experiments."
                iconName="terminal"
                href="https://github.com/adithyan-cruz"
              />
              <SocialCard
                number="04"
                category="Design"
                title="Dribbble"
                description="Showcasing pixels and motion designs."
                iconName="draw"
                href="https://dribbble.com/adithyan-offical"
              />
            </div>

            {/* Contact Form Sidebar */}
            <div className="md:col-span-4 bg-neon-lime p-card-padding rounded-3xl text-pure-black h-full flex flex-col">
              <h3 className="font-headline-md text-headline-md uppercase mb-8 leading-tight">
                Send a <br /> Message
              </h3>

              {submitSuccess ? (
                <div className="flex-grow flex flex-col items-center justify-center text-center space-y-4">
                  <span className="material-symbols-outlined text-6xl text-pure-black">check_circle</span>
                  <h4 className="font-headline-md uppercase">Message Sent!</h4>
                  <p className="font-body-md opacity-80">Thanks for reaching out. I'll get back to you soon.</p>
                  <button
                    onClick={() => setSubmitSuccess(false)}
                    className="mt-4 border-b border-pure-black font-label-mono uppercase hover:opacity-70 transition-opacity"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form className="flex-grow space-y-6" onSubmit={handleSubmit}>
                  {['name', 'email'].map((field) => (
                    <div key={field}>
                      <label
                        className="font-label-mono text-[12px] uppercase block mb-1 transition-all"
                        style={{
                          color: activeInput === field ? '#000000' : 'inherit',
                          opacity: activeInput === field ? 1 : 0.6,
                        }}
                      >
                        {field === 'name' ? 'Full Name' : 'Email Address'}
                      </label>
                      <input
                        required
                        name={field}
                        className="w-full bg-transparent border-b-2 border-pure-black/20 focus:border-pure-black outline-none py-2 placeholder:text-pure-black/40 font-body-md"
                        placeholder={field === 'name' ? 'Your Name' : 'email@example.com'}
                        type={field === 'name' ? 'text' : 'email'}
                        onFocus={() => setActiveInput(field)}
                        onBlur={(e) => {
                          if (!e.target.value) setActiveInput(null);
                        }}
                      />
                    </div>
                  ))}
                  <div>
                    <label
                      className="font-label-mono text-[12px] uppercase block mb-1 transition-all"
                      style={{
                        color: activeInput === 'project' ? '#000000' : 'inherit',
                        opacity: activeInput === 'project' ? 1 : 0.6,
                      }}
                    >
                      Project Details
                    </label>
                    <textarea
                      required
                      name="message"
                      className="w-full bg-transparent border-b-2 border-pure-black/20 focus:border-pure-black outline-none py-2 placeholder:text-pure-black/40 font-body-md resize-none"
                      placeholder="Tell me about your project..."
                      rows={4}
                      onFocus={() => setActiveInput('project')}
                      onBlur={(e) => {
                        if (!e.target.value) setActiveInput(null);
                      }}
                    ></textarea>
                  </div>
                  <button
                    disabled={isSubmitting}
                    className="w-full bg-pure-black text-stark-white py-4 rounded-2xl font-label-mono text-label-mono uppercase hover:scale-[0.98] transition-all disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center gap-2"
                    type="submit"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="material-symbols-outlined animate-spin text-sm">sync</span>
                        Sending...
                      </>
                    ) : (
                      'Submit Inquiry'
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* Location / Presence Section */}
        <section className="intersect-target transition-all duration-1000 opacity-0 translate-y-10 px-gutter max-w-container-max mx-auto mb-section-gap">
          <div className="border-t border-white/10 pt-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-3xl overflow-hidden aspect-video bg-surface-container">
              <div
                className="absolute inset-0 grayscale opacity-40 hover:opacity-100 transition-opacity duration-700 cursor-crosshair"
                data-location="Bangalore, India"
              >
                <img
                  className="w-full h-full object-cover"
                  alt="A cinematic, high-contrast black and white aerial drone shot"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBc5LGjssod0A099vOfgp4asGP_Al8JNLAIvsrdXqmPF9kodgzwm2svv62k3ybzvnTsPXm-Lmw59hiEFww-wrmjUuV11irEmct3dHVcElcMuYa9eV9xUMjyZGNtLphxnZKNsr2uf5Q038BqrKLAOQQ7Sf5hNZXThbfilTDlAnDgBDSHTy4xXwnTpeYNGtgazbdoi85IjE1GLzk0NMnFe5pDdPJlPs_d75amjH7vL03zCGegzoaBOjCEc7gLsQrwxL5OWWoqTJOtSYg"
                />
              </div>
              <div className="absolute bottom-6 left-6 bg-pure-black/80 backdrop-blur-md p-4 rounded-xl border border-white/10">
                <p className="font-label-mono text-label-mono text-neon-lime">BASE OF OPERATIONS</p>
                <p className="font-headline-md text-headline-md text-stark-white uppercase">Triavndrum, IN</p>
              </div>
            </div>
            <div>
              <h4 className="font-headline-md text-headline-md text-stark-white uppercase mb-6">
                Collaboration <br /> Inquiries
              </h4>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">
                I'm always looking for innovative projects that push the boundaries of digital interfaces. Whether you
                have a specific project in mind or just want to chat about design systems, feel free to reach out.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/contact" className="flex items-center gap-3 bg-surface-container border border-white/5 px-6 py-4 rounded-full hover:scale-105 transition-transform cursor-pointer">
                  <span className="material-symbols-outlined text-neon-lime">mail</span>
                  <span className="font-label-mono text-label-mono text-stark-white">hello@adithyanbr</span>
                </Link>
                <div className="flex items-center gap-3 bg-surface-container border border-white/5 px-6 py-4 rounded-full">
                  <span className="material-symbols-outlined text-neon-lime">call</span>
                  <span className="font-label-mono text-label-mono text-stark-white">+91 • 6238 209 047</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Marquee / CTA */}
        <section className="intersect-target transition-all duration-1000 opacity-0 translate-y-10 overflow-hidden bg-neon-lime py-12 mb-section-gap flex">
          <div className="whitespace-nowrap flex animate-marquee">
            <span className="font-display-2xl text-display-2xl text-pure-black uppercase mx-8">
              SAY HELLO • LET'S CONNECT • DESIGN THE FUTURE • BUILD BETTER •
            </span>
            <span className="font-display-2xl text-display-2xl text-pure-black uppercase mx-8">
              SAY HELLO • LET'S CONNECT • DESIGN THE FUTURE • BUILD BETTER •
            </span>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-pure-black dark:bg-pure-black border-t border-white/5 full-width bottom-0">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-section-gap px-gutter py-section-gap max-w-container-max mx-auto">
          <div className="md:col-span-2">
            <div className="font-headline-lg text-headline-lg text-surface-variant opacity-20 uppercase mb-8">
              ADITHYAN
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xs">
              Building high-octane digital experiences at the intersection of design and technology.
            </p>
          </div>
          <div>
            <h5 className="font-label-mono text-label-mono text-neon-lime uppercase mb-6">Navigation</h5>
            <ul className="space-y-4">
              <li><Link className="font-body-md text-body-md text-on-surface-variant hover:text-stark-white transition-colors" to="/">Home</Link></li>
              <li><Link className="font-body-md text-body-md text-on-surface-variant hover:text-stark-white transition-colors" to="/about">About</Link></li>
              <li><Link className="font-body-md text-body-md text-on-surface-variant hover:text-stark-white transition-colors" to="/work">Work</Link></li>
              <li><Link className="font-body-md text-body-md text-neon-lime transition-colors" to="/social">Social</Link></li>
              <li><Link className="font-body-md text-body-md text-on-surface-variant hover:text-stark-white transition-colors" to="/services">Services</Link></li>
              <li><Link className="font-body-md text-body-md text-on-surface-variant hover:text-neon-lime transition-colors" to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-label-mono text-label-mono text-neon-lime uppercase mb-6">Legal</h5>
            <ul className="space-y-4">
              {['Privacy Policy', 'Terms of Use', 'Sitemap'].map((item) => (
                <li key={item}>
                  <a
                    className="font-body-md text-body-md text-on-surface-variant hover:text-stark-white transition-colors"
                    href="#"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="px-gutter py-8 border-t border-white/5 max-w-container-max mx-auto flex justify-between items-center">
          <p className="font-body-md text-body-md text-on-surface-variant">
            © 2026 R U Adithyan. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="on-colors">
            </span>
            <span className="material-symbols-outlined text-on-surface-variant hover:text-neon-lime cursor-pointer transition-colors">
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}