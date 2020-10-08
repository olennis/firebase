import { dbService } from "fBase";
import React, { useState } from "react";

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const deleteClick = () => {
    const ok = window.confirm("Do you want to delete this Nweets?");
    if (ok) {
      dbService.doc(`nweets/${nweetObj.id}`).delete();
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
