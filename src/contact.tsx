import React, { useEffect, useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';

export default function ContactPage() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [statusMessage, setStatusMessage] = useState('');

    useEffect(() => {
        // Mouse tracking for background text overlay
        const handleMouseMove = (e: MouseEvent) => {
            const overlays = document.querySelectorAll('.bg-text-overlay') as NodeListOf<HTMLElement>;
            const x = (window.innerWidth - e.pageX) / 50;
            const y = (window.innerHeight - e.pageY) / 50;

            overlays.forEach((overlay) => {
                overlay.style.transform = `translate(${x}px, ${y}px)`;
            });
        };

        document.addEventListener('mousemove', handleMouseMove);

        // Cleanup event listener on unmount
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('loading');
        setStatusMessage('Sending message...');

        const form = e.currentTarget;
        const formData = {
            name: (form.elements.namedItem('name') as HTMLInputElement).value,
            email: (form.elements.namedItem('email') as HTMLInputElement).value,
            subject: (form.elements.namedItem('subject') as HTMLInputElement).value,
            message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
        };

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const response = await fetch(`${apiUrl}/api/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setStatus('success');
                setStatusMessage('Message sent successfully!');
                form.reset();
            } else {
                setStatus('error');
                setStatusMessage(data.message || 'Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setStatus('error');
            setStatusMessage('Failed to connect to the server.');
        }

        // Reset status message after 5 seconds
        setTimeout(() => {
            setStatus('idle');
            setStatusMessage('');
        }, 5000);
    };

    return (
        <div className="font-body-md bg-[#000000] text-[#e2e2e2] overflow-x-hidden selection:bg-neon-lime selection:text-pure-black min-h-screen">
            <style>{`
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .kinetic-border {
            border: 1px solid rgba(173, 235, 51, 0.2);
            transition: border-color 0.3s ease;
        }
        .kinetic-border:focus-within {
            border-color: #ADEB33;
        }
        .bg-text-overlay {
            user-select: none;
            z-index: 0;
            white-space: nowrap;
        }
      `}</style>



            <main className="pt-32">
                {/* Hero Section */}
                <section className="intersect-target transition-all duration-1000 opacity-0 translate-y-10 relative px-gutter max-w-container-max mx-auto mb-section-gap overflow-hidden">
                    <div className="bg-text-overlay absolute top-0 -left-20 opacity-5 font-display-2xl text-display-2xl pointer-events-none">
                        CONNECT CONNECT CONNECT
                    </div>
                    <div className="relative z-10 py-12">
                        <div className="inline-flex items-center gap-2 mb-6 border border-white/20 px-4 py-1 rounded-full">
                            <span className="w-2 h-2 bg-neon-lime rounded-full animate-pulse"></span>
                            <span className="font-label-mono text-label-mono uppercase">Available for new projects</span>
                        </div>
                        <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg max-w-4xl tracking-tight leading-none mb-8">
                            LET'S BUILD <span className="text-neon-lime">SOMETHING GREAT</span> TOGETHER.
                        </h1>
                    </div>
                </section>

                {/* Contact Grid */}
                <section id="contact-form" className="intersect-target transition-all duration-1000 opacity-0 translate-y-10 px-gutter max-w-container-max mx-auto mb-section-gap">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Contact Form */}
                        <div className="lg:col-span-7">
                            <form className="space-y-8" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="group">
                                        <label className="font-label-mono text-label-mono uppercase text-on-surface-variant block mb-2 transition-colors group-focus-within:text-neon-lime">Your Name</label>
                                        <input name="name" required className="w-full bg-transparent border-t-0 border-x-0 border-b border-white/20 px-0 py-4 focus:ring-0 focus:border-neon-lime transition-colors text-body-lg font-body-lg placeholder:text-surface-variant outline-none" placeholder="John Doe" type="text" />
                                    </div>
                                    <div className="group">
                                        <label className="font-label-mono text-label-mono uppercase text-on-surface-variant block mb-2 transition-colors group-focus-within:text-neon-lime">Email Address</label>
                                        <input name="email" required className="w-full bg-transparent border-t-0 border-x-0 border-b border-white/20 px-0 py-4 focus:ring-0 focus:border-neon-lime transition-colors text-body-lg font-body-lg placeholder:text-surface-variant outline-none" placeholder="hello@example.com" type="email" />
                                    </div>
                                </div>
                                <div className="group">
                                    <label className="font-label-mono text-label-mono uppercase text-on-surface-variant block mb-2 transition-colors group-focus-within:text-neon-lime">Subject</label>
                                    <input name="subject" required className="w-full bg-transparent border-t-0 border-x-0 border-b border-white/20 px-0 py-4 focus:ring-0 focus:border-neon-lime transition-colors text-body-lg font-body-lg placeholder:text-surface-variant outline-none" placeholder="New Project Inquiry" type="text" />
                                </div>
                                <div className="group">
                                    <label className="font-label-mono text-label-mono uppercase text-on-surface-variant block mb-2 transition-colors group-focus-within:text-neon-lime">Project Details</label>
                                    <textarea name="message" required className="w-full bg-transparent border-t-0 border-x-0 border-b border-white/20 px-0 py-4 focus:ring-0 focus:border-neon-lime transition-colors text-body-lg font-body-lg placeholder:text-surface-variant outline-none resize-none" placeholder="Tell me about your vision..." rows={4}></textarea>
                                </div>
                                
                                {statusMessage && (
                                    <div className={`p-4 font-label-mono text-sm uppercase rounded-sm border ${status === 'success' ? 'border-neon-lime text-neon-lime bg-neon-lime/10' : status === 'error' ? 'border-red-500 text-red-500 bg-red-500/10' : 'border-white/20 text-white'}`}>
                                        {statusMessage}
                                    </div>
                                )}

                                <button disabled={status === 'loading'} className="group flex items-center gap-4 bg-neon-lime text-pure-black px-10 py-5 rounded-full font-label-mono text-label-mono uppercase font-bold hover:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed" type="submit">
                                    {status === 'loading' ? 'Sending...' : 'Send Message'}
                                    <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">arrow_right_alt</span>
                                </button>
                            </form>
                        </div>

                        {/* Info Side */}
                        <div className="lg:col-span-4 lg:col-start-9 flex flex-col gap-12">
                            {/* Direct Contact */}
                            <div className="space-y-6">
                                <div>
                                    <p className="font-label-mono text-label-mono uppercase text-on-surface-variant mb-2">Email Me</p>
                                    <a className="font-headline-md text-headline-md hover:text-neon-lime transition-colors block" href={"https://mail.google.com/mail/?view=cm&fs=1&to=adithyanbr082@gmail.com"} target="_blank" rel="noopener noreferrer">adithyanbr082@gmail.com</a>
                                </div>
                                <div>
                                    <p className="font-label-mono text-label-mono uppercase text-on-surface-variant mb-2">Call Me</p>
                                    <a className="font-headline-md text-headline-md hover:text-neon-lime transition-colors block" href="tel:+919876543210">+91 8590 171 287</a>
                                </div>
                            </div>

                            {/* Location Indicator */}
                            <div className="pt-8 border-t border-white/10">
                                <p className="font-label-mono text-label-mono uppercase text-on-surface-variant mb-4 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-neon-lime" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                                    Current Location
                                </p>
                                <div className="relative w-full h-48 rounded-3xl overflow-hidden grayscale contrast-125 brightness-75 kinetic-border">
                                    <img alt="Trivandrum Location map" className="w-full h-full object-cover" data-alt="A stylized, low-exposure aerial view of Trivandrum's city lights at night, emphasizing the urban grid and modern architecture. The lighting is dominated by a deep indigo and black night sky, with pinpricks of neon green and white light tracing the streets. The mood is high-tech, futuristic, and perfectly aligns with the cyber-minimalist portfolio aesthetic of dark tones and high-contrast accents." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0jJ1030BLa5NauZXYL0ImcW52KMj1icwQ0qoK6A8kP00Z1rgiyESdjy5aImI5IvngvP-1FB7Hv1zMzZWhvtw4fmLSpnxkQZqsNISMiXPPnAZgz_u_5NNLftWP2ic-VE_uhcGtiRpK5hSF3qflPTVG5gIfVbJ2j2KMVzGIqRY3wHU29RpI6WWIvkROx__WM9i01WcBrIuAFXxuO28HvcIecO4Am1hzfW5ZVSZvg0KhrlbazWWxbcdWlSCXIUHQR9r-dve5E7Rwy-M" />
                                    <div className="absolute inset-0 bg-pure-black/40 flex items-center justify-center">
                                        <span className="bg-pure-black/80 backdrop-blur-md px-4 py-2 rounded-full border border-neon-lime/40 font-label-mono text-label-mono text-neon-lime">Trivandrum, IN</span>
                                    </div>
                                </div>
                            </div>

                            {/* Social Media Oversized Links */}
                            <div className="flex flex-wrap gap-4 pt-8">
                                <a className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center hover:border-neon-lime hover:text-neon-lime transition-all duration-300" href="#">
                                    <img alt="LinkedIn" className="w-6 h-6 opacity-80 hover:opacity-100" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGlZqnUF-F8NN0Tb0VPff5WoHeFJ7Qm3ARb9jUHSm_FYnlgnCkMmRNZ41jDNsX-IVlEyA0zBgqbRfHUB6M-CLG1tuy5dEglHbgWGeYWvLIWpNzJ_JctvVTaLHVZimSlBP6x6QtRhM0IL4-bisD9IUPgc-46vQ7FVD9M2KkCeKtk7tThu2NYvjOFnN91EdWgHjEVi6Sv9bmvKMzp4q1sKP3AF7NjRno3mJrmKYune_PxtJggfXOFUTW8Rq9iynUUujEL80y4lTxNdE" />
                                </a>
                                <a className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center hover:border-neon-lime hover:text-neon-lime transition-all duration-300" href="#">
                                    <img alt="Twitter" className="w-6 h-6 opacity-80 hover:opacity-100" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZ4tJgU8xzZrqnmrn0c10M4BpEEXmZPvMXZo5jsGSGg2Uu6qw8r70SgRLoUm0dgDcf-eJkw3OBvFiDNLxqQEz2KOroA5OdAp2Uh3CaxnUAq-aklfOAFP0KOW_QPiUPgS0vW6NQvOvbm-3hRmx5v4fYDyrnHyaY17kzvEib0bsWY_yUfaB2ZSaQ3em9w4c5p5W3MzkURfXI8a4obf6Kg0jrdSM200scQfDarpiRGkUgP1GnjnlJytGAZF0j5gI-q9LSysuxNnu8nSo" />
                                </a>
                                <a className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center hover:border-neon-lime hover:text-neon-lime transition-all duration-300" href="#">
                                    <img alt="Github" className="w-6 h-6 opacity-80 hover:opacity-100" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkgsafBxvGmgLGj95s8cZlvM6m0DX_jF_RJyTxCQGZ5Cg3VQ1f3fBWQVYUvj-tSj-PuHpmLUibe0_KlGUYpsh6jVf5-r5GY5bVLnRxolH8Gs9QX3Vpu5kcxT9UyxTEDJ4tfHUfaqbU9iVfDzgDDYNHAIpg0Sn1-XUd5VEs5IVQrz5wep4K6mzMXWrLRMnLuQG7AB0-BwvjJx3-Wlmgo0BzT7v4QRiJz_RbTiYbFNIjGwAGOycbYP8mCW8hHLEfVSwJCZWBT3HVfow" />
                                </a>
                                <a className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center hover:border-neon-lime hover:text-neon-lime transition-all duration-300" href="#">
                                    <img alt="Instagram" className="w-6 h-6 opacity-80 hover:opacity-100" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBz6L9aCEsgjd6he-JvvlcriMB96o2AbzRQunix-Rjg-SaDz7pL9J_Xb7I76oALH4fIzKQj19S2aqj4heGqiR9LSHonRuwUA1rWk4XaXfGIUqy-5BXFJl-uyVoKEoYWlePAUevq0wmVMT8iDQn8JWOO5TWNz2c0rM77yXFKdcU7XyISL4IxdJP5CYM7xy5TfWY-eugDCzIrHe6CgBX3Qbwfq9NtmgVQO_CrFxW30zbL1zsBNmlcOCoFfCKJcHiy267_vIdaBiK7VMw" />
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Billboard */}
                <section className="intersect-target transition-all duration-1000 opacity-0 translate-y-10 border-t border-white/5 bg-pure-black py-section-gap overflow-hidden">
                    <div className="max-w-container-max mx-auto px-gutter text-center">
                        <p className="font-label-mono text-label-mono text-neon-lime mb-4 uppercase tracking-[0.3em]">Ready to start?</p>
                        <h2 className="font-display-2xl text-[18vw] leading-none opacity-10 select-none -mb-16">HIRE ME</h2>
                        <div className="relative z-10">
                            <p className="text-body-lg font-body-lg max-w-xl mx-auto mb-10 text-on-surface-variant">
                                I specialize in creating high-performance digital experiences that merge code with creativity. My calendar fills up quickly, so get in touch soon.
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-pure-black border-t border-white/5">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-section-gap px-gutter py-section-gap max-w-container-max mx-auto">
                    <div className="md:col-span-2">
                        <div className="font-headline-lg text-headline-lg text-surface-variant opacity-20 mb-8 select-none uppercase">ADITHYAN</div>
                        <p className="font-body-md text-body-md text-on-surface-variant max-w-sm mb-8">
                            Breaking digital boundaries through code and cinematic design. Based in Trivandrum, building for the world.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-label-mono text-label-mono text-stark-white uppercase mb-6 tracking-widest">Navigation</h4>
                        <ul className="space-y-4">
                            <li><Link className="font-body-md text-body-md text-on-surface-variant hover:text-neon-lime transition-colors" to="/">Home</Link></li>
                            <li><Link className="font-body-md text-body-md text-on-surface-variant hover:text-neon-lime transition-colors" to="/about">About</Link></li>
                            <li><Link className="font-body-md text-body-md text-on-surface-variant hover:text-neon-lime transition-colors" to="/work">Work</Link></li>
                            <li><Link className="font-body-md text-body-md text-on-surface-variant hover:text-neon-lime transition-colors" to="/social">Social</Link></li>
                            <li><Link className="font-body-md text-body-md text-on-surface-variant hover:text-neon-lime transition-colors" to="/services">Services</Link></li>
                            <li><Link className="font-body-md text-body-md text-neon-lime font-bold" to="/contact">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-label-mono text-label-mono text-stark-white uppercase mb-6 tracking-widest">Connect</h4>
                        <ul className="space-y-4">
                            <li><a className="font-body-md text-body-md text-on-surface-variant hover:text-stark-white transition-colors" href="https://twitter.com/AdithyanBr" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                            <li><a className="font-body-md text-body-md text-on-surface-variant hover:text-stark-white transition-colors" href="https://linkedin.com/in/Adithyan-b-r" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                            <li><a className="font-body-md text-body-md text-on-surface-variant hover:text-stark-white transition-colors" href="https://github.com/adithyan-cruz" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-container-max mx-auto px-gutter py-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="font-body-md text-body-md text-on-surface-variant/50">© {new Date().getFullYear()} Adithyan. All rights reserved.</p>
                    <div className="flex items-center gap-8">
                        <span className="font-label-mono text-[12px] uppercase text-on-surface-variant/50"></span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
