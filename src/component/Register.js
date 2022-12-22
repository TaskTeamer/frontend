import React from "react";
import axios from "axios";
import { Route, Router,useNavigate } from "react-router-dom";
import image from "./RegisterPage.jpg";
import BaseURL from './BaseURL.json';
function Register() {
    const navigate = useNavigate();
    const baseUrl = BaseURL.baseUrl;
    const onHeaderClick = (event) => {
        event.preventDefault();
        var pattern = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        let len = this.state.users.length;
        if (event.currentTarget.parentElement[0].value.length !== 0 && event.currentTarget.parentElement[1].value.length !== 0 && event.currentTarget.parentElement[2].value.length !== 0
            && event.currentTarget.parentElement[3].value.length !== 0 && event.currentTarget.parentElement[4].value.length !== 0 && event.currentTarget.parentElement[5].value.length !== 0) {
            if (event.currentTarget.parentElement[3].value.match(pattern)) {
                if (event.currentTarget.parentElement[5].value !== event.currentTarget.parentElement[4].value) {
                    alert("Şifreler Uyuşmamaktadır!")
                } else {
                    axios.post(`${baseUrl}/users/register`,
                    {first_name: event.currentTarget.parentElement[0].value,
                        last_name: event.currentTarget.parentElement[1].value,
                        email : event.currentTarget.parentElement[3].value,
                        password : event.currentTarget.parentElement[4].value,
                        user_name : event.currentTarget.parentElement[2].value})
                    .catch(err => {
                        alert("Eklenmedi")
                    }).then(res => {
                        alert("Kayıt Başarılı")
                        this.navigate('/login')})
                    ;
                }
            } else {
                alert("Geçersiz E-posta")
            }
        }
        else {
            alert("Tüm alanları doldurun")
        }
    }
    return (
        <div style={{ backgroundImage:`url(${image})`, backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize:"cover"}}>
            <br/>
            <div className="container justify-center" style={{ width: "40%" }}>
                <form id="sampleForm" className="m-4">
                    <div className="form-group p-3">
                        <div className="card-header bg-transparent" style={{ border: "none" }}><i style={{ fontSize: "40px" }} className="fa-solid text-primary fa-solid fa-circle-user d-flex justify-content-center"></i>
                            <h3 className="mt-2 d-flex justify-content-center">Task Teamer</h3>
                            <h4 className="mt-2 d-flex justify-content-center text-muted">Hesap Oluştur!</h4>
                        </div>
                        <label htmlFor="exampleInputEmail1" className="mb-1 mt-2">Ad</label>
                        <input type="text" className="form-control formlar" required style={{ borderTop: "0px", borderLeft: "0px", borderRight: "0px" }} id="txtAd" aria-describedby="emailHelp" placeholder="&#xf007;" />
                        <label htmlFor="exampleInputEmail1" className="formlar mb-1 mt-2">Soyad</label>
                        <input type="text" className="form-control formlar" style={{ borderTop: "0px", borderLeft: "0px", borderRight: "0px" }} id="txtSoyad" aria-describedby="emailHelp" placeholder="&#xf007;" />
                        <label htmlFor="exampleInputEmail1" className="mb-1 mt-2">Kullanıcı Adı</label>
                        <input type="text" className="form-control formlar" style={{ borderTop: "0px", borderLeft: "0px", borderRight: "0px" }} id="txtKadi" aria-describedby="emailHelp" placeholder="&#xf007;" />
                        <label htmlFor="exampleInputEmail1" className="mb-1 mt-2" >E-Mail</label>
                        <input type="text" className="form-control formlar" style={{ borderTop: "0px", borderLeft: "0px", borderRight: "0px" }} id="txtEmail" aria-describedby="emailHelp" placeholder="&#xf007;" />
                    </div>
                    <div className="form-group p-3">
                        <label htmlFor="exampleInputPassword1" className="mb-1">Şifre</label>
                        <input type="password" className="form-control formlar" id="txtSifre" style={{ borderTop: "0px", borderLeft: "0px", borderRight: "0px" }} autoComplete="off" placeholder="&#xf084;" />

                    </div>
                    <div className="form-group p-3">
                        <label htmlFor="exampleInputPassword1" className="mb-1">Şifre Tekrarı</label>
                        <input type="password" className="form-control formlar" autoComplete="off" id="txtSifreTekrar" style={{ borderTop: "0px", borderLeft: "0px", borderRight: "0px" }} placeholder="&#xf084;" />
                    </div>
                    <button type="submit" onClick={onHeaderClick} className="btn btn-primary m-4">Kayıt Ol  <i className="fa-solid fa-chevron-right"></i></button>
                </form>
            </div>
            <br/>
        </div> 
    )
}
export default Register;