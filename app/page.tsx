export default function Home() {
  return (
    <main className="helios-landing">
      <div className="helios-background" aria-hidden="true">
        <div className="helios-sun" />
        <div className="helios-orbit orbit-one" />
        <div className="helios-orbit orbit-two" />
        <div className="helios-glow helios-glow-cyan" />
        <div className="helios-glow helios-glow-gold" />
        <div className="helios-grid" />
      </div>

      <div className="landing-content">
        <p className="project-label">DESMONTANDO LA CARRETA DE HELIOS</p>

        <div className="module-label">
          <span />
          MÓDULO 01
          <span />
        </div>

        <h1 className="landing-title">
          <span>ARISTARCO DE SAMOS</span>
          <span className="versus">VS.</span>
          <span>CLAUDIO PTOLOMEO</span>
        </h1>

        <p className="landing-manifesto">
          Dos modelos.
          <br />
          Una misma realidad.
        </p>

        <button className="start-button" type="button">
          <span>INICIAR LA INVESTIGACIÓN</span>
          <span className="button-arrow" aria-hidden="true">
            →
          </span>
        </button>

        <p className="landing-question">
          ¿Cómo sabemos lo que creemos saber?
        </p>
      </div>

      <div className="landing-footer" aria-hidden="true">
        <span>OBSERVACIÓN</span>
        <span className="footer-line" />
        <span>INFERENCIA</span>
        <span className="footer-line" />
        <span>MODELO</span>
      </div>
    </main>
  );
}
