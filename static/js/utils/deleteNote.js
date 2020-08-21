// For Deleting Note
export default function deleteNote(id) {
  fetch(`/note/delete/${id}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        window.location.reload();
      }
    });
}
