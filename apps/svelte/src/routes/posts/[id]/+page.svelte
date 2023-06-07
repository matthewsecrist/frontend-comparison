<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<main>
	<a href="/posts">All Posts</a>
	<form action="?/deletePost" method="POST" use:enhance>
		<input type="hidden" name="id" value={data.post.id} />
		<button type="submit">Delete Post</button>
	</form>
	<h1>{data.post.title}</h1>
	<p>{data.post.body}</p>
</main>
