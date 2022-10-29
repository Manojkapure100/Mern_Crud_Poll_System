import axios from "axios";
import React, { useEffect, useState } from "react";

const InsertPoll = () => {

    const [mydata, Setmydata] = useState([])
    const [id, Setid] = useState("")
    const [q, Setq] = useState("")
    const [o1, Seto1] = useState("")
    const [o2, Seto2] = useState("")
    const [o3, Seto3] = useState("")
    const [o4, Seto4] = useState("")

    useEffect(() => {
        loaddata()
    }, [])

    const showdata = mydata.map((d) => {
        return (
            <tr>
                <td> {d.q} </td>
                <td> {d.o1} </td>
                <td> {d.o2} </td>
                <td> {d.o3} </td>
                <td> {d.o4} </td>
                <td> <button onClick={(e) => editme({ d })}> Edit </button> </td>
                <td> <button onClick={(e) => deleteme({ d })}> Delete </button> </td>
                {/* <td> <button onClick={(e) => editme({ d })}> Edit </button> </td> */}
            </tr>
        )
    })

    const editme = (data) => {
        console.log("hello" + JSON.stringify(data))
        data = data.d
        Setid(data._id)
        Setq(data.q)
        Seto1(data.o1)
        Seto2(data.o2)
        Seto3(data.o3)
        Seto4(data.o4)
    }

    const deleteme = async (data) => {
        const idd = data.d._id
        // alert(idd)
        try {
            const data = await axios.post("http://localhost:4000/deletePoll", { idd })
            if (data) {
                // console.log(data)
                alert("Data Deleted...")
                Refresh()
            } else {
                alert("Data not Deleted..." + data)
            }
        } catch (error) {
            alert("Error Happened..." + error)
        }
    }

    const Refresh = async () => {
        Setid("")
        Setq("")
        Seto1("")
        Seto2("")
        Seto3("")
        Seto4("")
        loaddata()
    }

    const loaddata = async () => {
        try {
            const mydata = await axios.get("http://localhost:4000/displayPoll")
            console.log(mydata)
            if (mydata.data.msg) {
                Setmydata(mydata.data.data)
            } else {
                alert("error in else")
            }
        } catch (error) {
            alert("error in catch:" + error)
        }
    }

    const collectAndInsert = () => {
        try {
            if (q !== "" && o1 !== "" && o2 !== "" && o3 !== "" && o4 !== "") {
                const data = axios.post("http://localhost:4000/insertPoll", { q, o1, o2, o3, o4 })
                console.log(data)
                if (data) {
                    alert("Data Inserted...")
                    Refresh()
                } else {
                    alert("Data not Inserted...")
                }
            } else {
                alert("Please Fill All Fields (ID not require)")
            }
        } catch (error) {
            alert("Error Happened...")
        }
    }

    const collectAndUpdate = () => {
        try {
            if (id !== "" && q !== "" && o1 !== "" && o2 !== "" && o3 !== "" && o4 !== "") {
                const data = axios.post("http://localhost:4000/updatePoll", { id, q, o1, o2, o3, o4 })
                console.log(data)
                localStorage.setItem("abc", data)
                if (data) {
                    alert("Data Updated...")
                    Refresh()
                } else {
                    alert("Data not Updated...")
                }
            } else {
                alert("Please Fill All Fields")
            }

        } catch (error) {
            alert("Error Happened...")
        }
    }

    // const abc = () => {
    //     // window.location.href="/bb";
    // }

    return (
        <>
            <div align="center">
                <h1> Poll System </h1>

                <div>
                    {/* <h5> <button onClick={abc}> Start </button>  </h5> */}
                    <table>
                        <tr>
                            <td> Id </td>
                            <td> <input type={"text"} name={"id"} value={id} onChange={(e) => Setid(e.target.value)}></input> </td>
                        </tr>
                        <tr>
                            <td> Question </td>
                            <td> <input type={"text"} name={"q"} value={q} onChange={(e) => Setq(e.target.value)}></input> </td>
                        </tr>
                        <tr>
                            <td> Option 1 </td>
                            <td> <input type={"text"} name={"o1"} value={o1} onChange={(e) => Seto1(e.target.value)}></input> </td>
                        </tr>
                        <tr>
                            <td> Option 2 </td>
                            <td> <input type={"text"} name={"o2"} value={o2} onChange={(e) => Seto2(e.target.value)}></input> </td>
                        </tr>
                        <tr>
                            <td> Option 3 </td>
                            <td> <input type={"text"} name={"o3"} value={o3} onChange={(e) => Seto3(e.target.value)}></input> </td>
                        </tr>
                        <tr>
                            <td> Option 4 </td>
                            <td> <input type={"text"} name={"o4"} value={o4} onChange={(e) => Seto4(e.target.value)}></input> </td>
                        </tr>
                    </table>

                    <table>
                        <tr>
                            <td> <button onClick={collectAndInsert}> Insert </button> </td>
                            <td> <button onClick={Refresh}> Refresh </button> </td>
                            <td> <button onClick={collectAndUpdate}> Update </button> </td>
                        </tr>
                    </table>

                </div>

                <div><br></br>
                    <table border={1}>
                        <tr>
                            <td> <b> Question </b>  </td>
                            <td> <b> Option 1 </b> </td>
                            <td> <b> Option 2 </b> </td>
                            <td> <b> Option 3 </b></td>
                            <td> <b> Option 4 </b> </td>
                            <td> <b> Edit </b> </td>
                            <td> <b> Delete </b> </td>
                        </tr>
                        {showdata}
                    </table>
                </div>

            </div>

        </>
    )
}

export default InsertPoll