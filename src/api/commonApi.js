const call = async ({ url, method, model = {}, contentType = "application/json" }) => {
    try {
        let headers = {
            Accept: contentType,
            "Content-Type": contentType,
        };

        let request = {
            method: method,
            headers: headers
        };

        if (method === "POST" || method === "PUT") {
            request.body = JSON.stringify(model);
        }

        let response = await fetch(url, request);
        try {
            let responseJson = await response.json();
            if (responseJson.error || responseJson.success === false) {
                return { success: false, data: responseJson };
            }
            if (Array.isArray(responseJson)) {
                return { success: true, records: responseJson };
            }
            return { success: true, ...responseJson };
        } catch (e) {
            console.log("error", e);
            return { success: true };
        }
    } catch (e) {
        console.log("error", e);
        return { success: false };
    }
}


export const commonApi = {
    get: async url => await call({ url, method: "GET" }),
    post: async (url, model) => await call({ url, method: "POST", model }),
    put: async (url, model) => await call({ url, method: "PUT", model }),
    delete: async (url, model) => await call({ url, method: "DELETE", model })
}
