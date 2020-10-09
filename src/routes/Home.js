import React, { useEffect, useState } from "react";
import { dbService, storageService } from "fBase";
import Nweet from "components/Nweet";
import { v4 as uuidv4 } from "uuid";

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const [attachment, setAttachment] = useState("");

  useEffect(() => {
    dbService.collection("nweets").onSnapshot((snapShot) => {
      const nweetArray = snapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArray);
    });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    let fileUrl = "";
    if (attachment !== "") {
      const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
      const response = await fileRef.putString(attachment, "data_url");
      fileUrl = await response.ref.getDownloadURL();
    }
    const nweetObj = {
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      fileUrl,
    };
    await dbService.collection("nweets").add(nweetObj);
    setNweet("");
    setAttachment("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };
  const onClearPhoto = () => {
    setAttachment("");
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          onChange={onChange}
          placeholder="What's on your mind?"
          maxLength={120}
          value={nweet}></input>
        <input type="submit" value="Nweet"></input>
        <input type="file" accept="image/*" onChange={onFileChange}></input>
        {attachment && (
          <>
            <img src={attachment} width="50px" height="50px"></img>
            <button onClick={onClearPhoto}>clear</button>
          </>
        )}
      </form>
      <div>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}></Nweet>
        ))}
      </div>
    </>
  );
};

export default Home;
