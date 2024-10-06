// prismic.ts
import * as prismic from '@prismicio/client';

export const repositoryName = 'your-repo-name'; // Replace with your Prismic repo name

export const client = prismic.createClient(repositoryName, {
  accessToken: '', // If you use a private API, add your access token here
});
