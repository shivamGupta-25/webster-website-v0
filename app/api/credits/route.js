export async function GET() {
    return new Response(JSON.stringify({
        text: "Designed & Developed by: Shivam Raj Gupta",
        link: "https://www.linkedin.com/in/yourbrand"
    }), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "max-age=86400, immutable" // Caching to reduce requests
        }
    });
}
