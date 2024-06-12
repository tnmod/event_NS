import './ChatBox.css'
import {faMinus, faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useChatContext} from "../../providers/ChatProvider.tsx";
import {Badge, Button, Input} from "antd";
import {useEffect, useRef, useState} from "react";
import {toast} from "react-toastify";
import {useMessaging} from "../../utils/firebase.utils.ts";
import moment from "moment";
import {useDeviceContext} from "../../providers/DeviceProvider.tsx";
// @ts-ignore
import ScrollToBottom from 'react-scroll-to-bottom';
import {faRocketchat} from "@fortawesome/free-brands-svg-icons";

export default function ChatBox() {
	
	
	const {chatList, setAmountUnread, amountUnread,setChatList} = useChatContext()
	const chatRef = useRef<any>(null)
	const [chatVal, setChatVal] = useState('')
	const {sendNotification} = useMessaging()
	const [currentAccount, setCurrentAccount] = useState<string | null>('');
	const {deviceId} = useDeviceContext()
	const contentRef = useRef<HTMLDivElement>(null)
	const [isCollapsed, setIsCollapsed] = useState(true)
	
	console.log([...new Set(chatList)])
	
	const handleSendMessage = () => {
		if (!chatVal) return
		const name = localStorage.getItem('username-8/3-ns')
		if (!name) {
			toast.error("Vui lòng nhập tên trước khi chat")
			return
		}
		const payload = {
			name,
			type: 'chat',
			content: chatVal
		} as const
		setChatVal('')
		sendNotification(payload)
	}
	
	useEffect(() => {
		const name = localStorage.getItem('username-8/3-ns')
		setCurrentAccount(name)
	}, [deviceId, chatList]);
	
	useEffect(() => {
		if (!isCollapsed) {
			setAmountUnread(0)
		}
	}, [isCollapsed]);
	
	
	return <>
		{!isCollapsed ? <div className={'animate__animated animate__backInUp'} style={{
				position: "fixed",
				right: "20px",
				top: "34dvh",
				height: "max-content",
				backgroundColor: "transparent",
				display: "inline-block"
			}}>
				<div className='chatBox ' style={{width: "24dvw", minWidth: "350px", minHeight: "30dvh", background: "#fff"}}>
					<div className="header" style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						padding: "10px",
						backgroundColor: "#9195F6"
					}}>
						<h3>Chat box</h3>
						<Button type={'text'} icon={<FontAwesomeIcon style={{cursor: "pointer"}} icon={faMinus}
																												 onClick={() => setIsCollapsed(true)}/>}/>
					</div>
					<ScrollToBottom ref={contentRef} className={'chatContent'}>
						{chatList?.map(({name, content, time}: any,index: number) => {
							if(content === chatList[index+1]?.content) return
							return <div className={`chatItem ${name === currentAccount && 'right-dir'}`} key={time}>
								<h4 style={{marginBottom: "5px"}}>{name} </h4>
								<p className={'msg-content'} style={{
									padding: "5px 16px",
									borderRadius: "40px",
									backgroundColor: "#98ABEE",
									width: "max-content"
								}}>{content}</p>
								<span style={{fontSize: "12px", color: "gray", fontWeight: 400}}>{moment(time).fromNow()}</span>
							</div>
						})}
					</ScrollToBottom>
					<div className={"chatFooter"}>
						<Input placeholder={"Nhắn với người đang connect..."} onPressEnter={handleSendMessage} value={chatVal}
									 onChange={(e) => setChatVal(e.target.value)} ref={chatRef}/>
						<Button onClick={handleSendMessage} type={"text"} icon={<FontAwesomeIcon icon={faPaperPlane}/>}></Button>
					</div>
				</div>
			</div>
			:
			<Badge count={amountUnread} style={{position: "fixed", top: "81dvh", right: "40px"}}>
				<div className={'chatCollapse'} style={{
					position: "fixed",
					top: "80dvh",
					right: "40px",
					background: "rgba(181,192,208,0.55)",
					padding: "20px",
					borderRadius: "50%"
				}}>
					<FontAwesomeIcon onClick={() => setIsCollapsed(false)} style={{fontSize: "40px"}} icon={faRocketchat}/>
				</div>
			</Badge>
		}
	</>
}