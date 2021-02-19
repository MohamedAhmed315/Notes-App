
class Note {
    static x = 1;

    // static displayNotes(){

    //     for (let index = 1; index < localStorage.length + 1 ; index++) {

    //         if(localStorage.getItem(`note${index}`) === null) {
    //             console.log("error");
    //             // localStorage.removeItem(`note${index}`);
    //             this.x++;
    //         } 
    //         else {
    //             let table = document.getElementById("noteTable");
    //             let row = document.createElement("tr");
    //             row.innerHTML = `
    //             <td id="note${index}">${localStorage.getItem(`note${index}`)}</td>
    //             <td class="trash">
    //             <i id="trash${index}" class="fas fa-trash" onclick="deleteNote(this.id);"></i>
    //             <i class="fas fa-edit" onclick="updateNote(this.parentElement.previousElementSibling.id);"></i>
    //             </td>`;
    //             table.appendChild(row);
    //             console.log(localStorage.getItem(`note${index}`));
    //             this.x++;
    //         }
                
    //         // }
    //     }
    //     console.log("legnth " + localStorage.length);

    // }


    static createNote(){
        let note = document.getElementById("note").value;
        let alertMissing = document.getElementById("alertMissing");
        let alertAdded = document.getElementById("alertAdded");

        if (note === "") {
            alertMissing.style.display = "block"; //display error alert
            setTimeout(function(){ alertMissing.style.display = "none";}, 2000);
            //remove warning after 2s
        }
        else { //add note to table
            let table = document.getElementById("noteTable");
            let row = document.createElement("tr");
            row.innerHTML = `
            <td id="note${this.x}">${note}</td>
            <td class="trash">
            <i id="trash${this.x}" class="fas fa-trash" onclick="deleteNote(this.id);"></i>
            <i class="fas fa-edit" onclick="updateNote(this.parentElement.previousElementSibling.id);"></i>
            </td>`;
            table.appendChild(row);

            if (typeof(Storage) !== "undefined") {//local storage
                localStorage.setItem(`note${this.x}`, note);
            }
            else {
                console.log("No local storage");
                
            }

            alertAdded.style.display = "block"; //display success alert
            setTimeout(function(){ alertAdded.style.display = "none";}, 2000);
            //remove alert after 2s

            this.x++;
             //increase id by 1
        }
    }   
}



document.getElementById("add").addEventListener("click", (val)=>{
    Note.createNote();
      
});

//delete
function deleteNote(noteID){

    console.log(noteID);
    let row1 = document.getElementById(noteID);
    let alertDeleted = document.getElementById("alertDeleted");

    if (confirm('Are you sure you want to delete this note?')) {
        row1.parentElement.parentElement.remove();
        localStorage.removeItem(row1.parentElement.previousElementSibling.id);//delete note from local storage

        alertDeleted.style.display = "block"; //display warning alert
        setTimeout(function(){ alertDeleted.style.display = "none";}, 2000);
      } 
    

}

//update
function updateNote(noteID){
    console.log(noteID);//the note id is the sibling of the edit icon parent
    let noteText = document.getElementById("note").value;
    let row1 = document.getElementById(noteID);
    let alertUpdated = document.getElementById("alertUpdated");

    
    if (confirm('Do you want to update this note?')) {
        row1.innerText = noteText;
        localStorage.setItem(noteID, noteText);//update note in local storage

        alertUpdated.style.display = "block"; //display warning alert
        setTimeout(function(){ alertUpdated.style.display = "none";}, 2000);

        row1.style.backgroundColor = "#d4edda";
        row1.style.transition = "0s"
        setTimeout(function(){ row1.style.backgroundColor = "white"; row1.style.transition = "3s";}, 2000);

    }
}

// Note.displayNotes();