"use client"; // Declare as a Client Component

import { useRouter } from 'next/navigation'; // Import useRouter from next/navigation
import React from 'react';

interface Issue {
    id: number;
    title: string;
    body: string;
}

interface ClientComponentProps {
    issues: Issue[];
    totalPages: number;
    currentPage: number;
}

const ClientComponent: React.FC<ClientComponentProps> = ({ issues, totalPages, currentPage }) => {
    const router = useRouter(); // Use useRouter here

    const handlePageChange = (newPage: number) => {
        router.push(`?page=${newPage}`); // Navigate to the new page
    };

    return (
        <div>
            <h1>GitHub Issues</h1>
            <ul>
                {issues.map((issue) => (
                    <li key={issue.id}>
                        <h2>{issue.title}</h2>
                        <p>{issue.body}</p>
                    </li>
                ))}
            </ul>

            {/* Numeric Pagination */}
            {totalPages > 1 && (
                <div className="pagination">
                    {currentPage > 1 && (
                        <button onClick={() => handlePageChange(currentPage - 1)}>이전</button>
                    )}

                    {Array.from({ length: totalPages }, (_, index) => {
                        const pageNum = index + 1;
                        return (
                            <button key={pageNum} onClick={() => handlePageChange(pageNum)} disabled={currentPage === pageNum}>
                                {pageNum}
                            </button>
                        );
                    })}

                    {currentPage < totalPages && (
                        <button onClick={() => handlePageChange(currentPage + 1)}>다음</button>
                    )}
                </div>
            )}

            <style jsx>{`
                .pagination {
                    display: flex;
                    gap: 10px;
                    margin-top: 20px;
                }
                button:disabled {
                    opacity: 0.5;
                }
            `}</style>
        </div>
    );
}

export default ClientComponent;
