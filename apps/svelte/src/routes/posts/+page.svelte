<script lang="ts">
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';

	export let data: PageData;
</script>

<svelte:head>
	<title>Svelte</title>
</svelte:head>

<main>
	<h1>Posts</h1>

	<form method="POST" action="?/createPost" use:enhance>
		<input type="text" name="title" />
		<input type="text" name="body" />
		<button type="submit">Create Post</button>
	</form>

	<ul>
		{#each data.posts as post (post.id)}
			<li>
				<a href="/posts/{post.id}">
					{post.title}
				</a>
			</li>
		{/each}
	</ul>
</main>
