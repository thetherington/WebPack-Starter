class EasyHTTP {

    async get(url) {

        const result = await fetch(url)

        const data = await result.json()

        return data

    }

    async post(url, data) {

        const result = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        const resData = await result.json()

        return resData

    }

    async put(url, data) {

        const result = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        const resData = await result.json()

        return resData

    }

    async delete(url) {

        const result = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            },
        })

        const resData = await 'user has been deleted'

        return resData

    }

}

export const http = new EasyHTTP()