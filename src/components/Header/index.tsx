import Image from "next/image";
import React from "react";
import { DotsThreeOutlineVertical } from "@phosphor-icons/react";
import logo from "../../../public/logo.svg";
import Link from "next/link";
import styles from "./styles.module.scss";

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link href="/">
                    <Image
                        src={logo}
                        width={173}
                        height={68}
                        alt="nutri.dash"
                    />
                </Link>

                <nav>
                    <Link href="/pacientes">Pacientes</Link>
                    <Link href="/dietas">Dietas</Link>
                </nav>
                <button>
                    <DotsThreeOutlineVertical size={32} />
                </button>
            </div>
        </header>
    );
}
