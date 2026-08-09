"use client";

import { useState } from "react";

type Screen = "landing" | "problem" | "observation";
type InitialAnswer = "sun" | "earth" | "unsure" | null;
type Classification = "observation" | "interpretation" | null;

export default function Home() {
  const [screen, setScreen] = useState<Screen>("landing");
  const [initialAnswer, setInitialAnswer] = useState<InitialAnswer>(null);

  const [classifications, setClassifications] = useState<
    Record<number, Classification>
  >({
    1: null,
    2: null,
    3: null,
  });

  function classify(id: number, type: Classification) {
    setClassifications((current) => ({
      ...current,
      [id]: type,
    }));
  }

  if (screen === "observation") {
    const completed = Object.values(classifications).every(
      (value) => value !== null
    );

    return (
      <main className="observation-screen">
        <div className="observation-space" aria-hidden="true">
          <div className="observation-stars observation-stars-a" />
          <div className="observation-stars observation-stars-b" />
          <div className="observation-horizon" />

          <div className="observation-earth">
            <div className="earth-glow" />
          </div>

          <div className="observation-sun">
            <div className="observation-sun-core" />
          </div>

          <div className="apparent-path">
            <span className="path-dot path-dot-one" />
            <span className="path-dot path-dot-two" />
            <span className="path-dot path-dot-three" />
          </div>
        </div>

        <header className="experience-header">
          <button
            type="button"
            className="back-button"
            onClick={() => setScreen("problem")}
          >
            ← VOLVER
          </button>

          <div className="chapter-progress">
            <span className="progress-number">02</span>

            <span className="progress-line">
              <span
                className="progress-active"
                style={{ width: "28%" }}
              />
            </span>

            <span className="progress-label">OBSERVACIÓN</span>
          </div>
        </header>

        <section className="observation-content">
          <div className="observation-intro">
            <div>
              <p className="helios-name">HELIOS</p>

              <h1 className="observation-title">
                Antes de construir un modelo,
                <br />
                <span>separemos lo que vemos de lo que inferimos.</span>
              </h1>
            </div>

            <div className="epistemic-equation" aria-label="Observación e inferencia">
              <span>OBSERVACIÓN</span>
              <strong>≠</strong>
              <span>INTERPRETACIÓN</span>
            </div>
          </div>

          <p className="observation-instruction">
            Lee cada afirmación y decide qué tipo de conocimiento representa.
          </p>

          <div className="classification-list">
            <article className="classification-row">
              <div className="statement-number">01</div>

              <div className="statement-copy">
                <p>El Sol aparece por el este y desaparece por el oeste.</p>
              </div>

              <div className="classification-actions">
                <button
                  type="button"
                  className={
                    classifications[1] === "observation"
                      ? "classification-button active"
                      : "classification-button"
                  }
                  onClick={() => classify(1, "observation")}
                >
                  OBSERVACIÓN
                </button>

                <button
                  type="button"
                  className={
                    classifications[1] === "interpretation"
                      ? "classification-button active interpretation"
                      : "classification-button"
                  }
                  onClick={() => classify(1, "interpretation")}
                >
                  INTERPRETACIÓN
                </button>
              </div>
            </article>

            <article className="classification-row">
              <div className="statement-number">02</div>

              <div className="statement-copy">
                <p>La Tierra permanece inmóvil mientras el Sol gira a su alrededor.</p>
              </div>

              <div className="classification-actions">
                <button
                  type="button"
                  className={
                    classifications[2] === "observation"
                      ? "classification-button active"
                      : "classification-button"
                  }
                  onClick={() => classify(2, "observation")}
                >
                  OBSERVACIÓN
                </button>

                <button
                  type="button"
                  className={
                    classifications[2] === "interpretation"
                      ? "classification-button active interpretation"
                      : "classification-button"
                  }
                  onClick={() => classify(2, "interpretation")}
                >
                  INTERPRETACIÓN
                </button>
              </div>
            </article>

            <article className="classification-row">
              <div className="statement-number">03</div>

              <div className="statement-copy">
                <p>Las estrellas parecen desplazarse a través del cielo durante la noche.</p>
              </div>

              <div className="classification-actions">
                <button
                  type="button"
                  className={
                    classifications[3] === "observation"
                      ? "classification-button active"
                      : "classification-button"
                  }
                  onClick={() => classify(3, "observation")}
                >
                  OBSERVACIÓN
                </button>

                <button
                  type="button"
                  className={
                    classifications[3] === "interpretation"
                      ? "classification-button active interpretation"
                      : "classification-button"
                  }
                  onClick={() => classify(3, "interpretation")}
                >
                  INTERPRETACIÓN
                </button>
              </div>
            </article>
          </div>

          {completed && (
            <div className="observation-result">
              <div>
                <span className="result-label">CLAVE DE LA INVESTIGACIÓN</span>

                <p>
                  Una observación describe lo que aparece ante nosotros.
                  Una interpretación intenta explicar por qué ocurre.
                </p>
              </div>

              <div className="result-formula">
                <span>LO QUE VEMOS</span>
                <strong>+</strong>
                <span>UNA EXPLICACIÓN</span>
                <strong>→</strong>
                <span>UN MODELO</span>
              </div>
            </div>
          )}
        </section>

        <footer className="problem-footer">
          <span>OBSERVAR</span>
          <span className="footer-divider" />
          <span>INFERIR</span>
          <span className="footer-divider" />
          <span>MODELAR</span>
        </footer>
      </main>
    );
  }

  if (screen === "problem") {
    return (
      <main className="problem-screen">
        <div className="problem-sky" aria-hidden="true">
          <div className="stars stars-one" />
          <div className="stars stars-two" />
          <div className="horizon-glow" />

          <div className="apparent-sun">
            <div className="sun-core" />
          </div>

          <div className="sky-arc" />
        </div>

        <header className="experience-header">
          <button
            type="button"
            className="back-button"
            onClick={() => {
              setScreen("landing");
              setInitialAnswer(null);
            }}
          >
            ← VOLVER
          </button>

          <div className="chapter-progress">
            <span className="progress-number">01</span>

            <span className="progress-line">
              <span className="progress-active" />
            </span>

            <span className="progress-label">EL PROBLEMA</span>
          </div>
        </header>

        <section className="problem-content">
          <div className="observation-label">
            <span className="observation-dot" />
            OBSERVACIÓN INICIAL
          </div>

          <p className="helios-name">HELIOS</p>

          <h1 className="problem-question">
            Mira el cielo desde la Tierra.
            <br />
            <span>¿Qué pensarías que se está moviendo?</span>
          </h1>

          <p className="problem-instruction">
            Responde únicamente con lo que parece indicar tu experiencia.
            <br />
            Todavía no busques la respuesta correcta.
          </p>

          <div className="answer-options">
            <button
              type="button"
              className={`answer-card ${
                initialAnswer === "sun" ? "selected" : ""
              }`}
              onClick={() => setInitialAnswer("sun")}
            >
              <span className="answer-index">A</span>

              <span className="answer-copy">
                <strong>El Sol se mueve</strong>

                <small>
                  Parece recorrer el cielo mientras la Tierra permanece quieta.
                </small>
              </span>
            </button>

            <button
              type="button"
              className={`answer-card ${
                initialAnswer === "earth" ? "selected" : ""
              }`}
              onClick={() => setInitialAnswer("earth")}
            >
              <span className="answer-index">B</span>

              <span className="answer-copy">
                <strong>La Tierra se mueve</strong>

                <small>
                  El movimiento que veo podría deberse a nuestro propio planeta.
                </small>
              </span>
            </button>

            <button
              type="button"
              className={`answer-card ${
                initialAnswer === "unsure" ? "selected" : ""
              }`}
              onClick={() => setInitialAnswer("unsure")}
            >
              <span className="answer-index">C</span>

              <span className="answer-copy">
                <strong>No estoy seguro</strong>

                <small>
                  Lo que observo no me permite decidirlo todavía.
                </small>
              </span>
            </button>
          </div>

          {initialAnswer && (
            <div className="answer-confirmation">
              <div>
                <span>POSICIÓN INICIAL REGISTRADA</span>

                <p>
                  Conservaremos esta respuesta mientras examinamos la evidencia.
                </p>
              </div>

              <button
                type="button"
                className="continue-button"
                onClick={() => setScreen("observation")}
              >
                CONTINUAR
                <span aria-hidden="true">→</span>
              </button>
            </div>
          )}
        </section>

        <footer className="problem-footer">
          <span>LO QUE VES</span>
          <span className="footer-divider" />
          <span>NO ES TODAVÍA UNA EXPLICACIÓN</span>
        </footer>
      </main>
    );
  }

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

        <button
          className="start-button"
          type="button"
          onClick={() => setScreen("problem")}
        >
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