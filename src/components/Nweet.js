import { dbService, storageService } from "fBase";
import React, { useState } from "react";

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const deleteClick = async () => {
    const ok = window.confirm("Do you want to delete this Nweets?");
    if (ok) {
      await dbService.doc(`nweets/${nweetObj.id}`).delete();
      await storageService.refFromURL(nweetObj.fileUrl).delete();
    }
  };
  const editClick = () => {
    setEditing((prev) => !prev);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewNweet(value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    dbService.doc(`nweets/${nweetObj.id}`).update({
      text: newNweet,
    });
    editClick();
  };
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              value={newNweet}
              placeholder="Edit your Nweet"
              onChange={onChange}
              required></input>
            <input type="submit" value="edit"></input>
          </form>
          <button onClick={editClick}>cancel</button>
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {nweetObj.fileUrl && (
            <>
              <img src={`${nweetObj.fileUrl}`} width="50px" height="50px"></img>
            </>
          )}
          {isOwner && (
            <>
              <button onClick={deleteClick}>delete</button>
              <button onClick={editClick}>edit</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
