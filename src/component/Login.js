import React from "react";
import image from "./LoginPage.jpg";
function Login(props){
    return (
        <div style={{ backgroundImage:`url(${image})`, backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize:"cover"}}>
            <br/>
            <div className="container justify-center" id="parentKart">
                <form id="sampleForm" className="p-3">
                        <div className="form-group p-4">
                            <div className="card-header bg-transparent" style={{ border: "none" }}><i style={{ fontSize: "36px" }} className="fa-sharp text-primary fa-solid fa-right-to-bracket d-flex justify-content-center"></i>
                                <h3 className="mt-2 d-flex justify-content-center">Task Teamer</h3>
                                <h4 className="mt-2 d-flex justify-content-center text-muted">Hoşgeldiniz!</h4>
                            </div>
                            <div className="form-group p-3">
                            <label htmlFor="exampleInputEmail1" className="mb-1">Kullanıcı Adı</label>
                            <input type="text" className="form-control formlar" style={{ borderTop: "0px", borderLeft: "0px", borderRight: "0px" }} id="txtKadi" aria-describedby="emailHelp" placeholder="&#xf007;" />
                            </div>
                            <div className="form-group p-3">
                            <label htmlFor="exampleInputPassword1" className="mb-1">Şifre</label>
                            <input type="password" autoComplete="off"  className="form-control formlar" id="txtSifre" style={{ borderTop: "0px", borderLeft: "0px", borderRight: "0px" }} placeholder="&#xf084;" />
                            </div>
                            <center><button type="submit" onClick={props.login}  className="btn btn-primary m-4 rounded-pill" id = "btnGiris">Giriş Yap  <i className="fa-solid fa-chevron-right"></i></button></center> 
                        </div>
                    <p className="p-2 m-3">Hesabınız yok mu ?  <a href="/Register" style={{ textDecoration: "none" }}>  Kayıt Ol</a></p>
                </form>
                <br/>
            </div>
        </div>
    )        
}
export default Login;