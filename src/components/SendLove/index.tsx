import "./SendLove.css";
import { useEffect, useState } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import { toast } from "react-toastify";
import { Modal } from "antd";
import { useRealtimeDB } from "../../utils/firebase.utils.ts";
import { useDeviceContext } from "../../providers/DeviceProvider.tsx";
import { NotiWarning } from "../Warning.tsx";
import ReactPlayer from "react-player";
import {
  convertStringToStar,
  getRateImageName,
  getVideoName,
} from "../../utils/string.utils.ts";
import Lottie from "lottie-react";
import LoadingAnimation from "../../assets/loading.json";
import {images} from "../ImageGallery/images.ts";

const explosionProps = {
  force: 0.8,
  duration: 3000,
  particleCount: 450,
  width: 3000,
};

const celebList = [
  "Đàm Vĩnh Hưng.webp",
  "Gavin Casalegno Diễn viên.jpg",
  "hieu-thu-hai.jpg",
  "Hyun Bin.jpg",
  "isaac.jpg",
  "Joseph Gordon.jpg",
  "Justin Bieber.webp",
  "Lee Min Ho.jpg",
  "Lê Minh.png",
  "Lưu Đức Hoa.jpg",
  "MCK.webp",
  "Mono(1).PNG",
  "MTP.webp",
  "noo-phuoc-thinh.jpg",
  "Shawn Mendes.webp",
  "soobin-hoang-son.jpg",
  "Timothée Chalamet.webp",
  "V - BTS.webp",
];

const man = [
  {
    image: "/avatar/Nhân.jpg",
    name: "Nguyễn Anh Nhân",
    vid: "/vid_love/Bo.mp4",
  },
  {
    image: "/avatar/LXNgoc.JPG",
    name: "Lê Xuân Ngọc",
    vid: "/vid_love/Lê Xuân Ngọc.MOV",
  },
  {
    image: "/avatar/tien.jpg",
    name: "Nguyễn Duy Tiến",
    vid: "/vid_love/Duy Tien.mp4",
  },
  {
    image: "/avatar/ngoc.jpg",
    name: "Phạm Đức Ngọc",
    vid: "/vid_love/Common.mp4",
  },
  {
    image: "/avatar/CA.jpg",
    name: "Cao Thế Anh",
    vid: "/vid_love/Cao Thế Anh.MOV",
  },
  {
    image: "/avatar/quyet.JPG",
    name: "Nguyễn Văn Quyết",
    vid: "/vid_love/Common.mp4",
  },
  {
    image: "/avatar/Dũng.jpg",
    name: "Hoàng Ngọc Dũng",
    vid: "/vid_love/Hoàng Dũng.mp4",
    
  },
  {
    image: "/avatar/hieu.JPG",
    name: "Phan Anh Hiếu",
    vid: "/vid_love/Phan Hếu.mp4",
  },
  {
    image: "/avatar/Đức-mobile.jpg",
    name: "Nguyễn Minh Đức",
    vid: "/vid_love/Common.mp4",
  },
  {
    image: "/avatar/phuoc.JPG",
    name: "Hồ Hữu Phước",
    vid: "/vid_love/Hồ Phước.mp4",
  },
  {
    image: "/avatar/manhtuan.jpg",
    name: "Nguyễn Mạnh Tuấn",
    vid: "/vid_love/Nguyễn Mạnh Tuấn.mp4",
  },
  {
    image: "/avatar/tam.JPG",
    name: "Nguyễn Hữu Tâm",
    vid: "/vid_love/Hữu Tâm.mp4",
  },
  {
    image: "/avatar/tin.JPG",
    name: "Nguyễn Phú Tín",
    vid: "/vid_love/Nguyen_Phu_Tin.mp4",
  },
  {
    image: "/avatar/tuananh.jpg",
    name: "Nguyễn Tuấn Anh",
    vid: "/vid_love/Nguyễn Tuấn Anh.mov",
  },
  {
    image: "/avatar/quaan hoang.JPG",
    name: "Quân Hoàng",
    vid: "/vid_love/Hoàng Quân.mp4",
  },
  {
    image: "/avatar/duc-be.jpg",
    name: "Nguyễn Văn Đức",
    vid: "/vid_love/Nguyễn Văn Đức.mp4",
  },
];

export default function SendLove() {
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isCurrentSelected, setIsCurrentSelected] = useState(false);
  const { deviceId, userName } = useDeviceContext();
  const [manList,setManList] = useState(man)
  
  useEffect(() => {
    setManList(man.sort(() => Math.random() - 0.5))
  }, []);
  
  return (
    <div className={"sl-wrapper"}>
      <h1>Trao gửi yêu thương</h1>
      <p>Bạn muốn nhận lời chúc từ ai nhỉ?</p>
      <p>Hãy “ấn” vào người mà bạn muốn nhận lời chúc nhé</p>
      <div className={"sl-user-boxes"}>
        {manList.map((item, index) => {
          return (
            <div
              onClick={() => {
                if (deviceId.length === 0) {
                  NotiWarning();
                  return;
                } else if (userName.length === 0) {
                  toast("Hãy đặt tên cho mình trước nhé", { type: "error" });
                  setTimeout(() => {
                    document.scrollingElement?.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }, 500);
                  return;
                }
                setIsCurrentSelected(true);
                setTimeout(() => {
                  setIsCurrentSelected(false);
                  setSelectedUser(item);
                }, 600);
              }}
              className={"sl-user-box"}
            >
              <UserBox
                isCurrentSelected={isCurrentSelected}
                index={index}
                key={index}
                name={item.name}
                age={2}
                image={item.image}
              />
            </div>
          );
        })}
      </div>

      {selectedUser && deviceId.length !== 0 && (
        <VidLuvModal
          vid={selectedUser?.vid}
          open={!!selectedUser}
          onClose={() => setSelectedUser(null)}
          name={selectedUser.name}
        />
      )}
    </div>
  );
}

const UserBox = ({ image, index, isCurrentSelected, rating }: any) => {
  const [isSelected, setIsSelected] = useState(false);
  const { deviceId, userName } = useDeviceContext();
  return (
    <>
      {isSelected ? (
        <img
          className={"animate__animated animate__rubberBand animate__wobble"}
          src={image}
          alt=""
        />
      ) : (
        <img
          style={{ cursor: "pointer" }}
          onClick={() => {
            if (deviceId.length === 0) {
              return;
            } else if (userName.length === 0) {
              return;
            } else if (isCurrentSelected) {
              return;
            }
            setIsSelected(true);
          }}
          src={"/celeb/" + celebList[index]}
          alt=""
        />
      )}
    </>
  );
};

const icon = [
  {
    src: "rate/it-thoi.png",
    alt: "it-thoi",
  },
  {
    src: "rate/kkk.png",
    alt: "kkk",
  },
  {
    src: "rate/i-like-it.png",
    alt: "i-like-it",
  },
  {
    src: "rate/ngon.png",
    alt: "ngon",
  },
  {
    src: "rate/ong-trum.png",
    alt: "ong-trum",
  },
];

interface VidLuvModalProps {
  open?: boolean;
  onClose: () => void;
  vid: string;
  name: string;
  ratingValue?: RatingProps;
}
const VidLuvModal = ({ open, onClose, vid, name }: VidLuvModalProps) => {
  const [pick, setItem] = useState<number>(-1);
  const { rateVideo, getAllRating } = useRealtimeDB();
  const { userName, deviceId } = useDeviceContext();
  const [emoji, setEmoji] = useState<boolean>(true);
  const [rating, setRating] = useState<RatingProps>();
  const { getRating } = useRealtimeDB();
  const [userRating, setUserRating] = useState<rate[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [allRating, setAllRating] = useState<userRating[]>([]);
  const [comment, setComment] = useState<boolean>(false);
  const fetchRating = async () => {
    const res = await getRating(deviceId, (vid && getVideoName(vid)) || "test");
    if (res) {
      setRating(res);
      setItem(res.userRating.id === deviceId ? res.userRating.rating : -1);
    }
    if (loading) setLoading(false);
    getAllRating((vid && getVideoName(vid)) || "test").then((res) => {
      if (res) {
        setAllRating(Object.values(res));
      } else {
        setAllRating([]);
      }
    });
  };
  useEffect(() => {
    fetchRating();
    const interval = setInterval(() => {
      fetchRating();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    handleEmoji();
  }, [rating]);

  const handleRate = (item: number) => {
    let value = item === pick ? -1 : item;
    setItem(value);
    rateVideo(deviceId, (vid && getVideoName(vid)) || "test", value, userName);
    setEmoji(rating?.total === 1 && value === -1);
    setLoading(true);
  };
  const handleEmoji = () => {
    if (loading) setLoading(false);
    if (!rating) return;
    setUserRating(convertStringToStar(rating.count));
  };

  return (
    <Modal
      centered
      title={`Lơi chúc từ ${name} iu dấu 🩷`}
      open={open}
      onCancel={onClose}
      onOk={onClose}
      width={1000}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
          height: 500,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            gap: 16,
            flex: 1,
            maxHeight: 400,
          }}
        >
          <div
            style={{
              width: "100%",
              minWidth: 500,
              borderWidth: 1,
              borderColor: "#00000030",
              borderStyle: "solid",
              borderRadius: 10,
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flex: 2,
            }}
          >
            <ReactPlayer
              width={"100%"}
              playing
              url={vid || "/vid_love/file_example_MP4_480_1_5MG.mp4"}
              controls
            />
          </div>
          {
            comment && (
              <div
                style={{
                  display: "flex",
                  borderWidth: 1,
                  borderColor: "#00000030",
                  borderStyle: "solid",
                  borderRadius: 10,
                  height: "100%",
                  flex: 1,
                }}
              >
                <div
                  style={{
                    overflowY: "auto",
                    padding: "0px 12px",
                    width: "100%",
                  }}
                >
                  {allRating.length > 0 ? (
                    allRating.map((item, index) => {
                      return (
                        <div
                          key={index}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            padding: "8px 0",
                            borderBottom: "1px solid #e8e8e8",
                            alignItems: "center",
                          }}
                        >
                          <p>{item.username}</p>
                          <img
                            src={getRateImageName({ number: item.rating })}
                            alt={getRateImageName({ number: item.rating })}
                            style={{
                              width: "50px",
                              height: "50px",
                              marginRight: 8,
                              backgroundColor: "white",
                              borderRadius: "100%",
                              borderWidth: 0.5,
                              borderColor: "#00000030",
                              borderStyle: "solid",
                              padding: "4px",
                            }}
                          />
                        </div>
                      );
                    })
                  ) : (
                    <div
                      style={{
                        padding: "12px 0",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          padding: "20px",
                          background: "#f0f0f0",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "18px",
                            lineHeight: "1.5",
                            color: "#333",
                            marginBottom: "15px",
                          }}
                        >
                          Các Lady thân mến,
                          <br />
                          Chúc mừng ngày Quốc tế Phụ nữ 8/3! Hôm nay, chúng ta có
                          một điều đặc biệt từ {name}, một đoạn video ý nghĩa dành
                          riêng cho tất cả các Lady tuyệt vời của North Studio. Bạn
                          nam của chúng ta đã dành rất nhiều tâm huyết để thực hiện
                          đoạn video này, và chắc chắn đây là một món quà ý nghĩa mà
                          chúng ta sẽ nhớ mãi.
                          <br />
                          Hãy thể hiện cảm xúc của bạn bằng cách thả react bên dưới
                          video này. Mỗi biểu tượng "react" nhỏ bé cũng chính là một
                          động lực lớn lao đến trái tim các chàng trai bé nhỏ của
                          chúng ta. Họ có ý định truyền đạt tình cảm chân thành và
                          tôn trọng sâu sắc đối với các Lady tuyệt vời nhất.
                          <br />
                          Dù {name} có thể có những lời nói và cử chỉ vụng về, nhưng
                          điều quan trọng là sự chân thành và tâm huyết đằng sau mỗi
                          hành động. Video này là một cách ý nghĩa để thể hiện lòng
                          biết ơn và tôn trọng đối với sự đóng góp của các Lady
                          trong công ty chúng ta.
                          <br />
                          Chúng ta là một gia đình, và mỗi thành viên đều quan
                          trọng. Hãy cùng nhau chia sẻ niềm vui và tạo ra những kỷ
                          niệm đáng nhớ trong ngày đặc biệt này. Cảm ơn mọi người đã
                          làm cho không khí tại North Studio trở nên ấm áp và tràn
                          đầy tình cảm.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          }
        </div>
        {!loading ? (
          emoji ? (
            <div
              style={{
                display: "flex",
                width: "100%",
                height: "50px",
              }}
            >
              {icon.map(({ alt, src }, index) => {
                return (
                  <button
                    onClick={() => handleRate(index)}
                    key={index}
                    className="rating"
                    style={{
                      outline: "none",
                      border: "none",
                      background: "none",
                    }}
                  >
                    {pick === index ? (
                      <img
                        alt={alt}
                        src={src}
                        style={{
                          width: "50px",
                          height: "50px",
                          scale: "1.4",
                          translate: "0px -15px",
                        }}
                      />
                    ) : (
                      <img
                        alt={alt}
                        src={src}
                        style={{
                          width: "50px",
                          height: "50px",
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          ) : (
            <button
              onClick={() => setEmoji(true)}
              style={{
                display: "flex",
                width: "100%",
                borderWidth: 0,
                flexDirection: "row",
                alignItems: "center",
                padding: "0px 12px",
                backgroundColor: "white",
                height: "50px",
              }}
            >
              {userRating.length > 0 && (
                <p
                  style={{
                    margin: 0,
                    padding: 0,
                    fontSize: 24,
                    fontWeight: "bold",
                    marginRight: 16,
                  }}
                >
                  {rating?.total}
                </p>
              )}
              {rating && (
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  {userRating.map((item, index) => {
                    return (
                      <img
                        key={index}
                        src={getRateImageName({ name: item })}
                        alt={getRateImageName({ name: item })}
                        style={{
                          width: "50px",
                          height: "50px",
                          marginRight: 8,
                          translate: `-${index * 25}px 0px`,
                          backgroundColor: "white",
                          borderRadius: "100%",
                          borderWidth: 0.5,
                          borderColor: "#00000030",
                          borderStyle: "solid",
                          padding: "4px",
                        }}
                      />
                    );
                  })}
                  {userRating.length > 0 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setComment(!comment);
                      }}
                      style={{
                        width: "50px",
                        height: "50px",
                        marginRight: 8,
                        translate: `-${userRating.length * 25}px 0px`,
                        backgroundColor: "white",
                        borderRadius: "100%",
                        borderWidth: 0.5,
                        borderColor: "#00000030",
                        borderStyle: "solid",
                        padding: "4px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 3,
                      }}
                    >
                      <div
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: "100%",
                          backgroundColor: "black",
                        }}
                      />
                      <div
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: "100%",
                          backgroundColor: "black",
                        }}
                      />
                      <div
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: "100%",
                          backgroundColor: "black",
                        }}
                      />
                    </button>
                  )}
                </div>
              )}
            </button>
          )
        ) : (
          <div
            style={{
              width: "100%",
              height: 50,
            }}
          >
            <div
              style={{
                width: 50,
                height: 50,
              }}
            >
              <Lottie animationData={LoadingAnimation} loop={true} />
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
