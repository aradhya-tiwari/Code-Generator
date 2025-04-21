import { hhc } from "$lib/hhc"

type AiContent = {
    code: string,
    description: string,
    sender: "ai"
}

type userInput = {
    msg: string,
    sender: "user"
}

type chatContentType = AiContent | userInput

let chatContent: chatContentType[] = $state([])
let chatCount: number = $derived(chatContent.length)
chatContent.push({
    sender: "ai",
    code: "What Component to create Today ?",
    description: "I will describe it as well as generate code for that"
})
export async function addChat(obj: userInput, prompt: string) {
    chatContent.push(obj)
    let resp = await hhc.chat.$post({
        form: {
            prompt: prompt
        }
    })
    let respReader = resp.body?.getReader()
    let idx = getCurrentChat()
    console.log(idx)
    chatContent.push({
        sender: "ai",
        code: "",
        description: ""
    })

    const readChunks = async () => {
        let readerStream = await respReader?.read()
        if (readerStream?.done) {
            console.log("Done Code Generation")
            return
        }

        let chunkString = new TextDecoder().decode(readerStream?.value)
        let jsonChunk = JSON.parse(chunkString)

        if (chatContent[idx].sender === "ai" && chunkString) {
            chatContent[idx].code = jsonChunk.code
            chatContent[idx].description = jsonChunk.description

        }
        readChunks()
    }
    readChunks()
}
export function getCurrentChat() {
    return chatCount
}
export function getChats() {
    return chatContent
    // return chatContent.map(e => e.sender = "ai")
}