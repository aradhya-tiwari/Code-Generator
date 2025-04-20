<script>
    import { getChats } from "./chatCanvas.svelte";
    import { marked } from "marked";
    let chats = getChats();
</script>

<div
    class="w-[80%] h-[100vh] overflow-y-scroll p-5 bg-[#1E1E1E] rounded-xl -z-80"
>
    {#each chats as chat}
        {#if chat.sender === "ai"}
            <div class="bg-black text-white">
                <b>Code: </b>
                <!-- content here -->
                {@html marked.parse(chat.code)}
            </div>
            <!-- Description -->
            <div class=" text-white">
                <b>Description:</b>
                {chat.description}
            </div>
        {:else if chat.sender === "user"}
            <div class="float-right clear-right">
                {chat.msg}
            </div>
        {/if}
    {/each}
</div>
