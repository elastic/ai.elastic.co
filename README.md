# ai.elastic.co

This is the repo for ai.elastic.co that includes the logic, UI and blog posts themselves formatted in Markdown within the `surc/content/posts` directory.

## Getting Started

To get started with local development, follow these steps:

1. Clone the repository to your local machine.
2. Install the dependencies by running `npm install` in the project directory.
3. Start the development server by running `npm run dev`.
4. Open your web browser and navigate to `http://localhost:3000` to view the blog.

## Adding New Content

To add new content to the blog, follow these steps:

1. Create a new branch in Github or by locally running `git checkout -b my-new-branch`.
2. Create a new Markdown file in the `src/content/posts` directory using the format `YYYYMMDD-[slug].md`, where `[slug]` is a short, URL-friendly string that describes the content of the post.
3. Add the frontmatter to the top of the file, including the title, date, and any tags or other metadata you want to include.
4. Write the content of the post using standard Markdown syntax (MDX features are not currently supported).
5. Commit your changes and push the new branch to the origin repository.
6. Open a pull request to merge your changes into the `main` branch.