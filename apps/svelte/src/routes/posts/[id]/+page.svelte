<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	export let { post } = data;
</script>

<main>
	<a href="/posts">All Posts</a>
	<h1>{post.title}</h1>
	<p>{post.body}</p>
</main>
