<script lang="ts">
	import type { PageData, ActionData } from './$types';

	export let data: PageData;
	export let { posts } = data;
</script>

<svelte:head>
	<title>Svelte</title>
</svelte:head>

<main>
	<h1>Posts</h1>

	<form method="POST" action="?/createPost">
		<input type="text" name="title" />
		<input type="text" name="body" />
		<button type="submit">Create Post</button>
	</form>

	<ul>
		{#each posts as post}
			<li>
				<a href="/posts/{post.id}">
					{post.title}
				</a>
			</li>
		{/each}
	</ul>
</main>
