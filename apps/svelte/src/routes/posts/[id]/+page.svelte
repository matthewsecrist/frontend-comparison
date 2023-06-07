<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { redirect } from '@sveltejs/kit';
	import type { PageData } from './$types';

	export let data: PageData;
	export let { post } = data;

	async function removePost(event: Event) {
		const formEl = event.target as HTMLFormElement
    const data = new FormData(formEl)

    // forms only support `GET` and `POST` methods but
    // SvelteKit maps this to the `DELETE` function
    const response = await fetch(formEl.action, {
      method: 'DELETE',
      body: data
    })

    await invalidateAll()

		return redirect(308, '/posts')
	}
</script>

<main>
	<a href="/posts">All Posts</a>
	<form action="?/deletePost" method="POST">
		<input type="hidden" name="id" value={post.id} />
		<button type="submit">Delete Post</button>
	</form>
	<h1>{post.title}</h1>
	<p>{post.body}</p>
</main>
