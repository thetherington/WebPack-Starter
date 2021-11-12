class UI {
    constructor() {
        this.post = document.querySelector('#posts')
        this.title = document.querySelector('#title')
        this.body = document.querySelector('#body')
        this.idInput = document.querySelector('#id')
        this.postSubmit = document.querySelector('.post-submit')
        this.alertSpan = document.querySelector('.form-end')
        this.forState = 'add'
    }

    showPosts(posts) {

        let output = ''

        posts.forEach(post => {

            output += `
                <div class="card mb-3 shadow-sm">
                    <div class="card-body">
                        <h4 class="card-title">${post.title}</h4>
                        <p class="card-text">${post.body}</p>
                        <a href="#" class="edit card-link link-dark" data-id="${post.id}"><i class="bi bi-pencil"></i></a>
                        <a href="#" class="delete card-link link-danger" data-id="${post.id}"><i class="bi bi-x-lg"></i></a>
                    </div>
                </div>
            `
        });

        this.post.innerHTML = output

    }

    showAlert(msg, alert_type) {

        const alert = document.createElement('div')

        alert.className = `alert ${alert_type}`
        alert.setAttribute('role', 'alert')

        alert.appendChild(document.createTextNode(msg))

        this.alertSpan.appendChild(alert)

        setTimeout(() => {
            alert.remove()
        }, 3000);

    }

    clearFields() {

        this.title.value = ''
        this.body.value = ''
    }

    fillForm(data) {

        this.title.value = data.title
        this.body.value = data.body
        this.idInput.value = data.id

        this.changeFormState('edit')

    }

    changeFormState(type) {

        if (type === 'edit') {

            this.postSubmit.textContent = 'Update Post'
            this.postSubmit.classList.remove('btn-dark')
            this.postSubmit.classList.add('btn-warning')

            // create cancel button
            const button = document.createElement('button')
            button.className = 'post-cancel btn btn-light btn-outline-dark mt-2'
            button.appendChild(document.createTextNode('Cancel Edit'))

            const cardForm = document.querySelector('.card-form')
            const form_end = document.querySelector('.form-end')
            cardForm.insertBefore(button, form_end)

        } else {

            this.postSubmit.textContent = 'Post it'
            this.postSubmit.classList.remove('btn-warning')
            this.postSubmit.classList.add('btn-dark')

            if (document.querySelector('.post-cancel')) {
                document.querySelector('.post-cancel').remove()
            }

            this.idInput.value = ''
            this.clearFields()
            this.forState = 'add'

        }
    }

}
export const ui = new UI();
