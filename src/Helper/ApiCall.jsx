import axios from "axios";

export const makeApi = async (req, url, body) => {
    var config = {
        method: req,
        url: url,
        data: body,
    };
    try {
        const response = await axios(config);
        return response.data;
    } catch (error) {
        console.log("error at catch of make api", error);
        throw error;
    }
}