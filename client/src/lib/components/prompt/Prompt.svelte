<!-- <script module>
</script> -->

<script lang="ts">
    import { Experimental_StructuredObject as structuredObject } from "@ai-sdk/svelte";
    import { z } from "zod";
    import { addChat } from "../chatCanvas/chatCanvas.svelte";

    let prompt = $state("");

    async function getStructuredResp() {
        addChat({
            msg: "prompt",
            sender: "user",
        });
        // let resp = await hhc.chat.$post({});

        // let reader = await resp.body?.getReader();
        // addChat({
        //     code: jsonResp.code,
        //     description: jsonResp.description,
        // });
    }
</script>

<!-- <div class="w-full absolute bottom-10"> -->

<div
    class="w-[90%] z-10 m-auto rounded-xl bg-[#fff]/20 backdrop-blur-lg shadow-xl border border-gray-40"
>
    <div class=" gap-3 w-fit flex p-2 py- m-auto relative rounded-lg">
        <textarea
            name="prompt"
            id=""
            class=" focus:outline-0 w-[90vw] h-full md:w-[80vw] text-lg text-white resize-none"
            placeholder="Describe your component"
            contenteditable="false"
            rows="2"
            value={prompt}
        ></textarea>
    </div>
    <div class="w-full border relative h-12 rounded-b-xl">
        <div
            class="absolute top-0 bg-yellow-600 rounded-tl-2xl rounded-bl-2xl text-white rounded-br-xl py-3 px-5 text-md active:scale-95 transition-all right-0"
        >
            <button class="w-full h-full" onclick={() => getStructuredResp()}>
                Generate 🤖</button
            >
        </div>
    </div>
</div>
