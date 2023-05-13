import { getSinglePatient } from "@/services/api";
import { GetServerSideProps } from "next";
import React from "react";

type Patient = {
    name: string;
    age: string;
    weight: string;
    height: string;
};

interface PatientProps {
    id: string;
    patient: Patient;
}

export default function Patient({ id, patient }: PatientProps) {
    return (
        <>
            <h1>{patient.name}</h1>
            <h2>{patient.age}</h2>
            <h3>{patient.height}</h3>
            <h4>{patient.weight}</h4>
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
