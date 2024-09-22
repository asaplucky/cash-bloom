import Link from 'next/link';
import { generateStaticParams } from './[id]/page';

interface Post {
  number: number;
  title: string;
}

const BlogIndex = async () => {
  const res = await fetch('https://api.github.com/repos/asaplucky/cashbloom/issues?page=1');
  const posts: Post[] = await res.json();
  const remainingRequests = res.headers.get('X-RateLimit-Remaining');
  console.log(`Remaining API requests: ${remainingRequests} ${posts.map.length}`);
  
  return (
    <div>
      <h1>블로그 포스트</h1>
      {posts.map((post) => (
        <div key={post.number}>
          <Link href={`/blog/${post.number}`}>
            <h2>{post.title}</h2>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BlogIndex;
