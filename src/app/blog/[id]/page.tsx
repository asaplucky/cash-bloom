// 이슈 상세 정보를 가져오는 함수
async function fetchIssue(id: string) {
    const res = await fetch(`https://api.github.com/repos/your-repo/your-repo-name/issues/${id}`);
    return await res.json();
  }
  
  interface BlogPostPageProps {
    params: { id: string };
  }
  
  export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const post = await fetchIssue(params.id);
  
    return (
      <div>
        <h1>{post.title}</h1>
        <p>{post.body}</p>
      </div>
    );
  }
  