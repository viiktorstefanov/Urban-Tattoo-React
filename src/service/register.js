import { createSubmitHandler } from "./handlers";

export default function register(event) {
    const data = createSubmitHandler(event);

    //make request to server with data
};

