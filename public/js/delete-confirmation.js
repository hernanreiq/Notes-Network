var form_delete_note = document.getElementById('form-delete-note');

function deleteNote(note){
    form_delete_note.setAttribute('action', `/note/delete/${note}?_method=DELETE`)
}