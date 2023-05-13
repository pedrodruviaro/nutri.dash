import Link from "next/link";
import React, { ReactNode } from "react";
import styles from "./styles.module.scss";

interface ButtonProps {
    children: ReactNode;
    href: string;
    secondary?: boolean;
}

export default function Button({ children, href, secondary }: ButtonProps) {
    return (
        <Link
            href={href}
            className={`${styles.button}${
                secondary ? ` ${styles.secondary}` : ""
            }`}
        >
            {children}
        </Link>
    );
}
