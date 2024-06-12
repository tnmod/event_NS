import {useState} from 'react'
import './Service.css'
import {Avatar, Button, Flex, Modal, Tooltip, Typography} from 'antd';
import {toast} from "react-toastify";


const menus = [{
	name: 'Tẩm quất',
	image: '/gift.jpg',
}, {
	name: 'Trai đẹp bê nước tận bạn',
	image: '/gift.jpg',
}, {
	image: '/gift.jpg',
	name: 'Được khen 5 lần',
}, {
	image: '/gift.jpg',
	name: 'Đăng story nêu cảm nghĩ về bạn'
}
]
const man = [
	{
		image: '/avatar/Nhân.jpg',
		name: 'Nguyễn Anh Nhân'
	}, {
		image: '/avatar/LXNgoc.JPG',
		name: 'Lê Xuân Ngọc'
	}, {
		image: '/avatar/tien.jpg',
		name: 'Nguyễn Duy Tiến'
	}, {
		image: '/avatar/ngoc.jpg',
		name: 'Phạm Đức Ngọc'
	}, {
		image: '/avatar/CA.jpg',
		name: 'Cao Thế Anh'
	}, {
		image: '/avatar/quyet.JPG',
		name: 'Nguyễn Văn Quyết'
	}, {
		image: '/avatar/Dũng.jpg',
		name: 'Hoàng Ngọc Dũng'
	}, {
		image: '/avatar/hieu.JPG',
		name: 'Phan Anh Hiếu'
	}, {
		image: '/avatar/Đức-mobile.jpg',
		name: 'Nguyễn Minh Đức'
	}, {
		image: '/avatar/phuoc.JPG',
		name: 'Hồ Hữu Phước'
	}, {
		image: '/avatar/manhtuan.jpg',
		name: 'Nguyễn Mạnh Tuấn'
	}, {
		image: '/avatar/tam.JPG',
		name: 'Nguyễn Hữu Tâm'
	},
	{
		image: '/avatar/tin.JPG',
		name: 'Nguyễn Phú Tín'
	}, {
		image: '/avatar/tuananh.jpg',
		name: 'Nguyễn Tuấn Anh'
	}, {
		image: '/avatar/duc-be.jpg',
		name: 'Nguyễn Văn Đức'
	},
	{
		image: '/avatar/quaan hoang.JPG',
		name: 'Quân Hoàng'
	}
]
// const man = [
// 	'Nguyễn Anh Nhân',
// 	'Lê Xuân Ngọc',
// 	'Nguyễn Duy Tiến',
// 	'Phạm Đức Ngọc',
// 	'Cao Thế Anh',
// 	'Nguyễn Văn Quyết',
// 	'Hoàng Ngọc Dũng',
// 	'Phan Anh Hiếu',
// 	'Nguyễn Minh Đức',
// 	'Nguyễn Văn Đức',
// 	'Hồ Hữu Phước',
// 	'Nguyễn Mạnh Tuấn',
// 	'Nguyễn Hữu Tâm',
// 	'Nguyễn Phú Tín',
// ]


export const ServiceOrder = ({setSelectedService, selectedService}: any) => {
	const [isOpenModal, setIsOpenModal] = useState(false);
	const handleOpenModal = () => {
		setIsOpenModal(true);
	}
	return <div style={{textAlign: "center", marginBlock: 100}}>
		<h4>Xin mời lady order dịch vụ</h4>
		<h1 style={{marginBottom: "40px"}}>NS 6 packs boy service 💪</h1>
		
		<div style={{display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 50, marginBottom: 20}}>
			{menus.map(({name, image}) => <div onClick={() => {
				const userName = localStorage.getItem('username-8/3-ns')
				if (!userName) {
					toast("Nhập tên của bạn trước khi order", {type: "error"})
					return
				}
				handleOpenModal();
				setSelectedService({name})
			}} className={`card ${selectedService === name && 'card-selected'}`} style={{width: "20%"}}>
				<img style={{width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px"}} src={image} alt=""/>
			</div>)}
		</div>
		
		<Modal
			open={isOpenModal}
			footer={null}
			onCancel={() => setIsOpenModal(false)}
			centered
			closable={false}
			// cancelButtonProps={false}
		>
			<Typography.Title level={3}
												style={{margin: '0 auto', textAlign: 'center'}}>{selectedService.name}</Typography.Title>
			<div style={{margin: '20px 0'}}>
				<p style={{textAlign: 'center', marginBottom: 20}}>Bạn muốn ai sẽ thực hiện dịch vụ này</p>
				<Flex align='center' justify='center' style={{flexWrap: 'wrap', gap: 20}}>
					{
						man.map((item) => (
							<Tooltip title={item.name}>
								<Avatar
									onClick={() => {
										const currentAccount = localStorage.getItem('username-8/3-ns')
										if (!currentAccount) toast("Nhập tên của bạn trước khi order", {type: "error"})
										else setSelectedService((state: any) => ({...state, userAction: item.name}))
									}}
									className={`avatar ${selectedService.userAction === item.name && 'man-select'}`}
									style={{
										width: 100,
										height: 100,
										borderRadius: "100%"
									}}
									src={item.image}
									alt={item.name}
								/>
							</Tooltip>
						))
					}
				</Flex>
			</div>
			<div style={{display: 'flex', justifyContent: 'flex-end', gap: 8}}>
				<Button
					onClick={() => setIsOpenModal(false)}
				>
					Hủy
				</Button>
				<Button
					type='primary'
					onClick={() => {
						setIsOpenModal(false);
					}}
				>
					Lưu
				</Button>
			</div>
		</Modal>
	</div>
}