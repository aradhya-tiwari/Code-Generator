<script lang="ts">
	import "../app.css";

	let { children } = $props();
</script>

<div class="bg-[#333]">
	{@render children()}
</div>
