fetch("https://my.api.mockaroo.com/data.json?key=0617d4b0").then(
        res=>{
            res.json().then(
                data=>{
                    console.log(data);
                    if(data.length > 0){
                        var temp = "";

                        data.forEach((u) => {
                            temp += "<tr>";
                            temp += "<td>"+u.id+"</td>";
                            temp += "<td>"+u.first_name+"</td>";
                            temp += "<td>"+u.last_name+"</td>";
                            temp += "<td>"+u.age+"</td>";
                            temp += "<td>"+u.gender+"</td>";
                            temp += "<td>"+u.money+"</td>";
                            temp += "<td>"+u.married+"</td>";
                            temp += "<td>"+u.language+"</td></tr>";
                        });
                        document.getElementById("data").innerHTML=temp
                    }
                }
            )
        }
    )