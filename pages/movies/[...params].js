import { useRouter } from "next/router";
import HeadTitle from "../../components/headTitle";

export default function Detail({ params }) {
  const router = useRouter();
  console.log(router);
  const [title, id] = params || [];
  return (
    <div>
      <HeadTitle title={title} />
      <h4>{title}</h4>
    </div>
  );
}

export function getServerSideProps({ params: { params } }) {
  return {
    props: {
      params,
    },
  };
}
