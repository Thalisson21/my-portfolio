import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

/*
    Ajuste os caminhos abaixo para apontarem para suas páginas reais.
    Exemplo de estrutura sugerida: src/pages/Home.jsx, src/pages/About.jsx, src/pages/Projects.jsx
*/
const Home = lazy(() => import("../views/pages/home/Home"));
const About = lazy(() => import("../views/pages/about/About"));
const Projects = lazy(() => import("../views/pages/projects/Projects"));
const Contact = lazy(() => import("../views/pages/contact/Contact"));

function NotFound() {
    return (
        <div style={{ padding: 20, textAlign: "center" }}>
            <h2>Página não encontrada</h2>
            <p>Verifique a URL ou volte para a página inicial.</p>
        </div>
    );
}

/*
    Componente de rotas principal.
    Use <AppRoutes /> em src/main.jsx ou src/index.jsx (onde você monta o React).
*/
export default function AppRoutes() {
    return (
        <Router>
            <Suspense fallback={<div>Carregando...</div>}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/contacts" element={<Contact />} />

                    {/* redireciona /home para / */}
                    <Route path="/home" element={<Navigate to="/" replace />} />

                    {/* rota curinga */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
        </Router>
    );
}