import Chat from "./Chat.tsx";
import useWebSocket from "../customHook/useWebSocket.ts";
import {useState} from "react";
import {useAppSelector} from "../store/hooks.ts";
import {selectUsername} from "../store/Slices/usernameSlice.ts"
import {selectWebSocket, messageType} from "../store/Slices/webSocketSlice.ts";
import JoinLeaveMessage from "./joinLeaveMessage.tsx";

export default function ChatBox() {
    const {sendMessage} = useWebSocket()
    const [typedMessage, setTypedMessage] = useState<string>("")
    const username = useAppSelector(selectUsername)
    const webSocketState = useAppSelector(selectWebSocket)

    let count = 0 ;
    return (
        <>
            <div className="bg-white w-full rounded-lg shadow-lg p-4">
                <div className="mb-4">
                    <h1 className="text-3xl font-extrabold text-gray-800">Group Chat</h1>
                    <p className="text-gray-600">Welcome to the chat room!</p>

                    {webSocketState.messages?.map((message) => {
                        if(
                            message.type === messageType.JOIN ||
                            message.type === messageType.LEAVE
                        ){
                            //count = message.PrevCount;
                            count = message.prevOnline;
                        }
                        return <></>;
                        
                    })}

                    <p>
                        Online persons : <strong>{count}</strong>
                    </p>
                </div>

                <div className="overflow-y-auto max-h-96">
                    {
                        webSocketState.messages?.map((message, index) => {
                            return (
                                message.type === messageType.JOIN || message.type === messageType.LEAVE ? (
                                    <JoinLeaveMessage sender={message.sender} messageType={message.type} key={index} timestamp={message.timestamp}/>
                                    ):(
                                    <Chat key={index} content={message.content} sender={message.sender} isMe={username === message.sender} timestamp={message.timestamp}/>
                                )
                            )
                        })
                    }
                </div>

                <div>
                    <form  className="mt-4 flex items-center"
                           onSubmit={(e) => {
                              e.preventDefault()
                                sendMessage(typedMessage, username)
                                setTypedMessage("")
                          }}
                    >
                        <input type="text" placeholder="Type your message..."
                               className="flex-1 border rounded-md p-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 overflow-auto"
                               required
                               value={typedMessage}
                               onChange={(e) => setTypedMessage(e.target.value)}
                        />
                        <button
                            className="ml-2 bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                            type="submit"
                        >Send
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}