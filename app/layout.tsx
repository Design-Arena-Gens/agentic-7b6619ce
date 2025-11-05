import "../styles/globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "JurisBR - Pesquisa de Jurisprud?ncia",
  description: "Agente IA para pesquisa de jurisprud?ncia nos tribunais brasileiros.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-br">
      <body>
        <header className="container">
          <h1>JurisBR</h1>
          <p className="subtitle">Pesquisa de jurisprud?ncia em STF, STJ, TST, TRFs, TRTs e TJs</p>
        </header>
        <main className="container">{children}</main>
        <footer className="container footer">
          <small>
            Uso experimental. Resultados agregados de fontes oficiais. Verifique sempre no tribunal.
          </small>
        </footer>
      </body>
    </html>
  );
}
