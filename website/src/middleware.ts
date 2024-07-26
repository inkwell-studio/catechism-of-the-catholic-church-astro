import { APIContext, MiddlewareNext } from 'astro';
import { getParagraphNumberRedirectionUrl } from './logic/routing.ts';

export function onRequest(context: APIContext, next: MiddlewareNext) {
    // Redirect all requests made by a paragraph number to the corresponding semantic path URL
    const redirectionUrl = getParagraphNumberRedirectionUrl(context.url);
    return redirectionUrl ? Response.redirect(redirectionUrl, 308) : next();
}
