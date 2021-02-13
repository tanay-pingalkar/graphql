import Nav from "../components/nav";
import { withUrqlClient } from "next-urql";
import { qrql } from "../utils/urql";
import { usePostsQuery } from "../generated/graphql";

const Index = () => {
  const [{ data }] = usePostsQuery();
  return (
    <>
      <Nav></Nav>
      {!data ? <h1>fetching...</h1> : data.posts.map((val) => <h1>val</h1>)}
    </>
  );
};

export default withUrqlClient(qrql, { ssr: true })(Index);
