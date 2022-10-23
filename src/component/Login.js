export default function Login(){
    return (
        
        <div className="container justify-center" style={{ width: "40%" }} id="parentKart">
            <center><img src="https://avatars.githubusercontent.com/u/115448123?s=200&v=4" style={{ width: "25%" }} className="card-img-top mb-2 mt-3" alt="..." /></center>    
            <form id="sampleForm">
                <div className="form-group p-3">
                    <div className="card-header bg-transparent" style={{border:"none"}}><i style={{fontSize:"36px"}} className="fa-sharp text-primary fa-solid fa-right-to-bracket d-flex justify-content-center"></i>
                    <h3 className="mt-2 d-flex justify-content-center">Task Teamer</h3>
                    <h4 className="mt-2 d-flex justify-content-center text-muted">Hoşgeldiniz!</h4>
                    </div>
                    <label htmlFor="exampleInputEmail1" className="mb-1">Kullanıcı Adı</label>
                    <input type="text" className="form-control formlar" style={{ borderTop:"0px",borderLeft:"0px",borderRight:"0px" }} id="txtKadi" aria-describedby="emailHelp" placeholder="&#xf007;"/>
                </div>
                <div className="form-group p-3">
                    <label htmlFor="exampleInputPassword1" className="mb-1">Şifre</label>
                    <input type="password" autoComplete="off" className="form-control formlar" id="txtSifre" style={{ borderTop:"0px",borderLeft:"0px",borderRight:"0px" }} placeholder="&#xf084;"/>

                </div>
                <center><button type="submit" className="btn btn-primary m-4">Giriş Yap  <i className="fa-solid fa-chevron-right"></i></button></center>
                <p className="p-2 m-3">Hesabınız yok mu ?  <a href="/Register" style={{textDecoration:"none"}}>  Kayıt Ol</a></p>
            </form>
        </div>
    )
}