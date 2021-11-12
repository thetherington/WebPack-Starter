import { http } from './easyhttp';
import { ui } from './ui';

// listen for add post
document.querySelector('.post-submit').addEventListener('click', submitPost)

// listen for post click
document.querySelector('#posts').addEventListener('click', deletePost)

// liste for edit state (event delegation)
document.querySelector('#posts').addEventListener('click', enableEdit)

// listen for cancel edit (event delegation)
document.querySelector('.card-form').addEventListener('click', (e) => {

    e.preventDefault()

    if (e.target.classList.contains('post-cancel')) {
        ui.changeFormState('add')
    }

})


function getPosts() {
    http.get('http://localhost:3000/posts')
        .then((result) => {
            ui.showPosts(result)
        }).catch((err) => {
            console.log(err);
        });
}

function submitPost() {

    const title = document.querySelector('#title').value
    const body = document.querySelector('#body').value
    const id = document.querySelector('#id').value

    if (title === '' || body === '') {
        ui.showAlert('Please fill in all fields', 'alert-danger')

    } else {

        const data = {
            title,
            body
        }

        // check for if id is loaded
        if (id === '') {

            http.post('http://localhost:3000/posts', data)
                .then((result) => {
                    ui.showAlert('Post Added', 'alert-success')
                    ui.clearFields()
                    getPosts()
                }).catch((err) => {
                    console.log(err);
                });

        } else {

            http.put(`http://localhost:3000/posts/${id}`, data)
                .then((result) => {
                    ui.showAlert('Post Updated', 'alert-info')
                    ui.changeFormState('add')
                    getPosts()
                }).catch((err) => {
                    console.log(err);
                });

        }

    }

}

function deletePost(e) {

    e.preventDefault()

    if (e.target.parentElement.classList.contains('delete')) {

        const id = e.target.parentElement.dataset.id

        if (confirm('Are you Sure?')) {

            http.delete(`http://localhost:3000/posts/${id}`)
                .then((result) => {
                    ui.showAlert('Post Removed', 'alert-warning')
                    getPosts()
                }).catch((err) => {
                    console.log(err);
                });

        }

    };
}

function enableEdit(e) {

    e.preventDefault()

    if (e.target.parentElement.classList.contains('edit')) {

        const id = e.target.parentElement.dataset.id

        http.get(`http://localhost:3000/posts/${id}`)
            .then((result) => {
                ui.fillForm(result)
            }).catch((err) => {
                console.log(err);
            });

    }

}

//webpack initializer
export const run = function () {
    // get posts on DOM load
    document.addEventListener('DOMContentLoaded', getPosts)
}