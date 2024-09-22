import React from 'react';
import ReactMarkdown from 'react-markdown';

// 서버에서 포스트 데이터를 가져옵니다.
const getPostData = async (id: string) => {
  const res = await fetch(`https://api.github.com/repos/asaplucky/cashbloom/issues/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch post');
  }
  return res.json();
};

// 서버 컴포넌트: 데이터를 받아 클라이언트 컴포넌트에 전달
const PostPage = async ({ params }: { params: { id: string } }) => {
  const post = await getPostData(params.id);

  return (
    <div>
      <h1>{post.title}</h1>
      <ReactMarkdown>{post.body}</ReactMarkdown>
      <div id="comments">
        <script
          src="https://utteranc.es/client.js"
          repo="asaplucky/cashbloom"
          issue-term="pathname"
          theme="github-light"
          crossorigin="anonymous"
          async>
        </script>
      </div>
    </div>
  );
};

// 동적 경로 생성을 위한 서버 컴포넌트
export const generateStaticParams = async () => {
  const res = await fetch('https://api.github.com/repos/asaplucky/cashbloom/issues');
  const posts = await res.json();

  return posts.map((post: { number: number }) => ({
    id: post.number.toString(),
  }));
};

export default PostPage;

// "use client"와 generateStaticParams를 함께 사용할 수 없다는 오류는 /src/app 디렉토리 구조에서 서버와 클라이언트 컴포넌트의 역할이 명확히 구분되기 때문입니다. generateStaticParams는 서버 측에서 실행되기 때문에 클라이언트 컴포넌트("use client")와는 같이 사용할 수 없습니다.
// 데이터를 클라이언트 컴포넌트에서 바로 가져오는 대신, 서버에서 데이터를 가져온 후 클라이언트로 전달하는 방식을 사용해야 합니다. 이를 위해 데이터 fetching은 서버 컴포넌트에서 처리하고, 클라이언트 컴포넌트에서는 해당 데이터를 받아서 렌더링만 해야 합니다.
// useParams가 클라이언트 훅이므로, 서버에서 URL 파라미터를 사용하는 대신, 서버에서 파라미터를 받아 처리하고 클라이언트로 전달할 수 있습니다.
// 서버 컴포넌트에서 데이터를 가져오고, 클라이언트 컴포넌트에서 이를 표시하는 방식으로 나눕니다.

// 데이터 fetching: getPostData 함수는 서버에서 데이터를 가져오고, 이를 PostPage 컴포넌트로 전달합니다. 이 컴포넌트는 서버 컴포넌트로 동작합니다.
// 클라이언트와 서버 컴포넌트 분리: 클라이언트에서 동작해야 하는 부분은 최소한으로 유지하여, 댓글 시스템(Utterances)을 클라이언트에서만 작동하도록 유지합니다. 전체 페이지는 서버에서 미리 렌더링됩니다.

// 데이터 fetching은 서버에서 처리됩니다.
// **generateStaticParams**는 서버에서 동적 경로를 생성합니다.
// 클라이언트 훅(useParams)을 사용하지 않고, 서버에서 URL 파라미터를 처리합니다.