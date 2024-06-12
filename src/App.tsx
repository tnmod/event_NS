import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./App.css";
import ListGirl from "./components/ListGirl";
import { ImageGallery } from "./components/ImageGallery";

import SendLove from "./components/SendLove";
import "animate.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { WaterOrder } from "./components/WaterOrder";
import { ServiceOrder } from "./components/Service";
import HeartBeat from "./components/HeartBeat";
import Header from "./components/Header";
import { getToken, onMessage } from "firebase/messaging";
import {
  messaging,
  useMessaging,
  useRealtimeDB,
} from "./utils/firebase.utils.ts";
import { Message } from "./components/MessageFB/Message.tsx";
import { SmoothScroll } from "./components/SmoothScroll.tsx";
import { useDeviceContext } from "./providers/DeviceProvider.tsx";
import { Button, Modal } from "antd";
import { useChatContext } from "./providers/ChatProvider.tsx";
import ChatBox from "./components/ChatBox";
import { NotiWarning } from "./components/Warning.tsx";
import {OrderedListModal} from "./components/OrderedListModal.tsx";

function App() {
	const [selectedOrder, setSelectedOrder] = useState('');
	const [selectedService, setSelectedService] = useState<{ userAction: string, name: string }>({
		userAction: '',
		name: ''
	});
	const {addDevice, addService,getRating} = useRealtimeDB();
	const {setDeviceId, deviceId} = useDeviceContext()
	const {sendNotification} = useMessaging();
	const {setChatList, setAmountUnread,chatList} = useChatContext()
	const [openOrderList, setOpenOrderList] = useState(false);
	
	const handleAddFirebase = async () => {
		const name = localStorage.getItem('username-8/3-ns')
		if (!name || ((!selectedOrder) || (!selectedService.name || !selectedService.userAction))) {
        toast('Nhâp tên và order của bạn trước khi order')
        return
		}
		await addService({order: selectedOrder, name, service: selectedService}, deviceId)
		await sendNotification({
			type: "noti",
			body: `Lady ${name} đã order`,
			title: `${selectedOrder}, ${selectedService.name} từ anh ${selectedService.userAction} 🥰`
		});
	}
	
	
	const handleUniqueArray = () => {
		var uniqueDescriptions: any = {};

// Mảng mới chứa các đối tượng duy nhất
		var uniqueObjects:any = [];

// Lọc các đối tượng duy nhất
		chatList.forEach(function(obj: any) {
			if (!uniqueDescriptions.hasOwnProperty(obj.description)) {
				uniqueDescriptions[obj.content] = true;
				uniqueObjects.push(obj);
			}
		});
		
		setChatList(uniqueObjects)
	}

	useEffect(() => {
		AOS.init({
			duration: 400,
			delay: 200,
		});
		requestPermission();
		
		onMessage(messaging, (payload: any) => {
			if (!(payload.data['gcm.notification.type'] === "chat")) {
			console.log("come")
			console.log('Message received.', payload);
			toast(<Message notification={payload.notification}/>);
			return
			}
			console.log({setChatList});
			setChatList((prev: any) => ([...prev, {
				name: payload.data['gcm.notification.name'],
				content: payload.data['gcm.notification.content'],
				time: Date.now()
			}]))
			// handleUniqueArray()
			setAmountUnread((prev:any) => prev + 1)
		});
	}, [deviceId])
	
	async function requestPermission() {
		const permission = await Notification.requestPermission();
		
		if (permission === "granted") {
			const deviceId = await getToken(messaging, {
				vapidKey: import.meta.env.VITE_APP_VAPID_KEY,
			});
			if (deviceId) {
				addDevice(deviceId);
				setDeviceId(deviceId);
			}
		} else if (permission === "denied") {
			NotiWarning()
		}
	}
	
	
	
	
	return (
		<div style={{position: "relative",overflowX: "hidden"}}>
			<ToastContainer/>
			<SmoothScroll>
				<div className={'app'} style={{overflowX: "hidden"}} data-aos={"fade-left"}>
					<Header/>
					<div style={{maxWidth: "1440px", margin: '0 auto'}}>
						<ImageGallery/>
						<ListGirl/>
						<SendLove/>
						<WaterOrder selectedOrder={selectedOrder} setSelectedOrder={setSelectedOrder}/>
						<ServiceOrder selectedService={selectedService} setSelectedService={setSelectedService}/>
					</div>
					<div style={{display: "flex",flexDirection:"column",gap:10, justifyContent: "center", alignItems: "center", marginBottom: "50px"}}>
						<Button className={"btn-submit"} size={"large"} type={"primary"} onClick={() => handleAddFirebase()}>
							Gửi yêu cầu của bạn
						</Button>
						<Button type={"text"} onClick={() => setOpenOrderList(true)}><p style={{fontWeight:500}}>Xem danh sách order</p></Button>
					</div>
				</div>
			</SmoothScroll>
			<ChatBox/>
			<HeartBeat/>
			<OrderedListModal open={openOrderList} onClose={() => setOpenOrderList(false)}/>
		</div>
	)
}

export default App;
