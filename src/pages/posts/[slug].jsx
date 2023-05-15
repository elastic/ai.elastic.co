import fs from "fs";
import Layout from "../../components/Layout";
import matter from "gray-matter";
import path from "path";
import ReactPlayer from "react-player";
import { NextSeo } from "next-seo";

export default function Post({ frontmatter, content, slug }) {
  return (
    <>
      <NextSeo
        title={frontmatter.title}
        description={frontmatter.description}
        canonical={`https://ai.elastic.co/posts/${slug}`}
        openGraph={{
          url: `https://ai.elastic.co/posts/${slug}`,
          title: frontmatter.title,
          description: frontmatter.description,
          images: [
            {
              url: frontmatter.image,
              alt: frontmatter.title,
            },
          ],
        }}
      />
      <Layout>
        <h1>{frontmatter.title}</h1>
        <p>{frontmatter.date}</p>
        <ReactPlayer url={frontmatter.video} />
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </Layout>
    </>
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
      content,
      frontmatter: {
        ...data,
        date: data.date.toISOString(),
      },
      slug,
    },
  };
}
