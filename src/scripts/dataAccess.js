let applicationState= {requests:[]}
const API = "http://localhost:8088"

//fetch the data
export const fetchRequests = () => {
    return fetch(`${API}/requests`)
        .then(response => response.json())
        .then(
            (serviceRequests) => {
                // Store the external state in application state
                applicationState.requests = serviceRequests
            }
        )
}


//call to get the data
export const getRequests = () => {
    return applicationState.requests.map(requests => ({...requests}))
}

// explanation here: https://github.com/nashville-software-school/client-side-mastery/blob/cohort-60/book-6-a-sink-repair/chapters/AS_HTTP_POST.md
export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }

    const mainContainer = document.querySelector("#container")
    return fetch(`${API}/requests`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
    }




    //below deletes the request after the button is selected. IT returns a fetch that says "DELETE" then broadcasts a state change to rerender the html once the function is called

    export const deleteRequest = (id) => {
        const mainContainer = document.querySelector("#container")
        return fetch(`${API}/requests/${id}`, { method: "DELETE" })
            .then(
                () => {
                    mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
                }
            )
    }

    export const fetchPlumbers = () => {
        return fetch(`${API}/plumbers`)
            .then(response => response.json())
            .then(
                (data) => {
                    applicationState.plumbers = data
                }
            )
    }

//call to get the data
export const getPlumbers = () => {
    return applicationState.plumbers.map(plumbers => ({...plumbers}))
}

//- This will perform the POST request to save the completion object to the API . The first part(fetchSendCompletions) is creating a function with the needed data to perform the post fetch, rhe second part is performing the actual fetch then it is broadcasting a stateChanged event. When that happens we need to rerender the HTML to display the changes made

export const sendCompletions = (completionObject) => {
    const fetchSendCompletions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(completionObject)
    }

    const mainContainer = document.querySelector("#container")
    return fetch(`${API}/completions`, fetchSendCompletions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
    }

//this function is the fetch completions data call

export const fetchCompletions = () => {
    return fetch(`${API}/completions`)
        .then(response => response.json())
        .then(
            (completions) => {
                // Store the external state in application state
                applicationState.completions = completions
            }
        )
}

export const getCompletions = () => {
    return applicationState.completions.map(completions => ({...completions}))
}




