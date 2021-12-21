import Head from "next/head";

function HeadTitle({ title }) {
  return (
    <Head>
      <title>{title} | Next Movies</title>
    </Head>
  );
}

export default HeadTitle;
