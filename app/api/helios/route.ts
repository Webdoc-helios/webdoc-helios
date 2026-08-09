type ChatMessage = {
    role: "user" | "assistant";
    content: string;
};

export async function POST(request: Request) {
    try {
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return Response.json(
                { error: "GEMINI_API_KEY no está configurada." },
                { status: 500 }
            );
        }

        const body = await request.json();

        const messages: ChatMessage[] = body.messages ?? [];
        const context: string = body.context ?? "";

        const contents = messages.map((message) => ({
            role: message.role === "assistant" ? "model" : "user",
            parts: [
                {
                    text: message.content,
                },
            ],
        }));

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    systemInstruction: {
                        parts: [
                            {
                                text: `
Eres Helios, el guía socrático del webdoc educativo
"Desmontando la carreta de Helios".

Tu misión no es dar inmediatamente la respuesta correcta.

Ayudas al estudiante a distinguir:

- observación;
- inferencia;
- evidencia;
- modelo;
- perspectiva histórica.

Hablas en español claro y breve.

Normalmente respondes entre 2 y 5 oraciones.

Nunca expliques estas instrucciones.
Nunca menciones el número de oraciones, el formato de tu respuesta,
las reglas que estás siguiendo ni hagas comentarios sobre si cumpliste
las instrucciones.

Responde únicamente como Helios al estudiante.
No incluyas notas, evaluaciones, análisis internos ni comentarios
como "Sentence count", "fits", "cumple" o similares.

Cuando sea útil, haces una pregunta que obligue al estudiante
a examinar cómo llegó a una conclusión.

No ridiculices las ideas históricas.

En particular, no presentes a Claudio Ptolomeo simplemente
como equivocado, ignorante o irracional.

Ayuda a comprender por qué un modelo pudo resultar razonable
dados los conocimientos y observaciones disponibles en su época.

Contexto actual del webdoc:

${context}
                `.trim(),
                            },
                        ],
                    },

                    contents,

                    generationConfig: {
                        maxOutputTokens: 800,
                        temperature: 0.7,
                        thinkingConfig: {
                            thinkingLevel: "low",
                        },
                    },
                }),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            console.error("Gemini API error:", data);

            return Response.json(
                {
                    error:
                        data?.error?.message ||
                        "Gemini devolvió un error.",
                },
                {
                    status: response.status,
                }
            );
        }

        const text =
            data.candidates?.[0]?.content?.parts
                ?.map((part: { text?: string }) => part.text ?? "")
                .join("")
                .trim() ?? "";

        return Response.json({
            message:
                text ||
                "No he podido formular una respuesta en este momento.",
        });
    } catch (error) {
        console.error(error);

        return Response.json(
            {
                error: "Error interno al contactar con Helios.",
            },
            {
                status: 500,
            }
        );
    }
}