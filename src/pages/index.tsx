import Header from "@/components/Header";
import React from "react";
import styles from "../styles/index.module.scss";
import { GetServerSideProps } from "next";
import { getAllPatientsDashboard } from "@/services/api";
import PatientResume from "@/components/PatientResume";

export type PatientResumeType = {
    name: string;
    id: string;
};

interface DashBoardProps {
    patients: PatientResumeType[];
}

export default function Dashboard({ patients }: DashBoardProps) {
    return (
        <>
            <Header />
            <main className={styles.main}>
                <div className={styles.container}>
                    {/* <h1>Seus pacientes</h1> */}
                    <h1>Lorem, ipsum.</h1>
                    <form className={styles.form}>
                        <label>
                            Buscar paciente:
                            <input type="text" placeholder="Nome do paciente" />
                        </label>
                    </form>

                    <section className={styles.patients}>
                        {patients.map((patient) => (
                            <PatientResume key={patient.id} patient={patient} />
                        ))}
                    </section>
                </div>
            </main>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async () => {
    const patients = await getAllPatientsDashboard("pedrodruviaro@gmail.com");

    return {
        props: {
            patients: patients || [],
        },
    };
};
