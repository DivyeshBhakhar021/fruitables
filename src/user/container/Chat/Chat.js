import React, { useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';


// V9RT1HNX21PDWVJC9HTF37WK     recer id

function Chat(props) {

    const [rec, setrec] = useState('');
    const [msg, setMsg] = useState('');
    const [allmsg, setallmsg] = useState([]);
    const [gruopmsg,setgruopmsg] =useState([]);

    const socket = useMemo(() => io("http://localhost:4000"), [])


    useEffect(() => {
        socket.on('connect', () => {
            console.log("connet client", socket.id);
        }
        )

        socket.on("welocme", (msg) => console.log(msg))

        socket.on("hello", (msg) => console.log(msg))

        socket.on('res-msg', (msg) => setallmsg((per) => [...per, msg])


        )
    }, [])


    const handalSubmit = (e) => {
        e.preventDefault()

        socket.emit("hello", {
            receiver: rec,
            massage: msg
        })
    }


    const handalgrupSubmit = (e) =>{
        e.preventDefault()

        socket.emit("join-gruop", gruopmsg)

    }

    return (
        <div>
            {/* Single Page Header start */}

            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Chat</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item"><a href="#">Pages</a></li>
                    <li className="breadcrumb-item active text-white">Chat</li>
                </ol>
            </div>
            <br /> 
            {
                allmsg.map((v) => (
                    <p>{v}</p>
                ))
            }
           

            <form onSubmit={handalgrupSubmit}>
                <input
                    type="text"
                    name='gruop'
                    placeholder='gruop'
                    onChange={(e) => setgruopmsg(e.target.value)}

                />

                <input type='submit' />
            </form>
            <br /><br /><br /><br />
            <form onSubmit={handalSubmit}>
                <input
                    type="text"
                    name='Reciver'
                    placeholder='Reciver'
                    onChange={(e) => setrec(e.target.value)}

                />

                <input
                    type="text"
                    placeholder='Name'
                    name='massage'
                    onChange={(e) => setMsg(e.target.value)}
                />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Chat;
