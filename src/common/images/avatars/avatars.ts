export const AVATAR_LENGTH = 54;
export const DEFAULT_AVATAR = 0;

export const getAvatar = (index = DEFAULT_AVATAR) => {
  return new URL(`./avatar_${index + 1}.svg`, import.meta.url).href;
};

export const getAllAvatars = () => {
  return new Array(AVATAR_LENGTH)
    .fill(0)
    .map((v, i) => getAvatar(i));
};
