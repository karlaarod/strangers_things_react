import React from "react";
import { useHistory } from "react-router-dom";

const Inbox = ({ userData, posts }) => {
  const history = useHistory();


  console.log("userData", userData);


  if ( !userData.messages || !posts) {
   return  <div></div>;
  }
  const userId = userData._id;
  const myInbox = userData.messages ;
  const sentMessages = myInbox.filter((message) => {
    return userId === message.fromUser._id;
  });
  const receivedMessages = myInbox.filter((message) => {
    return userId !== message.fromUser._id;
  });
   console.log("messages", myInbox);
    console.log("sent", sentMessages);
  
    console.log("received", receivedMessages);
  return (
    <div className="messages-display">
      <h2>Messages Received:</h2>

      {receivedMessages ? (
        receivedMessages.map((message, index) => {
          return (
            <div key={index} className="messages-received">
              <h3>From: {message.fromUser.username}</h3>
              <h3>Message: {message.content}</h3>
              <h3>Orginial Post: {message.post.title} </h3>
              <button
                onClick={() => {
                  history.push(`/posts/${message.post._id}`);
                }}
              >
                View Original Post
              </button>
            </div>
          );
        })
      ) : (
        <h3>No Messages Received</h3>
      )}
      <h2>Messages Sent:</h2>

      {sentMessages ? (
        sentMessages.map((message, index) => {
          return (
            <div key={index} className="messages-sent">
              <h3>From: {message.fromUser.username}</h3>
              <h3>Message: {message.content}</h3>
              <h3>Orginial Post: {message.post.title} </h3>
              <button
                onClick={() => {
                  history.push(`/posts/${message.post._id}`);
                }}
              >
                View Original Post
              </button>
            </div>
          );
        })
      ) : (
        <h3>No Messages Sent</h3>
      )}
    </div>
  );
};

export default Inbox;
