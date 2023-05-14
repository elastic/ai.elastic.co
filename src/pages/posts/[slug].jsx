import fs from "fs";
import matter from "gray-matter";
import Layout from "../../components/Layout";
import ReactPlayer from "react-player";
import path from "path";

export default function Post({ frontmatter, content }) {
  return (
    <Layout>
      <h1>{frontmatter.title}</h1>
      <p>{frontmatter.date}</p>
      <ReactPlayer url={frontmatter.video} />
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </Layout>
  );
}

export async function getStaticPaths() {
  const postsDirectory = path.join(process.cwd(), "src", "content", "posts");
  const filenames = fs.readdirSync(postsDirectory);

  const slugs = filenames.map((filename) => {
    return filename.replace(".md", "");
  });

  const paths = slugs.map((slug) => {
    return {
      params: {
        slug: slug,
      },
    };
  });

  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const postsDirectory = path.join(process.cwd(), "src", "content", "posts");
  const filePath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    props: {
      frontmatter: {
        ...data,
        date: data.date.toISOString(),
      },
      content,
    },
  };
}
