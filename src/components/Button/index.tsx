import Link from "next/link";
import React, { ReactNode } from "react";
import styles from "./styles.module.scss";

interface ButtonProps {
    children: ReactNode;
    href: string;
}

export default function Button({ children, href }: ButtonProps) {
    return (
        <Link href={href} className={styles.button}>
            {children}
        </Link>
    );
}
