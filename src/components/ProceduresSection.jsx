import { useNavigate, Link } from 'react-router-dom';
import Unicon from './Unicon';
import BlurText from './BlurText';
import { WHATSAPP_LINKS } from '../constants/links';

const ProcedureCard = ({ imageUrl, title, category, path, href, themeColor }) => {
    const isExternal = !!href;

    const Content = () => (
        <div
            className="relative block w-full h-full rounded-2xl overflow-hidden border border-white/10 transition-all duration-500 ease-in-out group-hover:scale-[1.02]"
        >
            <img
                src={imageUrl}
                alt={title}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover grayscale-[20%] transition-transform duration-700 ease-in-out group-hover:scale-110 group-hover:grayscale-0"
            />
            <div
                className="absolute inset-0"
                style={{
                    background: `linear-gradient(to top, hsl(var(--theme-color) / 0.95) 0%, hsl(var(--theme-color) / 0.4) 40%, transparent 80%)`,
                }}
            />
            <div className="relative flex flex-col justify-end h-full p-8 text-white">
                <span className="text-[10px] font-bold text-white/70 mb-2 font-sans">
                    {category}
                </span>
                <h3 className="text-3xl font-serif leading-tight">{title}</h3>
                <div className="mt-8 flex items-center justify-between bg-natu-ivory/10 backdrop-blur-md border border-white/20 rounded-lg px-5 py-4 transition-all duration-300 group-hover:bg-natu-ivory/20 group-hover:border-white/40 flicker-fix">
                    <span className="text-[10px] font-bold font-sans">Saber Mais</span>
                    <Unicon name="arrow-right" className="h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
                </div>
            </div>
        </div>
    );

    if (isExternal) {
        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ "--theme-color": themeColor }}
                className="group w-full aspect-[4/5] cursor-pointer block no-underline"
            >
                <Content />
            </a>
        );
    }

    return (
        <Link
            to={path}
            style={{ "--theme-color": themeColor }}
            className="group w-full aspect-[4/5] cursor-pointer block no-underline"
        >
            <Content />
        </Link>
    );
};

const ProceduresSection = () => {
    const navigate = useNavigate();
    const procedimentos = [
        { title: "Nutrição Ortomolecular", category: "Saúde Celular", imageUrl: "/emagrecimento-saudavel.jpg", theme: "var(--theme-brown)", path: "/procedimentos/nutricao-ortomolecular" },
        { title: "Ninfoplastia Sem Cortes", category: "Estética Íntima", imageUrl: "/ninfoplastia.jpeg", theme: "var(--theme-pink)", href: WHATSAPP_LINKS.MSG_NINFO },
        { title: "Harmonização Corporal", category: "Estética Corporal", imageUrl: "/harmonizacao-corporal.jpg", theme: "var(--theme-brown)", href: WHATSAPP_LINKS.MSG_CORPORAL },
        { title: "Harmonização de Glúteos", category: "Estética Corporal", imageUrl: "/harmonizacao-de-gluteo.jpg", theme: "var(--theme-pink)", path: "/gluteo-dos-sonhos" },
        { title: "Harmonização Facial", category: "Estética Facial", imageUrl: "/harmonizacao-facial.jpg", theme: "var(--theme-brown)", href: WHATSAPP_LINKS.MSG_FACIAL },
        { title: "Terapia Injetável", category: "Soroterapia & Nutrição", imageUrl: "/soroterapia-terapia-injetavel-vitaminas-e-aminoacidos.png", theme: "var(--theme-pink)", href: WHATSAPP_LINKS.MSG_SOROTERAPIA },
    ];

    return (
        <section className="py-16 md:py-20 bg-natu-ivory" id="procedimentos-section">
            <div className="desktop-container">
                <div className="mb-12 md:mb-16 flex flex-col items-start text-left">
                    <span className="text-natu-brown/60 font-medium text-[10px] uppercase tracking-wider">Estética e Nutrição Ortomolecular</span>
                    <div className="mt-4 mb-6 max-w-3xl">
                        <BlurText
                            text="Nutrição Ortomolecular e Estética em Brasília"
                            className="text-3xl md:text-5xl lg:text-6xl font-serif font-normal text-natu-brown leading-[1.05]"
                            delay={150}
                            animateBy="words"
                            direction="top"
                        />
                    </div>
                    <Link
                        to="/procedimentos"
                        className="text-[10px] font-bold border-b border-natu-brown pb-1 hover:opacity-50 transition-all text-natu-brown no-underline"
                    >
                        Ver todos protocolos
                    </Link>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {procedimentos.map((p, i) => (
                        <ProcedureCard
                            key={i}
                            title={p.title}
                            category={p.category}
                            imageUrl={p.imageUrl}
                            themeColor={p.theme}
                            path={p.path}
                            href={p.href}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProceduresSection;
export { ProcedureCard };

