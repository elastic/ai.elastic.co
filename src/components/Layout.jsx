import Head from "next/head";
import Link from "next/link";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>My Blog</title>
      </Head>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
        </ul>
      </nav>
      <main>{children}</main>
      <footer>&copy; My Blog {new Date().getFullYear()}</footer>
    </>
  );
}
