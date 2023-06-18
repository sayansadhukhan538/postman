function getElementFromString(string){
    let div = document.createElement('div');
    div.innerHTML= string;
    return div.firstElementChild;
}





let addParameterCount = 0;

// hide the parametersBox initially
let parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = 'none';

// if the users click on paramsBox hide the json box
let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click',()=>{
    document.getElementById('requestJsonBox').style.display = 'none';
    document.getElementById('parametersBox').style.display = 'block';
})

// if the users click on jsonBox hide the params box
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click',()=>{
    document.getElementById('parametersBox').style.display = 'none';
    document.getElementById('requestJsonBox').style.display = 'block';
})

// if the users click on + button add more parameters
let addParam = document.getElementById('addParam');
addParam.addEventListener('click', ()=>{
    let params = document.getElementById('params');
    let string = `<div class="div">
    <label for="url">Parameter ${addParameterCount+2}</label>
<input
style="margin-left: 44px; 
width:25%;"
type="text"
id="parameterKey${addParameterCount+2}"
placeholder="Enter parameter ${addParameterCount+2} Key"

/>
<input
style="width:25%;"
type="text"
id="parameterValue${addParameterCount+2}"
placeholder="Enter parameter ${addParameterCount+2} Value"

/>
<input id="addParam" class="deleteParam" type="button" value="-">
</div>`;

let paramElement = getElementFromString(string);
params.appendChild(paramElement);

let deleteParam = document.getElementsByClassName("deleteParam");
for(item of deleteParam){
    item.addEventListener('click', (e)=>{
        if(confirm("Are you sure, you want to remove?")){
            e.target.parentElement.remove();
        }
        
    })
}

addParameterCount++;
})

let submit = document.getElementById('submit');
submit.addEventListener('click', ()=>{
    if((get.checked || post.checked) && (jsonRadio.checked || paramsRadio.checked)){
    
    document.getElementById('responsePrism').innerHTML = "Please Wait! Fetching Response. . .";
    
    let url = document.getElementById('url').value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;
    
    // if(requestType.value!='null' && contentType.value!='null'){
    // if user select params then collect all the parameters in the object as strings
    if(contentType == 'params'){
        data = {};
        for(let i=0; i<addParameterCount+1;i++){
            if(document.getElementById('parameterKey'+(i+1))!= undefined){
                let key= document.getElementById('parameterKey'+(i+1)).value;
                let value= document.getElementById('parameterValue'+(i+1)).value;
                data[key]=value;
            }
            data = JSON.stringify(data);
        }

    }
    else if(contentType == 'json'){
        data = document.getElementById('requestJsonText').value;
    }
    

    // log all the values in the console for debugging
    console.log(url+" "+requestType+" "+contentType+" "+data);

    // if the user select get request then invoke the fetch request
    if(requestType=="GET"){
        fetch(url,{
            method: 'GET',
        }).then((response)=>{
            return response.text();
        }).then((text)=>{
            document.getElementById('responsePrism').innerHTML=text;
        });
    }
    else if(requestType=="POST"){
        fetch(url,{
            method: 'POST',
            body:data,
            headers:{
                'content-type':"application/json"
            }
        }).then((response)=>{
            return response.text();
        }).then((text)=>{
            document.getElementById('responsePrism').innerHTML=text;
        });
    }
    
}
else{
    alert("Please choose Request-Type or Content-Type mentioned below");
}



})