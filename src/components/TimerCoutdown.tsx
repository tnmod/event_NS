import {CountdownCircleTimer} from "react-countdown-circle-timer";

export const UrgeWithPleasureComponent = () => (
	<CountdownCircleTimer
		isPlaying
		duration={3}
		colors={['#004777', '#F7B801', '#A30000', '#A30000']}
		colorsTime={[3, 2, 1, 0]}
	>
		{({remainingTime}) => <h1>{remainingTime}</h1>}
	</CountdownCircleTimer>
)