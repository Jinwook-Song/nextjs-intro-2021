import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./navigation.module.css";

function Navigation() {
  const { pathname } = useRouter();
  return (
    <nav>
      <Link href="/">
        <a
          className={`${styles.link} ${
            pathname === "/" ? styles.active : null
          }`}
        >
          Home
        </a>
      </Link>
      <Link href="/about">
        <a
          className={[
            styles.link,
            pathname === "/about" ? styles.active : "",
          ].join(" ")}
        >
          About
        </a>
      </Link>
    </nav>
  );
}

export default Navigation;
