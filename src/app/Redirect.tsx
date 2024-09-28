"use client"; // 클라이언트 컴포넌트로 선언

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface RedirectProps {
    to: string; // 리다이렉트할 URL
}

const Redirect: React.FC<RedirectProps> = ({ to }) => {
    const router = useRouter();

    useEffect(() => {
        router.push(to); // 주어진 URL로 리다이렉트
    }, [to, router]);

    return null; // 렌더링할 내용이 없음
};

export default Redirect;
