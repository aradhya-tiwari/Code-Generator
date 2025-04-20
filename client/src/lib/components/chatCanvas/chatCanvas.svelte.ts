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

export async function addChat(obj: userInput) {
    let currentIdx = getCurrentChat()
    chatContent.push(obj)
    let resp = await hhc.chat.$post({})
    let respReader = resp.body?.getReader()

    const readChunks = async () => {
        let readerStream = await respReader?.read()
        if (readerStream?.done) {
            console.log("Done Code Generation")
            return
        }
        let chunkString = new TextDecoder().decode(readerStream?.value)
        console.log(JSON.parse(chunkString))
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