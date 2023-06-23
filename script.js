let lat;
let lon;
let locname=document.getElementById("locationName")
let icon=document.getElementById("icon")
let imgsrc=document.getElementById("imgs")
let desc=document.getElementById("description")
let tem=document.getElementById("temparature")
let mint=document.getElementById("mintemp")
let maxt=document.getElementById("maxtemp")
let winds=document.getElementById("windspeed")
// let days7;
let pre=0
let j=1


let locnm;
let icn;
let imgsr;
let des;
let tp
let mintmp
let maxtmp
let wind





if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition( async position => {
        lat=position.coords.latitude;
        lon=position.coords.longitude;
        console.log(lat,lon);
        let data=await getdata(lat, lon)
        
        // days7=getdt(lat,lon)
        

        return data;
    })
    
}


async function getdata(lat, lon){
    // let res = await fetch("https://api.openweathermap.org/data/2.5/weather?appid=855010faa00e22d1d1338451814fc4a9")
    // 855010faa00e22d1d1338451814fc4a9
    // let apik ="https://api.openweathermap.org/data/2.5/weather?units=metric&lat="+lat+"&lon="+lon+"&exclude=daily&appid=855010faa00e22d1d1338451814fc4a9"
    // let apik ="https://api.openweathermap.org/data/2.5/weather?units=metric&lat="+lat+"&lon="+lon+"&appid=855010faa00e22d1d1338451814fc4a9"
    let apik="http://api.openweathermap.org/data/2.5/forecast?units=metric&lat="+lat+"&lon="+lon+"&appid=855010faa00e22d1d1338451814fc4a9"


    let res=await fetch(apik)
    let data = await res.json();

    console.log(data)

    datains(data)
    for(var i=0;i<40;i++){
        locnm=document.getElementById("locationnm"+j)
        icn=document.getElementById("icn"+j)
        imgsr=document.getElementById("img"+j)
        des=document.getElementById("desc"+j)
        tp=document.getElementById("tempa"+j)
        mintmp=document.getElementById("mintempa"+j)
        maxtmp=document.getElementById("maxtempa"+j)
        wind=document.getElementById("windspd"+j)
        
        datain(data,i)
    }

    

    
    // console.log(days7);
}


function datains(data){
    const{temp}= data.list[0].main
    const {description} = data.list[0].weather[0]
    const {temp_min,temp_max} = data.list[0].main
    const {speed} = data.list[0].wind 
    const {icon}= data.list[0].weather[0]
    // const{name}=data.city
    
    
    // console.log(n)

    let iconurl="http://openweathermap.org/img/wn/"+icon+"@2x.png";


    locname.innerHTML=data.city.name;
    desc.innerHTML=description;
    imgsrc.src=iconurl;
    tem.innerHTML=temp;
    mint.innerHTML=temp_min;
    maxt.innerHTML=temp_max;
    winds.innerHTML=speed;
}


function datain(data,i){

    let str=data.list[i].dt_txt
    const chars=str.split(" ")
    let s1=chars[0]
    const chars1=s1.split("-")
    let n=Number.parseInt(chars1[2])
    
    if(n>pre){
        console.log("date"+n+" i value "+i)
        // console.log()
        const{temp,name}= data.list[i].main
        const {description} = data.list[i].weather[0]
        const {temp_min,temp_max} = data.list[i].main
        const {speed} = data.list[i].wind 
        const {icon}= data.list[i].weather[0]

        let iconurl="http://openweathermap.org/img/wn/"+icon+"@2x.png";

        // console.log(locnm+""+i);
        locnm.innerHTML=data.city.name;
        des.innerHTML=description;
        imgsr.src=iconurl;
        tp.innerHTML=temp;
        mintmp.innerHTML=temp_min;
        maxtmp.innerHTML=temp_max;
        wind.innerHTML=speed;
        j+=1;
    }
    pre=n

}





