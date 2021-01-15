import "../firebase/init";
import firebase from "firebase/app";
import "firebase/storage";

const storage = firebase.storage();

export const standardPhoto =
  "https://lh3.googleusercontent.com/proxy/tadsVIOsABGAk9SvE9-7S0sJxRCP8O15YVY4JcdYODm9SezOWoxPOBuEwWTTC83UnpbfbB1wFbtcwHjAyDXN5fRUg1KjXCTPedv6mfbwxjRQA60puQMLTsgVGEGaP0gbapMpk8KunA";

function userPictureReference(userId: string) {
  return storage.ref().child(`users/${userId}/profilePicture.jpg`);
}

export async function uploadProfilePicture(userId: string, file: File) {
  if (!file) {
    throw "File is empty!";
  }
  if (file.type !== "image/jpeg") {
    throw "Invalid format. Please select a JPEG file";
  }
  try {
    const metadata = {
      contentType: "image/jpeg",
    };
    const ref = userPictureReference(userId);
    await ref.put(file, metadata);
  } catch (err) {
    throw "Could not upload the photo! Try again later";
  }
}

export async function deleteProfilePicture(userId: string) {
  const ref = userPictureReference(userId);
  await ref.delete();
}

export async function getProfilePictureUrl(userId: string) {
  const ref = userPictureReference(userId);

  try {
    const url = await ref.getDownloadURL();
    return url;
  } catch (err) {
    console.log(err);
  }
  return null;
}
