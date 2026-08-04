// ===============================
// LOAD TASKS
// ===============================

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


// ===============================
// ELEMENT
// ===============================

const calendarTasks = document.getElementById("calendarTasks");


// ===============================
// DISPLAY DEADLINES
// ===============================

function displayCalendar(){


    calendarTasks.innerHTML="";



    if(tasks.length===0){


        calendarTasks.innerHTML=`

        <p>
        No deadlines available.
        </p>

        `;

        return;

    }



    let sortedTasks = tasks.filter(task=>task.date)
    .sort((a,b)=>new Date(a.date)-new Date(b.date));





    if(sortedTasks.length===0){


        calendarTasks.innerHTML=`

        <p>
        No task dates added.
        </p>

        `;


        return;

    }




    sortedTasks.forEach(task=>{


        let today = new Date();

        let deadline = new Date(task.date);



        let statusClass="";



        if(task.status==="Completed"){

            statusClass="completed-date";

        }


        else if(deadline < today){

            statusClass="overdue";

        }





        calendarTasks.innerHTML += `


        <div class="calendar-task">


            <div>


                <h3>
                ${task.title}
                </h3>


                <p>
                ${task.project || "No Project"}
                </p>


            </div>



            <span class="date-badge ${statusClass}">

            ${task.date}

            </span>


        </div>


        `;


    });


}



// ===============================
// INITIAL LOAD
// ===============================

displayCalendar();