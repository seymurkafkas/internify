import Link from "next/link";
import styles from "../components/styles.module.css";
export default function Home() {
  return (
    <div className="absolute w-full h-full bg-auth-background">
      <div className="absolute inset-1/2  h-2/6 w-1/6 justify-around items-center transform -translate-x-1/2 -translate-y-1/2  flex flex-row">
        <div className={styles.IndexButtons}>
          <Link href="/Register">
            <a>Register</a>
          </Link>
        </div>
        <div className={styles.IndexButtons}>
          <Link href="/Login">
            <a>Login</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
