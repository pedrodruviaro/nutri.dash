import React from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import Button from "@/components/Button";
import image from "../../../public/login-image.png";
import logo from "../../../public/logo.svg";
import icon from "../../../public/google-icon.svg";

export default function Login() {
    return (
        <main className={styles.login}>
            <div className={styles.image}>
                <Image src={image} alt="Banner" aria-hidden="true" fill />
            </div>

            <div className={styles.container}>
                <div className={styles.content}>
                    <Image
                        src={logo}
                        width={224}
                        height={78}
                        alt="nutri.dash"
                    />
                    <h1>Gerencia sua rotina de trabalho em um só lugar. </h1>
                    <Button href="/">
                        <Image
                            src={icon}
                            width={29}
                            height={29}
                            alt="Ícone google"
                        />
                        Entre com o Google
                    </Button>
                    <p>&copy; Copyright 2023 - Todos os direitos reservados</p>
                </div>
            </div>
        </main>
    );
}
