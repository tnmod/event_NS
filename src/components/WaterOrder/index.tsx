import './WaterOrder.css'
import {toast} from "react-toastify";


const menus = [{
	name:'Hi-Tea Kim Quất Bưởi Hồng Mandarin',
	image:'https://product.hstatic.net/1000075078/product/1705930644_hi-tea-buoi-kim-quat-min_00f5d65a4a2049a4ab890ff5235be522_large.jpg',
},{
	name: 'Oolong Tứ Quý Kim Quất Bưởi Hồng',
	image:'https://product.hstatic.net/1000075078/product/1705920159_oolong-buoi_a2e15643859745a39915803006c4d520_large.jpg',
},{
	image:'https://product.hstatic.net/1000075078/product/1705920417_tra-sua-suong-sao_0ce01a8ca4c1475a9bfffa88a7b6fb26_large.jpg',
	name: 'Trà Sữa Oolong Tứ Quý Sương Sáo',
},{
	image:'https://product.hstatic.net/1000075078/product/1696220170_phin-sua-tuoi-banh-flan_0172beb85d08408b8912bf5f1dae7fd9_large.jpg',
	name: 'Phin Sữa Tươi Bánh Flan'
},{
	image:'https://product.hstatic.net/1000075078/product/1696220139_tra-xanh-espresso-marble_26a0eb92bfd649508d0e93173e9b3083_large.jpg',
	name: 'Trà Xanh Espresso Marble'
},{
	image:'https://product.hstatic.net/1000075078/product/1675329120_coldbrew-pbt_127e09b0000c4027992bc3168899a656_large.jpg',
	name: 'Cold Brew Phúc Bồn Tử'
},{
	image:'https://product.hstatic.net/1000075078/product/1709005899_kimquat-xuan-1_0633c77ef262444dbc03f74b4d8370b0_large.jpg',
	name: 'Oolong Tứ Quý Kim Quất Trân Châu'
},{
	image:'https://product.hstatic.net/1000075078/product/1669736819_tra-dao-cam-sa-da_63defc32ce214da487850604a63ff281_large.png',
	name: 'Trà Đào Cam Sả - Đá'
},{
	image:'https://product.hstatic.net/1000075078/product/1709003879_suongsao-1_14b96f0dd18349218e64c572fbee8642_large.jpg',
	name: 'Trà Sữa Oolong Tứ Quý Sen Sương Sáo'
},{
	image:'https://product.hstatic.net/1000075078/product/1697442235_cloudfee-hanh-nhan-nuong_8282f6c2cf4d49bba2dfbe70cb7dbede_large.jpg',
	name: 'CloudFee Hạnh Nhân Nướng'
},{
	image:'https://product.hstatic.net/1000075078/product/1700837685_tra-sua-oolong-berry-ly-thuy-tinh_0a38d06e49f348df9fade09166683131_large.jpg',
	name: 'CloudTea Oolong Berry'
}
]

export const WaterOrder = ({setSelectedOrder,selectedOrder}:any) => {
	
  return <div style={{textAlign:"center",marginBlock:100}}>
		<h4>Xin mời lady order nước</h4>
		<h1 style={{marginBottom:"40px"}}>THE COFFEE HOUSE</h1>
		
		<div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:50}}>
			{menus.map(({name,image},index) => <div key={index} onClick={() => {
				const currentAccount = localStorage.getItem('username-8/3-ns')
				if (!currentAccount) toast("Nhập tên của bạn trước khi order", {type: "error"})
				else setSelectedOrder(name)
			}} className={`card ${selectedOrder === name && 'card-selected'}`} style={{width:"20%"}}>
				<img style={{width:"100%",height:"100%",objectFit:"cover",borderRadius:"8px"}} src={image} alt=""/>
				<p style={{fontWeight:500,fontSize:'16px',marginTop:"10px"}}>{name}</p>
			</div>)}
		</div>
	</div>
}