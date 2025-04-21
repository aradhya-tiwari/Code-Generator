<script>
    import { getChats } from "./chatCanvas.svelte";
    import { marked, Marked } from "marked";
    import { markedHighlight } from "marked-highlight";
    import hljs from "highlight.js";
    let chats = getChats();

    const markedCode = new Marked(
        markedHighlight({
            emptyLangClass: "hljs",
            langPrefix: "hljs language-",
            highlight(code, lang, info) {
                const language = hljs.getLanguage(lang) ? lang : "plaintext";
                return hljs.highlight(code, { language }).value;
            },
        }),
    );
</script>

<div
    class="w-[80%] h-[100vh] pb-[10%] overflow-y-scroll p-5 bg-[#1E1E1E] rounded-xl z-10"
>
    {#each chats as chat}
        <div class="boder border-amber-100">
            {#if chat.sender === "ai"}
                <div class="bg-black overflow-x-auto text-white">
                    <b>Code: </b>
                    <!-- content here -->
                    {@html markedCode.parse(
                        "```javvascript\n" + chat.code + "" || "",
                    )}
                </div>
                <!-- Description -->
                <div class=" text-white">
                    <b>Description:</b>
                    {@html marked.parse(chat.description) || "."}
                </div>
            {:else if chat.sender === "user"}
                <div
                    class="float-right p-3 rounded-full bg-[#E6883D] text-white clear-right"
                >
                    <b> You: </b>
                    {chat.msg}
                </div>
                <div class="clear-right"></div>
            {/if}
            <br /><br />
        </div>
    {/each}
</div>
