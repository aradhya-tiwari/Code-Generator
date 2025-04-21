<script lang="ts">
	import "../app.css";

	let { children } = $props();
</script>

<div class="bg-[#333] h-screen">
	{@render children()}
</div>
