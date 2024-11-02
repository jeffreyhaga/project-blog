import RSS from "rss";

import { BLOG_TITLE, BLOG_DESCRIPTION } from "@/constants";

import { getBlogPostList } from "@/helpers/file-helpers";

export const metadata = {
  title: `${BLOG_TITLE}`,
  description: `${BLOG_DESCRIPTION}`,
};

export async function GET() {
  const blogPosts = await getBlogPostList();
  console.log(blogPosts);

  const feed = new RSS({
    title: metadata.title,
    description: metadata.description,
  });

  blogPosts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.abstract,
      url: `https://somewebsite.com/${post.slug}`,
      guid: post.slug,
      date: post.publishedOn,
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
