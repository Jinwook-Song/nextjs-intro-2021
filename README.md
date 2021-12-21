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
