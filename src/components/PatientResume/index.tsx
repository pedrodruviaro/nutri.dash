import React from "react";
import styles from "./styles.module.scss";
import Button from "../Button";
import { User } from "@phosphor-icons/react";
import { PatientResumeType } from "@/pages";

interface PatientResumeProps {
    patient: PatientResumeType;
}

export default function PatientResume({ patient }: PatientResumeProps) {
    return (
        <article className={styles.patientCard}>
            <div className={styles.user}>
                <User size={32} />
                <p>{patient.name}</p>
            </div>

            <div className={styles.buttons}>
                <Button href={`/patients/${patient.id}`}>Pefil</Button>
            </div>
        </article>
    );
}
