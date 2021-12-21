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
