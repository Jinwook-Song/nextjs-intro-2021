import Link from "next/link";
import { useRouter } from "next/router";

function Navigation() {
  const { pathname } = useRouter();
  return (
    <nav>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/about">
        <a>About</a>
      </Link>
      <style jsx>{`
        nav {
          background-color: teal;
        }
        a {
          text-decoration: none;
        }
      `}</style>
    </nav>
  );
}

export default Navigation;
