(this.webpackJsonptictactoe=this.webpackJsonptictactoe||[]).push([[0],{109:function(e,t,a){e.exports=a.p+"static/media/logo.7f18492e.png"},110:function(e,t,a){e.exports=a.p+"static/media/click.53f1b460.mp3"},139:function(e,t,a){e.exports=a(250)},144:function(e,t,a){},250:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(5),c=a.n(o),i=a(33),s=a(10),l=a(42),u=a(43),m=a(49),d=a(48),g=(a(144),a(11)),f=a.n(g),h=a(46);function p(e){for(var t=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]],a=0;a<t.length;a++){var n=Object(h.a)(t[a],3),r=n[0],o=n[1],c=n[2];if(e[r]&&e[r]===e[o]&&e[r]===e[c])return e[r]}return null}var v=a(135).a.div({hidden:{scale:0,opacity:0},visible:{scale:1,opacity:1,transition:{opacity:{ease:"easeOut",duration:300},default:{ease:"linear",duration:500}}}});var y=function(e){return r.a.createElement("button",{className:"square ".concat(e.isMyTurn?"te-my-turn":""),onClick:e.onClick},r.a.createElement(v,{pose:"X"===e.value||"O"===e.value?"visible":"hidden"},e.value))},b=a(251),E=function(e){Object(d.a)(a,e);var t=Object(m.a)(a);function a(){return Object(l.a)(this,a),t.apply(this,arguments)}return Object(u.a)(a,[{key:"renderSquare",value:function(e){var t=this;return r.a.createElement(y,{isMyTurn:this.props.isMyTurn,value:this.props.squares[e],onClick:function(){return t.props.onClick(e)}})}},{key:"render",value:function(){var e=this.props.isLoading;return r.a.createElement("div",{className:"".concat(e?"board-loading":"")},e&&r.a.createElement("div",{className:"board-spinner"},r.a.createElement(b.a,null)),r.a.createElement("div",{className:"board-row"},this.renderSquare(0),this.renderSquare(1),this.renderSquare(2)),r.a.createElement("div",{className:"board-row"},this.renderSquare(3),this.renderSquare(4),this.renderSquare(5)),r.a.createElement("div",{className:"board-row"},this.renderSquare(6),this.renderSquare(7),this.renderSquare(8)))}}]),a}(r.a.Component),I=a(109),N=a.n(I);var C=function(e){return r.a.createElement("div",{className:"te-logo-header"},r.a.createElement("div",null,r.a.createElement("img",{className:"te-logo",src:N.a})),r.a.createElement("div",null,e.isLoading&&r.a.createElement(b.a,null)))},O=a(253),w=a(26),x=a(110),k=a.n(x),j=function(e){Object(d.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(l.a)(this,a),(n=t.call(this,e)).isMyTurn=function(){var e=n.props.currentUserId;return n.props.gameConfig.nextPlayer===e},n.isItMyRoom=function(){var e=n.props.currentUserId;return n.props.gameConfig.ownerId===e},n.getOtherPlayer=function(){var e=n.props.currentUserId,t=n.props.gameConfig,a=t.ownerId,r=t.otherPlayerId,o="";return e===a&&(o=r),e===r&&(o=a),console.log("currentUserId",e),console.log("ownerId",a),console.log("otherPlayerId",r),console.log("--- > otherPlayer",o),o},n.getNextPlayer=function(){var e=n.props.gameConfig.nextPlayer;return e||""},n.getWinnerName=function(e){var t=n.props.gameConfig,a=t.X,r=t.O;return"X"===e?a:r},n.isGameFineshed=function(){return!1},n.getRandomPlayer=function(){var e=n.props.currentUserId,t=n.getOtherPlayer();return 1===(Math.random()>.5?1:0)?e:t},n.state={X:"",Y:"",ownerId:"",otherPlayerId:"",Winner:"",ownerWin:0,otherPlayerWin:0,nextPlayer:"",history:new Array(9).fill(null),stepNumber:0,xIsNext:!0,isLoading:!1,xWantPlay:!0,yWantPlay:!0},n}return Object(u.a)(a,[{key:"componentDidMount",value:function(){var e=this.props.gameConfig;this.setState(Object(s.a)({},this.state,{},e))}},{key:"handleClick",value:function(e){var t=this,a=this.state.history,n=this.props,r=n.updateGame,o=n.gameConfig,c=o.X,l=o.ownerId,u=n.currentUserId,m=n.gameConfig,d=Object(s.a)({},a);if(this.isMyTurn()&&!p(a)&&!a[e]&&(navigator.vibrate([20]),this.click.play(),d[e]=c===u?"X":"O",this.setState({history:d},(function(){r({history:d,nextPlayer:t.getOtherPlayer()})})),p(d))){var g=l===this.getWinnerName(p(d))?"ownerWin":"otherPlayerWin";r(Object(i.a)({},g,m[g]+1)),O.a.success({content:"you are winner!",centered:!0,maskClosable:!0})}}},{key:"render",value:function(){var e=this,t=this.state,a=t.isLoading,n=t.history,o=t.ownerWin,c=t.otherPlayerWin,i=t.ownerId,s=t.otherPlayerId,l=this.props,u=l.gameConfig,m=(l.currentUserId,l.roomId,l.updateGame),d=p(n),g=this.isMyTurn(),f=this.isItMyRoom(),h=this.getNextPlayer(),v=d||this.isGameFineshed(),y=!(!i||!s);return u?(d?"Winner: "+d:"Next player: "+h,v&&"Game has finished. Waiting for room owner for start game.",r.a.createElement(r.a.Fragment,null,r.a.createElement("audio",{ref:function(t){e.click=t}},r.a.createElement("source",{src:k.a,type:"audio/mpeg"})),r.a.createElement("div",{className:"game"},r.a.createElement("div",{className:"game-board"},r.a.createElement(E,{squares:n,onClick:function(t){return!a&&y&&e.handleClick(t)},isMyTurn:g,isLoading:a||!y}))),r.a.createElement("div",{className:"d-flex justify-content-center"},r.a.createElement("div",{className:"text-center te-stats"},r.a.createElement(b.a,{spinning:!i},r.a.createElement("div",{className:"te-winner-stat-title"},i)),r.a.createElement("div",{className:"te-win-stat"},o)),r.a.createElement("div",{className:"text-center te-stats"},r.a.createElement(b.a,{spinning:!s},r.a.createElement("div",{className:"te-winner-stat-title"},s)),r.a.createElement("div",{className:"te-win-stat"},c))),!v&&r.a.createElement("h3",{className:"m-4 text-center"},g?"Your Turn!":"Waiting opponent."),r.a.createElement("div",{className:"mt-2 mb-2 text-center"},d&&r.a.createElement("h3",null,"WINNER ".concat(this.getWinnerName(d),"!"))),f&&v&&r.a.createElement(w.a,{type:"primary",className:"te-start-again-button",block:!0,onClick:function(){return m({history:[],nextPlayer:e.getRandomPlayer()})}},"Start Again"))):r.a.createElement(C,{isLoading:!0})}}],[{key:"getDerivedStateFromProps",value:function(e,t){var a=e.gameConfig.history,n=e.updateGame,r=e.gameConfig;e.yWantPlay;r&&a&&(p(a)&&n({xWantPlay:!1,yWantPlay:!1}));return console.log("props.gameConfig",e.gameConfig),Object(s.a)({},e.gameConfig,{isLoading:!e.gameConfig.nextPlayer})}}]),a}(r.a.Component);j.defaultProps={gameConfig:{X:"",Y:"",ownerId:"",otherPlayerId:"",Winner:"",ownerWin:0,otherPlayerWin:0,nextPlayer:""}};var S=j,P=a(254),R=a(19),U=a.n(R),W=a(54),L={setItem:function(){var e=Object(W.a)(U.a.mark((function e(t,a){return U.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,localStorage.setItem(t,JSON.stringify(a));case 3:return e.abrupt("return",e.sent);case 6:e.prev=6,e.t0=e.catch(0);case 8:case"end":return e.stop()}}),e,null,[[0,6]])})));return function(t,a){return e.apply(this,arguments)}}(),getItem:function(){var e=Object(W.a)(U.a.mark((function e(t){var a;return U.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,localStorage.getItem(t);case 3:return a=e.sent,e.abrupt("return",JSON.parse(a));case 7:e.prev=7,e.t0=e.catch(0);case 9:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t){return e.apply(this,arguments)}}(),removeItem:function(){var e=Object(W.a)(U.a.mark((function e(t){return U.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,localStorage.removeItem(t);case 3:return e.abrupt("return",e.sent);case 6:e.prev=6,e.t0=e.catch(0);case 8:case"end":return e.stop()}}),e,null,[[0,6]])})));return function(t){return e.apply(this,arguments)}}(),clear:function(){var e=Object(W.a)(U.a.mark((function e(){return U.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,console.log("####_LOCAL_STORAGE_CLEARED_####"),e.next=4,localStorage.clear().then((function(){return localStorage.setItem("isFirstTime","NO")}));case 4:return e.abrupt("return",e.sent);case 7:e.prev=7,e.t0=e.catch(0);case 9:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}()};var G=function(e){var t=e.checkUser,a=Object(n.useState)(""),o=Object(h.a)(a,2),c=o[0],i=o[1];return r.a.createElement("div",{className:"te-register-form d-flex justify-content-center align-items-center"},r.a.createElement("div",null,r.a.createElement(C,null),r.a.createElement(P.a,{size:"large",placeholder:"username",onChange:function(e){return i(e.target.value.toLowerCase())},className:"text-center",value:c,spellCheck:!1,autoFocus:!0}),r.a.createElement(w.a,{className:"mt-2",type:"primary",block:!0,onClick:function(){t(c)}},"CONTINUE")))};var T=function(e){var t=e.checkRoom,a=Object(n.useState)(""),o=Object(h.a)(a,2),c=o[0],i=o[1];return r.a.createElement("div",{className:"te-register-form d-flex justify-content-center align-items-center"},r.a.createElement("div",null,r.a.createElement(C,null),r.a.createElement(P.a,{size:"large",placeholder:"room id (4 digit)",onChange:function(e){return(""===(t=e.target.value)||!!(t&&t.length<5))&&i(e.target.value);var t},className:"text-center",value:c,max:4,type:"number",autoFocus:!0}),r.a.createElement(w.a,{disabled:4!==c.length,className:"mt-2",type:"primary",block:!0,onClick:function(){c&&4===c.length&&t(c)}},"JOIN & CREATE ROOM")))},q=a(252),A=a(129),M=a.n(A);var F=function(e){var t=e.currentUserId,a=e.logout,n=e.currentRoom;return r.a.createElement("div",{className:"d-flex justify-content-between align-items-center mb-4"},r.a.createElement("div",{className:"d-flex align-items-center"},r.a.createElement(q.a,{className:"te-avatar"},t.charAt(0).toUpperCase()),r.a.createElement("div",{className:"d-flex align-items-start flex-column"},r.a.createElement("div",{className:"te-active-user ml-2"},"user: "+t),n?r.a.createElement("div",{className:"te-active-user ml-2"},"room code: "+n):null)),r.a.createElement("div",{onClick:a,className:"cursor-pointer te-logout"},"Logout ",r.a.createElement(M.a,{size:"medium"})))},X=a(255),D={X:"",O:"",ownerId:"",otherPlayerId:"",Winner:"",ownerWin:0,otherPlayerWin:0,nextPlayer:"",history:new Array(9).fill(null),stepNumber:0,xIsNext:!0,xWantPlay:!0,yWantPlay:!0},z=function(e){Object(d.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(l.a)(this,a),(n=t.call(this,e)).checkUser=function(){L.getItem("userId").then((function(e){L.getItem("currentRoom").then((function(t){e&&n.setState({currentUserId:e,isRegistered:!0,currentRoom:t}),t&&e&&n.runGameListeners(),n.setState({isLoading:!1})}))}))},n.registerUser=function(e){n.setState({isLoading:!0}),f.a.database().ref("users/".concat(e)).once("value",(function(t){t.val()?(X.a.error("This user already exist. Please try with other username"),n.setState({isLoading:!1})):f.a.database().ref("users/".concat(e)).update({userActive:!0}).then((function(){L.setItem("userId",e).then((function(){n.setState({currentUserId:e,isRegistered:!0,currentRoom:null,isLoading:!1})}))}))}))},n.checkRoom=function(e){var t=n.state.currentUserId;n.setState({isLoading:!0}),f.a.database().ref("rooms/".concat(e)).once("value",(function(a){var r=a.val(),o=Object(s.a)({},D,{X:t,ownerId:t,nextPlayer:t});r?f.a.database().ref("rooms/".concat(e)).once("value",(function(a){f.a.database().ref("rooms/".concat(e)).update({otherPlayerId:t,O:t}).then((function(){L.setItem("currentRoom",e).then((function(){n.setState({currentRoom:e,gameConfig:a.val(),isLoading:!1}),n.runGameListeners(),X.a.success("Successfully joined.")}))}))})):f.a.database().ref("rooms/".concat(e)).update(o).then((function(){L.setItem("currentRoom",e).then((function(){n.setState({currentRoom:e,gameConfig:o,isLoading:!1}),X.a.info("Room successfully created. Share your codes for join.\n"+"Your code: ".concat(e)),n.runGameListeners()}))}))}))},n.logout=function(){L.removeItem("userId").then((function(){L.removeItem("currentRoom").then((function(){n.setState({currentUserId:null,isRegistered:!1,currentRoom:null})}))}))},n.runGameListeners=function(){L.getItem("userId").then((function(e){L.getItem("currentRoom").then((function(t){e&&t&&(n.setState({currentUserId:e,isRegistered:!0,currentRoom:t}),f.a.database().ref("rooms/".concat(Number(t))).once("value",(function(e){var t=e.val();n.setState((function(e){return Object(s.a)({},e,{gameConfig:Object(s.a)({},e.gameConfig,{},t,{history:t.history?t.history:new Array(9).fill(null)})})}))})),f.a.database().ref("rooms/".concat(Number(t))).on("child_changed",(function(e){var t=e;console.log("gameConfig",t),n.setState((function(e){return Object(s.a)({},e,{gameConfig:Object(s.a)({},e.gameConfig,Object(i.a)({},t.key,t.val()))})}))})),f.a.database().ref("rooms/".concat(Number(t))).on("child_added",(function(e){var t=e;n.setState((function(e){return Object(s.a)({},e,{gameConfig:Object(s.a)({},e.gameConfig,Object(i.a)({},t.key,t.val()))})}))})),f.a.database().ref("rooms/".concat(Number(t),"/history")).on("child_removed",(function(e){n.setState((function(e){return Object(s.a)({},e,{gameConfig:Object(s.a)({},e.gameConfig,{history:[]})})}))})))}))}))},n.updateGame=function(e){var t=n.state.currentRoom;f.a.database().ref("rooms/".concat(Number(t))).update(e)},n.state={isRegistered:!1,currentUserId:null,currentRoom:null,gameConfig:Object(s.a)({},D),isLoading:!0,appIsRunning:!1},n}return Object(u.a)(a,[{key:"componentDidMount",value:function(){setTimeout(function(){this.checkUser()}.bind(this),1500),window.addEventListener("resize",(function(){var e=.01*window.innerHeight;document.documentElement.style.setProperty("--vh","".concat(e,"px"))}))}},{key:"render",value:function(){var e=this.state,t=e.isRegistered,a=e.currentUserId,n=e.currentRoom,o=e.roomId,c=e.gameConfig,i=e.isLoading;return i?r.a.createElement(C,{isLoading:i}):t?n?r.a.createElement(r.a.Fragment,null,r.a.createElement(F,{currentUserId:a,currentRoom:n,logout:this.logout}),r.a.createElement(S,{currentUserId:a,roomId:o,gameConfig:c,isRoomOwner:c&&c.ownerId===a,updateGame:this.updateGame})):r.a.createElement(r.a.Fragment,null,r.a.createElement(F,{currentUserId:a,logout:this.logout}),r.a.createElement(T,{checkRoom:this.checkRoom})):r.a.createElement(G,{checkUser:this.registerUser})}}]),a}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var _=a(256),J=(a(242),a(243),_.a.Content);f.a.initializeApp({apiKey:"AIzaSyDQtpaeFhvUUeUtUUxA4xlDaEzDiSo7fHc",authDomain:"te-tictactoe.firebaseapp.com",databaseURL:"https://te-tictactoe.firebaseio.com",projectId:"te-tictactoe",storageBucket:"te-tictactoe.appspot.com",messagingSenderId:"478023561910",appId:"1:478023561910:web:81e0297885e6397316ec17",measurementId:"G-LB8CWZC46J"}),c.a.render(r.a.createElement(r.a.Fragment,null,r.a.createElement(_.a,{className:"layout te-game-layout"},r.a.createElement(J,{className:"te-game-content"},r.a.createElement("div",{className:"site-layout-content"},r.a.createElement(z,null))))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[139,1,2]]]);
//# sourceMappingURL=main.60273f00.chunk.js.map