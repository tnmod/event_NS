import { Modal } from "antd";

export const NotiWarning = () => {
    Modal.warning({
        title: 'Bật thông báo ở đây này~~~ reload lại trang ngay sau đó nhé 😘😘😘',
        content: <div style={{marginTop:16}}>
            <img src="/allow-notification.png" alt="" style={{width:"350px"}}/>
            <p>{"❗️Đối với một số trình duyệt khác chrome: Site Setting > Permissions > Notifications (Allow)"}</p>
        </div>,
    })
    alert("Các lady thân mến, sự kiện này yêu cầu bật thông báo để hoạt động, vui lòng bật thông báo và tải lại trang để tham gia sự kiện nhé!")
}