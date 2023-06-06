import type { V2_MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Remix - Home" },
  ];
};

export default function Index() {
  return (
   <main>
    <Link to="/posts">Posts</Link>
    <h1>Home</h1>
   </main>
  );
}
