import { Modal } from "antd";
import { useRealtimeDB } from "../utils/firebase.utils";
import { useEffect, useState } from "react";
import { useDeviceContext } from "../providers/DeviceProvider";
import { convertStringToStar, getRateImageName } from "../utils/string.utils";

interface Props {
  videoId: string;
  onClose: () => void;
  open: boolean;
}

export const UserRatingModal = ({ videoId, onClose, open }: Props) => {
  const { getRating, getAllRating } = useRealtimeDB();
  const { deviceId } = useDeviceContext();
  const [rating, setRating] = useState<userRating[]>();
  useEffect(() => {
    getAllRating(videoId).then((res) => {
      setRating(Object.values(res));
    });
  }, []);

  useEffect(() => {
    if (rating) {
      RatingModal();
    }
  }, [rating]);

  const RatingModal = () => {
    Modal.warning({
      title: "Danh sách react của các lady",
      content: (
       
      ),
      onOk: onClose,
      open,
    });
  };

  return <div></div>;
};
