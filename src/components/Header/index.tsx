import './Header.css'
import logo from '../../assets/logo.png';
import { Button, Input } from "antd";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import {useRealtimeDB} from '../../utils/firebase.utils';
import {useDeviceContext} from "../../providers/DeviceProvider.tsx";

export default function Header() {

  const [val, setVal] = useState('')
  const {addService, updateDevice, checkDatabase} = useRealtimeDB()
  const {deviceId, setUserName,userName} = useDeviceContext()
  
  const handleSubmitUsername = () => {
    if (!val) return
    localStorage.setItem('username-8/3-ns', val)
    setUserName(val)
    updateDevice(deviceId, val)
    addService({username: val},deviceId)
    toast('Tên xink như cậu vậy 🥰')
  }

  useEffect(() => {
    checkDatabase({name:'devices', deviceId}).then(({data}) => {
      if (data?.username) {
        setUserName(data.username)
      }else{
        const currentUsername = localStorage.getItem('username-8/3-ns');
        setUserName(currentUsername||"");
      }
    })
  }, [deviceId]);

  return (
    <div className={'header-container'}>
      <div className={'header-logo'}>
        <img src={logo} className={'logo-image'} alt={'logo'} />
      </div>
      <div className='content-wrapper' style={{ display: 'flex', flexDirection: 'column' }}>
        <div className={'header-content'}>
          <div className={'title'}>
            <span>
              {"Chúc mừng"}
            </span>
            <span>
              {"Ngày quốc tế phụ nữ 8/3"}
            </span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: 'column', alignItems: 'center' }}>
          <div className={'des'}>
            {"Chúc cho các chị em nhà NorthStudio...."}
          </div>
          <div style={{ marginBottom: "120px", display: "flex", gap: "10px" }}>
            {!userName ?
              <>	
              <Input id='header-name' onChange={(e) => setVal(e.target.value)} placeholder={'Xin hỏi username của cậu...'} className={'email-input'}
                style={{ background: "rgba(0, 0, 0, 0.5)", minWidth: "200px", borderRadius: "12px" }} />
                <button onClick={handleSubmitUsername} className={'header-button'}>{"Done"}</button>
              </>
              :
              <div style={{ color: "#fff", textAlign: "center" }}>
                <h2 >
                  Hi lady <span style={{ fontFamily: "'Roboto', cursive" }}>{userName}</span>
                </h2>
                <span onClick={() => {
                  localStorage.removeItem('username-8/3-ns')
                  setUserName('')
                }} style={{ textDecoration: "underline", cursor: "pointer", color: 'gray' }}>{"Đăng nhập bằng tên khác️"}</span>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}