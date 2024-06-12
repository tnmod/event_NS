import { isNumber } from "lodash";

export const convertStringToStar = (value: ratingValue) => {
  const topRating = Object.fromEntries(
    Object.entries(value)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 2)
  );
  const res: rate[] = [];
  if (topRating.veryHigh) res.push("veryHigh");
  if (topRating.high) res.push("high");
  if (topRating.medium) res.push("medium");
  if (topRating.low) res.push("low");
  if (topRating.veryLow) res.push("veryLow");
  return res;
};

export const getRateImageName = ({
  name,
  number,
}: {
  name?: rate;
  number?: number;
}) => {
  if (name) {
    switch (name) {
      case "veryLow":
        return "rate/it-thoi.png";
      case "low":
        return "rate/kkk.png";
      case "medium":
        return "rate/i-like-it.png";
      case "high":
        return "rate/ngon.png";
      case "veryHigh":
        return "rate/ong-trum.png";
      default:
        return "rate/ong-trum.png";
    }
  } else if (isNumber(number)) {
    switch (number) {
      case 0:
        return "rate/it-thoi.png";
      case 1:
        return "rate/kkk.png";
      case 2:
        return "rate/i-like-it.png";
      case 3:
        return "rate/ngon.png";
      case 4:
        return "rate/ong-trum.png";
      default:
        return "rate/ong-trum.png";
    }
  }
};

export const getVideoName = (value: string) => {
  let string = value.replace(/\/vid_love\//, "").replace(/\s/g, "_").replace(/\.[^/.]+$/, "").toLowerCase()
  return string
};
