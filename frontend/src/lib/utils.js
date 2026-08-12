import { interviewCovers } from "../constants";

export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const getRandomInterviewCover = () => {
  const randomIndex = Math.floor(Math.random() * interviewCovers.length);
  return interviewCovers[randomIndex];
};
