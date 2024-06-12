/// <reference types="vite/client" />

interface ServiceProps {
    
}

interface DBProps {
	name: "devices" | "services" | "rating" | string,
	deviceId?: string,
	videoId?: string
}

interface User {
	id: string,
	created_at: string,
	last_online: string,
	key?: string
}
interface RatingProps {
	total: number,
	count: ratingValue,
	userRating: userRating
}
type userRating = {
	id: string,
	rating: number,
	username: string
}
type ratingValue = {
	veryLow: number,
	low: number,
	medium: number,
	high: number,
	veryHigh: number
}
type rate = "veryLow"|"low"|"medium"|"high"|"veryHigh"
