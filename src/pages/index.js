import fs from "fs";
import matter from "gray-matter";
import Link from "../components/Link";
import Layout from "../components/Layout";
import path from "path";
import { Component } from "react";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
  }

  render() {
    const { posts, totalPages } = this.props;
    const { page } = this.state;

    const highlightedPosts = posts.filter(
      (post) =>
        post.frontmatter.tags && post.frontmatter.tags.includes("highlighted")
    );

    const startIndex = (page - 1) * 2;
    const endIndex = startIndex + 2;
    const currentPosts = posts.slice(startIndex, endIndex);

    const handleNextPageClick = () => {
      if (page < totalPages) {
        this.setState({ page: page + 1 });
      }
    };

    const handlePreviousPageClick = () => {
      if (page > 1) {
        this.setState({ page: page - 1 });
      }
    };

    return (
      <Layout>
        <section className="flex flex-col h-screen justify-center text-center">
          <h1 className="font-bold mb-5 text-5xl">
            Find the answers you care about,&nbsp;faster.
          </h1>
          <p className="text-neutral-400 text-xl">
            Elastic’s AI and ML capabilities help you find more
            relevant&nbsp;answers.
          </p>
        </section>
        <section className="max-w-4xl mx-auto">
          <div className="flex items-center mb-40">
            <div className="bg-neutral-400 h-80 w-96 shrink-0" />
            <div className="h-fit px-10">
              <h3 className="font-bold mb-4 text-2xl">Vector Search</h3>
              <p className="text-neutral-400">
                Veniam esse ea laborum et reprehenderit sit cillum officia
                commodo deserunt. Aliquip dolore cillum anim et fugiat nulla
                amet aliqua officia minim. Culpa eu veniam elit duis adipisicing
                ex aute.
              </p>
            </div>
          </div>
          <div className="flex items-center mb-40">
            <div className="h-fit px-10">
              <h3 className="font-bold mb-4 text-2xl">Vector Search</h3>
              <p className="text-neutral-400">
                Veniam esse ea laborum et reprehenderit sit cillum officia
                commodo deserunt. Aliquip dolore cillum anim et fugiat nulla
                amet aliqua officia minim. Culpa eu veniam elit duis adipisicing
                ex aute.
              </p>
            </div>
            <div className="bg-neutral-400 h-80 w-96 shrink-0" />
          </div>
          <div className="flex items-center mb-40">
            <div className="bg-neutral-400 h-80 w-96 shrink-0" />
            <div className="h-fit px-10">
              <h3 className="font-bold mb-4 text-2xl">Vector Search</h3>
              <p className="text-neutral-400">
                Veniam esse ea laborum et reprehenderit sit cillum officia
                commodo deserunt. Aliquip dolore cillum anim et fugiat nulla
                amet aliqua officia minim. Culpa eu veniam elit duis adipisicing
                ex aute.
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="h-fit px-10">
              <h3 className="font-bold mb-4 text-2xl">Vector Search</h3>
              <p className="text-neutral-400">
                Veniam esse ea laborum et reprehenderit sit cillum officia
                commodo deserunt. Aliquip dolore cillum anim et fugiat nulla
                amet aliqua officia minim. Culpa eu veniam elit duis adipisicing
                ex aute.
              </p>
            </div>
            <div className="bg-neutral-400 h-80 w-96 shrink-0" />
          </div>
        </section>

        {/* <section>
          <h2>Highlighted Posts</h2>
          <ul>
            {highlightedPosts.map((post) => (
              <li key={post.slug}>
                <Link href={`/posts/${post.slug}`}>
                  {post.frontmatter.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2>All Posts</h2>
          <ul>
            {currentPosts.map((post) => (
              <li key={post.slug}>
                <Link href={`/posts/${post.slug}`}>
                  {post.frontmatter.title}
                </Link>
              </li>
            ))}
          </ul>
          <nav>
            {page > 1 && (
              <button
                className="text-orange-400"
                onClick={handlePreviousPageClick}
              >
                Previous Page
              </button>
            )}
            {page < totalPages && (
              <button className="text-orange-400" onClick={handleNextPageClick}>
                Next Page
              </button>
            )}
          </nav>
        </section> */}
      </Layout>
    );
  }
}

export async function getStaticProps() {
  const postsDirectory = path.join(process.cwd(), "src", "content", "posts");
  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);

    return {
      slug: filename.replace(".md", ""),
      frontmatter: {
        ...data,
        date: data.date.toISOString(),
      },
    };
  });

  const totalPosts = posts.length;
  const totalPages = Math.ceil(totalPosts / 2);

  return {
    props: {
      posts,
      totalPages,
    },
  };
}
