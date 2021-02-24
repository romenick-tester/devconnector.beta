import axios from "axios";

const useSend = async(endpoint, payload) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        const body = JSON.stringify(payload)

        const { data } = await axios.post(endpoint, body, config);

        if(data) {
            return data;
        }
    } catch (error) {
        console.error(error.message);
    }
}

export default useSend;