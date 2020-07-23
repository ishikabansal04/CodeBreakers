let session=[];
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
        var table = document.getElementsByClassName("scoretable");
        if(table){
        for(var i=0; i<len;i++)
        {
            //var row = table.insertRow(0);
            var roww = document.getElementsByTagName('tbody')[0];
            //console.log(roww);
            var row = roww.insertRow(0);

            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3= row.insertCell(2);
            cell1.innerHTML=i+1;
            cell2.innerHTML = session[i];
            if(session[i]==0)
            cell3.innerHTML = 1;
            else cell3.innerHTML = 0;
        }
    }
    else console.log("table is null")

       //session.forEach(myFunction);
       
}

function delete_scores()
{
    var table = document.getElementsByClassName("scoretable");
    
    var rowcnt= table.length+1;
    console.log(rowcnt);
    if(rowcnt>1){
        console.log("row count>2")
    for (var i = rowcnt - 2; i >= 0; i--) {
        console.log("row deleted");
        table.deleteRow(i);
    }
}
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

