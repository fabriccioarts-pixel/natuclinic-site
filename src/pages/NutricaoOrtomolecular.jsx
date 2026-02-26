import React, { useState, useEffect, useRef } from 'react';
import ServiceLayout from '../components/ServiceLayout';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from "motion/react";
import Unicon from '../components/Unicon';
import { NatuButton } from '../components/Navbar';

gsap.registerPlugin(ScrollTrigger);

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-natu-brown/20 py-6">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-start justify-between w-full text-left focus:outline-none group gap-4"
            >
                <h3 className="font-sans font-black uppercase text-lg md:text-xl text-natu-brown group-hover:text-natu-pink transition-colors leading-[1.2] flex-1" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                    {question}
                </h3>
                <span className={`text-natu-brown text-2xl transition-transform duration-300 font-sans leading-none shrink-0 ${isOpen ? 'rotate-45' : ''}`}>
                    +
                </span>
            </button>
            <div className={`overflow-hidden transition-all duration-300 font-sans font-light text-gray-600 text-left pl-8 ${isOpen ? 'max-h-[500px] mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                {answer}
            </div>
        </div>
    );
};

// Helper component for blur-in animation
const BlurFade = ({ children, delay = 0, className = "" }) => (
    <motion.div
        initial={{ opacity: 0, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay, ease: "easeOut" }}
        className={className}
    >
        {children}
    </motion.div>
);

const NutricaoOrtomolecular = ({ goBack }) => {
    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef(null);
    const containerRef = useRef(null);
    const bgRef = useRef(null);
    const indicatorRef = useRef(null);
    const deckRef = useRef(null);
    const card1Ref = useRef(null);
    const card2Ref = useRef(null);
    const card3Ref = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(bgRef.current, {
                yPercent: 20,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });

            gsap.to(indicatorRef.current, {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "20% top",
                    scrub: true
                },
                opacity: 0,
                y: -10
            });

            // Card Deck Stacking & Pinning Animation
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: deckRef.current,
                    start: "top top",
                    end: "+=800", // Fixed scroll distance for consistency
                    scrub: 1,
                    pin: true,
                    pinSpacing: true, // Dynamically pushes the content below
                    anticipatePin: 1,
                    invalidateOnRefresh: true
                }
            });

            // Card 2 starts with a larger initial gap to avoid text overlap on mobile
            tl.fromTo(card2Ref.current,
                { y: 500, force3D: true },
                { y: 75, ease: "power2.inOut" },
                0.1
            );

            // Card 3 starts with a larger initial gap
            tl.fromTo(card3Ref.current,
                { y: 1000, force3D: true },
                { y: 150, ease: "power2.inOut" },
                0.3
            );

            // Prevent glitches by forcing a refresh calculation
            setTimeout(() => {
                ScrollTrigger.refresh();
            }, 100);

        }, containerRef);
        return () => ctx.revert();
    }, []);

    const handleWhatsApp = () => {
        window.open("https://wa.me/5561992551867?text=Olá! Gostaria de agendar uma consulta de Nutrição Ortomolecular na Natuclinic.", '_blank');
    };

    return (
        <ServiceLayout
            title="Nutrição Ortomolecular"
            goBack={goBack}
            hideHeader={true}
            whatsappMessage="Olá! Gostaria de agendar uma consulta de Nutrição Ortomolecular na Natuclinic."
        >
            {/* 1. Hero Section (Structure from Home) */}
            <section ref={containerRef} className="relative h-[90vh] md:h-screen flex items-center justify-center overflow-hidden bg-white pt-12 md:pt-16">
                <div className="absolute inset-0 flex items-center justify-center p-0 md:p-8 z-0 pt-24 md:pt-32">
                    <div className="relative w-full h-full md:w-[95%] md:h-[85%] rounded-b-[2.5rem] md:rounded-[2.5rem] overflow-hidden">
                        <img
                            ref={bgRef}
                            src="/julimar-meneses-ortomolecular-nutricionista.jpg"
                            alt="Nutrição Ortomolecular na Natuclinic"
                            className="absolute inset-0 w-full h-full object-cover scale-105 pointer-events-none object-[70%_center] md:object-center"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-[5] transition-opacity duration-700 group-hover:opacity-90" />

                        {/* Content */}
                        <div className="absolute inset-0 z-10 flex flex-col justify-end items-center md:items-start p-6 pb-10 md:p-20 md:pb-24">
                            <BlurFade delay={0.2}>
                                <span className="block text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-white/80 mb-3 font-sans">
                                    Ortomolecular em Brasília
                                </span>
                            </BlurFade>
                            <BlurFade delay={0.4}>
                                <h1 className="text-4xl md:text-7xl font-sans font-black text-white leading-[0.85] tracking-tighter text-center md:text-left max-w-4xl mx-auto md:mx-0 uppercase" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                                    Nutrição <br />
                                    Ortomolecular
                                </h1>
                            </BlurFade>
                            <BlurFade delay={0.6}>
                                <p className="mt-4 text-lg md:text-xl font-normal text-white/90 max-w-lg leading-relaxed text-center md:text-left mx-auto md:mx-0 font-sans">
                                    Identifica e corrige desequilíbrios bioquímicos para restaurar sua saúde de dentro para fora.
                                </p>
                            </BlurFade>
                            <BlurFade delay={0.8}>
                                <div className="mt-6 flex justify-center md:justify-start w-full md:w-auto">
                                    <NatuButton onClick={handleWhatsApp}>
                                        Agendar consulta
                                    </NatuButton>
                                </div>
                            </BlurFade>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div ref={indicatorRef} className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 hidden md:block">
                    <div className="animate-bounce">
                        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/40 cursor-pointer">
                            <Unicon name="arrow-down" className="w-5 h-5 text-white" />
                        </div>
                    </div>
                </div>
            </section>


            {/* 2. O Conceito: O que é Nutrição Ortomolecular */}
            <section className="py-24 md:py-40 bg-white">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-32">
                        {/* Video side */}
                        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end relative">
                            <motion.div
                                initial={{ opacity: 0, filter: 'blur(10px)' }}
                                whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="relative w-full max-w-[320px] aspect-[9/16] bg-gray-100 rounded-3xl overflow-hidden shadow-2xl group cursor-pointer"
                            >
                                <video
                                    ref={videoRef}
                                    src="/video-ortomolecular-julimar.mov"
                                    className="w-full h-full object-cover"
                                    autoPlay
                                    muted={isMuted}
                                    loop
                                    playsInline
                                    onClick={(e) => {
                                        const video = e.target;
                                        if (video.paused) video.play();
                                        else video.pause();
                                    }}
                                />

                                {/* Mute Toggle Button */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsMuted(!isMuted);
                                    }}
                                    className="absolute bottom-4 right-4 z-20 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
                                >
                                    <Unicon name={isMuted ? "volume-mute" : "volume"} size={18} />
                                </button>

                                {/* Overlay Gradient for readability of the card below */}
                                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                            </motion.div>

                            {/* Floating Card Decorative */}
                            <motion.div
                                initial={{ opacity: 0, filter: 'blur(10px)', x: 20 }}
                                whileInView={{ opacity: 1, filter: 'blur(0px)', x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className="absolute -bottom-6 -right-6 md:bottom-12 md:-right-12 bg-white p-6 md:p-8 rounded-2xl shadow-xl max-w-[240px] hidden md:block z-20"
                            >
                                <span className="text-[10px] font-bold text-natu-brown/40 uppercase tracking-widest block mb-2 font-sans">Abordagem</span>
                                <p className="text-sm font-sans font-medium text-natu-brown leading-snug">
                                    "Tratamos a saúde na raiz: o equilíbrio químico de cada célula do seu corpo."
                                </p>
                            </motion.div>
                        </div>

                        {/* Text Content side */}
                        <div className="w-full lg:w-1/2">
                            <BlurFade delay={0.3}>
                                <span className="text-[10px] md:text-sm font-bold uppercase tracking-[0.4em] text-natu-brown/40 mb-6 block font-sans">
                                    A Ciência do Equilíbrio
                                </span>
                            </BlurFade>
                            <BlurFade delay={0.4}>
                                <h2 className="text-4xl md:text-5xl font-sans font-black text-[#2D3134] leading-[1] tracking-tighter mb-8 uppercase" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                                    O que é a Nutrição <br /> Ortomolecular?
                                </h2>
                            </BlurFade>
                            <div className="space-y-6">
                                <BlurFade delay={0.5}>
                                    <p className="font-sans text-lg text-gray-700 leading-relaxed font-light">
                                        Criada pelo Dr. Linus Pauling, a nutrição ortomolecular foca no <strong className="font-bold text-natu-brown">reequilíbrio químico do organismo</strong>. Ao contrário da nutrição convencional, que foca apenas em macros, nós olhamos para as moléculas.
                                    </p>
                                </BlurFade>
                                <BlurFade delay={0.6}>
                                    <p className="font-sans text-lg text-gray-700 leading-relaxed font-light">
                                        Identificamos carências de vitaminas, minerais e aminoácidos, além de combater o estresse oxidativo causado pelos radicais livres. É a ciência de fornecer ao seu corpo os <strong className="font-bold text-natu-brown">elementos exatos</strong> para que ele cure a si mesmo.
                                    </p>
                                </BlurFade>
                                <BlurFade delay={0.7}>
                                    <div className="pt-4">
                                        <div className="flex items-start gap-4 mb-4">
                                            <div className="w-1.5 h-1.5 rounded-full bg-natu-pink mt-2.5 shrink-0" />
                                            <p className="text-sm font-sans text-gray-600 leading-relaxed">Foco na longevidade e prevenção de doenças crônicas.</p>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="w-1.5 h-1.5 rounded-full bg-natu-pink mt-2.5 shrink-0" />
                                            <p className="text-sm font-sans text-gray-600 leading-relaxed">Tratamentos personalizados baseados em bioquímica individual.</p>
                                        </div>
                                    </div>
                                </BlurFade>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Identificação dos Sintomas (A "Dor") */}
            <section className="py-24 md:py-40 bg-white overflow-hidden relative">

                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="flex flex-col items-center gap-16 lg:gap-24">
                        {/* Coluna da Esquerda: Conteúdo Estratégico */}
                        <motion.div
                            initial={{ opacity: 0, filter: 'blur(10px)' }}
                            whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="w-full max-w-3xl flex flex-col items-center text-center"
                        >
                            <span className="text-[10px] md:text-sm font-bold uppercase tracking-[0.4em] text-[#2D3134]/40 mb-6 block font-sans">
                                Por que fazer?
                            </span>
                            <h2 className="text-3xl md:text-6xl font-sans font-black text-[#2D3134] leading-[0.95] tracking-tighter mb-8 uppercase" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                                Nutrição Ortomolecular <br /> <span className="text-[#2D3134]/40">Resolve:</span>
                            </h2>
                            <p className="font-sans text-lg md:text-xl text-gray-500 leading-relaxed font-light mb-12">
                                O desequilíbrio que rouba sua energia, <br className="hidden md:block" /> seu humor e a sua vontade de viver.
                            </p>

                            <NatuButton onClick={() => window.open('https://wa.me/5561999999330', '_blank')}>
                                Agendar consulta
                            </NatuButton>
                        </motion.div>

                        {/* Coluna da Direita: Grid de Sinais */}
                        {/* Coluna da Direita: Horizontal scroll on mobile, Grid on desktop */}
                        <div className="w-full overflow-x-auto no-scrollbar snap-x snap-mandatory md:overflow-visible -mx-6 px-6 md:mx-0 md:px-0">
                            <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 min-w-max md:min-w-0">
                                {[
                                    { title: "Cansaço Extremo", desc: "Fadiga persistente que não melhora com o repouso.", delay: 0 },
                                    { title: "Nutrição Oncológica", desc: "Suporte nutricional especializado para pacientes em tratamento oncológico.", delay: 0.1 },
                                    { title: "Inflamação", desc: "Processos inflamatórios intestinais ou sistêmicos recorrentes.", delay: 0.2 },
                                    { title: "Metabolismo", desc: "Resistência a dietas e tratamentos convencionais.", delay: 0.3 }
                                ].map((item, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, filter: 'blur(10px)' }}
                                        whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: item.delay }}
                                        className="snap-center shrink-0 w-[280px] md:w-auto p-8 md:p-10 bg-[#4C261A] border border-white/5 rounded-2xl transition-all duration-500 group cursor-default flex flex-col items-center text-center"
                                    >
                                        {/* Icon Style Circles */}
                                        <div className="relative w-12 h-12 flex items-center justify-center mb-5 shrink-0 transition-transform duration-500">
                                            <div className="absolute inset-0 border border-white/10 rounded-full" />
                                            <div className="absolute inset-[3px] border border-white/10 rounded-full" />
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="text-white transition-colors duration-500">
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                        </div>
                                        <h4 className="font-sans font-black text-white text-xl mb-4 uppercase tracking-tight leading-tight" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                                            {item.title}
                                        </h4>
                                        <p className="font-sans text-sm text-white/40 font-light leading-relaxed transition-colors">
                                            {item.desc}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            <section className="bg-white py-24 md:py-36 overflow-hidden relative">

                <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, filter: 'blur(10px)' }}
                        whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16 md:mb-24"
                    >
                        <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] text-[#2D3134]/40 uppercase block mb-6 font-sans">
                            Nossa Metodologia
                        </span>
                        <h2 className="text-4xl md:text-6xl font-sans font-black text-[#2D3134] uppercase tracking-tighter leading-[0.9]" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                            Pilares do seu <br /> atendimento
                        </h2>
                    </motion.div>

                    <div className="flex flex-col lg:flex-row items-center lg:items-stretch justify-center gap-6">
                        {[
                            {
                                title: "Exames Precisos",
                                desc: "Identificamos deficiências e excessos que exames convencionais não detectam.",
                                bgImage: "/quanto-custa-uma-consulta-com-nutricionista-ortomolecular.webp",
                                icon: (
                                    <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M41.8193 22.9092C41.8192 12.4659 33.3525 4 22.9092 4C12.466 4.00017 4.00017 12.466 4 22.9092C4 33.3525 12.4659 41.8192 22.9092 41.8193C33.3526 41.8193 41.8193 33.3526 41.8193 22.9092ZM45.8193 22.9092C45.8193 35.5617 35.5617 45.8193 22.9092 45.8193C10.2568 45.8192 0 35.5616 0 22.9092C0.000173184 10.2569 10.2569 0.000173173 22.9092 0C35.5616 0 45.8192 10.2568 45.8193 22.9092Z" fill="white" />
                                        <path d="M36.2811 36.2796C37.0621 35.4986 38.3282 35.4986 39.1092 36.2796L51.2069 48.3773C51.9879 49.1583 51.9879 50.4244 51.2069 51.2054C50.4258 51.9865 49.1598 51.9865 48.3788 51.2054L36.2811 39.1078C35.5001 38.3267 35.5001 37.0607 36.2811 36.2796Z" fill="white" />
                                    </svg>
                                )
                            },
                            {
                                title: "Suplementação",
                                desc: "Vitaminas e minerais na dose exata para o seu metabolismo, sem carências.",
                                bgImage: "/suplementação-natural-natuclinic-ortomolecular-em-brasilia.webp",
                                icon: (
                                    <svg width="59" height="59" viewBox="0 0 59 59" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.23651 22.3625C2.05172 22.2169 2.83072 22.7593 2.97675 23.5744C3.60435 27.0833 5.29444 30.3152 7.81854 32.8322L25.7072 50.7209C27.706 52.721 30.1604 54.2064 32.8596 55.049C35.5589 55.8916 38.4225 56.0657 41.2043 55.5578C43.9862 55.0498 46.6038 53.8743 48.8312 52.132C51.0584 50.3898 52.8295 48.1332 53.9924 45.5558C54.333 44.8007 55.2216 44.4642 55.9767 44.8049C56.7319 45.1455 57.0674 46.0341 56.7267 46.7892C55.3641 49.8094 53.2887 52.4539 50.6789 54.4953C48.0691 56.5366 45.0028 57.9138 41.7433 58.509C38.4839 59.1041 35.1288 58.8996 31.966 57.9123C29.0009 56.9867 26.2878 55.3995 24.0305 53.2736L23.5851 52.841L5.6994 34.9552C2.74095 32.0045 0.759309 28.2159 0.0236219 24.1027C-0.12205 23.2873 0.421127 22.5083 1.23651 22.3625ZM16.4914 0.333177C19.7509 -0.262322 23.1067 -0.0572457 26.2697 0.929857C29.4325 1.91688 32.3084 3.65679 34.6506 6.00017L52.5353 23.8879L52.8098 24.1662C55.6185 27.0749 57.5013 30.7554 58.215 34.7414C58.361 35.5568 57.8185 36.3366 57.0031 36.4826C56.1877 36.6285 55.4079 36.0851 55.2619 35.2697C54.6336 31.7607 52.943 28.5294 50.4182 26.0129L32.5295 8.12126C30.5304 6.12101 28.0757 4.6356 25.3762 3.79314C22.6768 2.95074 19.8132 2.77623 17.0314 3.28435C14.2495 3.79259 11.6318 4.96854 9.40448 6.71111C7.17724 8.45366 5.40697 10.7114 4.24433 13.2892C3.90371 14.0444 3.01511 14.3798 2.25995 14.0392C1.50487 13.6987 1.16859 12.8109 1.50897 12.0558C2.87121 9.03545 4.94631 6.39053 7.55585 4.3488C10.1655 2.30711 13.232 0.928712 16.4914 0.333177Z" fill="white" />
                                        <path d="M41.0635 15.7202C41.0695 15.7219 41.1617 15.7404 42.5361 16.0054C43.9091 16.2701 44.0017 16.2887 44.0078 16.2905V16.2925C44.0076 16.2934 44.0071 16.2943 44.0068 16.2954C44.0063 16.298 44.0066 16.3016 44.0059 16.3052C44.0044 16.3123 44.0023 16.3216 44 16.3325C43.9955 16.3544 43.9896 16.3838 43.9814 16.4204C43.9652 16.4937 43.941 16.5962 43.9082 16.7261C43.8426 16.9861 43.7407 17.3565 43.5918 17.8228C43.2939 18.7552 42.8061 20.073 42.0381 21.6665C40.501 24.8555 37.843 29.1429 33.3398 33.646C28.8368 38.149 24.5506 40.8069 21.3623 42.3433C19.769 43.111 18.4508 43.5984 17.5186 43.896C17.0526 44.0447 16.6828 44.1459 16.4229 44.2114C16.2929 44.2442 16.1896 44.2684 16.1162 44.2847C16.0797 44.2927 16.0501 44.2987 16.0283 44.3032C16.0177 44.3054 16.009 44.3077 16.002 44.3091C15.9984 44.3098 15.9948 44.3105 15.9922 44.311C15.9909 44.3113 15.9893 44.3108 15.9883 44.311L15.9873 44.312C15.9866 44.3121 15.9856 44.3118 15.7021 42.8394C15.4259 41.4043 15.4187 41.3666 15.418 41.3657C15.4188 41.3656 15.4198 41.3659 15.4209 41.3657C15.4292 41.364 15.445 41.36 15.4678 41.355C15.5133 41.3449 15.5874 41.3277 15.6885 41.3022C15.8909 41.2512 16.2018 41.1668 16.6064 41.0376C17.4157 40.7792 18.6021 40.3424 20.0596 39.6401C22.973 38.2362 26.9757 35.7679 31.2188 31.5249C35.4619 27.2818 37.9313 23.2781 39.3359 20.3638C40.0386 18.9059 40.4758 17.7192 40.7344 16.9097C40.8637 16.5049 40.9479 16.1942 40.999 15.9917C41.0245 15.8908 41.0416 15.8167 41.0518 15.771C41.0568 15.7483 41.0608 15.7324 41.0625 15.7241C41.0633 15.7205 41.0633 15.7181 41.0635 15.7173V15.7202Z" fill="white" />
                                    </svg>
                                )
                            },
                            {
                                title: "Alimentação",
                                desc: "Uma dieta funcional onde cada alimento escolhido tem um propósito claro.",
                                bgImage: "/nutrição-oncologica-nutricionista-ortomolecular.png",
                                icon: (
                                    <svg width="40" height="54" viewBox="0 0 40 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M36.9624 0.512587C33.771 1.69318 31.0015 3.91907 29.0408 6.87923C27.0801 9.83939 26.0262 13.3859 26.0263 17.0233V25.5214C26.029 26.7942 26.4992 28.0139 27.334 28.9139C28.1688 29.8139 29.3003 30.3207 30.4809 30.3236H37.2377V52.2839C37.2377 52.6416 37.3695 52.9847 37.6042 53.2377C37.8388 53.4907 38.1571 53.6328 38.489 53.6328C38.8188 53.6259 39.1334 53.4815 39.3667 53.23C39.5999 52.9786 39.7338 52.6395 39.7402 52.2839V1.34891C39.7338 0.993321 39.5999 0.654218 39.3667 0.40273C39.1334 0.151241 38.8188 0.00690663 38.489 0C38.3439 0.000183996 38.1999 0.0275703 38.0635 0.0809347L36.9624 0.512587ZM30.4809 27.6257C29.9632 27.6257 29.4667 27.404 29.1006 27.0094C28.7345 26.6148 28.5289 26.0795 28.5289 25.5214V17.0233C28.5299 14.0521 29.3613 11.1501 30.9148 8.6958C32.4683 6.2415 34.6717 4.34876 37.2377 3.26437V27.6257H30.4809ZM18.4687 0.0269782C18.1368 0.0269782 17.8186 0.169096 17.5839 0.422066C17.3493 0.675036 17.2174 1.01814 17.2174 1.37589V14.8111H11.1112V1.37589C11.1112 1.01814 10.9794 0.675036 10.7448 0.422066C10.5101 0.169096 10.1918 0.0269782 9.85998 0.0269782C9.52813 0.0269782 9.20986 0.169096 8.9752 0.422066C8.74054 0.675036 8.60872 1.01814 8.60872 1.37589V14.8111H2.50253V1.37589C2.50253 1.01814 2.3707 0.675036 2.13605 0.422066C1.90139 0.169096 1.58312 0.0269782 1.25127 0.0269782C0.91941 0.0269782 0.601146 0.169096 0.366488 0.422066C0.13183 0.675036 0 1.01814 0 1.37589V18.8578C0.00462262 20.645 0.665254 22.3576 1.83754 23.6214C3.00983 24.8852 4.59847 25.5974 6.25633 25.6024H8.60872V52.2839C8.61512 52.6395 8.74901 52.9786 8.98229 53.23C9.21558 53.4815 9.53013 53.6259 9.85998 53.6328C10.1918 53.6328 10.5101 53.4907 10.7448 53.2377C10.9794 52.9847 11.1112 52.6416 11.1112 52.2839V25.6024H13.4636C15.1229 25.6024 16.7142 24.8918 17.8875 23.6269C19.0608 22.3621 19.72 20.6466 19.72 18.8578V1.37589C19.72 1.01814 19.5881 0.675036 19.3535 0.422066C19.1188 0.169096 18.8006 0.0269782 18.4687 0.0269782ZM17.2174 18.8578C17.2174 19.9311 16.8219 20.9604 16.118 21.7193C15.414 22.4782 14.4592 22.9045 13.4636 22.9045H6.25633C5.26279 22.8975 4.3118 22.4688 3.60924 21.7115C2.90669 20.9541 2.50909 19.9289 2.50253 18.8578V17.5089H17.2174V18.8578Z" fill="white" />
                                    </svg>
                                )
                            },
                            {
                                title: "Monitoramento",
                                desc: "Acompanhamento contínuo para ajustar o tratamento conforme sua evolução.",
                                bgImage: "/julimar-naturopata-em-brasilia.webp",
                                icon: (
                                    <svg width="51" height="43" viewBox="0 0 51 43" fill="none" xmlns="http://www.w3.org/2000/svg" className="scale-125">
                                        <path d="M28.8418 17.2319C28.8418 16.2391 28.4471 15.2866 27.7451 14.5845C27.043 13.8824 26.0905 13.4879 25.0977 13.4878C24.1047 13.4878 23.1523 13.8823 22.4502 14.5845C21.7481 15.2866 21.3535 16.239 21.3535 17.2319C21.3536 18.2248 21.7481 19.1773 22.4502 19.8794C23.1523 20.5814 24.1048 20.9761 25.0977 20.9761C26.0905 20.976 27.043 20.5815 27.7451 19.8794C28.4472 19.1773 28.8417 18.2248 28.8418 17.2319ZM31.8418 17.2319C31.8417 19.0205 31.1309 20.7358 29.8662 22.0005C28.6015 23.2652 26.8862 23.976 25.0977 23.9761C23.3092 23.9761 21.5938 23.2651 20.3291 22.0005C19.0644 20.7358 18.3536 19.0205 18.3535 17.2319C18.3535 15.4433 19.0644 13.7281 20.3291 12.4634C21.5938 11.1986 23.3091 10.4878 25.0977 10.4878C26.8862 10.4879 28.6015 11.1987 29.8662 12.4634C31.1308 13.7281 31.8418 15.4434 31.8418 17.2319Z" fill="white" />
                                        <path d="M47.6347 29.2812C48.2204 28.6955 49.17 28.6955 49.7558 29.2812C50.3414 29.867 50.3415 30.8166 49.7558 31.4023L39.2684 41.8896C38.6827 42.4754 37.7322 42.4754 37.1464 41.8896L31.9032 36.6465C31.3174 36.0607 31.3174 35.1102 31.9032 34.5244C32.489 33.9391 33.4387 33.9389 34.0243 34.5244L38.2069 38.707L47.6347 29.2812ZM25.0975 0C35.2199 0 43.5091 5.67297 49.9813 16.46C50.2663 16.935 50.2663 17.5289 49.9813 18.0039C49.414 18.9496 48.8175 19.878 48.1933 20.7871C47.7242 21.4698 46.7901 21.6427 46.1073 21.1738C45.4248 20.7048 45.2518 19.7716 45.7206 19.0889C46.1392 18.4793 46.5429 17.8596 46.9345 17.2324C40.9115 7.57267 33.629 3 25.0975 3C16.5662 3 9.28256 7.57188 3.25966 17.2314C8.76894 26.0672 15.3254 30.6304 22.8866 31.3574C23.7112 31.4367 24.3154 32.1696 24.2362 32.9941C24.1569 33.8188 23.4241 34.423 22.5995 34.3438C13.58 33.4765 6.13432 27.8713 0.213761 18.0039C-0.0712535 17.5289 -0.0712535 16.935 0.213761 16.46C6.68599 5.67297 14.9752 0 25.0975 0Z" fill="white" />
                                    </svg>
                                )
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, filter: 'blur(10px)' }}
                                whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, delay: i * 0.1 }}
                                className="flex-shrink-1 w-full max-w-[340px] lg:max-w-none lg:w-1/4 flex flex-col items-center justify-end p-8 md:p-10 bg-[#4C261A] border border-white/5 relative overflow-hidden group transition-all duration-500 cursor-default min-h-[480px]"
                                style={{ borderRadius: '16px' }}
                            >
                                {/* Background Image with Scaling Effect */}
                                {item.bgImage && (
                                    <motion.div
                                        className="absolute inset-0 z-0 transition-transform duration-1000 group-hover:scale-110"
                                        style={{
                                            backgroundImage: `url(${item.bgImage})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center'
                                        }}
                                    />
                                )}

                                {/* Gradient Overlay for visibility */}
                                <div className={`absolute inset-0 z-[1] transition-opacity duration-700 bg-gradient-to-t from-[#4C261A]/90 via-[#4C261A]/40 to-transparent ${item.bgImage ? 'opacity-100' : 'opacity-0'}`} />

                                <div className="relative z-10 w-full flex flex-col items-center text-center">
                                    {/* Icon Background Circles */}
                                    <div className="relative w-14 h-14 md:w-16 md:h-16 flex items-center justify-center shrink-0 mb-6 font-sans">
                                        <div className="absolute inset-0 border border-white/20 rounded-full" />
                                        <div className="absolute inset-[4px] border border-white/20 rounded-full" />
                                        <div className="z-10 relative flex items-center justify-center w-6 h-6 [&_path]:fill-white [&_svg]:!fill-white text-white">
                                            {item.icon}
                                        </div>
                                    </div>

                                    <h3 className="font-sans font-black uppercase text-xl md:text-2xl text-white leading-tight text-center tracking-tight mb-4" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                                        {item.title}
                                    </h3>
                                    <p className="font-sans text-sm text-white/80 leading-relaxed text-center tracking-tight">
                                        {item.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Especialidades de Alta Complexidade */}
            <div ref={deckRef} className="bg-white md:h-screen w-full relative flex flex-col items-center justify-start pt-16 md:pt-24 pb-20 px-6">
                {/* Header */}
                <div className="max-w-4xl w-full mb-10 text-center">
                    <BlurFade className="text-center">
                        <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] text-[#2D3134]/40 uppercase block mb-4 font-sans">
                            Áreas de Foco
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-sans font-black text-[#2D3134] uppercase tracking-tighter leading-[0.9]"
                            style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                        >
                            Especialidades de <br /> Alta Complexidade
                        </h2>
                    </BlurFade>
                </div>

                {/* Cards Deck Container */}
                <div className="relative w-full max-w-4xl h-[750px] md:h-[550px] px-6 md:px-0">
                    {/* 4.1 Oncologia */}
                    <section ref={card1Ref} className="absolute inset-x-0 top-0 z-10 will-change-transform" style={{ backfaceVisibility: 'hidden', transform: 'translateZ(0)' }}>
                        <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-6 md:p-10">
                            <div className="mb-6 text-left">
                                <h3 className="text-xl sm:text-2xl md:text-3xl font-sans font-black text-[#2D3134] uppercase tracking-tight" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                                    Oncologia Nutricional Integrativa
                                </h3>
                            </div>
                            <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start">
                                <div className="w-full md:w-1/2">
                                    <div className="aspect-video relative overflow-hidden rounded-2xl">
                                        <img
                                            src="/tratamento-oncologico-nutricional-ortomolecular-Topaz-Gigapixel-escala-2x.jpg"
                                            alt="Oncologia Nutricional"
                                            className="absolute inset-0 w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                                <div className="w-full md:w-1/2">
                                    <p className="text-base text-[#2D3134]/90 font-sans font-light leading-relaxed">
                                        Suporte bioquímico fundamental através do ajuste fino de nutrientes para mitigar efeitos colaterais e fortalecer o sistema imunológico durante a jornada terapêutica.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 4.2 Modulação */}
                    <section ref={card2Ref} className="absolute inset-x-0 top-0 z-20 will-change-transform" style={{ backfaceVisibility: 'hidden', transform: 'translateZ(0)' }}>
                        <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-6 md:p-10">
                            <div className="mb-6 text-left">
                                <h3 className="text-xl sm:text-2xl md:text-3xl font-sans font-black text-[#2D3134] uppercase tracking-tight" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                                    Modulação Intestinal Sistêmica
                                </h3>
                            </div>
                            <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start">
                                <div className="w-full md:w-1/2">
                                    <div className="aspect-video relative overflow-hidden rounded-2xl">
                                        <img
                                            src="/tratamento-reabilitação-intestinal-ortomolecular.jpg"
                                            alt="Modulação Intestinal"
                                            className="absolute inset-0 w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                                <div className="w-full md:w-1/2">
                                    <p className="text-base text-[#2D3134]/90 font-sans font-light leading-relaxed">
                                        Recuperação da barreira epitelial e reequilíbrio profundo da microbiota. O protocolo essencial para silenciar inflamações e restaurar a absorção plena de nutrientes.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 4.3 Performance */}
                    <section ref={card3Ref} className="absolute inset-x-0 top-0 z-30 will-change-transform" style={{ backfaceVisibility: 'hidden', transform: 'translateZ(0)' }}>
                        <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-6 md:p-10">
                            <div className="mb-6 text-left">
                                <h3 className="text-xl sm:text-2xl md:text-3xl font-sans font-black text-[#2D3134] uppercase tracking-tight" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                                    Alta Performance & Longevidade
                                </h3>
                            </div>
                            <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start">
                                <div className="w-full md:w-1/2">
                                    <div className="aspect-video relative overflow-hidden rounded-2xl">
                                        <img
                                            src="/longevidade-com-nutrição-ortomolecular-emagrecimento-e-performance.jpg"
                                            alt="Alta Performance"
                                            className="absolute inset-0 w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                                <div className="w-full md:w-1/2">
                                    <p className="text-base text-[#2D3134]/90 font-sans font-light leading-relaxed">
                                        Ajuste meticuloso de biomarcadores e otimização celular profunda para elevar sua capacidade cognitiva e física ao topo, garantindo vitalidade prolongada.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>


            <div className="px-6 md:px-12 pb-24 max-w-6xl mx-auto mt-10 space-y-24">

                {/* 3. O Processo */}
                <section className="pt-16 md:pt-24 pb-24 md:pb-40 bg-white relative overflow-hidden border-t border-gray-100">
                    <div className="max-w-7xl mx-auto px-6 md:px-12">
                        <div className="text-center mb-24">
                            <span className="text-[10px] md:text-xs font-bold tracking-[0.4em] text-[#2D3134]/30 uppercase block mb-6 font-sans">Jornada do Paciente</span>
                            <h2 className="text-4xl md:text-6xl font-sans font-black text-[#2D3134] uppercase tracking-tighter mb-8 leading-[0.9]" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                                Sua trajetória <br /> para o equilíbrio
                            </h2>
                            <p className="font-sans font-light text-gray-500 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
                                Um processo estruturado e acolhedor, desenhado para que você se sinta seguro em cada etapa da sua transformação.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-20 md:gap-y-32 relative">
                            {[
                                {
                                    title: "Agendamento",
                                    desc: "O início de sua jornada para a saúde começa aqui. Durante o primeiro contato, você será acolhido por nossas atendentes, prontas para entender suas urgências e necessidades."
                                },
                                {
                                    title: "Atendimento",
                                    desc: "Oferecemos atendimento presencial e por teleconsulta. Escolha a opção que melhor se ajusta à sua rotina para receber orientação com conforto e segurança absoluta."
                                },
                                {
                                    title: "Anamnese",
                                    desc: "O seu primeiro diálogo profundo, onde você poderá relatar detalhadamente seu histórico, sintomas e fatos fundamentais para um diagnóstico preciso e personalizado."
                                },
                                {
                                    title: "Diagnóstico",
                                    desc: "Cada caso é único. Você recebe um plano de tratamento exclusivo, que pode incluir exames detalhados, suplementação específica e novos hábitos de vida."
                                },
                                {
                                    title: "Retorno",
                                    desc: "Após o período determinado, analisamos seus exames e evolução. Nesta etapa, realizamos os ajustes finos necessários para garantir a eficácia total do seu protocolo."
                                },
                                {
                                    title: "Acompanhamento",
                                    desc: "Essencial para manter sua saúde a longo prazo. Esta etapa assegura qualidade de vida contínua e garante que você esteja sempre em suas melhores condições vitais."
                                }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, filter: 'blur(10px)' }}
                                    whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.8, delay: i * 0.1 }}
                                    className="relative pt-12 group flex flex-col items-start text-left"
                                >
                                    {/* Line and Dot decoration */}
                                    <div className="absolute top-0 left-0 w-full h-[2px] bg-natu-pink/40 hidden md:block">
                                        {/* Connector to next item */}
                                        {i % 3 !== 2 && (
                                            <div className="absolute top-0 left-full w-12 h-full bg-natu-pink/40" />
                                        )}
                                        <div className="absolute top-1/2 left-0 w-3 h-3 bg-natu-pink rounded-full -translate-y-1/2 ring-8 ring-natu-pink/10 transition-transform duration-500 group-hover:scale-125" />
                                    </div>
                                    <div className="absolute top-0 left-0 w-[2px] h-[calc(100%+80px)] bg-natu-pink/20 md:hidden">
                                        <div className="absolute top-0 left-1/2 w-3 h-3 bg-natu-pink rounded-full -translate-x-1/2 -translate-y-1/2 ring-8 ring-natu-pink/10" />
                                    </div>

                                    <h3 className="font-sans font-black text-[#2D3134] text-xl md:text-2xl mb-5 uppercase tracking-tight transition-colors duration-500" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                                        {item.title}
                                    </h3>
                                    <p className="font-sans font-light text-[#2D3134] text-[13px] md:text-sm leading-relaxed text-pretty">
                                        {item.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 2. Apresentação Dr. Julimar */}
                <section className="py-20 md:py-28 px-6 md:px-16 max-w-[1400px] mx-auto lg:min-h-[80vh] lg:flex lg:items-center">
                    <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20 w-full">
                        {/* Foto */}
                        <motion.div
                            initial={{ opacity: 0, filter: 'blur(10px)' }}
                            whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative w-full max-w-sm lg:w-[420px] shrink-0"
                        >
                            <div className="rounded-xl overflow-hidden aspect-[3/4]">
                                <img
                                    src="/nutricionista-dr-ortomolecular.jfif"
                                    alt="Dr. Julimar Meneses - Nutricionista Ortomolecular"
                                    className="w-full h-full object-cover object-top"
                                />
                            </div>
                        </motion.div>

                        {/* Conteúdo com corner marks */}
                        <motion.div
                            initial={{ opacity: 0, filter: 'blur(10px)' }}
                            whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="flex flex-col justify-center relative p-10 md:p-12"
                        >
                            {/* Corner marks - topo esquerdo */}
                            <div className="absolute top-0 left-0 h-px w-10 bg-gray-400 -translate-x-3" />
                            <div className="absolute top-0 left-0 w-px h-10 bg-gray-400 -translate-y-3" />
                            {/* Corner marks - topo direito */}
                            <div className="absolute top-0 right-0 h-px w-10 bg-gray-400 translate-x-3" />
                            <div className="absolute top-0 right-0 w-px h-10 bg-gray-400 -translate-y-3" />
                            {/* Corner marks - baixo esquerdo */}
                            <div className="absolute bottom-0 left-0 h-px w-10 bg-gray-400 -translate-x-3" />
                            <div className="absolute bottom-0 left-0 w-px h-10 bg-gray-400 translate-y-3" />
                            {/* Corner marks - baixo direito */}
                            <div className="absolute bottom-0 right-0 h-px w-10 bg-gray-400 translate-x-3" />
                            <div className="absolute bottom-0 right-0 w-px h-10 bg-gray-400 translate-y-3" />

                            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-gray-400 mb-4 font-sans">
                                Conheça o especialista
                            </span>
                            <h2 className="text-4xl md:text-5xl font-sans font-black text-gray-900 leading-tight tracking-tighter mb-2 uppercase" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                                Dr. Julimar Meneses
                            </h2>
                            <p className="font-sans text-sm font-medium tracking-widest text-gray-400 uppercase mb-6">
                                Nutricionista · Farmacêutico · Doutor em Naturopatia
                            </p>
                            <div className="space-y-4 font-sans font-light text-gray-500 leading-relaxed text-base max-w-lg">
                                <p>
                                    Formado em Nutrição e Farmácia, com doutorado em Naturopatia e especialização em Biologia Molecular, o Dr. Julimar iniciou sua jornada na Nutrição Ortomolecular em 2016 — uma abordagem que se tornaria o centro de toda a sua atuação clínica e científica.
                                </p>
                                <p>
                                    Pesquisador ativo, dedica parte de sua trajetória ao estudo do uso terapêutico do <em>Aloe Vera Gel</em> e à investigação de casos clínicos em oncologia nutricional, modulação intestinal e fitoterapia. Sua visão integrativa parte de uma crença central: a saúde começa na raiz celular, e tratar de dentro para fora é o caminho mais eficaz e duradouro.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </section>


                {/* 4. Indicações */}
                <section className="py-20 md:py-32 text-center">
                    <BlurFade>
                        <h2 className="text-3xl font-sans font-black uppercase mb-4 text-[#2D3134]" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>Para quem é indicado?</h2>
                        <p className="font-sans font-light text-gray-600 mb-8">A Nutrição Ortomolecular atua em um amplo espectro de condições e objetivos de saúde.</p>
                    </BlurFade>
                    <div className="flex flex-wrap justify-center gap-3">
                        {[
                            "Fadiga crônica", "Ansiedade e estresse", "Distúrbios do sono", "Desequilíbrio hormonal",
                            "Hipotireoidismo", "TPM e menopausa", "Envelhecimento precoce", "Queda de cabelo",
                            "Acne e dermatites", "Dificuldade de emagrecer", "Inflamação silenciosa", "Disbiose intestinal",
                            "Pré e pós-operatório", "Performance esportiva", "Baixa imunidade", "Fibromialgia",
                            "Depressão leve", "Colesterol alto", "Resistência à insulina", "Longevidade e prevenção"
                        ].map((item, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, filter: 'blur(10px)' }}
                                whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: i * 0.03 }}
                                className="px-4 py-2 rounded-full border border-natu-brown/20 text-natu-brown text-sm font-sans font-light bg-[#F9F7F5]/50"
                            >
                                {item}
                            </motion.span>
                        ))}
                    </div>
                </section>


                {/* 6. FAQ */}
                <section className="py-20 md:py-32">
                    <BlurFade className="text-center mb-12">
                        <span className="text-xs font-bold tracking-widest text-[#2D3134]/50 uppercase block mb-4 font-sans">Dúvidas comuns</span>
                        <h2 className="text-3xl md:text-5xl font-sans font-black uppercase text-[#2D3134]" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>Perguntas Frequentes</h2>
                    </BlurFade>

                    <div className="max-w-3xl mx-auto">
                        <FAQItem
                            question="O que é Nutrição Ortomolecular e como ela difere da nutrição convencional?"
                            answer="Enquanto a nutrição convencional muitas vezes foca no cálculo de calorias e macronutrientes, a nutrição ortomolecular atua em nível celular. O objetivo é equilibrar vitaminas, minerais, aminoácidos e neutralizar radicais livres, focando em tratar a causa dos sintomas, não apenas a manifestação externa."
                        />
                        <FAQItem
                            question="Quais exames são solicitados na primeira consulta?"
                            answer="Geralmente, solicitamos um rastreio metabólico profundo. Isso inclui dosagem de vitaminas, minerais, perfil hormonal, marcadores inflamatórios, função tireoidiana, hepática e renal. O objetivo é criar um mapa preciso do funcionamento íntimo do seu corpo."
                        />
                        <FAQItem
                            question="Em quanto tempo verei resultados?"
                            answer="O tempo de resposta varia de acordo com o nível da deficiência nutricional e do comprometimento do seu sistema. Muitas pessoas relatam melhora na disposição física, sono e clareza mental já nas primeiras semanas, enquanto o reequilíbrio metabólico duradouro se consolida ao longo dos meses de acompanhamento."
                        />
                        <FAQItem
                            question="A Nutrição Ortomolecular substitui medicamentos?"
                            answer="Não necessariamente. Tratamos a saúde de forma integrada. O aporte de nutrientes e a correção de deficiências ajudam as células a funcionarem de forma otimizada. Muitas vezes, isso cria a saúde necessária para que o médico possa, com segurança, readequar ou até desmamar a medicação medicamentosa."
                        />
                        <FAQItem
                            question="A Natuclinic atende convênios?"
                            answer="Os nossos atendimentos são particulares. Optamos por este modelo para garantir o tempo de consulta necessário para conhecer nossos pacientes de forma profunda (com consultas mais longas e detalhadas), prezando sempre pela excelência e acolhimento humano da clínica."
                        />
                        <FAQItem
                            question="Posso combinar com os tratamentos estéticos da clínica?"
                            answer="Com certeza! Essa é a combinação perfeita (a verdadeira beleza de dentro para fora). A nutrição fornece a matéria-prima — os blocos construtores que o seu corpo usará para potencializar os resultados de procedimentos de harmonização, bioestimuladores e lasers, assegurando que o brilho se revele também na textura da sua pele e na força dos tecidos."
                        />
                    </div>
                </section>
            </div>

        </ServiceLayout >
    );
};

export default NutricaoOrtomolecular;
