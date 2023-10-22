import { Icon } from "@iconify/react";
import styles from "./LoadingSpinner.module.css";

export function LoadingSpinner() {
    return (
        <div className={styles.loadingSpinner}>
            <Icon icon={"mdi:react"}></Icon>
        </div>
    )
}