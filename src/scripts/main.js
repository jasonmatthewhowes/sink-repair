import { SinkRepair } from "./SinkRepair.js"
import { fetchRequests, fetchPlumbers, fetchCompletions, getCompletions } from "./dataAccess.js"


const mainContainer = document.querySelector("#container")

const render = () => {
    fetchRequests()
    fetchCompletions()
    .then(() => fetchPlumbers())
    .then(
        () => {
            mainContainer.innerHTML = SinkRepair()
        }
    )
}

render()


mainContainer.addEventListener(
    "stateChanged",
    customEvent => {
        render()
    }
)
