let session=[];
var disable=false;
function getsession()
{
    let session;
    if(localStorage.getItem("session") == null){

        session=[];
    }
        else{

            session= JSON.parse(localStorage.getItem('session'));
            console.log(session);
        }

        return session;
    
}

function SaveDataToLocalStorage(value)
{ 
    const session= this.getsession();
    
    session.push(value);
   
    
    localStorage.setItem('session', JSON.stringify(session));
}


function displayscore()
{
        const session= this.getsession();
        console.log(session);
        let len= session.length;
        console.log(len);
        var table = document.getElementsByClassName("scoretable");

        if(table && !disable)
        {
        for(var i=0; i<len;i++)
        {

            var r = table[0].rows;
            console.log(r);
            console.log(r[1].cells[0]);
            console.log(r[1].cells[1]);
            if(session[i]==0)
            { r[1].cells[1].innerHTML= parseInt(r[1].cells[1].innerHTML) + 1;}
            else if(session[i]==1) { r[1].cells[0].innerHTML= parseInt(r[1].cells[0].innerHTML) +1 };
            
        }

        }

        else console.log("table is null");
        disable=true;
        
       
}

displayscore();

function delete_scores()
{
    var table = document.getElementsByClassName("scoretable");

    var r = table[0].rows;

    r[1].cells[1].innerHTML=0;

    r[1].cells[0].innerHTML=0;

}


function myFunction(item,index){

        console.log("displaying scores2");
        document.write("<tr><td>game " + (index+1) + ":</td>");
        document.write("<td>" + item + "</td></tr>" + "<br>");
          
    
}



function reset_storage()
{console.log("storage cleared")
        localStorage.clear();
    
}

