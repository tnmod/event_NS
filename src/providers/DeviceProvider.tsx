import {createContext, PropsWithChildren, useContext, useState} from "react";

type DeviceContextType = {
	deviceId: string;
	setDeviceId: (deviceId: string) => void;
	userName: string;
	setUserName: (userName: string) => void;
}

const DeviceContext = createContext<DeviceContextType>({} as DeviceContextType)

export const DeviceProvider = ({children}: PropsWithChildren) => {
	
	const [deviceId, setDeviceId] = useState<string>('');
	const [userName, setUserName] = useState<string>('');
	
	return <DeviceContext.Provider value={{setDeviceId,deviceId, setUserName, userName}}>
		{children}
	</DeviceContext.Provider>

}

export const useDeviceContext = () => useContext(DeviceContext)