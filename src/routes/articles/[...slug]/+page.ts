import { error } from '@sveltejs/kit';
import { Article } from '$lib/utils';
import * as config from '$lib/config'

interface metadata {
	params: {
		slug: string;
	}
}

export const load = async ({ params }: metadata) =>{
	const response = await fetch(`${config.url}api/articles/json`);
    if (!response.ok) {
		throw new Error(`HTTP error! Status: ${response.status}, Response: ${response})`);
	}

	const posts = ((await response.json()).posts) as Article[];
	let found = false;

	try {
		for (let index in posts) {
			let post = posts[index]
			if (post.path == "/articles/"+params.slug) {
				found = true;

				return {
					title: post.meta.title,
					date: post.meta.date,
					content: post.content.compiled
				};
			}
		}
		if (!found) {
			error(404, {
				message: 'Not found',
			});
		}
	} catch (err) {
		console.log(err)
		error(404, {
			message: 'Not found',
		});
	}
}