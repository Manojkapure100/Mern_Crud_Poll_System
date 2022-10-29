import React, { useEffect, useState } from "react";
import axios from "axios";

const DisplayPoll = () => {

    useEffect(()=>{
        loaddata()
    },[])

    // const [singledata,SetSingledata] = useState([])
    const [mydata, Setmydata] = useState([])

    const [r,setr] = useState(0)

    const [id,setid] = useState("")
    const [q,setq] = useState("")
    const [o1,seto1] = useState("")
    const [o2,seto2] = useState("")
    const [o3,seto3] = useState("")
    const [o4,seto4] = useState("")
    const [co1,setco1] = useState(0)
    const [co2,setco2] = useState(0)
    const [co3,setco3] = useState(0)
    const [co4,setco4] = useState(0)

    // const [count,Setcount] = useState(1)

    const loadSingledata = async (val) => {
        try {
            console.log(val)
            const result = await axios.post("http://localhost:4000/displayOnePoll",{val})
            // SetSingledata(result.data)
            // result=result.data
            setid(result.data._id)
            setq(result.data.q)
            seto1(result.data.o1)
            seto2(result.data.o2)
            seto3(result.data.o3)
            seto4(result.data.o4)
            setco1(result.data.co1)
            setco2(result.data.co2)
            setco3(result.data.co3)
            setco4(result.data.co4)
            console.log(result.data)      
        } catch (error) {
            alert("error in catch:" + error)
        }
    }

    const loaddata = async () => {
        try {
            const mydata = await axios.get("http://localhost:4000/displayPoll")
            console.log(mydata)
            if (mydata.data.msg) {
                Setmydata(mydata.data.data)
                console.log(mydata.data.data[0]._id)
                loadSingledata(mydata.data.data[0]._id)
            } else {
                alert("error in else")
            }
        } catch (error) {
            alert("error in catch:" + error)
        }
    }

    const showdata = mydata.map((d) => {
        return (
            <tr>
                <td> {d.q} </td>
                <td> {d.o1} </td>
                <td> {d.o2} </td>
                <td> {d.o3} </td>
                <td> {d.o4} </td>
                <td> <button onClick={(e) => selectme({ d })}> Select </button> </td>
            </tr>
        )
    })

    const selectme = (data) => {
        console.log("hello: " + JSON.stringify(data.d._id))
        loadSingledata(data.d._id)
    }

    const submitdata = async() => {
        // alert("submitted..."+r+"\n"+id)
        const updateCount = await axios.post("http://localhost:4000/updateCount",{id,r})
        console.log("update count----------")
        console.log(updateCount)
        // loaddata()
    }

    const refreshme = async() => {
        loaddata()
    }

    // refreshme

    return(
        <>
            <div align="center">

                <div>
                    <table border={1}>
                        <tr>
                            <td> <b> Question </b>  </td>
                            <td> <b> Option 1 </b> </td>
                            <td> <b> Option 2 </b> </td>
                            <td> <b> Option 3 </b></td>
                            <td> <b> Option 4 </b> </td>
                            <td> <b> Select </b> </td>
                        </tr>
                        {showdata}
                    </table>
                </div>

                <br></br>

                <div>
                    <table border={1}>
                        <tr>
                            <td> Question </td>
                            <td> <h3> {q} </h3> </td>
                        </tr>
                        <tr>
                            <td> <input type={"radio"} name={"options"} value={o1} onClick={(e)=>setr(1)}></input> </td>
                            <td>  {o1} </td>
                        </tr>
                        <tr>
                            <td> <input type={"radio"} name={"options"} value={o2} onClick={(e)=>setr(2)}></input> </td>
                            <td>  {o2}  </td>
                        </tr>
                        <tr>
                            <td> <input type={"radio"} name={"options"} value={o3} onClick={(e)=>setr(3)}></input> </td>
                            <td>  {o3}  </td>
                        </tr>
                        <tr>
                            <td> <input type={"radio"} name={"options"} value={o4} onClick={(e)=>setr(4)}></input> </td>
                            <td>  {o4} </td>
                        </tr>
                        <tr>
                            <td> <button onClick={submitdata}> Submit </button> </td>
                            <td> <button onClick={refreshme}> refresh </button> </td>
                        </tr>
                    </table>
                </div>

                <br></br>

                <div>
                    <table border={1}>
                        <tr>
                            <td> Your Options </td>
                            <td> Counts </td>
                            
                        </tr>
                        <tr>
                            <td> {o1} </td>
                            <td> {co1} </td>
                        </tr>
                        <tr>
                            <td> {o2} </td>
                            <td>  {co2}  </td>
                        </tr>
                        <tr>
                            <td> {o3} </td>
                            <td>  {co3}  </td>
                        </tr>
                        <tr>
                            <td> {o4} </td>
                            <td>  {co4} </td>
                        </tr>
                    </table>
                </div>

            </div>
        </>
    )
}

export default DisplayPoll