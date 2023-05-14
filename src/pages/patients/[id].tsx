import React, { FormEvent, useState } from "react";
import ReactMarkdown from "react-markdown";
import { getSinglePatient, updatePatient } from "@/services/api";
import { GetServerSideProps } from "next";
import request from "graphql-request";

type Patient = {
    name: string;
    age: string;
    weight: string;
    height: string;
    belongsTo: string;
    diets: [
        {
            title: string;
            description: string;
            content: string;
            id: string;
        }
    ];
    notes: [
        {
            createdAt: string;
            content: string;
            id: string;
        }
    ];
};

interface PatientProps {
    id: string;
    patient: Patient;
}

export default function Patient({ id, patient }: PatientProps) {
    const [name, setName] = useState(patient.name);
    const [age, setAge] = useState(Number(patient.age));
    const [height, setHeight] = useState(Number(patient.height));
    const [weight, setWeight] = useState(Number(patient.weight));
    const [note, setNote] = useState("");
    const [notes, setNotes] = useState(patient.notes || []);

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        await updatePatient(id, name, age, height, weight);
    }

    async function handleCreateNote(event: FormEvent) {
        event.preventDefault();

        const endpoint = process.env.CONTENT_API_KEY as string;

        const mutation = `
        mutation CreateNote($patientId: ID!, $content: String!) {
            createNote(data: {content: $content, patient:{connect: { id: $patientId }}}) {
              content
              patient {
                id
              }
            }
            
            publishManyNotesConnection(to:PUBLISHED, first: 100) {
              edges {
                node {
                  id
                }
              }
            }
          }
        `;

        const variables = {
            patientId: id,
            content: note,
        };

        await request(endpoint, mutation, variables);
    }

    async function getRecentNotes() {
        interface ResponseProps {
            patient: {
                notes: [
                    {
                        content: string;
                        createdAt: string;
                        id: string;
                    }
                ];
            };
        }

        const endpoint = process.env.CONTENT_API_KEY as string;

        const query = `
            query getAllNotesFromPatient($ID: ID!) {
                patient(where:{ id: $ID}) {
                notes {
                    id
                    createdAt
                    content
                }
                }
            }
        `;

        const variables = {
            ID: id,
        };

        const response: ResponseProps = await request(
            endpoint,
            query,
            variables
        );
        setNotes(response.patient.notes);
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    <input
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </label>
                <label>
                    <input
                        type="number"
                        value={age}
                        onChange={(event) => setAge(Number(event.target.value))}
                    />
                </label>
                <label>
                    <input
                        type="number"
                        value={height}
                        onChange={(event) =>
                            setHeight(parseFloat(event.target.value))
                        }
                    />
                </label>
                <label>
                    <input
                        type="number"
                        value={weight}
                        onChange={(event) =>
                            setWeight(parseFloat(event.target.value))
                        }
                    />
                </label>

                <button type="submit">Enviar</button>
            </form>

            <div>
                <h2>Nova nota</h2>
                <form onSubmit={handleCreateNote}>
                    <textarea
                        value={note}
                        onChange={(event) => setNote(event.target.value)}
                    ></textarea>
                    <button type="submit">Criar nota</button>
                </form>

                <br />
                <br />
                <hr />
                <h3>Notas</h3>
                {notes.map((note) => (
                    <article key={note.id}>
                        <ReactMarkdown>{note.content}</ReactMarkdown>
                    </article>
                ))}
            </div>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const id = params?.id;
    const patient = await getSinglePatient(id as string);

    if (!patient) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }

    return {
        props: {
            id,
            patient,
        },
    };
};
