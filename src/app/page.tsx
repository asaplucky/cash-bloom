// src/app/page.tsx
import Link from 'next/link';

const HomePage = () => {
  return (
    <div>
      <h1>내 블로그에 오신 것을 환영합니다</h1>
      <Link href="/blog">블로그로 가기</Link>
    </div>
  );
};

export default HomePage;
