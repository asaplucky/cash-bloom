export async function GET() {
    const response = await fetch('https://api.github.com/repos/asaplucky/cashbloom/issues');
    const issues = await response.json();
    return new Response(JSON.stringify(issues), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  