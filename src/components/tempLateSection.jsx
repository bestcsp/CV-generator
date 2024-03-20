import './TemplateCss.css'
function TempLateSection({data}){
return(
    <>    
    <div className="container-temp">
        <div className="leftBar">
        <p>left Side</p>
        </div>
        <div className="rightBar">
        <p>rightBar Side</p>

        </div>
    </div>
<h1>Data:{JSON.stringify(data)}</h1>
    </>
) 
}

export default TempLateSection