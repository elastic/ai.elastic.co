import fs from "fs";
import matter from "gray-matter";
import Link from "next/link";
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
        <h1>My Blog</h1>
        <section>
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
              <button onClick={handlePreviousPageClick}>Previous Page</button>
            )}
            {page < totalPages && (
              <button onClick={handleNextPageClick}>Next Page</button>
            )}
          </nav>
        </section>
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
