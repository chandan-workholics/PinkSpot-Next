import Image from "next/image";
import styles from "./page.module.css";
import HomePage from "./pages/home/page";


export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <HomePage />
      </main>

    </div>
  );
}
