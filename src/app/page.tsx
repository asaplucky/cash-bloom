import ClientComponent from './ClientComponent'; // Import the Client Component

async function getIssues(page: number = 1) {
    const perPage = 1; // Set the number of issues per page
    const res = await fetch(`https://api.github.com/repos/${process.env.USERNAME}/${process.env.REPO}/issues?page=${page}&per_page=${perPage}`, {
        headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`, // Add your API key
        },
    });

    if (!res.ok) {
        throw new Error(`Error fetching issues: ${res.statusText}`);
    }
    const issues = await res.json();

    // Calculate total pages from Link header
    const totalPages = parseLinkHeader(res.headers.get('Link'));

    return { issues, totalPages };
}

function parseLinkHeader(header: string | null): number {
    if (!header) return 1; // Default to 1 page

    const links = header.split(',');
    let totalPages = 1;

    links.forEach(link => {
        const match = link.match(/page=(\d+)/);
        if (match) {
            totalPages = Math.max(totalPages, parseInt(match[1], 10));
        }
    });

    return totalPages;
}

export default async function HomePage({ searchParams }: { searchParams: { page?: string } }) {
    const page = parseInt(searchParams.page as string) || 1; // Get page number from URL

    const { issues, totalPages } = await getIssues(page);

    return (
        <ClientComponent issues={issues} totalPages={totalPages} currentPage={page} />
    );
}
