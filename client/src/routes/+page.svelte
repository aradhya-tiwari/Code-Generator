<script>
    import Prompt from "$lib/components/prompt/Prompt.svelte";
    import Canvas from "$lib/components/chatCanvas/Canvas.svelte";
    import RightSidebar from "$lib/components/rightSideBar/Sidebar.svelte";
</script>

<div class="flex flex-1 w-screen">
    <Canvas />
    <RightSidebar />
</div>
<div class="w-[80%] z-30 absolute bottom-10">
    <Prompt />
</div>
