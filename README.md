# Learning Next JS

## [notion](https://rustic-need-f90.notion.site/NextJS-Intro-1b5f22966ad14d188408d748a382a5f5)

| 프로젝트 기간 | 21.12.21 ~                   |
| ------------- | ---------------------------- |
| 프로젝트 목적 | NextJS practice, SSR, SSG 등 |

---

### 시작하기

`create-next-app@latest`

`create-next-app@latest --typescript`

---

### Pages

Pages 폴더 내부는 자동으로 router 처리가 된다.

index.js → /

about.js → /about

단, `export default` 필수이다. (프레임 워크이기 때문에 룰에 맞게 코드 작성)

index.js 는 예외로 root router

---

### Pre-Rendering

기본적으로 pre rendering을 지원한다. 소스코드에서 확인 가능(크롬브라우져: Ctrl + U)

---

### Nest/Link

`import Link from "next/link";`

react와 마찬가지로 Link를 사용한다

```jsx
<Link href="/">
  <a style={{ color: pathname === "/" ? "red" : "black" }}>Home</a>
</Link>
```

차이가 있다면 위와같이 a tag를 사용

Link는 오직 href를 위한것. a tag를 사용하지 않을 시 style이나 className등을 적용할 수 없음

---

### Styles with CSS Module

`import styles from "./navigation.module.css";`

class로 css를 다룬다

```css
.link {
  text-decoration: none;
}

.active {
  color: red;
}
```

```jsx
// method 1
<a className={`${styles.link} ${pathname === "/" ? styles.active : null}`}>
          Home
</a>
// method 2
<a className={[styles.link, pathname === "/about" ? styles.active : "",].join(" ")}        >
          About
</a>
```

위와같이 적용할 수 있는데 두개 이상의 style을 적용하고 싶을때 그냥 comma로 구분하면 안되고, 벡틱을 이용해 구분해주거나, 아래와같이 Array, Join의 조합으로 사용할 수 있다.

개인적으로 두번째 방식을 선호

~~하지만 실제로는 styled-components를 사용하여 큰 의미는 없을듯 하다.~~

### Styles with JSX

```jsx
<nav>
  <Link href="/">
    <a>Home</a>
  </Link>
  <Link href="/about">
    <a>About</a>
  </Link>
  // styles
  <style jsx>{`
    nav {
      background-color: teal;
    }
    a {
      text-decoration: none;
    }
  `}</style>
</nav>
```

normal css 작성하듯 적용 할 수 있다.

부모, 자식 컴포넌트에 영향을 주지 않는다. (scope only current component)

`<style jsx global>{}</style>`

Global style도 가능하다.

`_app.js` 파일에서 global style을 주기에 좋다.

---

### \_app.js

모든 page는 render하기 전에 \_app.js를 거쳐간다. (blueprint 역할)

```jsx
import Navigation from "../components/navigation";
import "../styles/globals.css";

function App({ Component, pageProps }) {
  return (
    <>
      <Navigation />
      <Component {...pageProps} />
      <style jsx global>{`
        a {
          color: white;
        }
      `}</style>
    </>
  );
}
export default App;
```

공통의 navigation bar, global style 적용에 용이하다.

Component는 redering에 해당하는 Component이고, pageProps는 app.js에서 적용한 설정이다.

---

### Layout

```jsx
// components/layout.js

import Navigation from "./navigation";

function Layout({ children }) {
  return (
    <>
      <Navigation />
      <main>{children}</main>
    </>
  );
}

export default Layout;

// pages/_app.js

import Layout from "../components/layout";
import "../styles/globals.css";

function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
export default App;
```

\_app.js 에 많은 코드를 작성하는 것이 아닌 Layout component를 활용

---

### Head

```jsx
import Head from "next/head";

function Home() {
  return (
    <div>
      <Head>
        <title>Home | Next Movies</title>
      </Head>
      <h2>Home</h2>
    </div>
  );
}

export default Home;
```

helmet이나 다른 라이브러리 필요없이 next/head를 사용하면 된다.

```jsx
// components/headTitle.js

import Head from "next/head";

function HeadTitle({ title }) {
  return (
    <Head>
      <title>{title} | Next Movies</title>
    </Head>
  );
}

export default HeadTitle;
```

컴포넌트로 재사용

SEO를 위해 head뿐만아니라 다양한 meta data를 추가할 수 있다.

---

### Image

```jsx
import Image from "next/image";

function Navigation() {
  return (
      <Image src="/vercel.svg" alt="Header Image" width={70} height={70} /
  );
}

export default Navigation;
```

Head와 마찬가지로 next/image를 사용한다.

`vercel.svg` 파일은 public 폴더 내에 있는데 절대경로로 접근이 가능하다

---

### Redirects & Rewrites

```jsx
// next.config.js

const API_KEY = process.env.API_KEY;

module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/old-pages/:path*",
        destination: "/new-blog/:path*",
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/movies",
        destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
      },
    ];
  },
};
```

Redirects의 경우 url을 변경 시키고 destination에 접근한다

`/old-pages/:path*` 로의 접근시 `/new-blog/:path*`로 라우팅

Rewrites의 경우 url을 변경 시키지 않고 destination에 접근한다.

이를 통해 API_KEY를 노출시키지 않을 수 있음 (네트워크에서도 노출되지 않음)

---

### Server Side Rendering

1. `getServerSideProps()` is called in the server
2. Anything returned from `getServerSideProps()` is passed to the Page's Props.
3. React take this props and hydrates

```json
function Home({ results}) {
	return ()
}

export async function getServerSideProps() {
  const { results } = await (
    await fetch(`http://localhost:3000/api/movies`)
  ).json();
  return {
    props: {
      results,
    },
  };
}

export default Home;
```

이미 Sever에서 데이터를 fetching 하였기때문에 lodaing이 발생하지 않는다.

대신 fetching 하는동안 아무것도 보여주지 않는다.

따라서 CSR을하여 fetching하는동안 Loading을 보여줄지 선택사항이 된다.
