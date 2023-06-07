<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	export let { posts } = data;
</script>

<svelte:head>
	<title>Svelte</title>
</svelte:head>

<main>
	<h1>Posts</h1>
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
