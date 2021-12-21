import Link from "next/link";
import { useRouter } from "next/router";

function Navigation() {
  const { pathname } = useRouter();
  return (
    <nav>
      <Link href="/">
        <a className={pathname === "/" ? "active" : ""}>Home</a>
      </Link>
      <Link href="/about">
        <a className={pathname === "/about" ? "active" : ""}>About</a>
      </Link>
      <style jsx>{`
        a {
          text-decoration: none;
        }
        .active {
          color: tomato;
        }
      `}</style>
    </nav>
  );
}

export default Navigation;
