import Link from "next/link";
import { useRouter } from "next/router";

function Navigation() {
  const { pathname } = useRouter();
  return (
    <nav>
      <Link href="/">
        <a style={{ color: pathname === "/" ? "red" : "black" }}>Home</a>
      </Link>
      <br />
      <Link href="/about">
        <a style={{ color: pathname === "/about" ? "red" : "black" }}>About</a>
      </Link>
    </nav>
  );
}

export default Navigation;
