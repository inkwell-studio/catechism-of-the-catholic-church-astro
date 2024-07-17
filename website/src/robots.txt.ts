import { baseUrl } from '../config.ts';

createRobotsTxt();

async function createRobotsTxt(): Promise<void> {
    const text = `\
User-agent: *
Disallow: /

Sitemap: ${baseUrl}/sitemap-index.xml
`;

    await Deno.writeTextFile('website/dist/client/robots.txt', text);
}
