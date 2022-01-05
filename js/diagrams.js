var diag_data;
fetchData();

function fetchData() {
    fetch("https://my.api.mockaroo.com/data.json?key=0617d4b0").then(
        res => {
            res.json().then(
                datas => {
                    diag_data = datas;
                    createDiagrams();
                }  
            )
        }
    )
}

function createDiagrams() {
    const diagr = "<canvas id=\"myChart\"></canvas>";
    document.getElementById('diag').innerHTML = diagr;

    var diag_type = document.getElementById("diag_type");
    diag_type.classList.add("disable");
    
    if (diag_data.length > 0) { 
        //variables 
        //for diagram
        var labels = [];
        var points = [];
        const ctx = document.getElementById('myChart').getContext("2d");
        var gradient = ctx.createLinearGradient(0, 0, 0, 400);

        //for languages
        var en = 0;
        var sp = 0;
        var chi = 0;
        var rus = 0;
        var fr = 0;

        //for determining the number of people
        var count = 0;
        var a = 0;

        //get type of diagram
        var block = document.getElementById("block");
        var line = document.getElementById("line");
        var circle = document.getElementById("circle");
        
        
        //get type of data
        var name = document.getElementById('list').value;
        
        //adjusting the display of chart types
        if (name == "age" || name == "money") {
            circle.classList.add('display_block');
            block.classList.remove('display_block');
            line.classList.remove('display_block');
            document.getElementById('diag_type').value = "line";
        } else if (name == "married" || name == "gender" || name == "language") {
            block.classList.add('display_block');
            line.classList.add('display_block');
            circle.classList.remove('display_block');
            document.getElementById('diag_type').value = "doughnut";
        }
        //get type of data
        var type = document.getElementById('diag_type').value;

        //work with data
        diag_data.forEach((u) => {

            //age
            if (name == "age") {
                points.push(u[name])
                labels.push(count += 1)
                diag_name = name
                gradient.addColorStop(0, "rgba(142, 24, 211, 1)");
                gradient.addColorStop(1, "rgba(255, 255, 0, 1)");
            }

            //money
            else if (name == "money") {
                points.push(u[name])
                labels.push(count += 1)
                diag_name = name
                gradient.addColorStop(0, "rgba(142, 24, 211, 1)");
                gradient.addColorStop(1, "rgba(255, 255, 0, 1)");
            }

            //gender
            else if (name == "gender") {
                if (u[name] == "male") {
                    count += 1
                } else {
                    a += 1
                }
                gradient = ["rgb(255, 217, 0)", "rgb(174, 0, 255)"]
                diag_name = name
            }

            //married
            else if (name == "married") {
                if (u[name] == "true") {
                    count += 1
                } else {
                    a += 1
                }
                diag_name = name
                gradient = ["rgb(255, 217, 0)", "rgb(174, 0, 255)"]
            }

            //language
            else if (name == "language") {
                if (u[name] == "English") {
                    en += 1;
                } else if (u[name] == "Spanish") {
                    sp += 1;
                } else if (u[name] == "Chinese") {
                    chi += 1;
                } else if (u[name] == "Russian") {
                    rus += 1;
                } else if (u[name] == "French") {
                    fr += 1;
                }
                gradient = ["rgb(255, 217, 0)", "rgb(174, 0, 255)", "rgb(3, 245, 144)", "rgb(245, 3, 104)", "rgb(39, 3, 245)"]
            }
        });

        //additional info for the diagram

        //for gender
        if (name == "gender") {
            points.push(count, a)
            labels.push("Male", "Female")
            diag_name = name
        }

        //for married
        else if (name == "married") {
            points.push(count, a)
            labels.push("True", "False")
            diag_name = name
        }

        //for language
        else if (name == "language") {
            points.push(en, sp, chi, rus, fr)
            labels.push("English", "Spanish", "Chinese", "Russian", "French")
            diag_name = name
        }
        //create diagram
        var data = {
            labels: labels,
            datasets: [{
                label: diag_name,
                fill: true,
                backgroundColor: gradient,
                borderColor: 'rgb(151, 0, 252)',
                data: points,
            }]
        };
        console.log(type);

        var config = {
            type: type,
            data: data,
            options: {}
        };
        var myChart = new Chart(
            document.getElementById('myChart'),
            config
        );
        diag_type.classList.remove("disable");
    } else {
        fetchData();
    }  
}
