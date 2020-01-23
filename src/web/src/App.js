import React, { useState, useEffect, useRef } from 'react';
import ColorHash from 'color-hash';
import { DateTime } from 'luxon';
import Emoji from 'emoji-js';
import './App.css';

const GRINCHATBOT_SERVER_LINK = 'https://grin.nijynot.com';
const colorHash = new ColorHash({ lightness: [0.5, 0.5, 0.7] });
const emoji = new Emoji();
emoji.img_sets.twitter.path = 'https://abs.twimg.com/emoji/v2/72x72/';
emoji.img_set = 'twitter';

function Message(props) {
  const { timestamp, username, body, reactions } = props.message;

  return (
    <>
    <div className="Message">
      <div className="Message-user">
        <div className="Message-timestamp">{DateTime.fromSeconds(timestamp).toFormat('hh:mm a')}</div>
        <div
          className="Message-username"
          style={{ color: colorHash.hex(username) }}
        >{username}</div>
      </div>
      <div className="Message-body">
        {body}
        {reactions && (
          <div className="Message-reactions">
            {reactions.map((reaction, i) => (
              <div key={i} className="Message-reaction" dangerouslySetInnerHTML={{ __html: emoji.replace_colons(reaction.emoji) + `<span class="Message-reactionCount">${reaction.users.length}</span>` }}></div>
            ))}
          </div>
        )}
      </div>
    </div>
    </>
  );
}

function Chat(props) {
  const chatRef = useRef();

  useEffect(() => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [props.data]);

  return (
    <div ref={chatRef} className="Chat">
      {props.data.map((msg) => (
        <Message key={msg.id} message={msg} />
      ))}
    </div>
  );
}

function App() {
  const [data, setData] = useState([]);
  const [team, setTeam] = useState({ teams: [{ member_count: '— ' }] });

  useEffect(() => {
    fetch(`${GRINCHATBOT_SERVER_LINK}/messages`).then((res) => {
      return res.json();
    }).then((res) => {
      setData(res);
    }).catch((e) => {
      console.log(e);
    });

    fetch(`${GRINCHATBOT_SERVER_LINK}/team`).then((res) => {
      return res.json();
    }).then((res) => {
      if (res.teams) {
        setTeam(res);
      }
    });
  }, []);

  return (
    <div className="App">
      <div className="App-header">
        <svg id="grin-logo-bare" width="40" height="40" viewBox="0 0 61 61" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M43.341 20.2793C42.6915 18.8211 42.0862 15.94 40.4204 15.2994C38.2758 14.4747 36.9501 19.8734 36.6342 21.2375H36.3149C35.7742 18.9002 35.0485 15.5878 32.4824 14.85C31.2943 19.8399 33.7235 25.2229 35.9955 29.5411C38.4215 28.3818 39.6035 24.7512 39.8279 22.1956H40.1473L42.7023 29.8605C44.7578 29.2697 45.4729 27.2356 46.2151 25.3893C47.8084 21.4265 49.1453 16.5529 48.1317 12.295C45.0641 13.1637 44.1309 17.5503 43.341 20.2793ZM12.6813 30.4993C15.4263 29.1886 16.7325 25.0399 17.1525 22.1956H17.4719C17.7967 23.5666 18.665 27.1037 20.3781 27.3307C22.5607 27.6195 23.7051 22.7765 23.8593 21.2375H24.1787C24.8746 23.642 25.6079 26.769 28.0112 27.9443C28.8978 24.2204 27.8361 20.249 26.4744 16.7662C26.1243 15.8707 25.4054 13.4562 24.1707 13.4562C22.1478 13.4562 21.0105 18.7885 20.6656 20.2793H20.3462L17.7913 12.6144C13.297 14.7605 10.8557 26.1727 12.6813 30.4993ZM7.89066 34.3317C11.2259 48.8795 26.6098 57.1266 40.4667 50.9832C45.5099 48.7472 49.5104 44.7634 51.8169 39.7611C52.4128 38.4686 53.5834 36.1291 52.9008 34.4333C52.2212 32.7441 45.6297 35.5041 43.9827 36.225C43.7514 36.3278 43.5883 36.5411 43.5503 36.7915C43.4963 37.1457 43.5921 37.5066 43.8153 37.7874C44.0383 38.0681 44.3682 38.2431 44.7256 38.2706C45.9331 38.3635 47.4929 38.4836 47.4929 38.4836C42.4829 48.1813 28.9371 52.4692 19.3881 44.7215C17.2509 42.9877 15.3442 40.9274 14.061 38.4836C13.4404 37.3019 12.8649 35.7906 11.81 34.9797C10.7966 34.2004 9.25919 33.9335 7.89066 34.3317Z" fill="white"></path>
        </svg>
        <span className="App-channelName">grincoin — <strong>#general</strong></span>
        <span className="App-memberCount">{team.teams[0].member_count}+ members</span>
      </div>
      <Chat data={data} />
    </div>
  );
}

export default App;
