import { fetchRequests, getRequests, deleteRequest, fetchPlumbers, getPlumbers, sendCompletions } from "./dataAccess.js"


export const Requests = () => {
    fetchRequests()
    fetchPlumbers()
    const requests = getRequests()
    const plumbers = getPlumbers()

    let html = `
        <ul>
            ${
                requests.map(convertRequestToListElement).join("")
            }
        </ul>
    `

    return html
}



/*In the following code, you will need to define the function that will be passed to the map() method.

The function you write will convert each service request object into HTML representations. Since it is wrapped with a <ul> element, make each one an <li> element showing only the description of the request to start.

The function should define 1 parameter (value will be each object in the array)
The description of the service request should be interpolated inside the <li> HTML representation.
The function should return the HTML representation.
For example, if you write a function named convertRequestToListElement, then you would update the code below to the following...

requests.map(convertRequestToListElement).join("")
*/

const convertRequestToListElement = (request) => {
    fetchPlumbers()
    let plumbers = getPlumbers()
    return `<li class="request">${request.description}<button class="request__delete"
    id="request--${request.id}">
Delete
</button>
</li>
<select class="plumbers" id="plumbers">
<option value="">Choose</option>
${
    plumbers.map(
        plumber => {
            return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`
        }
    ).join("")
}
</select>`
}




const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})



mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestIdx, plumberIdx] = event.target.value.split("--")

            /*
                This object should have 3 properties
                   1. requestId
                   2. plumberId
                   3. date_created
            */
            const completion = {
                   requestId: requestIdx,
                   plumberId: plumberIdx,
                   date_created: Date.now() 
            }

            /*
                Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
             */
            sendCompletions(completion)

        }
    }
)

