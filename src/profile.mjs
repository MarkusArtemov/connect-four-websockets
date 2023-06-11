import { MD5 } from 'crypto-js';

export async function loadProfilePicture(username) {
  try {
    const emailHash = MD5(username).toString();
    const gravatarUrl = `https://www.gravatar.com/avatar/${emailHash}?d=identicon`;

    const response = await fetch(gravatarUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch avatar image.');
    }

    const blob = await response.blob();
    const profileImage = document.getElementById('profile');
    profileImage.innerHTML = '';
    const imageUrl = URL.createObjectURL(blob);
    profileImage.src = imageUrl;
    profileImage.onload = () => URL.revokeObjectURL(imageUrl);
  } catch (error) {
    console.error(error);
  }
}