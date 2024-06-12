import {createContext, PropsWithChildren, useContext, useState} from "react";
interface Chat{
	name: string,
	content: string,
	time: number
}

const ChatContext = createContext<any>({})


export default function ChatProvider({children}:PropsWithChildren) {
	
	const [chatList,setChatList] = useState<Chat[]>([])
	const [amountUnread,setAmountUnread] = useState(0)
	
	return <ChatContext.Provider  value={{chatList,setChatList,amountUnread,setAmountUnread}}>
		{children}
	</ChatContext.Provider>
}

export const useChatContext = () => useContext(ChatContext)