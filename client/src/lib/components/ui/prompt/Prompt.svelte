<script>
    import { Experimental_StructuredObject } from "@ai-sdk/svelte";

    $effect(() => {});
</script>

<!-- <div class="w-full absolute bottom-10"> -->
<div
    class="w-fit m-auto rounded-xl absolute bottom-10 left-1/2 -translate-x-1/2 shadow-xl border border-gray-400"
>
    <div class=" gap-3 w-fit flex p-2 py- m-auto relative rounded-lg">
        <textarea
            name="prompt"
            id=""
            class=" focus:outline-0 w-[90vw] md:w-[80vw] text-lg resize-none"
            placeholder="Describe your component"
            contenteditable="false"
            rows="2"
        ></textarea>
    </div>
    <div class="w-full border relative h-12 rounded-b-xl">
        <div
            class="absolute top-0 bg-[var(--primary)] text-white rounded-b-xl py-3 px-5 text-md active:scale-95 transition-all right-0"
        >
            <button class="w-full h-full"> Generate 🤖</button>
        </div>
    </div>
</div>
